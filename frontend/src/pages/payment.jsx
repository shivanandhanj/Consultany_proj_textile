// Frontend (React with Tailwind CSS)
// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(100); // Default 100 INR

  const API_URL = import.meta.env.VITE_API_URL; // Use import.meta.env for Vite environment variables
  const KEY=import.meta.env.VITE_RAZORPAY_KEY_ID;
  
  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Step 1: Create an order
      const orderResponse = await axios.post(`${API_URL}/api/payment/create-order`, {
        amount: amount
      });
      console.log(orderResponse)
      const { id: order_id } = orderResponse.data;
      
      // Step 2: Initialize Razorpay payment
      const options = {
        key: KEY, // Your test key
        amount: amount * 100, // amount in paisa
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: order_id,
        handler: function(response) {
            console.log(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
          // Step 3: Verify payment
          verifyPayment(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      };
      
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (order_id, payment_id, signature) => {
    try {
      const response = await axios.post(`${API_URL}/api/payment/verify-payment`, {
        order_id,
        payment_id,
        signature
      });
      
      if (response.data.success) {
        alert('Payment successful!');
      } else {
        alert('Payment verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('Payment verification failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Razorpay Payment Demo
        </h2>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount (INR)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay ₹${amount}`}
        </button>
        
        <p className="text-center mt-6 text-sm text-gray-600">
          Powered by Razorpay
        </p>
      </div>
    </div>
  );
}

export default App;