import React from 'react';
import Image from 'next/image';

interface HotelPhotoProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export default function HotelPhoto({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  className = 'object-cover',
}: HotelPhotoProps) {
  const safeSrc = src?.trim() || '/images/enhanced_hotel_day_exterior.jpg';
  const isLocalNextImage =
    safeSrc.startsWith('/images/') || safeSrc.startsWith('/api/uploads/');

  if (isLocalNextImage) {
    if (fill) {
      return (
        <Image
          src={safeSrc}
          alt={alt}
          fill
          sizes={sizes || '100vw'}
          priority={priority}
          className={className}
          referrerPolicy="no-referrer"
        />
      );
    }
    return (
      <Image
        src={safeSrc}
        alt={alt}
        width={width || 1200}
        height={height || 800}
        sizes={sizes}
        priority={priority}
        className={className}
        referrerPolicy="no-referrer"
      />
    );
  }

  if (fill) {
    return (
      <img
        src={safeSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <img
      src={safeSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}
