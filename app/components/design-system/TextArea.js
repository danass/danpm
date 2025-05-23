'use client';

import React from 'react';
import DebugHighlightWrapper from '../dev/DebugHighlightWrapper';

/**
 * Atomic TextArea component for multiline text input.
 * @param {string} id - Textarea id
 * @param {string} [label] - Label text
 * @param {string} [value] - Textarea value
 * @param {function} [onChange] - Change handler
 * @param {string} [placeholder] - Placeholder text
 * @param {string} [error] - Error message
 * @param {string} [className] - Additional CSS classes
 * @param {boolean} [isDebugMode] - Enable debug highlighting
 * @param {string} [debugName] - Name for debug highlighting
 */
const TextArea = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  className = '',
  isDebugMode = false,
  debugName = 'TextArea',
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
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${error ? 'border-red-500' : ''} ${className}`}
        rows={4}
        {...rest}
      />
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </Wrapper>
  );
};

export default TextArea; 