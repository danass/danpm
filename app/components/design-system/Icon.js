'use client';

import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
import DebugHighlightWrapper from '../dev/DebugHighlightWrapper';

/**
 * Atomic Icon component that wraps HeroIcons with consistent styling.
 * @param {string} name - Name of the HeroIcon to use
 * @param {string} [className] - Additional CSS classes
 * @param {string} [color] - Icon color (default: currentColor)
 * @param {string} [size] - Icon size (default: 24)
 * @param {boolean} [isDebugMode] - Enable debug highlighting
 * @param {string} [debugName] - Name for debug highlighting
 * @param {object} [iconProps] - Additional props to pass to the icon
 */
const Icon = ({
  name,
  className = '',
  color = 'currentColor',
  size = 24,
  isDebugMode = false,
  debugName = 'Icon',
  iconProps = {},
  ...rest
}) => {
  const Wrapper = isDebugMode ? DebugHighlightWrapper : React.Fragment;
  const wrapperProps = isDebugMode ? { componentName: debugName } : {};

  // Get the icon component from HeroIcons
  const IconComponent = HeroIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in HeroIcons`);
    return null;
  }

  return (
    <Wrapper {...wrapperProps}>
      <IconComponent
        className={className}
        style={{ color, width: size, height: size }}
        aria-hidden="true"
        {...iconProps}
        {...rest}
      />
    </Wrapper>
  );
};

export default Icon; 