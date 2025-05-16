import React from 'react';

export default function FeatureCard({ image, badge, title, description, className = '' }) {
  return (
    <div className={`relative bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl ${className}`} style={{ minWidth: 280, maxWidth: 340 }}>
      <div className="relative w-full aspect-[4/5] bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" onError={e => { e.target.onerror = null; e.target.src = '/he-styles-preview.png'; }} />
        {badge && (
          <span className="absolute top-4 left-4 bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">{badge}</span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col justify-end">
        <div className="font-bold text-lg mb-1 leading-tight">{title}</div>
        <div className="text-gray-500 text-sm leading-snug">{description}</div>
      </div>
    </div>
  );
} 