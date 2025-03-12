import React, { useEffect } from 'react';
import { X } from 'lucide-react';
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    // Prevent scrolling on the body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="bg-white p-6 rounded-lg shadow-xl w-[40%] max-w-[1200px] border border-gray-100 relative z-10">
      <button
  className="absolute -top-4 -right-4 bg-white text-gray-600 hover:text-gray-900 p-2 rounded-full shadow-md transition-colors border border-gray-200"
  onClick={onClose}
  aria-label="Close modal"
>
  <X className="w-5 h-5" />
</button>
        
        {/* Scrollable content area */}
        <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;