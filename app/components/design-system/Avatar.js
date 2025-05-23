'use client';

import React from 'react';
import Image from './Image';

/**
 * Atomic Avatar component for user/profile images.
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} [size] - 'sm' | 'md' | 'lg' | number (px)
 * @param {string} [className] - Additional CSS classes
 */
const Avatar = ({
  src,
  alt,
  size = 'md',
  className = '',
  ...rest
}) => {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 72
  };
  const px = typeof size === 'number' ? size : sizeMap[size] || sizeMap.md;

  return (
    <div className={`rounded-full shadow-lg border border-gray-200 bg-white flex items-center justify-center overflow-hidden ${className}`.trim()} style={{ width: px, height: px }}>
      <Image
        src={src}
        alt={alt}
        className="object-cover w-full h-full"
        imageProps={{ width: px, height: px }}
        style={{ width: px, height: px }}
        {...rest}
      />
    </div>
  );
};

export default Avatar; 