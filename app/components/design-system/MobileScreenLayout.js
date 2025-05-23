'use client';

import Image from 'next/image';
import React from 'react';
import ContentCard from './ContentCard';
import PlaceholderImage from './PlaceholderImage';

export default function MobileScreenLayout({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt = 'Mobile screen preview',
  backgroundColor = 'bg-gray-50'
}) {
  const [imageError, setImageError] = React.useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex flex-col">
      {/* Mobile Device Frame */}
      <div className="relative mx-auto">
        <div className="relative w-[280px] h-[560px] bg-white rounded-[40px] shadow-xl overflow-hidden border-8 border-gray-800">
          {/* Status Bar */}
          <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 flex items-center justify-between px-6">
            <div className="text-white text-xs">9:41</div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-3 bg-white opacity-80 rounded-sm"></div>
              <div className="w-3 h-3 bg-white opacity-80 rounded-full"></div>
              <div className="w-3 h-3 bg-white opacity-80 rounded-full"></div>
            </div>
          </div>
          
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-6 bg-gray-800 rounded-b-xl"></div>
          
          {/* Screen Content */}
          <div className="relative h-full pt-8">
            {imageSrc && !imageError ? (
              <div className="h-full w-full">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  onError={handleImageError}
                />
              </div>
            ) : (
              <div className="h-full w-full">
                <PlaceholderImage 
                  icon="device" 
                  message="Screen preview" 
                  className="h-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text Content using ContentCard component */}
      <ContentCard
        title={title}
        subtitle={subtitle}
        description={description}
        backgroundColor={backgroundColor}
        className="mt-6"
      />
    </div>
  );
} 