'use client';

import React from 'react';
import DebugHighlightWrapper from '../dev/DebugHighlightWrapper';

/**
 * Atomic Label component for form fields.
 * @param {string} htmlFor - The id of the input this label is for
 * @param {string} children - The label text
 * @param {string} [className] - Additional CSS classes
 * @param {boolean} [isDebugMode] - Enable debug highlighting
 * @param {string} [debugName] - Name for debug highlighting
 */
const Label = ({
  htmlFor,
  children,
  className = '',
  isDebugMode = false,
  debugName = 'Label',
  ...rest
}) => {
  const Wrapper = isDebugMode ? DebugHighlightWrapper : React.Fragment;
  const wrapperProps = isDebugMode ? { componentName: debugName } : {};

  return (
    <Wrapper {...wrapperProps}>
      <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`} {...rest}>
        {children}
      </label>
    </Wrapper>
  );
};

export default Label; 