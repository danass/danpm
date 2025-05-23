import Image from 'next/image';
import React, { useState } from 'react';
import PlaceholderImage from './PlaceholderImage';

export default function StylePreviewCard({ styleName, imageUrl, imageAlt, isEditing = false, onPropChange }) {
  const [imageError, setImageError] = useState(false);

  const handleChange = (propName, value) => {
    if (onPropChange) {
      onPropChange(propName, value);
    }
  };

  // Reset imageError state if imageUrl changes (relevant for editing mode if URL becomes editable)
  React.useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  if (isEditing) {
    return (
      <div className="bg-blue-50/50 border-2 border-dashed border-blue-300 rounded-lg p-4 my-2">
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Style Name (Title):</label>
          <input 
            type="text" 
            value={styleName || ''} 
            onChange={(e) => handleChange('styleName', e.target.value)} 
            placeholder="Enter style name"
            className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Image Alt Text:</label>
          <input 
            type="text" 
            value={imageAlt || ''} 
            onChange={(e) => handleChange('imageAlt', e.target.value)} 
            placeholder="Enter image alt text"
            className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
        <div className="text-xs text-gray-500">(Image URL: {imageUrl} - not editable here)</div>
        <div className="mt-2 w-full aspect-[4/3] bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          { /* Preview of the image, also with error handling */}
          {imageUrl && !imageError ? (
            <Image 
              src={imageUrl} 
              alt={imageAlt || 'Preview'} 
              fill 
              style={{ objectFit: 'cover' }} 
              onError={() => setImageError(true)} 
            />
          ) : (
            <PlaceholderImage icon="photo" message="Image not available" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group overflow-hidden rounded-xl shadow-sm transition duration-300 hover:shadow-md">
      <div className="relative w-full aspect-[3/2]">
        {imageError ? (
          <PlaceholderImage icon="photo" message="Image not available" />
        ) : (
          <Image 
            src={imageUrl}
            alt={imageAlt || `Preview of ${styleName}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      
      {/* Clean bottom section with style name */}
      <div className="p-4">
        <h3 className="text-base font-medium text-gray-900 group-hover:text-black">{styleName}</h3>
      </div>
    </div>
  );
} 