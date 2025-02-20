import React from 'react';
import { useState, useEffect } from 'react';

const ShineButton = ({ text }) => {
  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      <style jsx="true">{`
        @keyframes shine {
          0% {
            background-position: 0;
          }
          60% {
            background-position:540px;
          }
          100% {
            background-position: 640px;
          }
        }
        
        .btn-shine-tailwind {
          background: linear-gradient(to right, #9f9f9f 0, #fff 10%, #868686 20%);
          background-position: 0;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          animation: shine 5s infinite linear;
          animation-fill-mode: forwards;
        }
      `}</style>
      
      <span 
        className="
          btn-shine-tailwind
          absolute
          top-1/2
          left-1/2
          transform
          -translate-x-1/2
          -translate-y-1/2
          py-3
          px-30
          text-white
         
          whitespace-nowrap
          font-['Poppins',_sans-serif]
          text-4xl md:text-5xl font-bold mb-6
        "
      >
        {text || "Shine Effect"}
      </span>
    </div>
  );
};

export default ShineButton;