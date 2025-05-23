'use client';

import React from 'react';

export default function TextSection({
  title,
  subtitle,
  backgroundColor = 'bg-white',
  textAlign = 'text-center',
  titleSize = 'text-4xl md:text-5xl',
  subtitleSize = 'text-xl',
  className = ''
}) {
  return (
    <div className={`${backgroundColor} py-12 px-6 ${className}`}>
      <div className={`max-w-5xl mx-auto ${textAlign}`}>
        {title && (
          <h2 className={`${titleSize} font-semibold text-gray-900 mb-6 leading-tight tracking-tight`}>
            {title}
          </h2>
        )}
        {subtitle && (
          <p className={`${subtitleSize} text-gray-600 max-w-3xl mx-auto`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
} 