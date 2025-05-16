'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Airbnb-style Button component.
 * @param {function} [onClick] - The click handler (if not an href link).
 * @param {string} [href] - The URL to link to. If provided, component renders as a Link.
 * @param {React.ReactNode} children - The content inside the button (usually text).
 * @param {string} [className] - Optional additional CSS classes.
 * @param {boolean} [disabled] - Optional disabled state.
 * @param {string} [variant] - 'primary' | 'secondary' | 'ghost'
 * @param {string} [type] - The button type attribute (e.g., 'button', 'submit'). Only used if not an href link.
 */
const Button = ({ onClick, href, children, className = '', disabled = false, variant = 'primary', type = 'button' }) => {
  let base =
    'inline-flex items-center justify-center rounded-full px-6 py-2 font-bold text-base shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed';
  let variantClass = '';
  switch (variant) {
    case 'secondary':
      variantClass = 'bg-white text-black border border-gray-300 hover:bg-gray-100';
      break;
    case 'ghost':
      variantClass = 'bg-transparent text-black hover:bg-gray-100';
      break;
    default:
      variantClass = 'bg-black text-white hover:bg-gray-800';
  }

  const combinedClassName = `${base} ${variantClass} ${className}`;

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <a className={`${combinedClassName} ${disabled ? 'pointer-events-none' : ''}`}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

export default Button; 