'use client';

import React from 'react';

const Heading = ({
  level = 2, // Default to h2
  children,
  className = '',
  textColor = 'text-gray-900',
  textSize, // e.g., 'text-3xl', 'text-4xl', if not set, will use default for h-tag
  fontWeight = 'font-bold',
  spacing = 'mb-4',
  ...props
}) => {
  const Tag = `h${level}`;

  const defaultTextSizes = {
    1: 'text-5xl md:text-6xl',
    2: 'text-4xl md:text-5xl',
    3: 'text-3xl md:text-4xl',
    4: 'text-2xl md:text-3xl',
    5: 'text-xl md:text-2xl',
    6: 'text-lg md:text-xl',
  };

  const sizeClass = textSize || defaultTextSizes[level] || defaultTextSizes[2];

  return (
    <Tag 
      className={`${sizeClass} ${fontWeight} ${textColor} ${spacing} ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Heading; 