import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Minus, Plus, X, ShoppingCart } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
const CartManagement = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getUserDetails = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
          console.error("Token not found");
          return null;
      }
  
      try {
          const decoded = jwtDecode(token);
          console.log("Decoded Token:", decoded.userId); // Ensure userId exists
  
          if (!decoded.userId) {
              console.error("User ID not found in token");
              return null;
          }
  
          return decoded.userId; // Return user ID instead of fetching name
      } catch (error) {
          console.error("Error decoding token:", error);
          return null;
      }
  };
  // In real app, get from auth context
  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const userId=await getUserDetails();
      setLoading(true);
      const response = await axios.get(`${API_URL}/cart/${userId}`);
      setCartItems(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await axios.put(`${API_URL}/cart/${itemId}`, {
        quantity: newQuantity
      });
      setCartItems(items =>
        items.map(item =>
          item._id === itemId ? response.data : item
        )
      );
    } catch (err) {
      setError('Failed to update quantity');
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/cart/${itemId}`);
      setCartItems(items => items.filter(item => item._id !== itemId));
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.productId.price * item.quantity), 0
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingCart className="w-6 h-6" />
        <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
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
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-8 text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
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
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          ))}
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total</span>
              <span className="font-semibold text-gray-800">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartManagement;