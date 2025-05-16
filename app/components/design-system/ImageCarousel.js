'use client';
import React, { useState, useCallback } from 'react';
import Image from 'next/image';

export default function ImageCarousel({ images, className = '' }) {
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

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      <div className="overflow-hidden relative rounded-2xl shadow-xl aspect-[16/10] bg-gray-100">
        {images.map((image, index) => (
          <div
            key={image.src + index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image 
              src={image.src}
              alt={image.alt || image.caption || `Image ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1024px) 100vw, 896px"
              priority={index === 0}
              onError={(e) => {
                if (e.currentTarget.src !== '/he-styles-preview.png') {
                  e.currentTarget.src = '/he-styles-preview.png';
                }
              }}
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-3 text-center">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-md transition focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-md transition focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-black/80' : 'bg-black/30 hover:bg-black/50'}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
} 