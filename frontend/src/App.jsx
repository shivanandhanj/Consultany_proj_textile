import React, { useState } from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/Home"; // Dashboard or main page after login
import ProductListing from "./pages/ProductDetails"
import Productdeep from "./pages/Productdeep"
import AddProductForm from "./pages/productadd"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout1"
import Favour from "./pages/Favour" 
import Profile from "./pages/Profile"
import Pro from "./pages/pro"
import DynamicHeader from './components/Dynamicheader';
import { ToastProvider } from './context/ToastContext';
import Layout from "./components/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Customers from "./pages/admin/Customers";
import Orders from "./pages/admin/Orders";
import Inventory from "./pages/admin/Inventory";
import Payment from "./pages/payment";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authToken") !== null // Check if token exists
  );

  return (
    
    <ToastProvider>
       
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
      element = {<Pro/>}
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
       <Route
      path="/pay"
      element = {<Payment
        
      />}
      />


      {/* Catch all unmatched routes */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />


      <Route path="/admin" element={<Layout />} >
          <Route path="" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>

    </Routes>
    </ToastProvider>




    
   
  );
};

export default App;
