'use client';

import React from 'react';

export default function Paragraph({
  children,
  className = '',
  textColor = 'text-gray-700',
  textSize = 'text-base',
  spacing = 'mb-4',
  fontWeight = 'font-normal',
  lineHeight = 'leading-relaxed'
}) {
  return (
    <p className={`${textColor} ${textSize} ${spacing} ${fontWeight} ${lineHeight} max-w-prose ${className}`}>
      {children}
    </p>
  );
} 