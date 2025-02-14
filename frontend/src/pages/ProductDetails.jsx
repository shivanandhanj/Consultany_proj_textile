import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    brand: '',
    size: '',
    color: '',
    priceRange: '',
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const navigate = useNavigate();


  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    let matches = true;
    
    if (filters.category && product.category !== filters.category) matches = false;
    if (filters.subcategory && product.subcategory !== filters.subcategory) matches = false;
    if (filters.brand && product.brand !== filters.brand) matches = false;
    if (filters.size && !product.size.includes(filters.size)) matches = false;
    if (filters.color && !product.color.includes(filters.color)) matches = false;
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (product.discount_price < min || product.discount_price > max) matches = false;
    }
    
    return matches;
  });

  // Extract unique values for filters
  const getUniqueValues = (field) => {
    const values = products.map(product => 
      Array.isArray(product[field]) ? product[field] : [product[field]]
    ).flat();
    return [...new Set(values)].filter(Boolean);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
      
      {/* Filters */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8 shadow-sm">
  <div className="flex flex-wrap items-center justify-between mb-4">
    <h2 className="text-xl font-bold text-gray-800 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
      </svg>
      Refine Your Search
    </h2>
    <button 
      onClick={() => setFilters({category: '', subcategory: '', brand: '', size: '', color: '', priceRange: ''})}
      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Reset Filters
    </button>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-6 gap-y-4">
    {/* Category Filter */}
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
      <div className="relative">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="block w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">All Categories</option>
          {getUniqueValues('category').map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
    
    {/* Subcategory Filter */}
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
      <div className="relative">
        <select
          name="subcategory"
          value={filters.subcategory}
          onChange={handleFilterChange}
          className="block w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">All Subcategories</option>
          {getUniqueValues('subcategory').map(subcategory => (
            <option key={subcategory} value={subcategory}>{subcategory}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
    
    {/* Brand Filter */}
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
      <div className="relative">
        <select
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          className="block w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">All Brands</option>
          {getUniqueValues('brand').map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
    
    {/* Size Filter */}
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
      <div className="relative">
        <select
          name="size"
          value={filters.size}
          onChange={handleFilterChange}
          className="block w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">All Sizes</option>
          {getUniqueValues('size').map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
    
    {/* Color Filter */}
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
      <div className="relative">
        <select
          name="color"
          value={filters.color}
          onChange={handleFilterChange}
          className="block w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">All Colors</option>
          {getUniqueValues('color').map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
    
    {/* Price Range Filter */}
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
      <div className="relative">
        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={handleFilterChange}
          className="block w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">All Prices</option>
          <option value="0-1000">$0 - $1,000</option>
          <option value="1001-2000">$1,001 - $2,000</option>
          <option value="2001-5000">$2,001 - $5,000</option>
          <option value="5001-10000">$5,001 - $10,000</option>
          <option value="10001-999999">$10,001+</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
  
  {/* Active Filters */}
  {Object.values(filters).some(f => f !== '') && (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) => {
          if (!value) return null;
          return (
            <span 
              key={key} 
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {key === 'priceRange' ? (
                `Price: ${value.split('-').map(n => `$${parseInt(n).toLocaleString()}`).join(' - ')}`
              ) : (
                `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
              )}
              <button
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, [key]: '' }))}
                className="ml-1.5 inline-flex text-indigo-500 hover:text-indigo-800 focus:outline-none"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </span>
          );
        })}
      </div>
    </div>
  )}
</div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No products found matching your filters.
          </div>
        ) : (
          filteredProducts.map(product => (
            <div key={product._id} onClick={()=>{navigate(`/product/${product._id}`)}}className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative pb-[100%]">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                
                <div className="flex items-center mb-2">
                  <span className="text-lg font-bold text-indigo-600">${product.discount_price}</span>
                  {product.price > product.discount_price && (
                    <span className="text-sm text-gray-500 line-through ml-2">${product.price}</span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.size.slice(0, 3).map(size => (
                    <span key={size} className="px-2 py-1 bg-gray-100 text-xs rounded">{size}</span>
                  ))}
                  {product.size.length > 3 && <span className="px-2 py-1 text-xs">+{product.size.length - 3} more</span>}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {product.color.slice(0, 3).map(color => (
                      <div 
                        key={color}
                        className="w-4 h-4 rounded-full mr-1 border border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                    {product.color.length > 3 && <span className="text-xs">+{product.color.length - 3}</span>}
                  </div>
                  
                  {product.stock > 0 ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">In Stock</span>
                  ) : (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductListing;