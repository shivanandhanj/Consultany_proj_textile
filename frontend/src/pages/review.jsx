import { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { Star } from 'lucide-react';
const ProductReviews = ({ product }) => {
  const [showForm, setShowForm] = useState(false);
 
  const [reviews, setReviews] = useState(product.reviews || []);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
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


  
  
  



  const handleSubmit = async () => {
    try {
       const id= await getUserDetails();
       
      
      const response = await axios.post(`http://localhost:5000/api/reviews/${product._id}`, {
        user:id, // Replace with actual logged-in user ID
        rating,
        comment
      });

      // Update the reviews list with the new review
      setReviews([...reviews, response.data.review]);

      // Reset form
      setRating(5);
      setComment("");
      setShowForm(false);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="mt-8">
      {/* Write a Review Button */}
      {/* <button 
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Write a review"}
      </button> */}

      {/* Review Form */}
      {(<div className="max-w-2xl mx-auto mt-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-sm border rounded-lg p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1 transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(value)}
              >
                <Star
                  className={`w-8 h-8 ${
                    (hoverRating || rating) >= value
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {rating ? `${rating} out of 5 stars` : 'Select a rating'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label 
            htmlFor="comment" 
            className="block text-sm font-medium text-gray-700"
          >
            Your Review
          </label>
          <div className="relative">
            <textarea
              id="comment"
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none transition-all duration-200 ease-in-out"
              placeholder="Share your experience with this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {comment.length}/500
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() => {
              setRating(0);
              setComment('');
            }}
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={!rating || isSubmitting}
            className={`
              inline-flex items-center px-4 py-2 border border-transparent 
              text-sm font-medium rounded-md shadow-sm text-white 
              ${rating ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              transition-colors duration-200 ease-in-out
            `}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Review'
            )}
          </button>
        </div>
      </form>
    </div>
      )}

      {/* Display Reviews */}
     


    </div>
  );
};

export default ProductReviews;
