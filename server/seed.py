import random
from werkzeug.security import generate_password_hash
from models import db, Animal, User
from app import app  

animal_types = ['Bullock', 'Heifer', 'Ram', 'Ewe', 'Buck', 'Doe']

breeds = {
    'Bullock': ['Angus', 'Hereford', 'Charolais', 'Limousin', 'Simmental'],
    'Heifer': ['Jersey', 'Holstein', 'Guernsey', 'Ayrshire', 'Friesian'],
    'Ram': ['Suffolk', 'Dorset', 'Texel', 'Hampshire', 'Southdown'],
    'Ewe': ['Merino', 'Poll Dorset', 'Border Leicester', 'Romney', 'Suffolk'],
    'Buck': ['Boer', 'Alpine', 'Nubian', 'Saanen', 'Kiko'],
    'Doe': ['Boer', 'Alpine', 'Nubian', 'Saanen', 'Kiko'],
}

animal_images = {
    'Bullock': [
        'https://i.imgur.com/vJmfKEz.jpeg',
        'https://i.imgur.com/Da7NLv6.jpeg',
        'https://i.imgur.com/DxsM1qs.jpeg',
        'https://i.imgur.com/TfEU7VH.jpeg',
        'https://i.imgur.com/y5rCGhF.jpeg'
    ],
    'Heifer': [
        'https://i.imgur.com/W03jexa.jpeg',
        'https://i.imgur.com/GSdshC9.jpeg',
        'https://i.imgur.com/9gEyA2J.jpeg',
        'https://i.imgur.com/wWudAyD.jpeg'
    ],
    'Ram': [
        'https://i.imgur.com/KEJVfqz.jpeg',
        'https://i.imgur.com/8SkFdPf.jpeg',
        'https://i.imgur.com/iqlhgXm.jpeg',
        'https://i.imgur.com/FcV5isO.jpeg',
        'https://i.imgur.com/rxo5mNR.jpeg'
    ],
    'Ewe': [
        'https://i.imgur.com/IKFlekH.jpeg',
        'https://i.imgur.com/df32Arh.jpeg',
        'https://i.imgur.com/babFsqa.jpeg',
        'https://i.imgur.com/TV5e8Zp.jpeg',
        'https://i.imgur.com/yJK0cub.jpeg'
    ],
    'Buck': [
        'https://i.imgur.com/IRarFDQ.jpeg',
        'https://i.imgur.com/KaWAfNa.jpeg',
        'https://i.imgur.com/8YNGl0W.jpeg',
        'https://i.imgur.com/tRdfFhP.jpeg',
        'https://i.imgur.com/wXqAO3M.jpeg'
    ],
    'Doe': [
        'https://i.imgur.com/rCc9cZS.jpeg',
        'https://i.imgur.com/oY5aKzX.jpeg',
        'https://i.imgur.com/Uq6ZsWi.jpeg',
        'https://i.imgur.com/mntnhit.jpeg',
        'https://i.imgur.com/p2yBoxQ.jpeg'
    ],
}

# Create unique image URL selector for each animal type to avoid duplicates
def get_unique_image_url(animal_type, used_images):
    available_images = animal_images[animal_type]
    unused_images = list(set(available_images) - set(used_images))
    if not unused_images:
        print(f"[Warning] All images have been used for {animal_type}. Skipping this animal type.")
        return None  # Return None to skip this animal type
    return random.choice(unused_images)

def create_sample_farmers():
    """Create only sample farmers with farm descriptions based on animals"""
    sample_farmers = [
        User(
            email='johnfarmer@gmail.com',
            password_hash=generate_password_hash('johnpass456'),
            role='farmer',
            name='John Farmer'
        ),
        User(
            email='marygrower@gmail.com',
            password_hash=generate_password_hash('marysecure789'),
            role='farmer',
            name='Mary Grower'
        ),
        User(
            email='bobshepherd@gmail.com',
            password_hash=generate_password_hash('bobsafe321'),
            role='farmer',
            name='Bob Shepherd'
        ),
        User(
            email='lisarancher@gmail.com',
            password_hash=generate_password_hash('lisapass654'),
            role='farmer',
            name='Lisa Rancher'
        ),
    ]
    db.session.add_all(sample_farmers)
    db.session.commit()
    print("Sample farmers created!")

def create_animal(type, breed, price, age, farmer_id, image_url):
    """Create and add a new animal"""
    animal = Animal(
        type=type,
        breed=breed,
        price=price,
        age=age,
        farmer_id=farmer_id,
        image=image_url,
    )
    db.session.add(animal)
    db.session.commit()

def generate_farm_description(farmer_id):
    """Generate a farm description based on the animals the farmer owns"""
    animals = Animal.query.filter_by(farmer_id=farmer_id).all()
    if not animals:
        return "No livestock on this farm yet."
    
    animal_count = {}
    for animal in animals:
        if animal.type not in animal_count:
            animal_count[animal.type] = 1
        else:
            animal_count[animal.type] += 1
    
    description = f"This farm has {len(animals)} animals, including:"
    for animal_type, count in animal_count.items():
        description += f"- {count} {animal_type}(s)"
    
    return description

def delete_all_data():
    """Delete all existing data before seeding"""
    Animal.query.delete()
    User.query.delete()
    db.session.commit()
    print("All data deleted before seeding.")

def seed_animals():
    """Seed animals linked to farmers, ensuring Lisa Rancher gets animal_id 11 and 12"""
    # Step 1: Delete existing data
    delete_all_data()

    # Step 2: Create sample farmers
    create_sample_farmers()

    farmers = User.query.filter_by(role='farmer').all()
    if not farmers:
        print("No farmers found! Cannot seed animals without farmers.")
        return

    lisa = User.query.filter_by(name='Lisa Rancher').first()
    if not lisa:
        print("Lisa Rancher not found!")
        return

    used_images = {animal_type: [] for animal_type in animal_types}

    # Step 3: Create 10 random animals first
    for _ in range(10):
        animal_type = random.choice(animal_types)
        breed = random.choice(breeds[animal_type])
        age = random.randint(1, 10)
        price = random.randint(500, 2000)
        farmer = random.choice(farmers)
        image_url = get_unique_image_url(animal_type, used_images[animal_type])
        
        if image_url:  # Only create animal if an image is available
            used_images[animal_type].append(image_url)
            create_animal(animal_type, breed, price, age, farmer.id, image_url)
            farmer.farm_description = generate_farm_description(farmer.id)
            db.session.commit()

    # Step 4: Create 2 animals for Lisa Rancher (animal_id 11 and 12)
    for _ in range(2):
        animal_type = random.choice(animal_types)
        breed = random.choice(breeds[animal_type])
        age = random.randint(1, 10)
        price = random.randint(500, 2000)
        image_url = get_unique_image_url(animal_type, used_images[animal_type])
        
        if image_url:  # Only create animal if an image is available
            used_images[animal_type].append(image_url)
            create_animal(animal_type, breed, price, age, lisa.id, image_url)

    lisa.farm_description = generate_farm_description(lisa.id)
    db.session.commit()

    # Step 5: Create remaining animals to reach 30 total
    total_animals = 30
    already_created = 12
    for _ in range(total_animals - already_created):
        animal_type = random.choice(animal_types)
        breed = random.choice(breeds[animal_type])
        age = random.randint(1, 10)
        price = random.randint(500, 2000)
        farmer = random.choice(farmers)
        image_url = get_unique_image_url(animal_type, used_images[animal_type])
        
        if image_url:  # Only create animal if an image is available
            used_images[animal_type].append(image_url)
            create_animal(animal_type, breed, price, age, farmer.id, image_url)
            farmer.farm_description = generate_farm_description(farmer.id)
            db.session.commit()

    print("Seeded animals successfully!")

if __name__ == '__main__':
    with app.app_context():
        seed_animals()
