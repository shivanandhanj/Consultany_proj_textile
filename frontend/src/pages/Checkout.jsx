import React, { useContext, useEffect, useState } from 'react';
import { Search, ShoppingCart, Menu, Heart, User } from 'lucide-react';
import axios from "axios"
import { CartContext } from '../context/CartContext';
import { useNavigate ,Link} from "react-router-dom";
const CheckoutPage = ({ onComplete = () => {}, onError = () => {} }) => {
  const { cartItems,userId } = useContext(CartContext);
  const navigate=useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone:'',
    country: '',
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
     console.log(1);

     

      

      const { orderId, totalAmount } = sessionResponse.data;

      // Simulate payment process (replace with actual payment gateway)
      const paymentDetails = {
        method: 'credit_card',
        status: 'completed',
        transactionId: `tx_${Date.now()}`
      };
      console.log(2)

      // Complete checkout
      const completeResponse = await axios.post('http://localhost:5000/api/order/checkout/complete/', {
        orderId,
        paymentDetails},{
          headers: {
            'Content-Type': 'application/json',
          }
        }
        
      );
      console.log(3)

     


      const orderData = await completeResponse.data;
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
    


    <><header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-4 cursor-pointer md:hidden" />
            <div className="text-2xl font-bold text-indigo-600">TextileHub</div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600">Home</a>
            <Link to="/productList" className="text-gray-600 hover:text-indigo-600">
              Shop
            </Link> <a href="#" className="text-gray-600 hover:text-indigo-600">Categories</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">About</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">Contact</a>

          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <Search className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative" onClick={() => navigate("/fav")}>
              <Heart className="h-6 w-6 text-gray-600 cursor-pointer" />
            </div>
            <User className="h-6 w-6 text-gray-600 cursor-pointer" />
            <div className="relative" onClick={() => navigate("/cart")}>
              <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </div>
          </div>
        </div>
      </div>
    </header><div className="max-w-4xl mx-auto p-6">


        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div>
          <h2>Shopping Cart</h2>


          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
                <img
                  src={item.productId.images[0] || '/api/placeholder/100/100'}
                  alt={item.productId.name}
                  className="w-24 h-24 object-cover rounded" />

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

          <div className="space-y-3">

            <div className="grid grid-cols-2 gap-4">
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
                  required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={shippingDetails.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required />
              </div>
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
                required />
            </div>

            <div className="grid grid-cols-3 gap-4">
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
                  required />
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
                  required />
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
                  required />
              </div>
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
                  ${cartItems.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0).toFixed(2)}
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
      </div></>
  );
};

export default CheckoutPage;