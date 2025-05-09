from flask import Flask, request, abort , jsonify
from flask_restful import Api, Resource
from models import db, User, Animal, Order, OrderItem
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate 
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
from flask_cors import CORS
from dotenv import load_dotenv
import stripe
import json
load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:farm254@localhost/farmartdb'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///farmart.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = os.getenv('SECRET_KEY', 'defaultsecret')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'secret123')

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
api = Api(app)

# --------------------- Authentication ---------------------
class Register(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')
        name = data.get('name')
        address = data.get('address')

        if not all([email, password, role, name]):
            return {"error": "Missing fields"}, 400

        if User.query.filter_by(email=email).first():
            return {"error": "Email already exists"}, 409

        user = User(
            email=email,
            password_hash=generate_password_hash(password),
            role=role,
            name=name,
            address=address if role == 'farmer' else None  
        )
        db.session.add(user)
        db.session.commit()
        return {"message": "User registered successfully"}, 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password_hash, password):
            access_token = create_access_token(identity=str(user.id))
            return {"access_token": access_token, "role": user.role}, 200
        return {"error": "Invalid credentials"}, 401

# --------------------- Animals ---------------------
class AnimalList(Resource):
    @jwt_required()
    def get(self):

        type_filter = request.args.get('type')
        breed_filter = request.args.get('breed')
        age_filter = request.args.get('age')

        animals = Animal.query
        
        if type_filter:
            animals = animals.filter(Animal.type.ilike(f'%{type_filter}%'))  
        if breed_filter:
            animals = animals.filter(Animal.breed.ilike(f'%{breed_filter}%'))  
        if age_filter:
            try:
                animals = animals.filter(Animal.age == int(age_filter))  
            except ValueError:
                return {'message': 'Invalid age value.'}, 400  

        result = []
        for animal in animals.all():
            a = animal.to_dict()
            a['farmer_name'] = animal.farmer.name
            result.append(a)
        
        return result, 200

    @jwt_required()
    def post(self):
        current_user = int(get_jwt_identity())
        user = User.query.get(current_user)

        if user.role != 'farmer':
            return {"error": "Only farmers can add animals"}, 403

        data = request.get_json()
        animal = Animal(
            type=data['type'],
            breed=data['breed'],
            age=data['age'],
            price=data['price'],
            image=data.get('image'),
            farmer_id=current_user
        )
        db.session.add(animal)
        db.session.commit()
        return animal.to_dict(), 201


class AnimalResource(Resource):
    @jwt_required()
    def get(self, id):
        animal = Animal.query.get_or_404(id)
        return animal.to_dict(), 200

    @jwt_required()
    def patch(self, id):
        animal = Animal.query.get_or_404(id)
        current_user = int(get_jwt_identity())
        if animal.farmer_id != current_user:
            return {"error": "Unauthorized"}, 403

        data = request.get_json()
        for field in ['type', 'breed', 'age', 'price', 'image']:
            if field in data:
                setattr(animal, field, data[field])
        db.session.commit()
        return animal.to_dict(), 200

    @jwt_required()
    def delete(self, id):
        animal = Animal.query.get_or_404(id)
        current_user = int(get_jwt_identity())
        if animal.farmer_id != current_user:
            return {"error": "Unauthorized"}, 403

        db.session.delete(animal)
        db.session.commit()
        return {"message": "Animal deleted"}, 200

# --------------------- Orders ---------------------

class OrderList(Resource):
    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())
        user = User.query.get(user_id)

        if user.role == 'farmer':

            orders = (
                db.session.query(Order)
                .join(OrderItem)
                .join(Animal)
                .filter(Animal.farmer_id == user.id)
                .distinct()
                .all()
            )
        else:

            orders = Order.query.filter_by(user_id=user.id).all()

        order_data = []
        for order in orders:
            order_dict = order.to_dict()
            order_dict['order_items'] = [
                {
                    'id': item.id,
                    'animal_id': item.animal_id,
                    'quantity': item.quantity,
                    'price': item.price,
                    'animal': {
                        'id': item.animal.id,
                        'type': item.animal.type,
                        'breed': item.animal.breed,
                        'price': item.animal.price,
                        'age': item.animal.age,
                        'image': item.animal.image,
                        'farmer_id': item.animal.farmer_id
                    }
                }
                for item in order.order_items
            ]

            order_dict['buyer'] = {
                'name': order.user.name if order.user else None,
             }
            order_data.append(order_dict)

        return order_data, 200

    @jwt_required()
    def post(self):
        user_id = int(get_jwt_identity())
        user = User.query.get(user_id)
        data = request.get_json()

        if user.role != 'buyer':
            return {"error": "Only buyers can place orders"}, 403

        items = data.get('items')
        total_price = data.get('total_price')

        if not items:
            return {"error": "No order items provided"}, 400
        if total_price is None:
            return {"error": "Total price is required"}, 400

        order = Order(user_id=user.id, total_price=total_price)  
        db.session.add(order)
        db.session.flush()  

        for item in items:
            animal_id = item.get('animal_id')
            price = item.get('price')
            quantity = item.get('quantity', 1)

            if not animal_id or price is None:
                db.session.rollback()
                return {"error": "Each item must include 'animal_id' and 'price'"}, 400

            animal = Animal.query.get(animal_id)
            if not animal:
                db.session.rollback()
                return {"error": f"Animal with ID {animal_id} not found"}, 404

            order_item = OrderItem(
                order_id=order.id,
                animal_id=animal.id,
                quantity=quantity,
                price=price
            )
            db.session.add(order_item)

        db.session.commit()

        return order.to_dict(), 201
# --------------------- Farmer Accepts/Rejects Orders ---------------------

class OrderAction(Resource):
    @jwt_required()
    def patch(self, order_id):
        order = Order.query.get(order_id)
        if not order:
            return {'error': 'Order not found'}, 404

        user_id = int(get_jwt_identity())
        user = User.query.get(user_id)

        data = request.get_json()
        action = data.get('action')

        if not action:
            return {'error': 'No action provided.'}, 400

        if action == 'cancel':
            if user.role != 'buyer':
                return {'error': 'Only buyers can cancel orders.'}, 403
            if order.user_id != user.id:
                return {'error': 'You can only cancel your own orders.'}, 403
            if order.status != 'pending':
                return {'error': 'Only pending orders can be canceled.'}, 400
            order.status = 'cancelled'

        elif action in ['confirm', 'reject']:
            if user.role != 'farmer':
                return {'error': 'Only farmers can confirm or reject orders.'}, 403
            if order.status == 'cancelled':
                return {'error': 'Cancelled orders cannot be modified.'}, 400
            if order.status == 'pending':
                order.status = 'confirmed' if action == 'confirm' else 'rejected'
            elif order.status in ['confirmed', 'rejected']:
                order.status = 'rejected' if order.status == 'confirmed' else 'confirmed'

        elif action in ['pending', 'confirmed', 'rejected']:
            order.status = action

        else:
            return {
                'error': 'Invalid action. Use "confirm", "reject", "cancel", or a valid status like "pending".'
            }, 400

        db.session.commit()
        return {
            'message': f'Order status updated to "{order.status}" successfully.',
            'order': order.to_dict()
        }, 200
    
#-------------------Checking Out------------------------------------------------------------
class Checkout(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = int(get_jwt_identity())
        animal_ids = data.get('animal_ids')

        if not animal_ids:
            return {"error": "No animals to purchase"}, 400
        
        for animal_id in animal_ids:
            item = OrderItem.query.join(Order).filter(
                Order.user_id == user_id,
                OrderItem.animal_id == animal_id,
                Order.status == 'confirmed',
                Order.paid == False
            ).first()
            if not item:
                return {"error": f"Animal {animal_id} is not in a confirmed and unpaid order"}, 400

        order = Order.query.filter_by(user_id=user_id, status='confirmed', paid=False).first()
        if not order:
            return {"error": "Confirmed and unpaid order not found"}, 404

        line_items = []
        for animal_id in animal_ids:
            animal = Animal.query.get(animal_id)
            if not animal:
                return {"error": f"Animal {animal_id} not found"}, 404

            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': f"{animal.type} - {animal.breed}",
                    },
                    'unit_amount': int(animal.price * 100),
                },
                'quantity': 1,
            })

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url='http://localhost:8080/success',
            cancel_url='http://localhost:8080/cancel',
            metadata={
                'user_id': str(user_id),
                'animal_ids': ','.join(map(str, animal_ids)),
                'order_id': str(order.id)  
            }
        )

        return {'checkout_url': session.url}, 200
    
    #----------------webhook------------------------------------
@app.route("/webhook", methods=["POST"])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get("Stripe-Signature")
    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except stripe.error.SignatureVerificationError:
        return "Invalid signature", 400
    except Exception as e:
        return str(e), 400

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        print("Checkout session completed:")
        print(json.dumps(session, indent=2))

        order_id = session.get("metadata", {}).get("order_id")

        if order_id:
            order = Order.query.get(order_id)

            if order:
                order.paid = True
                db.session.commit()
                print(f" Order {order_id} marked as paid.")
            else:
                print(f"Order {order_id} not found.")
        else:
            print("No order_id found in the session metadata.")

    return jsonify(success=True), 200


# --------------------- Farmer View Their Own Animals ---------------------
@app.route('/farmer/animals', methods=['GET'])
@jwt_required()
def get_my_animals():
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)

    if user.role != 'farmer':
        return {"error": "Unauthorized"}, 403

    animals = Animal.query.filter_by(farmer_id=current_user_id).all()
    return [animal.to_dict() for animal in animals], 200

# --------------------- API Resource Registration ---------------------
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(AnimalList, '/animals')
api.add_resource(AnimalResource, '/animals/<int:id>')
api.add_resource(OrderList, '/orders')
api.add_resource(OrderAction, '/orders/<int:order_id>/action')
api.add_resource(Checkout, '/checkout')

if __name__ == '__main__':
    app.run(debug=True)
