import React, { useContext, useEffect, useState } from 'react';

import axios from "axios"
import { CartContext } from '../context/CartContext';
const CheckoutPage = ({ onComplete = () => {}, onError = () => {} }) => {
  const { cartItems,userId } = useContext(CartContext);
  
  useEffect(() => {
    console.log("Updated Cart Items:", cartItems);
  }, [cartItems]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  // if (!Array.isArray(cartItems)) {
  //   return <p>No items in the cart.</p>;  // ✅ Prevent error if cartItems is not an array
  // }
  const [step, setStep] = useState('checkout'); // 'checkout' or 'confirmation'
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const handleInputChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate form
      if (!shippingDetails.fullName || !shippingDetails.address || 
          !shippingDetails.city || !shippingDetails.postalCode || !shippingDetails.country) {
        throw new Error('Please fill in all shipping details');
      }

      // Create checkout session
      const sessionResponse = await axios.post('http://localhost:5000/api/order/checkout/', {
        userId, // Get from auth context
        cartItems,
        shippingAddress: shippingDetails
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(sessionResponse.data)

      

      const { orderId, totalAmount } = await sessionResponse.json();

      // Simulate payment process (replace with actual payment gateway)
      const paymentDetails = {
        method: 'credit_card',
        status: 'completed',
        transactionId: `tx_${Date.now()}`
      };

      // Complete checkout
      const completeResponse = await axios.post('http://localhost/api/checkout/complete', {
        orderId,
        paymentDetails},{
          headers: {
            'Content-Type': 'application/json',
          }
        }
        
      );

      if (!completeResponse.ok) {
        throw new Error('Failed to complete checkout');
      }

      const orderData = await completeResponse.json();
      setOrderConfirmation(orderData);
      setStep('confirmation');
      onComplete(orderData);

    } catch (err) {
      setError(err.message);
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'confirmation') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Order Confirmed!</h2>
          <p className="text-green-600 mb-2">Your order has been successfully placed.</p>
          <p className="text-green-600">Order ID: {orderConfirmation?.order?._id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div>
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
              <img
                src={item.productId.images[0] || '/api/placeholder/100/100'}
                alt={item.productId.name}
                className="w-24 h-24 object-cover rounded"
              />
              
              <div className="flex-grow">
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.productId.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.productId.description}
                </p>
                <p className="text-lg font-medium text-gray-800 mt-1">
                  ${item.productId.price}
                </p>
                <div className="flex items-center gap-4">

                <div className="flex items-center mt-3">
    {/* Product Size */}
    <span className="text-sm font-medium text-gray-600">Size:</span>
    <span className="ml-2 px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-gray-100">
      {item.selectedSize}
    </span>
  </div>

  <div className="flex items-center mt-2">
    {/* Product Color */}
    <span className="text-sm font-medium text-gray-600">Color:</span>
    <span
      className="ml-2 w-6 h-6 rounded-full border border-gray-300"
      style={{ backgroundColor: item.selectedColor }}
    ></span>
  </div>
                </div>

                
               
               
              </div>
              
              
              <div className="flex items-center gap-2">
                
                <span className="w-8 text-center font-medium">
                  {item.quantity}
                </span>
               
              </div>
              
              <div className="w-24 text-right">
                <p className="font-semibold text-gray-800">
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </p>
              </div>
              
              <button
                onClick={() => removeItem(item._id)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
               
              </button>
            </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}

    </div>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={shippingDetails.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={shippingDetails.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={shippingDetails.country}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
         
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between">
              <span>{item.productId.name} x {item.quantity}</span>
              <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>
                ${cartItems.reduce((sum, item) => 
                  sum + (item.productId.price * item.quantity), 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300"
      >
        {loading ? 'Processing...' : 'Complete Purchase'}
      </button>
    </div>
  );
};

export default CheckoutPage;