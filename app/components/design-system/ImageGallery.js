import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';

export default function ImageGallery({
  images,
  isEditing = false,
  onItemPropChange // (itemIndex, propName, value)
}) {
  const [imageErrorStates, setImageErrorStates] = useState(() => images ? images.map(() => false) : []);
  
  // Reset error states when images array changes
  useEffect(() => {
    if (images) {
      setImageErrorStates(images.map(() => false));
    }
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="text-center py-8 text-gray-500">No images to display in the gallery.</div>;
  }

  const handleImageError = (index) => {
    setImageErrorStates(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const handlePropChange = (index, propName, value) => {
    if (onItemPropChange) {
      onItemPropChange(index, propName, value);
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="p-4 border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Edit Gallery Images:</h4>
          {images.map((img, i) => (
            <div key={`edit-${img.src}-${i}`} className="p-3 border border-gray-200 rounded bg-white shadow-sm mb-3">
              <p className="text-xs text-gray-600 mb-1">Image {i + 1} (Source: {img.src})</p>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Alt Text:</label>
                <input 
                  type="text" 
                  value={img.alt || ''} 
                  onChange={(e) => handlePropChange(i, 'alt', e.target.value)} 
                  placeholder="Enter alt text"
                  className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Caption:</label>
                <textarea
                  value={img.caption || ''}
                  onChange={(e) => handlePropChange(i, 'caption', e.target.value)}
                  rows={2}
                  placeholder="Enter caption"
                  className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs text-gray-900"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Custom grid layout based on number of images for more visual interest
  const getGridLayout = () => {
    const count = images.length;
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 md:grid-cols-2";
    if (count === 3) return "grid-cols-1 md:grid-cols-3";
    if (count === 4) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-2";
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  };

  return (
    <div className={`grid ${getGridLayout()} gap-6 my-8`}>
      {images.map((img, i) => (
        <div 
          key={img.id || img.src + i} 
          className="group relative overflow-hidden rounded-2xl shadow-lg bg-white transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="relative w-full aspect-square">
            {imageErrorStates[i] ? (
              <PlaceholderImage icon="photo" message="Image not available" />
            ) : (
              <Image
                src={img.src || '/he-styles-preview.png'}
                alt={img.alt || img.caption || `Gallery image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onError={() => handleImageError(i)}
              />
            )}
          </div>
          {img.caption && (
            <div className="p-4 bg-white">
              <p className="font-medium text-gray-800">{img.caption}</p>
              {img.subcaption && <p className="text-sm text-gray-600 mt-1">{img.subcaption}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 