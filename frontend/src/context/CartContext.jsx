import { createContext, useContext, useState,useEffect} from "react";
export const CartContext = createContext();
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId,setUserId]=useState();
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
        
        if (!decoded.userId) {
            console.error("User ID not found in token");
            return null;
        }
        setUserId(decoded.userId)
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
    const response = await axios.get(`${API_URL}/cart/${userId}`);
    setCartItems(response.data);
    setError(null);
  } catch (err) {
    setError('Failed to fetch cart items');
  } finally {
    setLoading(false);
  }
};


  return (
    <CartContext.Provider value={{ cartItems, setCartItems ,loading,userId}}>
      {children}
    </CartContext.Provider>
  );
};
