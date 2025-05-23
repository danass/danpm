'use client';

import React, { useState } from 'react';
import NextImage from 'next/image';
import DebugHighlightWrapper from '../dev/DebugHighlightWrapper';

/**
 * Atomic Image component with fallback support and loading states.
 * @param {string} src - The image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} [className] - Additional CSS classes
 * @param {string} [fallbackSrc] - Fallback image URL if main image fails to load
 * @param {string} [fallbackAlt] - Alt text for fallback image
 * @param {boolean} [isDebugMode] - Enable debug highlighting
 * @param {string} [debugName] - Name for debug highlighting
 * @param {object} [imageProps] - Additional props to pass to NextImage
 */
const Image = ({
  src,
  alt = 'Image',
  className = '',
  fallbackSrc = '/placeholder-image.png',
  fallbackAlt = 'Placeholder image',
  isDebugMode = false,
  debugName = 'Image',
  imageProps = {},
  ...rest
}) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const Wrapper = isDebugMode ? DebugHighlightWrapper : React.Fragment;
  const wrapperProps = isDebugMode ? { componentName: debugName } : {};

  const DEFAULT_WIDTH = 400;
  const DEFAULT_HEIGHT = 300;

  // Determine width/height from imageProps, props, or fallback to default
  const width = imageProps.width || rest.width || DEFAULT_WIDTH;
  const height = imageProps.height || rest.height || DEFAULT_HEIGHT;

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Wrapper {...wrapperProps}>
      <div className={`relative ${className}`} {...rest}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <NextImage
          src={error ? fallbackSrc : src}
          alt={error ? fallbackAlt : (alt || 'Image')}
          onError={handleError}
          onLoad={handleLoad}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          {...imageProps}
        />
      </div>
    </Wrapper>
  );
};

export default Image; 