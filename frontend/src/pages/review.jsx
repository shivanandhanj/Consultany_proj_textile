import { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const ProductReviews = ({ product }) => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(product.reviews || []);
  
  
//   const getUserDetails = async () => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       console.error("Token not found");
//       return null;
//     }
  
//     try {
//       const decoded = jwtDecode(token);
//       console.log("Decoded Token:", decoded.userId); // Check if userId exists
  
//       if (!decoded.userId) {
//         console.error("User ID not found in token");
//         return null;
//       }
  
//       // Fetch user details from backend
//       const response = await axios.get(`http://localhost:5000/api/auth/users/${decoded.userId}`);
  
//       if (response.data) {
//         console.log("User Data:", response.data);
//         return response.data.name; // Assuming backend returns { name: "John Doe" }
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//       return null;
//     }
//   };
  
//   getUserDetails().then((userName) => {
//     console.log("Logged-in User Name:", userName);
//   });
  



  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/reviews/${product._id}`, {
        user: 'nanzu', // Replace with actual logged-in user ID
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
      <button 
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Write a review"}
      </button>

      {/* Review Form */}
      {showForm && (
        <div className="mt-4 border p-4 rounded-md">
          <label className="block font-medium">Rating:</label>
          <select 
            className="border rounded px-2 py-1 w-full"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num} ⭐</option>
            ))}
          </select>

          <label className="block mt-2 font-medium">Comment:</label>
          <textarea
            className="border rounded px-2 py-1 w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
          ></textarea>

          <button 
            className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      )}

      {/* Display Reviews */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border p-4 my-2 rounded">
              <p className="text-sm font-bold">Rating: {review.rating} ⭐</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
