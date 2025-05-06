import pytest
from app import app, db
from models import User, Animal
from flask_jwt_extended import create_access_token

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

# 1. Register a new buyer
def test_register_buyer(client):
    res = client.post('/register', json={
        'email': 'buyer@example.com',
        'password': 'pass123',
        'role': 'buyer',
        'name': 'John Doe',
        'address': '123 Main St'
    })
    assert res.status_code == 201

# 2. Prevent duplicate registration
def test_register_duplicate_email(client):
    client.post('/register', json={
        'email': 'dup@example.com',
        'password': 'pass123',
        'role': 'buyer',
        'name': 'Jane Doe',
        'address': '123 Main St'
    })
    res = client.post('/register', json={
        'email': 'dup@example.com',
        'password': 'pass456',
        'role': 'buyer',
        'name': 'Jane Duplicate',
        'address': '456 Another St'
    })
    assert res.status_code == 409

# 3. Login with valid credentials
def test_login_success(client):
    client.post('/register', json={
        'email': 'login@example.com',
        'password': 'pass123',
        'role': 'buyer',
        'name': 'Login User',
        'address': '321 Login St'
    })
    res = client.post('/login', json={
        'email': 'login@example.com',
        'password': 'pass123'
    })
    assert res.status_code == 200
    assert 'access_token' in res.get_json()

# 4. Login with invalid password
def test_login_failure(client):
    client.post('/register', json={
        'email': 'wrongpass@example.com',
        'password': 'correct',
        'role': 'buyer',
        'name': 'Wrong Pass',
        'address': 'Nowhere'
    })
    res = client.post('/login', json={
        'email': 'wrongpass@example.com',
        'password': 'wrong'
    })
    assert res.status_code == 401
