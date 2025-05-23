'use client';

import React from 'react';
import DebugHighlightWrapper from '../dev/DebugHighlightWrapper';

/**
 * Atomic Select component for dropdowns.
 * @param {string} id - Select id
 * @param {string} [label] - Label text
 * @param {Array<{value: string, label: string}>} options - Dropdown options
 * @param {string} [value] - Selected value
 * @param {function} [onChange] - Change handler
 * @param {string} [placeholder] - Placeholder text
 * @param {string} [error] - Error message
 * @param {string} [className] - Additional CSS classes
 * @param {boolean} [isDebugMode] - Enable debug highlighting
 * @param {string} [debugName] - Name for debug highlighting
 */
const Select = ({
  id,
  label,
  options = [],
  value,
  onChange,
  placeholder,
  error,
  className = '',
  isDebugMode = false,
  debugName = 'Select',
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${error ? 'border-red-500' : ''} ${className}`}
        {...rest}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </Wrapper>
  );
};

export default Select; 