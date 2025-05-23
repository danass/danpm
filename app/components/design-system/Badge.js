'use client';

import React from 'react';

/**
 * Atomic Badge component for status indicators and labels.
 * @param {string} text - The badge text
 * @param {string} [variant] - 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
 * @param {string} [size] - 'sm' | 'md' | 'lg'
 * @param {string} [className] - Additional CSS classes
 */
const Badge = ({
  text,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) => {
  const variantClasses = {
    primary: 'bg-indigo-100 text-indigo-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full shadow ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
      {...rest}
    >
      {text}
    </span>
  );
};

export default Badge; 