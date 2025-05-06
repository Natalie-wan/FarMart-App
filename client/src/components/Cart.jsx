import React from 'react';
import './Cart.css';

const Cart = () => {
  // Replace this with actual cart data fetched from your backend
  const cartItems = [
    {
      id: 1,
      name: 'Golden Retriever Puppy',
      breed: 'Golden Retriever',
      price: 450,
      quantity: 1,
      image: 'https://place-puppy.com/150x150',
    },
    {
      id: 2,
      name: 'Persian Cat',
      breed: 'Persian',
      price: 300,
      quantity: 2,
      image: 'https://placekitten.com/150/150',
    }
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cartContainer">
      <h1 className="title">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty 🛒</p>
      ) : (
        <div className="itemsWrapper">
          {cartItems.map((item) => (
            <div key={item.id} className="cartItem">
              <img src={item.image} alt={item.name} className="image" />
              <div className="details">
                <h3>{item.name}</h3>
                <p>Breed: {item.breed}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>
            </div>
          ))}
          <div className="summary">
            <h2>Total: ${total}</h2>
            <button className="checkoutBtn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;