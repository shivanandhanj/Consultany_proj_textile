// src/context/ToastContext.js
import React, { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create context
const ToastContext = createContext();

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Initial state
const initialState = {
  toasts: [],
};

// Actions
const ADD_TOAST = 'ADD_TOAST';
const REMOVE_TOAST = 'REMOVE_TOAST';

// Reducer
const toastReducer = (state, action) => {
  switch (action.type) {
    case ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    default:
      return state;
  }
};

// Provider component
export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  // Add toast
  const addToast = (message, type = TOAST_TYPES.INFO, duration = 5000) => {
    const id = uuidv4();
    
    dispatch({
      type: ADD_TOAST,
      payload: {
        id,
        message,
        type,
        duration,
      },
    });

    // Auto-remove toast after duration
    if (duration) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  // Remove toast
  const removeToast = (id) => {
    dispatch({
      type: REMOVE_TOAST,
      payload: id,
    });
  };

  // Helper functions for specific toast types
  const showSuccess = (message, duration) => addToast(message, TOAST_TYPES.SUCCESS, duration);
  const showError = (message, duration) => addToast(message, TOAST_TYPES.ERROR, duration);
  const showWarning = (message, duration) => addToast(message, TOAST_TYPES.WARNING, duration);
  const showInfo = (message, duration) => addToast(message, TOAST_TYPES.INFO, duration);

  return (
    <ToastContext.Provider
      value={{
        toasts: state.toasts,
        addToast,
        removeToast,
        showSuccess,
        showError, 
        showWarning,
        showInfo,
      }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Custom hook for using toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast component
const Toast = ({ id, message, type, onClose }) => {
  // Define styles for different toast types
  const toastStyles = {
    [TOAST_TYPES.SUCCESS]: 'bg-green-100 border-green-500 text-green-700',
    [TOAST_TYPES.ERROR]: 'bg-red-100 border-red-500 text-red-700',
    [TOAST_TYPES.WARNING]: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    [TOAST_TYPES.INFO]: 'bg-blue-100 border-blue-500 text-blue-700',
  };

  // Define icon for different toast types
  const toastIcons = {
    [TOAST_TYPES.SUCCESS]: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
    ),
    [TOAST_TYPES.ERROR]: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
      </svg>
    ),
    [TOAST_TYPES.WARNING]: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
      </svg>
    ),
    [TOAST_TYPES.INFO]: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd"/>
      </svg>
    ),
  };

  return (
    <div className={`flex items-center rounded-md border-l-4 p-4 shadow-md mb-4 ${toastStyles[type]}`}>
      <div className="mr-3">
        {toastIcons[type]}
      </div>
      <div className="flex-grow">{message}</div>
      <button 
        onClick={() => onClose(id)} 
        className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </button>
    </div>
  );
};

// Toast container
const ToastContainer = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-xs">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};