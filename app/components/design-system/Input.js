'use client';

import React from 'react';
import DebugHighlightWrapper from '../dev/DebugHighlightWrapper';

/**
 * Atomic Input component for form fields.
 * @param {string} id - Input id
 * @param {string} [label] - Label text
 * @param {string} [type] - Input type
 * @param {string} [value] - Input value
 * @param {function} [onChange] - Change handler
 * @param {string} [placeholder] - Placeholder text
 * @param {string} [error] - Error message
 * @param {string} [className] - Additional CSS classes
 * @param {boolean} [isDebugMode] - Enable debug highlighting
 * @param {string} [debugName] - Name for debug highlighting
 */
const Input = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  className = '',
  isDebugMode = false,
  debugName = 'Input',
  ...rest
}) => {
  const Wrapper = isDebugMode ? DebugHighlightWrapper : React.Fragment;
  const wrapperProps = isDebugMode ? { componentName: debugName } : {};

  return (
    <Wrapper {...wrapperProps}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${error ? 'border-red-500' : ''} ${className}`}
        {...rest}
      />
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </Wrapper>
  );
};

export default Input; 