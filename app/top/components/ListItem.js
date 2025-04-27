import React from 'react';

/**
 * Renders a single list item with text.
 * @param {string} text - The text content of the item.
 * @param {string} [animationClass] - Optional CSS class for animations.
 */
const ListItem = ({ text, animationClass }) => {
  return (
    <div
      className={`flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm 
                 transition-all duration-200 ease-in-out 
                 hover:bg-gray-100 cursor-grab 
                 ${animationClass || ''}`}
    >
      <span className="font-medium text-gray-800">{text}</span>
    </div>
  );
};

export default ListItem; 