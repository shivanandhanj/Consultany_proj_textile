import React, { useState } from 'react';
import { LogOut, X } from 'lucide-react';

export default function LogoutButton() {
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
     localStorage.removeItem('token');
    window.location.href = '/login';
    setShowModal(false);
    // Example: redirect to login page, clear tokens, etc.
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Logout Button */}
      <button
        onClick={handleLogoutClick}
        className="flex items-center gap-2 px-2 py-2 text-black font-medium  "
      >
        <LogOut className="h-6 w-6 text-gray-600 cursor-pointer" size={18} />
       
      </button>

   

      {/* Modal Overlay */}
      {showModal && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            showModal ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleCancel}
        >
          {/* Blurred Background */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          
          {/* Modal */}
          <div 
            className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${
              showModal ? 'scale-100 translate-y-0' : 'scale-75 translate-y-8'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Confirm Logout</h2>
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <LogOut size={24} className="text-red-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Are you sure you want to logout?</p>
                  <p className="text-gray-600 text-sm mt-1">You'll need to sign in again to access your account.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}