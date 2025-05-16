import Image from 'next/image';

export default function ImageGallery({ images }) {
  if (!images || images.length === 0) {
    return null; // Or some placeholder
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
      {images.map((img, i) => (
        <div key={img.src + i} className="group rounded-lg overflow-hidden shadow-lg bg-white transform transition-all hover:scale-105">
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