import React, { useState, useEffect, useRef } from "react";

const ScrollReveal = ({ children, offset = 200, className = "" }) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const top = ref.current.getBoundingClientRect().top;
        if (top < window.innerHeight - offset) {
          setIsActive(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return (
    <div ref={ref} className={className}>
      {typeof children === "function" ? children(isActive) : children}
    </div>
  );
};

export default ScrollReveal;
