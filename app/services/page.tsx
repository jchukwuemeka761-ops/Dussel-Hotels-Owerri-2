import React from 'react';
import Link from 'next/link';
import {
  Check,
  Zap,
  Wind,
  ShieldCheck,
  Waves,
  Utensils,
  Clock,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import BackgroundSlideshow from '@/components/BackgroundSlideshow';
import HotelPhoto from '@/components/HotelPhoto';
import { getPublicHotelData } from '@/lib/store';
import { formatNaira } from '@/lib/hotel-logic';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Rooms & Services | Dussel Hotels Owerri',
  description:
    'Explore live room tiers, pricing, guest services, continuous 24/7 power, and core amenities at Dussel Hotels on MCC Uratta Road, Owerri.',
};

export default function ServicesPage() {
  const data = getPublicHotelData();
  const { rooms, serviceItems, slideshows, hotelInfo } = data;
  const visibleRooms = rooms.filter((r) => r.available);
  const visibleServices = serviceItems.filter((s) => s.available);

  const cleanPhone = hotelInfo.phone.replace(/[^+\d]/g, '');
  const cleanWa = hotelInfo.whatsapp.replace(/\D/g, '');

  const amenities = [
    {
      icon: Zap,
      title: '24/7 Power Supply',
      description:
        'Equipped with heavy-duty backup generators to handle local power outages. Lighting, TV, and sockets remain active day and night.',
    },
    {
      icon: Wind,
      title: 'Climate Control',
      description:
        'Whisper-quiet split-unit air conditioning units installed across all functional lodging rooms.',
    },
    {
      icon: Waves,
      title: 'Olympic-Size Swimming Pool',
      description:
        'Standard size recreation pool with clean treated water, sun loungers, and evening lighting.',
    },
    {
      icon: Utensils,
      title: 'On-Site Restaurant & Bar',
      description:
        'Full-service kitchen serving authentic African delicacies (Ofe Owerri, Egusi, Pepper soup) and breakfast options.',
    },
    {
      icon: ShieldCheck,
      title: 'Gated Physical Security',
      description:
        'Gated parking space with physical security guard presence 24 hours a day.',
    },
    {
      icon: Clock,
      title: '24-Hour Front Desk',
      description:
        'Staffed round the clock for smooth late-night check-ins, wake-up calls, and guest assistance.',
    },
  ];

  return (
    <div className="relative min-h-screen py-12 sm:py-20">
      {/* Visible full-page Room & Premises Slideshow from top to bottom */}
      <BackgroundSlideshow
        slides={slideshows.servicesPage}
        variant="page"
        intervalMs={4400}
        label="Rooms & Suites Preview"
      />

      <div className="relative z-10 space-y-16">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl bg-[#0B0D13]/72 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-2">
              Accommodations &amp; Guest Services
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
              Rooms, Rates &amp; Hospitality Services
            </h1>
            <p className="mt-4 text-stone-100 text-base leading-relaxed">
              {hotelInfo.name} offers modern, upscale, and tastefully furnished rooms strategically located in a serene environment in Imo Owerri. Enjoy uninterrupted power, climate-controlled bedrooms, and transparent service pricing.
            </p>
          </div>
        </div>

        {/* Room Tiers Detailed List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {visibleRooms.map((room, idx) => (
            <div
              key={room.id}
              className="bg-[#0B0D13]/80 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              <div
                className={`lg:col-span-5 relative h-72 lg:h-auto min-h-[290px] ${
                  idx % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <HotelPhoto
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover brightness-105"
                />
                <div className="absolute top-4 left-4 bg-[#0D0E11]/90 backdrop-blur-md px-3 py-1 rounded text-xs text-[#DFCA97] font-semibold border border-white/15">
                  {room.badge}
                </div>
              </div>

              <div
                className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between ${
                  idx % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <h2 className="text-2xl font-serif text-white font-semibold">
                      {room.name}
                    </h2>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-2xl font-bold text-[#DFCA97] font-mono tabular-nums">
                        {room.priceDisplay || formatNaira(room.pricePerNight)}
                      </span>
                      <span className="text-xs text-stone-300"> / per night</span>
                    </div>
                  </div>

                  <p className="text-sm text-stone-200 leading-relaxed mb-6">
                    {room.description}
                  </p>

                  <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-300 mb-3">
                    Key Amenities Included:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-200">
                    {room.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-stone-300">
                    Check-in: {hotelInfo.checkInTime} · Check-out: {hotelInfo.checkOutTime} · 24/7 Power
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://wa.me/${cleanWa}?text=Hello%20Dussel%20Hotels,%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(
                        room.name
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20BE5A] text-[#0A1A0F] font-semibold text-xs uppercase rounded transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      Book via WhatsApp
                    </a>
                    <Link
                      href={`/book?room=${encodeURIComponent(room.id)}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] font-semibold text-xs uppercase rounded transition-colors"
                    >
                      Select Room
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guest Services & Additional Rates (Live from Backend) */}
        <section id="guest-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B0D13]/80 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Concierge, Pool &amp; Add-On Services</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                Hotel Services &amp; Recreation Pricing
              </h2>
              <p className="text-stone-200 text-sm mt-2">
                Transparent rates for swimming pool day passes, VIP lounge reservations, airport transfers, laundry, and extended stays.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleServices.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-[#12151E]/85 border border-white/15 rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full">
                    <HotelPhoto
                      src={srv.image}
                      alt={srv.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover brightness-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#0D0E11]/90 px-2.5 py-1 rounded text-[11px] font-semibold text-[#DFCA97] border border-white/15">
                      {srv.category}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base font-serif font-semibold text-white">
                        {srv.name}
                      </h3>
                      <p className="text-xs text-stone-200 mt-1.5 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex items-baseline justify-between">
                      <span className="text-lg font-bold font-mono text-[#DFCA97]">
                        {formatNaira(srv.price)}
                      </span>
                      <span className="text-xs text-stone-300">{srv.priceUnit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Amenities Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B0D13]/75 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-1">
                Standard Across Every Stay
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                Core Hotel Amenities
              </h2>
              <p className="text-stone-200 text-sm mt-2">
                Every guest at {hotelInfo.name} enjoys these guaranteed amenities, regardless of room tier.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {amenities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 bg-[#131620]/85 border border-white/15 rounded-xl space-y-3"
                  >
                    <Icon className="w-7 h-7 text-[#C5A059]" />
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 bg-[#0B0D13]/82 backdrop-blur-md border border-white/15 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <h3 className="text-xl font-serif text-white font-semibold">
                Have Special Group or Corporate Requirements?
              </h3>
              <p className="text-sm text-stone-200 mt-1">
                Contact our management team directly for block reservations or event accommodation.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`tel:${cleanPhone}`}
                className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] font-semibold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Call {hotelInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
