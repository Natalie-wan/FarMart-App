# FarMart – Direct Farm-to-Consumer Marketplace

## Project Overview

FarMart is an e-commerce platform designed to connect farmers directly with consumers, eliminating middlemen who often reduce farmers' profits. This application empowers farmers to list their livestock for sale, while enabling consumers to browse, filter, purchase, and pay for farm animals with transparency and ease.

### Problem Statement

Farmers and distributors often operate on trust and strong personal relationships. Unfortunately, middlemen frequently insert themselves into the supply chain, using exploitative methods that eat into farmers’ hard-earned profits.

### Solution

FarMart provides a direct, trusted digital marketplace where:
- Farmers can list and manage livestock for sale.
- Consumers can easily browse, filter, and purchase animals.
- Both parties benefit from transparent, peer-to-peer transactions without intermediaries.

---

## Tech Stack

### Backend
- **Python (Flask)** – RESTful API server(With Flask-Restful for API handling)
- **Flask-Migrate** - Creating and applying migrations
- **PostgreSQL** – Relational database
- **Flask-SQLAlchemy** – ORM for database interaction
- **Flask-JWT-Extended** – User authentication
- **Stripe** – Payment processing integration

### Frontend
- **ReactJS** – UI component library
- **useContext react hook** – Application state management
- **React Router** – Navigation and routing
- **CSS files** – For styling
- **Fetch** – HTTP client for API requests

### Testing
- **Vitest** – Frontend unit testing
- **Pytest** – Backend testing

---

## Features

### Farmer Capabilities
- Authentication (Register/Login)
- Add new animals for sale
- Edit or delete existing animal listings
- View incoming orders from buyers
- Confirm or reject buyer orders
- Track inventory and sales via dashboard

### Buyer Capabilities
- Authentication (Register/Login)
- Browse all listed animals
- Search animals by type or breed
- Filter animals by age and breed
- Add animals to cart
- Checkout and pay for selected animals
- View and track order history

---

## Database Schema

The backend utilizes the following core models:

- **User** – Represents farmers or buyers
- **Animal** – Contains metadata about livestock listings
- **Order** – Represents a transaction initiated by a buyer
- **OrderItem** – Connects animals to specific orders

---

## API Endpoints

### Authentication
- `POST /register` – Register a new user
- `POST /login` – Login and receive a JWT token

### Animals
- `GET /animals` – List all animals (supports filters)
- `POST /animals` – Add a new animal (farmers only)
- `GET /animals/<id>` – View details of a specific animal
- `PATCH /animals/<id>` – Edit animal listing (owner only)
- `DELETE /animals/<id>` – Delete animal listing (owner only)
- `GET /farmer/animals` – View all animals for the authenticated farmer

### Orders
- `GET /orders` – View all orders (filtered by user role)
- `POST /orders` – Place a new order (buyers only)
- `PATCH /orders/<id>/action` – Confirm, reject, or cancel an order

### Payments
- `POST /checkout` – Create a Stripe checkout session
- `POST /webhook` – Handle Stripe payment webhook events

---

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- PostgreSQL

---

## Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/Natalie-wan/FarMart-App
cd server

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  #On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

5. Initialize the database:
```bash
flask db init
flask db migrate
flask db upgrade
```

6. Seed the database:
```bash
python seed.py
```

7. Run the development server:
```bash
python app.py
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## User Workflows

### Farmer Workflow
1. Register/Login
2. Add livestock to inventory,edit and delete livestock when necessary
3. View and manage orders
4. Confirm or reject orders

### Buyer Workflow
1. Register/Login
2. Browse and search listings by type,breed,age
3. Add animals to cart
4. Checkout and make payments
5. Track orders

## Deployment

The application is configured for deployment using Render.

## Future Enhancements

1. Real-time order notifications
2. Ratings and reviews for sellers
3. Improved filtering and sorting options
4. Health records for listed animals
5. Integrated delivery and tracking
6. Subscription-based buying plans

## Contributors

| Name                                              Role              |
| ----------------- | ----------------------------------------------- |
| Natalie Wanjiku.K | React Developer – Interactivity & Logic         |
| Brian Otieno      | UI Designer – Styling & Layout                  |
| Louis Cheruiyot   | Backend Developer – API Routes & Business Logic |
| Habiba Guyo       | Database Engineer – PostgreSQL Setup & Modeling |


## License


This project is licensed under the MIT License.


---
