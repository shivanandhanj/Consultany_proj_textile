import {createContext, useContext, useState, useEffect} from "react";
export const AllContext = createContext();
import axios from "axios";

export const ProductProvider=({children})=>{
 const[products,setProducts]=useState([]);
 const [loading, setLoading] = useState(true);
 const[error,setError]=useState();
 const API_URL = import.meta.env.VITE_API_URL; // Use import.meta.env for Vite environment variables
  




 useEffect(()=>{

    const fetchProductItems = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${API_URL}/api/products`);
          setProducts(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch products');
          setLoading(false);
        }
      };
    fetchProductItems();
 },[])


    return(
        <AllContext.Provider value={{products}} >{children}</AllContext.Provider>
    );

};