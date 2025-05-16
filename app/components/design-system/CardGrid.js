import React from 'react';
import FeatureCard from './FeatureCard';

export default function CardGrid({ 
  cards, 
  className = '', 
  isEditing = false,
  onPropChange
}) {
  const basePropPathForCardsArray = ['cards'];

  return (
    <div className={`flex flex-col items-center w-full ${className}`}>
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-0 md:gap-[-48px] w-full max-w-4xl">
        {cards.map((card, i) => (
          <div
            key={card.id || i}
            className={
              `md:-mx-6 md:scale-100 ${
                i === 1
                  ? 'z-20 md:scale-105 md:-translate-y-4'
                  : 'z-10 md:scale-95 md:translate-y-4 opacity-90'
              } transition-all duration-200`
            }
            style={{ flex: 1, minWidth: 0 }}
          >
            <FeatureCard 
              {...card} 
              isEditing={isEditing}
              onPropChange={isEditing ? (propName, value) => {
                if (onPropChange) {
                  onPropChange([...basePropPathForCardsArray, i, propName], value);
                }
              } : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 