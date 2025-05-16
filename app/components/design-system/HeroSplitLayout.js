'use client';
import React from 'react';

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
  className = '' 
}) {
  const textOrder = imagePosition === 'right' ? 'order-1' : 'order-2';
  const imageOrder = imagePosition === 'right' ? 'order-2' : 'order-1';

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
                {typeof text === 'string' ? <p>{text}</p> : text}
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
              <img 
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                loading="eager" // Eager load for hero images
                onError={e => { e.target.onerror = null; e.target.src = '/he-styles-preview.png'; }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 