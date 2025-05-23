'use client';
import React, { useState, useEffect } from 'react';
import Button from './Button'; // Assuming Button component is in the same directory or accessible
import Image from 'next/image'; // Added import for Next/Image
import PlaceholderImage from './PlaceholderImage';

// Create a global placeholder component for use throughout the app
export const ImagePlaceholder = ({ className = '', message = 'Image not available' }) => (
  <div className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6 ${className}`}>
    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <p className="text-gray-500 text-sm text-center">{message}</p>
  </div>
);

export default function HeroSplitLayout({ 
  title,
  subtitle,
  text,
  imageSrc,
  imageAlt = 'Presentation image',
  imagePosition = 'right', // 'left' or 'right'
  backgroundColor = 'bg-white',
  textColor = 'text-gray-800',
  titleColor = 'text-black',
  ctaButton, // { text: string, href: string, variant?: string }
  className = '',
  isEditing = false,
  onPropChange // (propPathArray, value)
}) {
  const [imageError, setImageError] = useState(false);

  // Reset error state if image src changes
  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  const textOrder = imagePosition === 'right' ? 'order-1' : 'order-2';
  const imageOrder = imagePosition === 'right' ? 'order-2' : 'order-1';

  const handleFieldChange = (path, value) => {
    if (onPropChange) {
      onPropChange(Array.isArray(path) ? path : [path], value);
    }
  };

  if (isEditing) {
    return (
      <section className={`w-full ${backgroundColor} ${className} p-4 border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg my-2`}>
        <div className="container mx-auto">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Editing Hero Split Layout:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            <div className="space-y-3"> {/* Text editing column */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Title:</label>
                <input type="text" value={title || ''} onChange={(e) => handleFieldChange('title', e.target.value)} className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Subtitle:</label>
                <textarea value={subtitle || ''} onChange={(e) => handleFieldChange('subtitle', e.target.value)} rows={2} className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900" />
              </div>
              {Array.isArray(text) && text.map((paragraph, index) => (
                <div key={`paragraph-${index}`}>
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">Paragraph {index + 1}:</label>
                  <textarea value={paragraph} onChange={(e) => handleFieldChange(['text', index], e.target.value)} rows={3} className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900" />
                </div>
              ))}
              {/* CTA Button Editing */}
              <div className="border-t pt-3 mt-3">
                <p className="text-xs font-medium text-gray-700 mb-1">CTA Button:</p>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">Button Text:</label>
                  <input type="text" value={ctaButton?.text || ''} onChange={(e) => handleFieldChange(['ctaButton', 'text'], e.target.value)} className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900" />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">Button Link (href):</label>
                  <input type="text" value={ctaButton?.href || ''} onChange={(e) => handleFieldChange(['ctaButton', 'href'], e.target.value)} className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900" />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">Button Variant (e.g., primary, secondary):</label>
                  <input type="text" value={ctaButton?.variant || ''} onChange={(e) => handleFieldChange(['ctaButton', 'variant'], e.target.value)} className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900" />
                </div>
              </div>
            </div>
            <div className="space-y-3"> {/* Image editing column */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Image Source URL:</label>
                <input type="text" value={imageSrc || ''} onChange={(e) => { handleFieldChange('imageSrc', e.target.value); }} className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Image Alt Text:</label>
                <input type="text" value={imageAlt || ''} onChange={(e) => handleFieldChange('imageAlt', e.target.value)} className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900" />
              </div>
              <div className="mt-2 w-full aspect-[3/4] bg-gray-200 flex items-center justify-center text-gray-400 text-sm rounded">
                {!imageSrc || imageError ? (
                  <PlaceholderImage className="rounded" />
                ) : (
                  <Image 
                    src={imageSrc}
                    alt="preview"
                    width={300} 
                    height={400}
                    className="object-cover rounded"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Text Content */}
          <div className={`md:w-1/2 ${textOrder} text-center md:text-left`}>
            {title && (
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight ${titleColor}`}>
                {title}
              </h1>
            )}
            {subtitle && (
              <p className={`text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 ${textColor} opacity-90`}>
                {subtitle}
              </p>
            )}
            {text && (
              <div className={`text-base md:text-lg ${textColor} opacity-80 space-y-4`}>
                {Array.isArray(text) ? text.map((p, i) => <p key={i}>{p}</p>) : <p>{text}</p>}
              </div>
            )}
            {ctaButton && ctaButton.text && ctaButton.href && (
              <div className="mt-6 md:mt-8">
                <Button href={ctaButton.href} variant={ctaButton.variant || 'primary'}>
                  {ctaButton.text}
                </Button>
              </div>
            )}
          </div>

          {/* Image Content */}
          <div className={`md:w-1/2 ${imageOrder}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] md:aspect-[5/4] lg:aspect-square mx-auto md:mx-0">
              {!imageSrc || imageError ? (
                <PlaceholderImage icon="photo" message="Featured image" />
              ) : (
                <Image 
                  src={imageSrc}
                  alt={imageAlt || 'Hero image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  onError={() => setImageError(true)}
                />
              )}
              
              {/* Optional decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-black/5 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 