import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null; // Don't render modal if it's closed

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
        <h2 className="text-2xl font-semibold text-gray-800">Are you sure?</h2>
        <p className="text-gray-600 mt-3">Type <b className="text-red-500 font-bold">DELETE</b> to confirm.</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="Type DELETE here..."
          autoFocus
        />
        <div className="flex justify-end mt-6 space-x-3">
          <button
            className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-5 py-2.5 rounded-md text-white font-medium transition-colors ${
              inputValue === "DELETE" ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"
            }`}
            onClick={onConfirm}
            disabled={inputValue !== "DELETE"}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
