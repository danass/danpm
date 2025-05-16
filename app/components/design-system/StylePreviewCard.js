import Image from 'next/image';

export default function StylePreviewCard({ styleName, imageUrl, imageAlt, isEditing = false, onPropChange }) {
  const handleChange = (propName, value) => {
    if (onPropChange) {
      onPropChange(propName, value);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-blue-50/50 border-2 border-dashed border-blue-300 rounded-lg p-4 my-2">
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Style Name (Title):</label>
          <input 
            type="text" 
            value={styleName || ''} 
            onChange={(e) => handleChange('styleName', e.target.value)} 
            placeholder="Enter style name"
            className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Image Alt Text:</label>
          <input 
            type="text" 
            value={imageAlt || ''} 
            onChange={(e) => handleChange('imageAlt', e.target.value)} 
            placeholder="Enter image alt text"
            className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
        <div className="text-xs text-gray-500">(Image URL: {imageUrl} - not editable here)</div>
        {/* Placeholder for image preview in edit mode if desired */}
        <div className="mt-2 w-full aspect-[4/3] bg-gray-200 flex items-center justify-center text-gray-400 text-sm">(Image Preview)</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <div className="relative w-full aspect-[4/3]">
        <Image 
          src={imageUrl}
          alt={imageAlt || `Preview of ${styleName}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            if (e.currentTarget.src !== '/he-styles-preview.png') {
              e.currentTarget.src = '/he-styles-preview.png';
            }
          }} // Fallback image
        />
      </div>
      <div className="p-4">
        <p className="text-md font-semibold text-gray-800 text-center">{styleName}</p>
      </div>
    </div>
  );
} 