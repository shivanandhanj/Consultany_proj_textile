import {createContext, useContext, useState, useEffect} from "react";
export const AllContext = createContext();
import axios from "axios";

export const ProductProvider=({children})=>{
 const[products,setProducts]=useState([]);
 const [loading, setLoading] = useState(true);
 const[error,setError]=useState();





 useEffect(()=>{

    const fetchProductItems = async () => {
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
    fetchProductItems();
 },[])


    return(
        <AllContext.Provider value={{products}} >{children}</AllContext.Provider>
    );

};