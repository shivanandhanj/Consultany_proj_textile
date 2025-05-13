import React, { useState ,useEffect} from 'react';

import axios from 'axios';


import { jwtDecode } from 'jwt-decode';
import { useNavigate ,Link} from "react-router-dom";

const CheckoutPage = ({ onComplete = () => {}, onError = () => {} }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    country: '',
  });
  const [step, setStep] = useState('checkout'); // 'checkout' or 'confirmation'
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  // Add missing paymentStatus state
  const [paymentStatus, setPaymentStatus] = useState(null);
  
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
  
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
      const data = await axios.post(`${API_URL}/api/order/checkout`, {
        userId,
        cartItems,
        shippingAddress: shippingDetails
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      

      const orderId = data.data.savedOrder._id;
      console.log(orderId);
      console.log("razorpay sent the data of savedOrder");
      console.log(data);
      
      const {id: order_id} = data.data.razorpayOrder;
      
      // IMPORTANT CHANGE: Save order data to use in the callback
      const savedOrderData = data.data;
      
      const options = {
        key: KEY,
        amount: data.data.razorpayOrder.amount,
        currency: data.data.razorpayOrder.currency,
        name: "Textile E-Commerce",
        description: "Order Payment",
        order_id: order_id,
        handler: async function (response) {
          console.log("Razorpay Response:", response);

          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            alert("Payment verification failed: Missing details");
            setPaymentStatus("Payment Failed");
            return;
          }

          try {
            const verifyRes = await axios.post(`${API_URL}/api/payment/verify-payment`, {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature
            });

            console.log("Payment Verification Response:", verifyRes.data);
            
            // IMPORTANT CHANGE: Move the order completion inside the callback
            try {
              console.log(2);
              const paymentDetails = {
                method: 'razorpay',
                status: 'completed',
                transactionId: razorpay_payment_id
              };
              
              const completeResponse = await axios.post(`${API_URL}/api/order/checkout/complete`, {
                orderId,
                paymentDetails
              });
              
              console.log(3);
              const orderData = completeResponse.data;
              
              setOrderConfirmation(orderData);
              setStep('confirmation');
              setPaymentStatus("Payment Successful");
              onComplete(orderData);
            } catch (err) {
              console.error("Order completion error:", err);
              setError(err.message);
              setPaymentStatus("Order Processing Failed");
              onError(err.message);
            } finally {
              setLoading(false);
            }
            
            alert("Payment Successful!");
          } catch (err) {
            console.error("Payment Verification Error:", err.response ? err.response.data : err.message);
            alert("Payment Verification Failed");
            setPaymentStatus("Payment Failed");
            setLoading(false);
            onError(err.message || "Payment verification failed");
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            console.log("Payment canceled by user");
            setPaymentStatus("Payment Canceled");
          }
        },
        prefill: {
          name: shippingDetails.fullName || "John Doe",
          email: "john@example.com",
          contact: "9999999999"
        },
        theme: { color: "#3399cc" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
      // IMPORTANT CHANGE: Remove the code that immediately tries to complete the order
      // The order completion now happens inside the Razorpay handler callback

    } catch (err) {
      setError(err.message);
      onError(err.message);
      console.error("Payment error:", err);
      setPaymentStatus("Payment Failed");
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

  const getUserDetails=async()=>{
       const token = localStorage.getItem("authToken");
              if (!token) {
                  console.error("Token not found");
                  return null;
              }
          
              try {
                  const decoded = jwtDecode(token);
                  
                  if (!decoded.userId) {
                      console.error("User ID not found in token");
                      return null;
                  }
                  
                 setUserId(decoded.userId);
                  return decoded.userId; // Return user ID instead of fetching name
              } catch (error) {
                  console.error("Error decoding token:", error);
                  return null;
              }
    }

    const fetchCartItems=async()=>{
      try{
        const userId=await getUserDetails();
        const response = await axios.get(`${API_URL}/api/cart/${userId}`);
        setCartItems(response.data);
        setError(null);
      }catch(err){
        setError('Failed to fetch cart items'+err);
      }finally{
        setLoading(false);
      }
    }
  
    useEffect(()=>{
      fetchCartItems();
    },[])
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {paymentStatus && paymentStatus !== "Payment Successful" && (
        <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg mb-6">
          {paymentStatus}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={shippingDetails.fullName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={shippingDetails.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={shippingDetails.country}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
        </div>
        
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:bg-blue-300"
        >
          {loading ? 'Processing...' : 'Complete Order'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;