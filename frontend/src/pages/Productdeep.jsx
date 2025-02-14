import React, { useEffect,useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductReviews from './review';
const ProductDetails = () => {
 
const { id } = useParams();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg key={i} className={`w-4 h-4 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price / 100);
  };
useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`);
            
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product:", error);
            setLoading(false);
        }
    };

    fetchProduct();
}, [id]);

if (loading) return <p>Loading...</p>;
if (!product) return <p>Product not found.</p>;

  

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={product.images[mainImage]} 
                alt={product.name} 
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`relative aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${mainImage === index ? 'ring-2 ring-indigo-500' : 'ring-1 ring-gray-200'}`}
                >
                  <img 
                    src={image} 
                    alt={`Product thumbnail ${index + 1}`} 
                    className="w-full h-full object-center object-cover"
                  />
                </button>
              ))}
            </div>
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
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
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
            </div>

            {/* Select Color */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="mt-2 flex flex-wrap gap-3">
                {product.color.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
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
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="mt-2 flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-gray-400 hover:text-gray-500"
                  disabled={quantity <= 1}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="mx-2 w-16 text-center border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-1 text-gray-400 hover:text-gray-500"
                  disabled={quantity >= product.stock}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <button
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
        <div className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          
          <div className="mt-6 space-y-6">
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <h4 className="ml-2 text-sm font-medium text-gray-900">{review.user}</h4>
                    <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
          
          <div className="mt-8">
  {/* Button to toggle review form */}
  <button 
    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
    onClick={() => setShowReviews(!showReviews)}
  >
    {showReviews ? "Hide Reviews" : "Write a Review"}
  </button>

  {/* Render Reviews Component When Needed */}
  {showReviews && <ProductReviews product={product} />}
</div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;