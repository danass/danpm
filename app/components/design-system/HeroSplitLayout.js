'use client';
import React from 'react';
import Button from './Button'; // Assuming Button component is in the same directory or accessible
import Image from 'next/image'; // Added import for Next/Image

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
                <input type="text" value={imageSrc || ''} onChange={(e) => handleFieldChange('imageSrc', e.target.value)} className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Image Alt Text:</label>
                <input type="text" value={imageAlt || ''} onChange={(e) => handleFieldChange('imageAlt', e.target.value)} className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900" />
              </div>
              <div className="mt-2 w-full aspect-[3/4] bg-gray-200 flex items-center justify-center text-gray-400 text-sm rounded">
                <Image 
                  src={imageSrc || '/he-styles-preview.png'} 
                  alt="preview" 
                  width={300} // Provide appropriate width
                  height={400} // Provide appropriate height, maintaining aspect ratio
                  className="w-full h-full object-cover rounded"
                  onError={e => { e.target.onerror = null; e.target.src = '/he-styles-preview.png'; }}
                 />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text Content */}
          <div className={`md:w-1/2 ${textOrder} text-center md:text-left`}>
            {title && (
              <h1 className={`text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight ${titleColor}`}>
                {title}
              </h1>
            )}
            {subtitle && (
              <p className={`text-xl md:text-2xl mb-6 ${textColor} opacity-80`}>
                {subtitle}
              </p>
            )}
            {text && (
              <div className={`text-lg ${textColor} opacity-70 space-y-4`}>
                {Array.isArray(text) ? text.map((p, i) => <p key={i}>{p}</p>) : <p>{text}</p>}
              </div>
            )}
            {ctaButton && ctaButton.text && ctaButton.href && (
              <div className="mt-8">
                <Button href={ctaButton.href} variant={ctaButton.variant || 'primary'}>
                  {ctaButton.text}
                </Button>
              </div>
            )}
          </div>

          {/* Image Content */}
          <div className={`md:w-1/2 ${imageOrder} relative`}>
            <div 
              className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white md:from-transparent md:via-gray-50/10 md:to-transparent z-0"
              style={{
                maskImage: imagePosition === 'right' 
                  ? 'linear-gradient(to left, black 0%, black 70%, transparent 100%)' 
                  : 'linear-gradient(to right, black 0%, black 70%, transparent 100%)',
                WebkitMaskImage: imagePosition === 'right' 
                ? 'linear-gradient(to left, black 0%, black 70%, transparent 100%)' 
                : 'linear-gradient(to right, black 0%, black 70%, transparent 100%)',
              }}
            />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] md:aspect-auto md:h-full z-10">
              <Image 
                src={imageSrc || '/he-styles-preview.png'}
                alt={imageAlt || 'Hero image'}
                layout="fill"
                objectFit="cover"
                priority // Eager load for hero images, equivalent to loading="eager"
                onError={e => { e.target.onerror = null; e.target.src = '/he-styles-preview.png'; }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 