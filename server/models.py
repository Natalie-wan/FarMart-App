from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)  
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=True)  
    farm_description = db.Column(db.String, nullable=True)  

    animals = db.relationship('Animal', back_populates='farmer', cascade='all, delete-orphan')
    orders = db.relationship('Order', back_populates='user', cascade='all, delete-orphan')

    serialize_rules = ('-password_hash', '-animals.farmer', '-orders.user')


class Animal(db.Model, SerializerMixin):
    __tablename__ = 'animals'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)
    breed = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String, nullable=True)  # Image field for animal

    farmer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    farmer = db.relationship('User', back_populates='animals')

    serialize_rules = ('-farmer.animals',)

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String, default='pending')  # pending, confirmed, rejected
    paid = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    total_price = db.Column(db.Float, nullable=False)  # Total price of the entire order (must be provided by frontend)

    user = db.relationship('User', back_populates='orders')
    order_items = db.relationship('OrderItem', back_populates='order', cascade='all, delete-orphan')

    serialize_rules = ('-user.orders',)

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)  # Quantity of same animal
    price = db.Column(db.Float, nullable=False)  # Price at time of order

    order = db.relationship('Order', back_populates='order_items')
    animal = db.relationship('Animal')

    serialize_rules = ('-order.order_items', '-animal.farmer')