import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css"; // Ensure Tailwind or global styles are imported
import { CartProvider } from "./context/CartContext";

import { ProductProvider } from "./context/AllContext";
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

      <ProductProvider>
        <App />
        </ProductProvider>
      </CartProvider>
      </ToastProvider>
      
    </BrowserRouter>
  </React.StrictMode>
);
