import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress for faster completion
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.1,
  speed: 300,         // Faster animation
  trickleSpeed: 100,  // Faster trickling
  easing: 'ease'
});

export const PageLoader = () => {
  const location = useLocation();
  const [prevLoc, setPrevLoc] = useState("");
  
  useEffect(() => {
    // Only start progress if location actually changed
    if (prevLoc !== location.pathname) {
      NProgress.start();
    }
    
    setPrevLoc(location.pathname);
    
    // Force completion after a short timeout
    const timer = setTimeout(() => {
      NProgress.done(true); // Force complete
    }, 500);
    
    // Clean up function
    return () => {
      clearTimeout(timer);
      NProgress.done(true); // Force complete on unmount
    };
  }, [location, prevLoc]);
  
  return null;
};