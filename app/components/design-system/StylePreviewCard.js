import Image from 'next/image';

export default function StylePreviewCard({ styleName, imageUrl, imageAlt }) {
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