'use client';
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';

// Sub-component to handle individual image loading and error state
function CarouselImageItem({ image, isActive, priority }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false); // Reset error state if src changes (e.g. in editing mode or dynamic updates)
  }, [image.src]);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {hasError ? (
        <PlaceholderImage icon="photo" message="Image not available" />
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={image.src}
            alt={image.alt || image.caption || `Image`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1024px) 100vw, 896px"
            priority={priority}
            onError={handleError}
            className="z-0"
          />
          
          {/* Caption overlay removed - only showing caption below the carousel */}
        </div>
      )}
    </div>
  );
}

export default function ImageCarousel({
  images,
  className = '',
  isEditing = false,
  onItemPropChange // (itemIndex, propName, value)
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  if (!images || images.length === 0) {
    return <div className="text-center py-8 text-gray-500">No images to display in the carousel.</div>;
  }

  const handleCaptionChange = (slideIndex, value) => {
    if (onItemPropChange) {
      onItemPropChange(slideIndex, 'caption', value);
    }
  };

  const handleAltChange = (slideIndex, value) => {
    if (onItemPropChange) {
      onItemPropChange(slideIndex, 'alt', value);
    }
  };

  if (isEditing) {
    return (
      <div className={`relative w-full max-w-3xl mx-auto ${className} p-4 border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg my-2`}>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Edit Carousel Slides:</h4>
        {images.map((image, index) => (
          <div key={`edit-${image.src}-${index}`} className="mb-4 p-3 border border-gray-200 rounded bg-white shadow-sm">
            <p className="text-xs text-gray-600 mb-1">Slide {index + 1} (Image: {image.src})</p>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-700 mb-0.5">Alt Text:</label>
              <input
                type="text"
                value={image.alt || ''}
                onChange={(e) => handleAltChange(index, e.target.value)}
                placeholder="Enter alt text"
                className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-0.5">Caption:</label>
              <textarea
                value={image.caption || ''}
                onChange={(e) => handleCaptionChange(index, e.target.value)}
                rows={2}
                placeholder="Enter caption"
                className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs text-gray-900"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      <div className="overflow-hidden relative rounded-2xl shadow-xl aspect-[4/3] bg-gray-100">
        {images.map((image, index) => (
          <CarouselImageItem 
            key={image.id || image.src + index} 
            image={image} 
            isActive={index === currentIndex}
            priority={index === 0}
          />
        ))}

        {/* Arrow Container - Centered vertically */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={prevSlide}
              className="carousel-arrow bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="carousel-arrow bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Caption Section - Below the image */}
      {images[currentIndex]?.caption && (
        <div className="mt-4 text-center">
          <h3 className="text-xl font-medium text-gray-800">{images[currentIndex].caption}</h3>
          {images[currentIndex].subcaption && (
            <p className="text-sm text-gray-600 mt-1">{images[currentIndex].subcaption}</p>
          )}
        </div>
      )}

      {/* Pagination Dots - Below image & caption */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((image, index) => (
            <button
              key={`dot-${image.id || index}`}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 