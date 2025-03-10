import React, { useState } from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/Home"; // Dashboard or main page after login
import ProductListing from "./pages/ProductDetails"
import Productdeep from "./pages/Productdeep"
import AddProductForm from "./pages/productadd"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Favour from "./pages/Favour" 
import Profile from "./pages/Profile"
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authToken") !== null // Check if token exists
  );

  return (
    
     
    <Routes>
     
      {/* Public Route */}
      <Route
        path="/login"
        element={<Login setIsAuthenticated={setIsAuthenticated} />}
      />

      {/* Protected Route */}
      <Route
        path="/"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/productlist"
        element={isAuthenticated ? <ProductListing/>: <Navigate to="/login"/>}
      
      />
      <Route path="/product/:id" element={<Productdeep />} />
      
      <Route
       path="/productdeep"
       element={isAuthenticated? <Productdeep/>:<Navigate to="/login" />}
      />
      <Route
      path="/add"
      element = {<AddProductForm/>}
      />
       <Route
      path="/cart"
      element = {<Cart/>}
      />
       <Route
      path="/profile"
      element = {<Profile/>}
      />
       <Route
      path="/fav"
      element = {<Favour/>}
      />



      <Route
      path="/checkout"
      element = {<Checkout
        
      />}
      />


      {/* Catch all unmatched routes */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
    </Routes>
    
   
  );
};

export default App;
