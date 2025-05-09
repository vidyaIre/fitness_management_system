import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHED_KEY);
if (!stripePromise) {
  console.error('Stripe key is not defined');
  throw new Error('Stripe key is not defined');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <React.StrictMode>
    <Elements stripe={stripePromise}> 
    <App />
    </Elements>
  </React.StrictMode>
 
);
