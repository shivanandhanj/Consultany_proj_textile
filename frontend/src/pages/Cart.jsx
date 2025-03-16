import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Minus, Plus, X, ShoppingCart,Search, Menu, Heart, User} from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useNavigate ,Link} from "react-router-dom";
const CartManagement = () => {
  const { cartItems, setCartItems,loading } = useContext(CartContext);
  const navigate=useNavigate();

  const API_URL = import.meta.env.VITE_API_URL; // Use import.meta.env for Vite environment variables
  
  const { showSuccess } = useToast();
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
  

  

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await axios.put(`${API_URL}/api//cart/${itemId}`, {
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
      await axios.delete(`${API_URL}/api/cart/${itemId}`);
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
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-3">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
    )
  }

  return (

    <>
    <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Menu className="h-6 w-6 mr-4 cursor-pointer md:hidden" />
                  <div className="text-2xl font-bold text-indigo-600">TextileHub</div>
                </div>
                
                <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-600 hover:text-indigo-600">
      Home
    </Link>
                  <Link to="/productList" className="text-gray-600 hover:text-indigo-600">
      Shop
    </Link> <a href="#" className="text-gray-600 hover:text-indigo-600">Categories</a>
                  
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="relative hidden md:block">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <Search className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                  </div>
                   <div className="relative" onClick={()=> navigate("/fav")}>
                                <Heart className="h-6 w-6 text-gray-600 cursor-pointer" />
                                </div> <User className="h-6 w-6 text-gray-600 cursor-pointer" />
                 
                </div> 
              </div>
            </div>
          </header>
    <div className="max-w-4xl mx-auto p-6">


      <div className="flex items-center mt-8 gap-2 mb-8">
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
            <button  onClick={()=> navigate("/checkout")} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div></>
  );
};

export default CartManagement;