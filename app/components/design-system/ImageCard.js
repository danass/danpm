import Image from 'next/image';

export default function ImageCard({ imageSrc, imageAlt, title, subtitle }) {
  return (
    <div className="w-full">
      <div className="relative w-full h-[422px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
} 