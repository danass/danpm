'use client'; // Make it a client component

import Image from 'next/image'; // Import next/image

// Intentionally simplified for debugging 404s, now with more robust check
export default function IconFeatureItem({ icon, title, description }) {
  let iconDisplay = null;

  if (icon) { // Prioritize direct icon prop (e.g., Heroicon component)
    iconDisplay = (
      <div className="relative w-12 h-12 mb-4 text-gray-700">
        {/* Adjust size/color as needed for direct icon components */}
        {icon}
      </div>
    );
  } else { // Placeholder if no icon or iconSrc is provided
    iconDisplay = (
      <div 
        className="relative w-16 h-16 mb-4 md:w-20 md:h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs"
        aria-label={title || 'Icon placeholder'}
      >
        No Icon
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center p-4 md:items-start md:text-left">
      {iconDisplay}
      <h3 className="text-lg font-semibold text-gray-900 mb-1.5">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
} 