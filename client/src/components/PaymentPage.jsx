import React, { useState } from "react";
import "./PaymentPage.css";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment submitted with:", paymentMethod);
  };

  return (
    <div className="container">
      <h2 className="title">Payment Information</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber" required />
        </div>

        <div className="inputGroup">
          <label htmlFor="cardName">Cardholder Name</label>
          <input type="text" id="cardName" name="cardName" required />
        </div>

        <div className="row">
          <div className="inputGroup">
            <label htmlFor="expiry">Expiry Date</label>
            <input type="text" id="expiry" placeholder="MM/YY" required />
          </div>

          <div className="inputGroup">
            <label htmlFor="cvv">CVV</label>
            <input type="password" id="cvv" maxLength="4" required />
          </div>
        </div>

        <div className="inputGroup">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="card">Credit/Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="mpesa">M-Pesa</option>
          </select>
        </div>

        <button className="submitButton" type="submit">
          Complete Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;