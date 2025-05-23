'use client'; // Make it a client component

import Image from 'next/image'; // Import next/image

// Intentionally simplified for debugging 404s, now with more robust check
export default function IconFeatureItem({ icon, title, description, isEditing = false, onPropChange }) {
  let iconDisplay = null;

  if (icon) {
    iconDisplay = (
      <div className="relative w-10 h-10 text-indigo-600 flex-shrink-0">
        {icon}
      </div>
    );
  } else {
    iconDisplay = (
      <div 
        className="relative w-10 h-10 flex-shrink-0 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-500"
        aria-label={title || 'Icon placeholder'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="flex flex-col p-4 border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg my-2">
        <div className="mb-2 text-xs text-gray-500">(Icon not directly editable here)</div>
        {iconDisplay}
        <div className="w-full mb-2 mt-3">
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
    <div className="flex gap-4 items-start py-2">
      {iconDisplay}
      <div>
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
} 