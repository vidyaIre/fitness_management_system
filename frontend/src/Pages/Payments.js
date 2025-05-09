// src/pages/PaymentPage.js
import React from 'react';
import CheckoutForm from '../components/CheckoutForm';

const Payments = () => {
  // Ideally get this dynamically from context or props
  const userId = 'user-object-id-from-auth';
  const amount = 1000; // Amount in INR (i.e., ₹1000)

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Make a Payment</h1>
      <CheckoutForm userId={userId} amount={amount} />
    </div>
  );
};

export default Payments;
