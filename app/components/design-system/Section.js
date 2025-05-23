import React from 'react';

export default function Section({ children, className = '' }) {
  return <section className={`w-full max-w-3xl mx-auto px-4 py-8 md:py-12 ${className}`}>{children}</section>;
} 