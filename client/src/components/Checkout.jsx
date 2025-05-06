import React from 'react';
import './Checkout.css';

const Checkout = () => {
  return (
    <div className="checkoutContainer">
      <h2 className="heading">Checkout</h2>

      <form className="form">
        <div className="section">
          <h3>Shipping Information</h3>
          <input type="text" placeholder="Full Name" required />
          <input type="text" placeholder="Address" required />
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="Postal Code" required />
        </div>

        <div className="section">
          <h3>Payment Method</h3>
          {/* Later replace this with Stripe or any payment method integration */}
          <select required>
            <option value="">Select a payment method</option>
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div className="summary">
          <h3>Order Summary</h3>
          {/* This is where you'll fetch order/cart summary from the backend */}
          {/* Example placeholder */}
          <ul>
            <li>
              Puppy Chow (x2) <span>$40</span>
            </li>
            <li>
              Leash <span>$10</span>
            </li>
          </ul>
          <hr />
          <div className="total">
            Total: <strong>$50</strong>
          </div>
        </div>

        <button className="submitBtn" type="submit">
          Confirm & Pay
        </button>
      </form>
    </div>
  );
};

export default Checkout;