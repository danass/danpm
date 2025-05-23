'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';

export default function FeatureMobileScreens({ features }) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="w-full py-12">
      {features.map((feature, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <div 
            key={index} 
            className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center py-12 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="w-full md:w-1/2 flex justify-center px-6 md:px-12 mb-8 md:mb-0">
              {/* Mobile Frame */}
              <div className="relative w-[260px] h-[520px] bg-white rounded-[36px] shadow-xl overflow-hidden border-8 border-gray-800">
                {/* Status Bar */}
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 flex items-center justify-between px-5">
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
                <div className="relative h-full pt-8 pb-4">
                  {feature.imageSrc && !imageErrors[index] ? (
                    <div className="h-full w-full overflow-hidden">
                      <Image
                        src={feature.imageSrc}
                        alt={feature.imageAlt || feature.title}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(index)}
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
            
            <div className="w-full md:w-1/2 px-6 md:px-12 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h2>
              <p className="text-base text-gray-600 mb-4">{feature.description}</p>
              {feature.detailText && <p className="text-sm text-gray-500">{feature.detailText}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
} 