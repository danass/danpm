import Image from 'next/image';

export default function ImageGallery({
  images,
  isEditing = false,
  onItemPropChange // (itemIndex, propName, value)
}) {
  if (!images || images.length === 0) {
    return null; // Or some placeholder
  }

  const handlePropChange = (itemIndex, propName, value) => {
    if (onItemPropChange) {
      onItemPropChange(itemIndex, propName, value);
    }
  };

  if (isEditing) {
    return (
      <div className="my-8 p-4 border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Edit Gallery Images:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, i) => (
            <div key={`edit-${img.src}-${i}`} className="p-3 border border-gray-200 rounded bg-white shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Image {i + 1} (Source: {img.src})</p>
              {/* Display image preview */}
              <div className="relative w-full aspect-[4/3] bg-gray-100 rounded overflow-hidden mb-2">
                <Image
                  src={img.src}
                  alt={img.alt || 'Preview'}
                  fill
                  style={{ objectFit: 'cover' }}
                  onError={(e) => { if (e.currentTarget.src !== '/he-styles-preview.png') e.currentTarget.src = '/he-styles-preview.png'; }}
                />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Alt Text:</label>
                <input
                  type="text"
                  value={img.alt || ''}
                  onChange={(e) => handlePropChange(i, 'alt', e.target.value)}
                  placeholder="Enter alt text"
                  className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Caption:</label>
                <textarea
                  value={img.caption || ''}
                  onChange={(e) => handlePropChange(i, 'caption', e.target.value)}
                  rows={2}
                  placeholder="Enter caption"
                  className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs text-gray-900"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
      {images.map((img, i) => (
        <div key={img.id || img.src + i} className="group rounded-lg overflow-hidden shadow-lg bg-white transform transition-all hover:scale-105">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={img.src}
              alt={img.alt || img.caption || `Gallery image ${i + 1}`}
              fill
              style={{ objectFit: 'cover' }} // Or 'contain' based on preference
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={(e) => {
                // Avoid infinite loop if fallback also fails
                if (e.currentTarget.src !== '/he-styles-preview.png') {
                  e.currentTarget.src = '/he-styles-preview.png';
                }
              }}
              className="bg-gray-100"
            />
          </div>
          {img.caption && (
            <div className="p-3">
              <p className="text-xs text-center text-gray-600 truncate group-hover:whitespace-normal">{img.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 