'use client';

import React from 'react';

/**
 * Airbnb-style ListItem component.
 * @param {string} text - The text content of the item.
 * @param {function} [onClick] - Optional click handler.
 * @param {string} [animationClass] - Optional CSS class for animations.
 * @param {React.ReactNode} [icon] - Optional icon to display on the left.
 */
const ListItem = ({ text, onClick, animationClass, icon }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick?.();
    }
  };

  return (
    <div
      className={`flex items-center gap-3 justify-between py-3 px-5 bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-200 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer ${animationClass || ''}`}
      tabIndex={onClick ? 0 : -1}
      role="button"
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      {icon && <span className="text-xl text-gray-400">{icon}</span>}
      <span className="font-medium text-gray-800 flex-1">{text}</span>
    </div>
  );
};

export default ListItem; 