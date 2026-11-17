import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare } from 'lucide-react';
import BackgroundSlideshow from '@/components/BackgroundSlideshow';
import HotelPhoto from '@/components/HotelPhoto';
import { getPublicHotelData } from '@/lib/store';
import { formatNaira } from '@/lib/hotel-logic';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About Dussel Hotels | Luxury & Serene Hospitality in Owerri',
  description:
    'Learn about Dussel Hotels on MCC Uratta Road, Owerri. Our mission, upscale accommodations, continuous power, Olympic pool, and authentic hospitality in Imo State.',
};

export default function AboutPage() {
  const data = getPublicHotelData();
  const { rooms, slideshows, hotelInfo } = data;
  const activeRooms = rooms.filter((r) => r.available);
  const minRoomPrice =
    activeRooms.length > 0 ? Math.min(...activeRooms.map((r) => r.pricePerNight)) : 30000;
  const maxRoomPrice =
    activeRooms.length > 0 ? Math.max(...activeRooms.map((r) => r.pricePerNight)) : 45000;

  const cleanPhone = hotelInfo.phone.replace(/[^+\d]/g, '');
  const cleanWa = hotelInfo.whatsapp.replace(/\D/g, '');

  const pillars = [
    {
      title: 'Strategic & Serene Location',
      description: `Located in Imo Owerri along ${hotelInfo.address} (${hotelInfo.landmark}). We offer a tranquil, noise-free haven while keeping you minutes away from the Ikenegbu commercial district.`,
    },
    {
      title: 'Continuous 24/7 Power Assurance',
      description:
        'We understand that electricity is the cornerstone of comfort. Our dedicated heavy-duty backup generator system guarantees that your air conditioning, lights, and appliances remain running without pause.',
    },
    {
      title: 'Affordable Luxury Pricing',
      description: `We believe 5-star comfort should be accessible. With rooms starting from ${formatNaira(
        minRoomPrice
      )} up to ${formatNaira(
        maxRoomPrice
      )}+, we provide exceptional value for travelers, business executives, and visiting families.`,
    },
    {
      title: 'Comprehensive Leisure & Dining',
      description:
        'From our standard Olympic-size swimming pool to our on-site restaurant and Great Beer poolside bar serving Ofe Owerri, fresh catfish pepper soup, and chilled drinks, everything is under one roof.',
    },
  ];

  return (
    <div className="relative min-h-screen py-12 sm:py-20">
      {/* Clear visible standard premises slideshow from top to bottom */}
      <BackgroundSlideshow
        slides={slideshows.aboutPage}
        variant="page"
        intervalMs={4600}
        label="About Dussel Premises"
      />

      <div className="relative z-10 space-y-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl bg-[#0B0D13]/72 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-2">
              The Dussel Story &amp; Hospitality Heritage
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
              Modern Upscale Hospitality Centrally Located in Owerri
            </h1>
            <p className="mt-4 text-stone-100 text-base leading-relaxed">
              {hotelInfo.name} was conceived to provide business executives, visitors, and families with a true sanctuary of elegance, comfort, and reliability in Imo State.
            </p>
          </div>
        </div>

        {/* Main Narrative Split */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B0D13]/78 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative h-80 sm:h-[460px] rounded-2xl overflow-hidden border border-white/20 shadow-xl">
              <HotelPhoto
                src="/images/enhanced_hotel_night_facade.jpg"
                alt="Dussel Hotels illuminated night facade architecture"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-stone-100">
                <span className="text-xs font-mono text-[#DFCA97] uppercase block mb-1">
                  {hotelInfo.address}
                </span>
                <p className="text-sm font-serif text-white">
                  Tastefully furnished, upscale lodging in a peaceful, secure compound.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight font-bold">
                A Five-Star Vision with Uncompromising Reliability
              </h2>
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                {hotelInfo.name} is a modern top luxurious, upscale, and tastefully furnished hospitality destination located in Imo Owerri along {hotelInfo.address}, conveniently situated {hotelInfo.landmark.toLowerCase()}.
              </p>
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                When traveling to Owerri, discerning guests require three non-negotiable standards: uninterrupted power, chilled climate control in clean rooms, and peace of mind. We have eliminated uncertainty by investing in an industrial generator power setup, tight physical security with gated access, and attentive 24-hour customer service.
              </p>
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                Beyond restful sleep, our guests enjoy full recreation at our standard Olympic-size swimming pool, lively evening poolside entertainment, and a gourmet dining experience featuring indigenous Imo dishes and quality breakfast options.
              </p>

              <div className="pt-3 flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="px-6 py-3 bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
                >
                  View Rooms &amp; Rates
                </Link>
                <Link
                  href="/location"
                  className="px-6 py-3 bg-[#171922] hover:bg-[#232733] text-white border border-white/20 font-semibold text-xs uppercase tracking-wider rounded-md transition-colors"
                >
                  Visit Hotel Location
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Core Pillars */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B0D13]/75 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-1">
                Our Principles
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                Built Around What Matters Most to You
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-xl bg-[#12151E]/85 border border-white/15 space-y-3"
                >
                  <div className="text-xs font-mono text-[#DFCA97] font-bold">
                    0{idx + 1}. PRINCIPLE
                  </div>
                  <h3 className="text-xl font-serif text-white font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="text-stone-200 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location Details & Quick Contact */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B0D13]/82 backdrop-blur-md border border-white/15 rounded-2xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] block mb-2">
                Physical Location
              </span>
              <h3 className="text-2xl font-serif text-white font-semibold">
                Visit Us in Imo Owerri
              </h3>
              <p className="text-stone-200 text-sm mt-3 leading-relaxed">
                Address: {hotelInfo.address} ({hotelInfo.landmark}).
              </p>
              <div className="mt-4 space-y-1 text-xs text-stone-300">
                <p>• 25–35 minutes from Sam Mbakwe Cargo Airport</p>
                <p>• 5–8 minutes from Wetheral Road / Ikenegbu Roundabout</p>
                <p>• {hotelInfo.openHours}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C5A059] text-[#0D0E11] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#DFCA97] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Hotel Front Desk
              </a>
              <a
                href={`https://wa.me/${cleanWa}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-[#0A1A0F] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#20BE5A] transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                WhatsApp Front Desk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
