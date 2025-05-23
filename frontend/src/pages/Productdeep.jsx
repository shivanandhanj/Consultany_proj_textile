import React, { useEffect,useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Search, ShoppingCart, Menu, Heart, User } from 'lucide-react';
import { Star } from 'lucide-react';
import ProductReviews from './review';
import {jwtDecode} from "jwt-decode"
import TShirtViewer from '../components/Tshirt';
import LogoutButton from '../components/LogoutButton';


import { useToast } from '../context/ToastContext';
import { useNavigate ,Link} from "react-router-dom";
const ProductDetails = () => {
  
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);


  const API_URL = import.meta.env.VITE_API_URL; // Use import.meta.env for Vite environment variables
  
  const navigate=useNavigate();
  const { showSuccess } = useToast();
const { id } = useParams();
 
  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/products/${id}`);
            const product = response.data;

            setProduct(response.data);
      //        if (fetchedProduct.color_variants?.length > 0) {
      //   setSelectedColor(fetchedProduct.color_variants[0].color);
      // }

  //     const availableVariants = product?.variants?.filter(variant => variant.stock > 0) || [];
  // const availableSizes = [...new Set(availableVariants.map(variant => variant.size))];
  //           handleSizeSelect(availableSizes[0]);

             const availableVariants = product?.variants?.filter(variant => variant.stock > 0) || [];
    const availableSizes = [...new Set(availableVariants.map(variant => variant.size))];

    if (availableSizes.length > 0) {
      const firstSize = availableSizes[0];
      setSelectedSize(firstSize);

      const firstColor = availableVariants.find(v => v.size === firstSize)?.color;
      if (firstColor) {
        setSelectedColor(firstColor);
      }
    }
            
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product:", error);
            setLoading(false);
        }
    };

    fetchProduct();
}, [id]);

  // Extract available sizes & colors with stock > 0
  const availableVariants = product?.variants?.filter(variant => variant.stock > 0) || [];
  const availableSizes = [...new Set(availableVariants.map(variant => variant.size))];
  const availableColors = selectedSize
    ? availableVariants.filter(variant => variant.size === selectedSize).map(variant => variant.color)
    : [];
  
  // Ensure selected size & color are valid
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
     const colorForSize = availableVariants.find(variant => variant.size === size)?.color;

  setSelectedColor(colorForSize || null); // Set first color of that size
  setQuantity(1);
  setMainImage(0); // Reset color when size changes
    setQuantity(1);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setQuantity(1);
  };


  const selectedColorVariant = product?.color_variants?.find(
  (variant) => variant.color === selectedColor
);
const colorImages = selectedColorVariant?.images || [];

  // Find stock for selected variant
  const selectedVariant = availableVariants.find(variant => variant.size === selectedSize && variant.color === selectedColor);
  const maxStock = selectedVariant ? selectedVariant.stock : 1;
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-200'
        }`}
      />
    ));
  };

  

  const getAverageRating = () => {
    if (!product.reviews?.length) return 0;
    const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / product.reviews.length).toFixed(1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price / 100);
  };


const getUserDetails = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("Token not found");
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        // console.log("Decoded Token:", decoded.userId); // Ensure userId exists

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

  const addCart=async()=>{
    try{
    
  const userId = await getUserDetails();
 

  const response = await axios.post(`${API_URL}/api/carts/add`, {
    userId,
    productId: product,
    quantity,
    selectedColor,
    selectedSize,
  });
 
  

      showSuccess(`${product.name} added to cart!`);
     
      
     

    }catch (error) {
      console.error("Failed to add to cart:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-3">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }
if (!product) return <p>Product not found.</p>;


  

  return (
    <div className="bg-white">


 <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 cursor-pointer md:hidden" />
              <div className="text-2xl font-bold text-indigo-600">TextileHub</div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              
              <Link to="/productList" className="text-gray-600 hover:text-indigo-600">
  Shop
</Link> 

 <Link to="/category" className="text-gray-600 hover:text-indigo-600">
      Category
    </Link>
     <Link to="/about" className="text-gray-600 hover:text-indigo-600">
                       About
                     </Link>
              
                  <Link to="/contact" className="text-gray-600 hover:text-indigo-600">
                       Contact
                     </Link>
            </div>
            
            <div className="flex items-center space-x-4">
             
              <div className="relative" onClick={()=> navigate("/fav")}>
              <Heart className="h-6 w-6 text-gray-600 cursor-pointer" />
              </div>
              <div className="relative" onClick={()=> navigate("/profile")}>
              <User className="h-6 w-6 text-gray-600 cursor-pointer" />
              </div>
              
              <div className="relative" onClick={() => navigate("/cart")}>
                <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer" />
                      </div>

                    <div> <LogoutButton /></div>
            </div> 
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">


     

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
      <div
        className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => setShow3D(true)}
      >
        <img
  src={colorImages[mainImage]}
  alt={`Main product in ${selectedColor}`}
  className="w-full h-auto object-cover rounded-md"
/>
      </div>


<div className="grid grid-cols-4 gap-2 mt-4">
  {colorImages.map((image, index) => (
    <button
      key={index}
      onClick={() => setMainImage(index)}
      className={`relative aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
        mainImage === index ? 'ring-2 ring-indigo-500' : 'ring-1 ring-gray-200'
      }`}
    >
      <img
        src={image}
        alt={`Product thumbnail ${index + 1}`}
        className="w-full h-full object-center object-cover"
      />
    </button>
  ))}
</div>


      {/* {show3D && (
        <TShirtViewer
          textureUrl={product.images[mainImage]}
          onClose={() => setShow3D(false)}
        />
      )} */}
    </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="mt-1 text-sm text-gray-500">{product.brand} | {product.category} | {product.subcategory}</p>
            </div>

            {/* Price */}
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900 mr-4">
                {formatPrice(product.discount_price)}
              </p>
              {product.price > product.discount_price && (
                <p className="text-lg text-gray-500 line-through">
                  {formatPrice(product.price)}
                </p>
              )}
              {product.price > product.discount_price && (
                <span className="ml-4 px-2.5 py-0.5 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Save {Math.round((1 - product.discount_price / product.price) * 100)}%
                </span>
              )}
            </div>

            {/* Stock status */}
            <div>
              {product.stock > 10 ? (
                <p className="text-sm text-green-600 flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  In Stock
                </p>
              ) : product.stock > 0 ? (
                <p className="text-sm text-yellow-600 flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Only {product.stock} left
                </p>
              ) : (
                <p className="text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Out of Stock
                </p>
              )}
            </div>

            {/* Select Size */}
            <div>
              {product.stock>0 && (
                <>
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeSelect(size)}
              className={`
                px-3 py-1 border rounded-md text-sm font-medium
                ${selectedSize === size 
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {size}
            </button>
          ))}
        </div>
        </>)
        }
      </div>

            {/* Select Color */}
            <div>   
              {product.stock>0 && (
                <>
        <h3 className="text-sm font-medium text-gray-900 mt-4">Color</h3>
        <div className="mt-2 flex flex-wrap gap-3">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className={`
                relative rounded-full w-8 h-8 flex items-center justify-center
                ${selectedColor === color ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}
              `}
              style={{ backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : color.toLowerCase() }}
              title={color}
            >
              {color.toLowerCase() === 'white' && (
                <span className="absolute inset-0 rounded-full border border-gray-300"></span>
              )}
              {selectedColor === color && color.toLowerCase() === 'white' && (
                <svg className="h-4 w-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {selectedColor === color && color.toLowerCase() !== 'white' && (
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
        </>)}
      </div>

            {/* Quantity */}
            <div>


              {product.stock>0 && (<>
        <h3 className="text-sm font-medium text-gray-900 mt-4">Quantity</h3>
        <div className="mt-2 flex items-center">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-1 text-gray-400 hover:text-gray-500"
            disabled={quantity <= 1 || !selectedVariant}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <input
            type="number"
            min="1"
            max={maxStock}
            value={quantity}
            onChange={(e) => setQuantity(Math.min(maxStock, Math.max(1, parseInt(e.target.value) || 1)))}
            className="mx-2 w-16 text-center border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            disabled={!selectedVariant}
          />
          <button
            onClick={() => setQuantity(Math.min(maxStock, quantity + 1))}
            className="p-1 text-gray-400 hover:text-gray-500"
            disabled={quantity >= maxStock || !selectedVariant}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        {selectedVariant && selectedVariant.stock < 5 && (
          <p className="text-xs text-red-500 mt-1">Only {selectedVariant.stock} left in stock!</p>
        )}

</>)}
      </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <button onClick={addCart}
                disabled={!selectedSize || !selectedColor || product.stock === 0}
                className={`
                  w-full flex items-center justify-center px-8 py-3 border border-transparent 
                  rounded-md shadow-sm text-base font-medium text-white 
                  ${product.stock === 0 || !selectedSize || !selectedColor 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                  }
                `}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              {(!selectedSize || !selectedColor) && product.stock > 0 && (
                <p className="mt-2 text-sm text-red-500">
                  Please select {!selectedSize ? 'a size' : ''}{!selectedSize && !selectedColor ? ' and ' : ''}{!selectedColor ? 'a color' : ''}
                </p>
              )}
            </div>

            {/* Product Description */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <div className="mt-4 prose prose-sm text-gray-500">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Details</h3>
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 px-4 py-3 rounded-md">
                    <dt className="text-sm font-medium text-gray-500">Fabric</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.fabric}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-md">
                    <dt className="text-sm font-medium text-gray-500">Pattern</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.pattern}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-md">
                    <dt className="text-sm font-medium text-gray-500">Sleeve Length</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.sleeve_length}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-md">
                    <dt className="text-sm font-medium text-gray-500">Fit</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.fit}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-md">
                    <dt className="text-sm font-medium text-gray-500">Occasion</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.occasion}</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-4xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
      <div className="border rounded-lg bg-white shadow-sm">
        {/* Header Section */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Customer Reviews
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">
                  {getAverageRating()}
                </span>
                <span className="ml-1 text-sm text-gray-500">/ 5</span>
              </div>
              <div className="flex">{renderStars(getAverageRating())}</div>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Based on {product.reviews?.length || 0} reviews
          </p>
        </div>

        {/* Reviews List */}
        <div className="divide-y divide-gray-200">
          {product.reviews?.length > 0 ? (
            product.reviews.map((review) => (
              <div key={review._id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-700 font-medium">
                        {review.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        {review.user.name}
                      </h4>
                      <time className="text-sm text-gray-500">{review.date}</time>
                    </div>
                    <div className="flex mt-1">
                      {renderStars(review.rating)}
                    </div>
                    <p className="mt-3 text-sm text-gray-600 whitespace-pre-line">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">No reviews yet.</p>
              <p className="text-sm text-gray-400">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>

        {/* Review Form Toggle */}
        <div className="border-t border-gray-200 p-6">
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {showReviews ? "Cancel Review" : "Write a Review"}
          </button>
        </div>

        {/* Review Form */}
        {showReviews && <ProductReviews product={product} />}
      </div>
    </div>
      </div>
    </div>
  );
};

export default ProductDetails;