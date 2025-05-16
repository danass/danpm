'use client'; // Make it a client component

import Image from 'next/image'; // Import next/image

// Intentionally simplified for debugging 404s, now with more robust check
export default function IconFeatureItem({ icon, title, description, isEditing = false, onPropChange }) {
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

  if (isEditing) {
    return (
      <div className="flex flex-col items-center text-center p-4 md:items-start md:text-left border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg my-2">
        {/* Icon editing is complex, deferring. Display placeholder or current icon info. */}
        <div className="mb-2 text-xs text-gray-500">(Icon not directly editable here)</div>
        {iconDisplay} {/* Show current icon or placeholder */}
        <div className="w-full mb-2">
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Title:</label>
          <input 
            type="text" 
            value={title || ''} 
            onChange={(e) => onPropChange && onPropChange('title', e.target.value)} 
            placeholder="Enter title"
            className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Description:</label>
          <textarea 
            value={description || ''} 
            onChange={(e) => onPropChange && onPropChange('description', e.target.value)} 
            rows={3}
            placeholder="Enter description"
            className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
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