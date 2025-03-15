import React, { useState, useContext,useEffect } from 'react';
import {Link,useNavigate } from 'react-router-dom'
import { Heart, X, Menu,ShoppingCart, Search,User,Filter, ChevronDown } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import axios from 'axios';
const FavoritesPage = () => {
  const navigate=useNavigate();
  const{userId}=useContext(CartContext);
  
  const [favorites, setFavorites] = useState([]);

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

 const getDiscountedPrice = (price, discount_price) => {
  return price - discount_price;
};

  const filterOptions = ['All', 'Bedding', 'Curtains', 'Throws', 'Table Linens'];

  const filteredItems = activeFilter === 'All' 
    ? favorites 
    : favorites.filter(item => item.category === activeFilter);


    useEffect(() => {
      if(!userId) return;
      const fetchFavorites = async () => {
        try {
         
          const res = await axios.get(`http://localhost:5000/api/fav/${userId}`);
          setFavorites(res.data);
          

        } catch (error) {
          console.error("Error fetching favorites", error);
        }
      };
  
      fetchFavorites();
    }, [userId]);

  return (
    <>{/* Header/Navbar */}
          <header className="bg-white shadow-sm sticky top-0 z-10">
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
                      className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <Search className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="relative" onClick={()=> navigate("/fav")}>
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
          </header>
    <div className="max-w-6xl mx-auto px-4 py-8">
   
      <div className="flex justify-between items-center mt-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Favorites</h1>
        <div className="text-sm text-gray-500">
          {favorites.length} items
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-8 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center">
          <div className="relative">
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center space-x-2 text-gray-700 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              <Filter size={16} />
              <span>Filter: {activeFilter}</span>
              <ChevronDown size={16} />
            </button>
            
            {filterOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg z-10 w-48">
                {filterOptions.map(filter => (
                  <button 
                    key={filter}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${activeFilter === filter ? 'bg-gray-100 font-medium' : ''}`}
                    onClick={() => {
                      setActiveFilter(filter);
                      setFilterOpen(false);
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Sort by: Latest Added</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Heart size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">Your favorites list is empty</h2>
          <p className="text-gray-600 mb-6">Browse our collections and add items you love to your favorites</p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
            Explore Collections
          </button>
        </div>
      )}

      {/* Favorites Grid */}
      {favorites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden group">
              <div className="relative">
                <img 
                  src={item.images[0]} 
                  alt={item.name} 
                  className="w-full h-64 object-cover"
                />
                <button 
                  onClick={() => removeFromFavorites(item.id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition"
                >
                  <X size={16} className="text-gray-600" />
                </button>
                {getDiscountedPrice(item.price, item.discount_price) > 0 && (
  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
    {Math.round(((item.price - item.discount_price) / item.price) * 100)}% OFF
  </div>
)}
                {/* {!item.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium">
                      Out of Stock
                    </span>
                  </div>
                )} */}
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">{item.category}</div>
                <h3 className="font-medium text-gray-800 mb-2">{item.name}</h3>
               
                <div className="flex justify-between items-center">
                  <div>
                  <div className="flex items-center mb-2">
                  <span className="text-lg font-bold text-indigo-600">${item.discount_price}</span>
                  {item.price > item.discount_price && (
                    <span className="text-sm text-gray-500 line-through ml-2">${item.price}</span>
                  )}
                </div>
                  </div>
                  <button 
                    className={`rounded-lg p-2 ${
                      item.inStock 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {favorites.length > 0 && filteredItems.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center mt-8">
          <h2 className="text-xl font-medium text-gray-800 mb-2">No favorites in this category</h2>
          <p className="text-gray-600 mb-6">Try selecting a different category filter</p>
          <button 
            className="text-indigo-600 font-medium hover:underline"
            onClick={() => setActiveFilter('All')}
          >
            Show all favorites
          </button>
        </div>
      )}
    </div></>
  );
};

export default FavoritesPage;