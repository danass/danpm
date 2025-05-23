'use client';

import React from 'react';

export default function ContentCard({
  title,
  subtitle,
  description,
  backgroundColor = 'bg-white',
  textAlign = 'text-center',
  className = ''
}) {
  return (
    <div className={`${backgroundColor} px-8 py-10 rounded-2xl ${textAlign} shadow-sm ${className}`}>
      {title && <h3 className="text-xl font-semibold text-gray-900">{title}</h3>}
      {subtitle && <p className="mt-1 text-base text-gray-700">{subtitle}</p>}
      {description && <p className="mt-4 text-sm text-gray-600">{description}</p>}
    </div>
  );
} 