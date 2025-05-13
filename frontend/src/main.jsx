import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css"; // Ensure Tailwind or global styles are imported
import { CartProvider } from "./context/CartContext";
import UseCanvasCursor from "./components/Cursor.jsx";
import { ProductProvider } from "./context/AllContext";
import {PageLoader} from "./components/loader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    
      <CartProvider>
      <PageLoader />
     


      <ProductProvider>

        {/* <UseCanvasCursor/> */}
        <App />
      
        </ProductProvider>
      </CartProvider>
     
      
    </BrowserRouter>
  </React.StrictMode>
);
