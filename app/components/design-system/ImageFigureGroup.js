'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import DebugHighlightWrapper from '../dev/DebugHighlightWrapper';
import Paragraph from './Paragraph'; // For captions

export function ImageFigureGroup({ 
  wrapperClassName,
  figures,
  isDebugMode
}) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  if (!figures || figures.length === 0) {
    return (
      <DebugHighlightWrapper componentName="ImageFigureGroup_Empty" isDebugMode={isDebugMode}>
        <Paragraph className="text-gray-500">No figures provided for ImageFigureGroup.</Paragraph>
      </DebugHighlightWrapper>
    );
  }

  const Wrapper = isDebugMode ? DebugHighlightWrapper : React.Fragment;

  return (
    <Wrapper {...(isDebugMode && { componentName: 'ImageFigureGroup' })}>
      <div className={wrapperClassName || 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'}>
        {figures.map((figure, index) => (
          <Wrapper key={figure.id || index} {...(isDebugMode && { componentName: `ImageFigureGroup_Item_${index}` })}>
            <figure className="break-inside-avoid-column space-y-2 group">
              <DebugHighlightWrapper componentName={`ImageFigureGroup_Image_${index}`} isDebugMode={isDebugMode}>
                <div className="aspect-video relative w-full bg-gray-100 rounded-lg overflow-hidden shadow-md">
                  {imageErrors[index] ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Paragraph textColor='text-red-500'>Image failed to load</Paragraph>
                    </div>
                  ) : (
                    <Image
                      src={figure.src || '/placeholder-image.svg'} // Provide a default placeholder
                      alt={figure.alt || 'Figure image'}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:opacity-90 transition-opacity duration-300"
                      onError={() => handleImageError(index)}
                    />
                  )}
                </div>
              </DebugHighlightWrapper>
              {figure.caption && (
                <DebugHighlightWrapper componentName={`ImageFigureGroup_Caption_${index}`} isDebugMode={isDebugMode}>
                  <figcaption className="text-sm text-center text-gray-600 dark:text-gray-400 pt-1">
                    {figure.caption}
                  </figcaption>
                </DebugHighlightWrapper>
              )}
            </figure>
          </Wrapper>
        ))}
      </div>
    </Wrapper>
  );
}

export default ImageFigureGroup; 