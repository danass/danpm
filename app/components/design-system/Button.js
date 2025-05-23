'use client';

import React from 'react';
import Link from 'next/link';
import { iconMap } from './icon-map'; // Updated import path

/**
 * Airbnb-style Button component.
 * @param {function} [onClick] - The click handler (if not an href link).
 * @param {string} [href] - The URL to link to. If provided, component renders as a Link.
 * @param {React.ReactNode} children - The content inside the button (usually text).
 * @param {string} [className] - Optional additional CSS classes.
 * @param {boolean} [disabled] - Optional disabled state.
 * @param {string} [variant] - 'primary' | 'secondary' | 'ghost'
 * @param {string} [type] - The button type attribute (e.g., 'button', 'submit'). Only used if not an href link.
 * @param {React.ReactNode} [icon] - Direct icon node to render.
 * @param {string} [iconName] - Name of the icon from iconMap.
 * @param {object} [iconProps] - Props for the icon if using iconName.
 * @param {string} [iconPosition] - 'left' or 'right'.
 * @param {boolean} [isEditing] - Flag to enable editing mode.
 * @param {function} [onPropChange] - Callback for when a prop changes.
 * @param {string} [propNameForChildren] - Prop name for children.
 * @param {string} [propNameForHref] - Prop name for href.
 * @param {string} [wrapperClassName] - Optional additional CSS classes for the wrapper.
 * @param {...rest} - Additional props to spread onto the underlying <a> or <button> element.
 */
const Button = ({ 
  onClick, 
  href, 
  children, 
  className = '', 
  disabled = false, 
  variant = 'primary', 
  type = 'button',
  icon: directIcon, // Renamed to avoid clash with derived icon
  iconName,         // Destructure
  iconProps = { className: 'w-5 h-5'}, // Destructure with default
  iconPosition = 'left', // Destructure
  isEditing = false,    // Destructure
  onPropChange,         // Destructure
  propNameForChildren = 'children', // Destructure
  propNameForHref = 'href',       // Destructure
  wrapperClassName, // Destructure this prop
  ...rest
}) => {
  // Utilize our design system classes
  let baseClass = 'btn';
  let variantClass = '';
  
  switch (variant) {
    case 'secondary':
      variantClass = 'btn-secondary';
      break;
    case 'ghost':
      variantClass = 'bg-transparent text-black hover:bg-gray-100';
      break;
    default:
      variantClass = 'btn-primary';
  }

  const combinedClassName = `${baseClass} ${variantClass} ${className}`;

  let iconNode = directIcon;
  if (!iconNode && iconName && iconMap[iconName]) {
    iconNode = React.createElement(iconMap[iconName], iconProps);
  }

  const handleChildrenChange = (e) => {
    if (onPropChange) {
      onPropChange(propNameForChildren, e.target.value);
    }
  };

  const handleHrefChange = (e) => {
    if (onPropChange) {
      onPropChange(propNameForHref, e.target.value);
    }
  };

  if (isEditing) {
    return (
      <div className="p-2 my-2 border border-dashed border-blue-300 bg-blue-50/50 rounded">
        <div className="mb-2">
          <label htmlFor="button-children-editor" className="block text-xs font-medium text-gray-700 mb-1">Edit Button Text:</label>
          <input
            type="text"
            id="button-children-editor"
            value={typeof children === 'string' ? children : ''} // Assuming children is usually a string for a button
            onChange={handleChildrenChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
            placeholder="Enter button text"
          />
        </div>
        <div>
          <label htmlFor="button-href-editor" className="block text-xs font-medium text-gray-700 mb-1">Edit Button Link (href):</label>
          <input
            type="text"
            id="button-href-editor"
            value={href || ''}
            onChange={handleHrefChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
            placeholder="Enter URL (e.g., /about)"
          />
        </div>
      </div>
    );
  }

  const content = (
    <>
      {iconNode && iconPosition === 'left' && <span className={children ? "mr-2" : ""}>{iconNode}</span>}
      {children}
      {iconNode && iconPosition === 'right' && <span className={children ? "ml-2" : ""}>{iconNode}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <a 
          className={`${combinedClassName} ${disabled ? 'pointer-events-none' : ''}`}
          {...rest}
        >
          {content}
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
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button; 