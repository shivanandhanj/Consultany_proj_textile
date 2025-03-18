import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {  Upload, X,Loader2,Search, Plus, Trash2, Edit, Package, Grid, ChevronDown, User, Settings, LogOut, ShoppingBag, Home ,Eye } from "lucide-react";
import { AllContext } from '../../context/AllContext';
import Modald from '../../components/Delmodal'
import Modal from '../../components/Modal';
import axios from "axios"
const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isDelOpen,setIsDelOpen]=useState(false);
  const navigate = useNavigate();
  const [isEditMode,setMode] =useState(false);
  const API_URL = import.meta.env.VITE_API_URL; // Use import.meta.env for Vite environment variables
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
   const [uploadProgress, setUploadProgress] = useState(0);
    const [images, setImages] = useState([]);
     const [imagePreviews, setImagePreviews] = useState([]);  

  const [dragActive, setDragActive] = useState(false);
  
  // Product form state
  const [product, setProduct] = useState({
    name: '',
    category: 'Men',
    subcategory: 'Shirt',
    brand: '',
    description: '',
    price: '',
    discount_price: '',
    variants: [{ size: 'M', color: '#000000', stock: 0 }],
    fabric: 'Cotton',
    pattern: 'Casual',
    sleeve_length: '',
    fit: 'Regular',
    occasion: 'Casual',
    stock: 0,
    
  });

  const [originalProduct, setOriginalProduct] = useState({});
  



  const [activeTab, setActiveTab] = useState('products');
  const [activeCategory, setActiveCategory] = useState('all');
  

  const{products}=useContext(AllContext);
  
  // Size options from your schema
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40", "42", "44"];
  const categories = ["Men", "Women"];
  const subcat=["Shirt","T-Shirt","Pant","Trousers"];

  const fabrics = [
    "Cotton",
    "Silk",
    "Linen",
    "Polyester",
    "Wool",
    "Denim",
    "Rayon",
    "Chiffon",
    "Georgette",
    "Velvet",
  ];
  
  const fits = [
    "Regular",
    "Slim",
    "Loose",
    "Oversized",
    "Tailored",
    "Skinny",
    "Relaxed",
  ];
  const occasions = [
    "Casual",
    "Formal",
    "Party",
    "Wedding",
    "Sports",
    "Ethnic",
    "Beachwear",
    "Loungewear",
    "Business Casual",
  ];
  
  const patterns = [
    "Solid",
    "Striped",
    "Checked",
    "Floral",
    "Polka Dots",
    "Geometric",
    "Abstract",
    "Paisley",
    "Printed",
    "Embroidered",
  ];



  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };
  
  // Fetch product data if in edit mode
  // useEffect(() => {
  //   if (isEditMode) {
  //     fetchProduct();
  //   }
  // }, [id]);

  // Fetch product data from API
  const fetchProduct = async (id) => {
    try {
      if(!id) return ;
      setMode(true);
      setLoading(true);
     
      // Replace with your actual API endpoint
      const response = await axios.get(`${API_URL}/api/admin/update/${id}`);
      setProduct(response.data);
      setOriginalProduct(response.data);
      setImages([]);
      setImagePreviews([]);
      setLoading(false);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
   
      setProduct({ ...product, [name]: value });
    
  };

  // Handle numeric input changes with validation
  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setProduct({ ...product, [name]: value });
    }
  };

  // Handle variant changes
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...product.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    const totalStock = updatedVariants.reduce((sum, variant) => sum + variant.stock, 0);
    setProduct({ ...product, variants: updatedVariants,stock: totalStock, });

 
  };

  // Add new variant
  const addVariant = () => {
    setProduct({
      ...product,
      variants: [...product.variants, { size: 'M', color: '#000000', stock: 0 }]
    });
  };

  // Remove variant
  const removeVariant = (index) => {
    const updatedVariants = [...product.variants];
    updatedVariants.splice(index, 1);
    setProduct({ ...product, variants: updatedVariants });
  };

  // Handle image upload
  const handleImageUpload = async (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/admin/add/images`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }

      const data = await response.json();
      
      setImages(data.images);
      setImagePreviews(data.images);
      setError("");
    } catch (err) {
      setError(`Failed to upload images. Please try again.+${err}`);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  // Remove image
  const removeImage = (index) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);
    setProduct({ ...product, images: updatedImages });
  };

  const confirmDelete = () => {
 // Perform delete request here (Axios / Fetch)
  console.log("deketed");
    setIsDelOpen(false);
  };
 
  // Save product
  const saveProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    if(!isEditMode){
    try {
        const productDataWithImages = { ...product, images };
    
        const response = await fetch(`${API_URL}/api/admin/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productDataWithImages),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add product");
        }
    
        // Reset form
        setProduct({
            name: '',
            category: 'Men',
            subcategory: 'Shirt',
            brand: '',
            description: '',
            price: '',
            discount_price: '',
            variants: [{ size: 'M', color: '#000000', stock: 0 }],
            fabric: 'Cotton',
            pattern: 'Casual',
            sleeve_length: '',
            fit: 'Regular',
            occasion: 'Casual',
            stock: 0,
        });
        setImages([]);
        setImagePreviews([]);
      } catch (err) {
        setError(err.message || "Failed to add product. Please try again.");
      } finally {
        setLoading(false);
      }
    }else{
      const updatedFields = {};
      const id=originalProduct._id;

      
      console.log(id);
        Object.keys(product).forEach(key => {
            if (JSON.stringify(product[key]) !== JSON.stringify(originalProduct[key])) {
                updatedFields[key] = product[key]; // Include only changed fields
            }
        });


        if (Object.keys(updatedFields).length === 0) {
          alert("No changes made!");
          return;
      }

      try {
        
          const response=await axios.put(`${API_URL}/api/admin/update/${id}`, updatedFields);
          alert("Product updated successfully!");


         
      } catch (error) {
          console.error("Error updating product:", error);
      }finally{
        setMode(false);
      }

    }
    };
  
    const categoriess = [
        { id: 'all', name: 'All Categories' },
        { id: 'fabric', name: 'Fabrics' },
        { id: 'clothing', name: 'Clothing' },
        { id: 'homeDecor', name: 'Home Decor' },
        { id: 'accessories', name: 'Accessories' }
      ];
      const [dropdownOpen, setDropdownOpen] = useState(false);
   
    
    let filteredProducts = activeCategory === 'all' 
      ? products 
      : products.filter(product => product.category === activeCategory);

 



      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5; // Set how many products per page
    
      // Calculate total pages
      const totalPages = Math.ceil(products.length / itemsPerPage);
    
      // Get the products for the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

     filteredProducts = filteredProducts.slice(startIndex, endIndex);

      
      const goToPreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const goToNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
  

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">



      <div className="flex-1 overflow-auto">



      <header className="bg-white shadow">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Product Management</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              <div>
                <img src="/api/placeholder/40/40" alt="Admin" className="h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>
        </header>


        <Modald isOpen={isDelOpen} onClose={() => setIsDelOpen(false)} onConfirm={confirmDelete} />
  

      <main className="p-6">
          <div className="flex justify-between items-center mb-6">
          <div className="relative ml-4">
      {/* Dropdown Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center bg-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span>{categoriess.find((c) => c.id === activeCategory)?.name}</span>
        <ChevronDown size={16} className="ml-2" />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute z-10 mt-1 w-56 bg-white border rounded-md shadow-lg">
          {categoriess.map((category) => (
            <div
              key={category.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setActiveCategory(category.id);
                setDropdownOpen(false); // Close dropdown after selection
              }}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );

            <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"   onClick={() => setIsModalOpen(true)}>
              <Plus size={18} className="mr-2" />
              Add New Product
            </button>
          </div>
          {/* Product table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map(product => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-md object-cover" src={product.images[0]} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          {/* <div className="text-sm text-gray-500">SKU: PRD-{products._id.toString().padStart(5, '0')}</div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category} </div>
               
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.stock} units</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        <Eye size={18} />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3" onClick={() => {fetchProduct(product._id),setIsModalOpen(true)}}>
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900" onClick={() => setIsDelOpen(true)}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between">
          {/* Previous Button */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="hidden md:flex">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                    currentPage === pageNum
                      ? "text-white bg-indigo-600 border-indigo-500 hover:bg-indigo-700"
                      : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    
          </div>
        </main>


        
      </div>









      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h1>
        <button
          onClick={() => navigate('/admin/products')}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
        >
          Back to List
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
         <form onSubmit={saveProduct} className="space-y-6">
        {/* Basic Info Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name*
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category*
              </label>
              <select
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
                </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subcategory
              </label>
              <select
                type="text"
                name="subcategory"
                value={product.subcategory}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >{subcat.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
                </select>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price*
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  name="price"
                  value={product.price}
                  onChange={handleNumericChange}
                  required
                  className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Price
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  name="discount_price"
                  value={product.discount_price}
                  onChange={handleNumericChange}
                  className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Stock
              </label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleNumericChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Description</h2>
          <div>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fabric
              </label>
              <select
                type="text"
                name="fabric"
                value={product.fabric}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >

              {fabrics.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pattern
              </label>
              <select
                type="text"
                name="pattern"
                value={product.pattern}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
             
             >
                  {patterns.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
                   </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sleeve Length
              </label>
              <input
                type="text"
                name="sleeve_length"
                value={product.sleeve_length}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fit
              </label>
              <select
                type="text"
                name="fit"
                value={product.fit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                  {fits.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
                </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Occasion
              </label>
              <select
                type="text"
                name="occasion"
                value={product.occasion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                  {occasions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}

                </select>
            </div>
          </div>
        </div>

        {/* Variants Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Variants</h2>
            <button
              type="button"
              onClick={addVariant}
              className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
            >
              Add Variant
            </button>
          </div>
          
          {product.variants.map((variant, index) => (
            <div 
              key={index} 
              className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 border border-gray-200 rounded-md mb-3 bg-white"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size*
                </label>
                <select
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {sizeOptions.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color*
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                    className="h-8 w-8 border rounded"
                  />
                  <input
                    type="text"
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock*
                </label>
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(index, 'stock', parseInt(e.target.value) || 0)}
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  disabled={product.variants.length === 1}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    product.variants.length === 1 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <h3 className="text-md font-semibold text-gray-700">
        Total Stock: <span className="text-indigo-600">{product.stock}</span>
      </h3>
    </div>  
        </div>

        {/* Images Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Product Images</h2>
          
          

          <div
          className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Drag and drop your images here, or click to browse</p>
          </div>
          <input
            type="file"
            multiple
            onChange={(e) => handleImageUpload(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            Select Files
          </label>
          
          {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

          
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {imagePreviews.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="h-32 w-full object-cover rounded-md border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                  <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          {/* <button
            type="submit"
            disabled={saving}
            className={`px-4 py-2 rounded-md text-white transition-colors ${
              saving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {saving ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
          </button> */}

<button onClick={() => setIsModalOpen(true)}
  type="submit"
  disabled={saving}
  className={`px-4 py-2 rounded-md text-white transition-colors ${
    loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
  }`}>
  {loading ? (
    <>
      <Loader2 className="animate-spin h-5 w-5 text-white" />
      <span>Adding Images...</span>
    </>
  ) : (
     isEditMode ? 'Update Product' : 'Create Product'
      
  )}
</button>

        </div>
      </form>
      </Modal>
    </div>
  );
};

export default Product;