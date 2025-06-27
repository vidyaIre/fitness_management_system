// src/components/CheckoutForm.js
import React, { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../CheckoutForm.css';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ userId, amount, onSuccess}) => {
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
      console.log("inside payment");
      // Step 1: Create payment intent from backend
      const { data } = await axios.post('http://localhost:5000/api/payment/createPayment', {
        userId,
        amount,
        paymentMethod: 'stripe'
      });

      const clientSecret = data.clientSecret;
      console.log("first session");

      // Step 2: Confirm card payment
      const CardElement = elements.getElement(CardNumberElement);
      console.log("CardNumberElement:", CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: CardElement,
          billing_details: {
            name: 'Cardholder Name'
          }
        }
      });
      console.log("second session");
      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // Step 3: Record the payment
          console.log("Payment Intent ID:", result.paymentIntent.id);
          await axios.post('http://localhost:5000/api/payment/recordPayment', {
            userId,
            amount,
            paymentIntentId: result.paymentIntent.id
          });

          setMessage('Payment successful!');
          onSuccess?.(); 
        }
      }
    } catch (error) {
      setMessage('Payment failed: ' + error.message);
    }

    setLoading(false);
  };

  const cardOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937', // dark gray
        '::placeholder': { color: '#9ca3af' },
        fontFamily: 'Inter, sans-serif'
      },
      invalid: { color: '#f87171' } // red on errors
    }
  };

  return (
    //   <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto border rounded shadow">
    //     <h2 className="text-xl font-semibold mb-4">Stripe Payment</h2>
    //     <CardElement  options={cardElementOptions} className="mb-4 p-2 border rounded" />
    //     <button
    //       type="submit"
    //       disabled={!stripe || loading}
    //       className="bg-blue-500 text-white px-4 py-2 rounded"
    //     >
    //       {loading ? 'Processing...' : 'Pay Now'}
    //     </button>
    //     {message && <p className="mt-4 text-red-600">{message}</p>}
    //   </form>
    // );

    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto border rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Pay ₹{amount}</h2>
        <h2 className="text-xl font-semibold mb-4">Stripe Payment</h2>
        <label>Card Number</label>
        <CardNumberElement options={cardOptions} />

        <label>Expiry</label>
        <CardExpiryElement options={cardOptions} />

        <label>CVC</label>
        <CardCvcElement options={cardOptions} />

        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>

        {message && (
          <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
