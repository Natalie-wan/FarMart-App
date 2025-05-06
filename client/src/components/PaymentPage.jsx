import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import './PaymentPage.css';

const stripePromise = loadStripe("your-public-key-here"); //Add your public Stripe key here

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [clientSecret, setClientSecret] = useState(null); //Stores client secret

  //Fetch client secret from backend
  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch('http://127.0.0.1:5000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 5000 }) 
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stripe = useStripe();
    const elements = useElements();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Customer Name', 
        },
      },
    });

    if (error) {
      console.log("[PaymentError]", error);
      alert("Payment failed: " + error.message);
    } else if (paymentIntent.status === 'succeeded') {
      console.log("Payment successful:", paymentIntent);
      alert("Payment successful!");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Payment Information</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="cardNumber">Card Number</label>
          {/*No longer needs a manual card number input, Stripe Elements will handle this*/}
          <CardElement id="cardNumber" />
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

        <button className="submitButton" type="submit" disabled={!stripe}>
          Complete Payment
        </button>
      </form>
    </div>
  );
};

const StripePaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

export default StripePaymentPage;
