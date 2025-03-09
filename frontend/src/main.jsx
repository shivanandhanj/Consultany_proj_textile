import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Ensure Tailwind or global styles are imported
import { CartProvider } from "./context/CartContext";
import {PageLoader} from "./components/loader";
import {ToastProvider} from "./context/ToastContext";
import ToastContainer from './components/ToastContainer';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ToastProvider>
      <CartProvider>
      <PageLoader />
      <ToastContainer />
        <App />
        
      </CartProvider>
      </ToastProvider>
      
    </BrowserRouter>
  </React.StrictMode>
);
