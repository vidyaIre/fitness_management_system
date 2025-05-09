// src/components/CheckoutForm.js
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ userId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('');

    try {
      // Step 1: Create payment intent from backend
      const { data } = await axios.post('http://localhost:5000/api/payments/createPayment', {
        userId,
        amount,
        paymentMethod: 'stripe'
      });

      const clientSecret = data.clientSecret;

      // Step 2: Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // Step 3: Record the payment
          await axios.post('http://localhost:5000/api/payments/recordPayment', {
            userId,
            amount,
            paymentIntentId: result.paymentIntent.id
          });

          setMessage('Payment successful!');
        }
      }
    } catch (error) {
      setMessage('Payment failed: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Stripe Payment</h2>
      <CardElement className="mb-4 p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </form>
  );
};

export default CheckoutForm;
