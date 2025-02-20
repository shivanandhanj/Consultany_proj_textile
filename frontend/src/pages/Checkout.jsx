import React, { useState } from 'react';

const CheckoutPage = ({ onComplete = () => {}, cartItems = [], onError = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
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
      const sessionResponse = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user123', // Get from auth context
          cartItems,
          shippingAddress: shippingDetails
        })
      });

      if (!sessionResponse.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { orderId, totalAmount } = await sessionResponse.json();

      // Simulate payment process (replace with actual payment gateway)
      const paymentDetails = {
        method: 'credit_card',
        status: 'completed',
        transactionId: `tx_${Date.now()}`
      };

      // Complete checkout
      const completeResponse = await fetch('/api/checkout/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          paymentDetails
        })
      });

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