/**import React from 'react';
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
*/

import React from 'react';
import './Cart.css';
import { useCart } from '../contexts/CartContext'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, total, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    navigate('/checkout');
  };

  return (
    <div className="cartContainer">
      <h1 className="title">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty 🛒</p>
      ) : (
        <div className="itemsWrapper">
          {cartItems.map((item) => (
            <div key={item.id} className="cartItem">
              <img
                src={item.image_url || item.animal?.imageUrl}
                alt={item.type || item.animal?.name}
                className="image"
              />
              <div className="details">
                <h3>{item.type || item.animal?.name}</h3>
                <p>Breed: {item.breed || item.animal?.breed}</p>
                <p>Age: {item.age || item.animal?.age} years</p>
                <p>Price: ${item.price || item.animal?.price}</p>
                <button onClick={() => removeFromCart(item.id)} className="removeBtn">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="summary">
            <h2>Total: ${total.toFixed(2)}</h2>
            <button className="checkoutBtn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button
              className="clearBtn"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) {
                  clearCart();
                }
              }}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;