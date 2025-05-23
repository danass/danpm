'use client';

import React from 'react';
import MobileScreenLayout from './MobileScreenLayout';

export default function MobileScreenGrid({ 
  screens, 
  backgroundColor = 'bg-gray-50',
  containerClassName = ''
}) {
  if (!screens || screens.length === 0) {
    return null;
  }

  return (
    <div className={`${backgroundColor} rounded-2xl py-12 my-8 ${containerClassName}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 md:px-10 max-w-7xl mx-auto">
        {screens.map((screen, index) => (
          <div key={index} className="flex flex-col items-center">
            <MobileScreenLayout
              {...screen}
              backgroundColor="bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
} 