'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import type { SlideItem } from '@/lib/hotel-types';
import HotelPhoto from './HotelPhoto';

interface BackgroundSlideshowProps {
  slides: SlideItem[];
  intervalMs?: number;
  variant?: 'page' | 'section' | 'hero';
  scrimClassName?: string;
  showControls?: boolean;
  label?: string;
  className?: string;
}

export default function BackgroundSlideshow({
  slides,
  intervalMs = 4500,
  variant = 'section',
  scrimClassName,
  showControls = true,
  label,
  className = '',
}: BackgroundSlideshowProps) {
  const validSlides =
    slides && slides.length > 0
      ? slides
      : [
          {
            id: 'fallback-1',
            url: '/images/enhanced_hotel_day_exterior.jpg',
            caption: 'Dussel Hotels — MCC Uratta Road, Owerri',
            subcaption: 'Modern 5-Star Upscale Hospitality',
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = activeIndex % validSlides.length;

  useEffect(() => {
    if (validSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % validSlides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [validSlides.length, intervalMs]);

  const currentSlide = validSlides[safeIndex];

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + validSlides.length) % validSlides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % validSlides.length);
  };

  const defaultScrim =
    variant === 'hero'
      ? 'bg-gradient-to-b from-[#0A0B0F]/45 via-[#0A0B0F]/35 to-[#0A0B0F]/70'
      : variant === 'page'
      ? 'bg-gradient-to-b from-[#0A0B0F]/40 via-[#0A0B0F]/30 to-[#0A0B0F]/55'
      : 'bg-gradient-to-b from-[#0A0B0F]/45 via-[#0A0B0F]/35 to-[#0A0B0F]/60';

  const containerPosition =
    variant === 'page' ? 'fixed inset-0 z-0 pointer-events-none' : 'absolute inset-0 z-0';

  return (
    <>
      <div
        className={`${containerPosition} overflow-hidden select-none ${className}`}
        aria-hidden="true"
        data-testid={`slideshow-${variant}`}
      >
        {validSlides.map((slide, idx) => {
          const isActive = idx === safeIndex;
          return (
            <div
              key={`${slide.id}-${idx}`}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            >
              <HotelPhoto
                src={slide.url}
                alt={slide.caption || 'Dussel Hotels premises'}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center brightness-105 contrast-105 saturate-110"
              />
            </div>
          );
        })}

        {/* Crisp balanced scrim so background photos stay vivid and bright while text remains legible */}
        <div className={`absolute inset-0 ${scrimClassName || defaultScrim}`} />
      </div>

      {/* Interactive caption & slide switcher badge */}
      {showControls && validSlides.length > 0 && (
        <div
          className={
            variant === 'page'
              ? 'hidden md:block absolute top-6 right-6 lg:right-10 z-20 max-w-xs pointer-events-auto'
              : 'hidden sm:block absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20 max-w-xs sm:max-w-sm pointer-events-auto'
          }
        >
          <div className="bg-[#0B0D12]/80 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-2.5 shadow-2xl flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#DFCA97]">
                <Images className="w-3 h-3 shrink-0" />
                <span className="truncate">{label || 'Live Premises Slide'}</span>
                <span className="text-stone-400 font-mono">
                  {safeIndex + 1}/{validSlides.length}
                </span>
              </div>
              <p className="text-xs font-medium text-white truncate mt-0.5">
                {currentSlide.caption}
              </p>
            </div>

            {validSlides.length > 1 && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous background slide"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-[#C5A059] hover:text-[#0D0E11] text-white transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next background slide"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-[#C5A059] hover:text-[#0D0E11] text-white transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
