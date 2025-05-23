'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';

// New CardGrid component - not overlapping
const CardGrid = ({ cards, isEditing, onPropChange }) => {
  // Maintain a local state for image errors, similar to other components
  const [imageErrors, setImageErrors] = useState(() => cards.map(() => false));

  const handleImageError = (index) => {
    setImageErrors(prevErrors => {
      const newErrors = [...prevErrors];
      newErrors[index] = true;
      return newErrors;
    });
  };

  // Reset error states if cards array changes (e.g. in editing mode)
  React.useEffect(() => {
    setImageErrors(cards.map(() => false));
  }, [cards]);

  if (isEditing) {
    // Simplified editing UI for the new CardGrid structure
    return (
      <div className="p-4 border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg my-2">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Edit CardGrid Items:</h4>
        <div className="space-y-4">
          {cards.map((card, index) => (
            <div key={`edit-card-${index}`} className="p-3 border border-gray-200 rounded bg-white shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Card {index + 1}</p>
              {/* Add input fields for title, description, image URL as needed */}
              <div><label className="text-xs">Title:</label> <input type="text" value={card.title || ''} onChange={(e) => onPropChange(['cards', index, 'title'], e.target.value)} className="w-full p-1 border rounded" /></div>
              <div><label className="text-xs">Description:</label> <textarea value={card.description || ''} onChange={(e) => onPropChange(['cards', index, 'description'], e.target.value)} className="w-full p-1 border rounded" rows={2} /></div>
              <div><label className="text-xs">Image URL:</label> <input type="text" value={card.image || ''} onChange={(e) => onPropChange(['cards', index, 'image'], e.target.value)} className="w-full p-1 border rounded" /></div>
              {card.badge && <div><label className="text-xs">Badge:</label> <input type="text" value={card.badge || ''} onChange={(e) => onPropChange(['cards', index, 'badge'], e.target.value)} className="w-full p-1 border rounded" /></div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return <p>No cards to display.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {cards.map((card, index) => (
        <div key={card.id || index} className="custom-card bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group">
          <div className="custom-card-media relative w-full aspect-[4/3] overflow-hidden">
            {imageErrors[index] || !card.image ? (
              <PlaceholderImage icon="photo" message="Image not available" />
            ) : (
              <Image
                src={card.image} 
                alt={card.title || 'Card image'}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => handleImageError(index)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
          </div>
          <div className="custom-card-content p-5 md:p-6 flex-grow flex flex-col">
            {card.title && (
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {card.title}
              </h3>
            )}
            {card.description && (
              <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-grow">
                {card.description}
              </p>
            )}
            {/* Badge can be re-introduced here if needed, e.g., absolutely positioned or above title */}
            {/* {card.badge && <span className="mt-3 text-xs font-semibold text-blue-500 bg-blue-100 px-2 py-1 rounded-full self-start">{card.badge}</span>} */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardGrid; 