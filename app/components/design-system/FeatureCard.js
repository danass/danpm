import React from 'react';
import Image from 'next/image';

export default function FeatureCard({ 
  image, 
  badge, 
  title, 
  description, 
  className = '', 
  isEditing = false, 
  onPropChange // This will be a function like (propName, value) => {} specific to this card
}) {

  const handleChange = (propName, value) => {
    if (onPropChange) {
      onPropChange(propName, value);
    }
  };

  if (isEditing) {
    return (
      <div className={`relative bg-blue-50/50 border-2 border-dashed border-blue-300 rounded-3xl shadow-lg overflow-hidden flex flex-col p-4 ${className}`} style={{ minWidth: 280, maxWidth: 340 }}>
        {/* Image URL could be made editable too if needed */}
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Badge Text:</label>
          <input 
            type="text" 
            value={badge || ''} 
            onChange={(e) => handleChange('badge', e.target.value)} 
            placeholder="Enter badge text"
            className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs text-gray-900"
          />
        </div>
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Title:</label>
          <input 
            type="text" 
            value={title || ''} 
            onChange={(e) => handleChange('title', e.target.value)} 
            placeholder="Enter title"
            className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Description:</label>
          <textarea 
            value={description || ''} 
            onChange={(e) => handleChange('description', e.target.value)} 
            rows={3}
            placeholder="Enter description"
            className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
        {/* Display a placeholder for the image in editing mode? */}
        <div className="mt-2 text-xs text-gray-500">Image: {image}</div>
      </div>
    );
  }

  return (
    <div className={`relative bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl ${className}`} style={{ minWidth: 280, maxWidth: 340 }}>
      <div className="relative w-full aspect-[4/5] bg-gray-100">
        <Image 
            src={image || '/he-styles-preview.png'}
            alt={title || 'Feature image'}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
            loading="lazy"
            onError={e => { e.target.onerror = null; e.target.src = '/he-styles-preview.png'; }}
        />
        {badge && (
          <span className="absolute top-4 left-4 bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">{badge}</span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col justify-end">
        <div className="font-bold text-lg mb-1 leading-tight">{title}</div>
        <div className="text-gray-500 text-sm leading-snug">{description}</div>
      </div>
    </div>
  );
} 