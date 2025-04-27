import React from 'react';

/**
 * Renders a styled button.
 * @param {function} onClick - The click handler.
 * @param {React.ReactNode} children - The content inside the button (usually text).
 * @param {string} [className] - Optional additional CSS classes.
 * @param {boolean} [disabled] - Optional disabled state.
 */
const Button = ({ onClick, children, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-2 p-2 border rounded text-gray-900 
                 transition-colors duration-150 ease-in-out 
                 hover:bg-gray-100 
                 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed 
                 cursor-pointer 
                 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 