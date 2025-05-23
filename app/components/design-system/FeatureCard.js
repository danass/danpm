import React, { useState } from 'react';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';

export default function FeatureCard({ 
  image, 
  badge, 
  title, 
  description, 
  className = '', 
  isEditing = false, 
  onPropChange // This will be a function like (propName, value) => {} specific to this card
}) {
  const [imageError, setImageError] = useState(false);

  const handleChange = (propName, value) => {
    if (onPropChange) {
      onPropChange(propName, value);
    }
  };

  // Reset image error state if image url changes
  React.useEffect(() => {
    setImageError(false);
  }, [image]);

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
            className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs text-gray-900"
          />
        </div>
        {/* Display a placeholder for the image in editing mode? */}
        <div className="mt-2 text-xs text-gray-500">Image: {image}</div>
      </div>
    );
  }

  return (
    <div className={`feature-card ${className}`}>
      <div className="feature-card-image">
        {imageError ? (
          <PlaceholderImage icon="photo" message="Feature image" />
        ) : (
          <Image 
            src={image || '/he-styles-preview.png'} 
            alt={title || 'Feature image'}
            fill
            className="object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
        {badge && (
          <span className="feature-card-badge">
            {badge}
          </span>
        )}
      </div>
      <div className="feature-card-content">
        <h3 className="font-medium text-lg mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      </div>
    </div>
  );
} 