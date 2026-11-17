import React from 'react';
import Link from 'next/link';
import {
  Zap,
  ShieldCheck,
  Wind,
  MapPin,
  Phone,
  MessageSquare,
  ArrowRight,
  Check,
  Utensils,
  Wine,
  Waves,
} from 'lucide-react';
import MapDirections from '@/components/MapDirections';
import BackgroundSlideshow from '@/components/BackgroundSlideshow';
import HotelPhoto from '@/components/HotelPhoto';
import { getPublicHotelData } from '@/lib/store';
import { formatNaira } from '@/lib/hotel-logic';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const data = getPublicHotelData();
  const { rooms, foodItems, drinkItems, serviceItems, slideshows, hotelInfo } = data;

  const activeRooms = rooms.filter((r) => r.available);
  const minPrice =
    activeRooms.length > 0
      ? Math.min(...activeRooms.map((r) => r.pricePerNight))
      : 30000;
  const featuredFood = foodItems.filter((f) => f.available).slice(0, 4);
  const featuredDrinks = drinkItems.filter((d) => d.available).slice(0, 4);
  const featuredServices = serviceItems.filter((s) => s.available).slice(0, 4);

  const cleanPhone = hotelInfo.phone.replace(/[^+\d]/g, '');
  const cleanWa = hotelInfo.whatsapp.replace(/\D/g, '');

  const gallerySlides = [
    {
      url: '/images/enhanced_hotel_day_exterior.jpg',
      title: 'Daytime Main Building & Sign',
      subtitle: 'Grand entrance columns & murals',
    },
    {
      url: '/images/enhanced_hotel_night_facade.jpg',
      title: 'Nighttime Illumination',
      subtitle: 'Illuminated facade on MCC Uratta Road',
    },
    {
      url: '/images/enhanced_pool_wide.jpg',
      title: 'Olympic Swimming Pool',
      subtitle: 'Poolside deck & Great Beer bar',
    },
    {
      url: '/images/enhanced_pool_jacuzzi.jpg',
      title: 'Pool Relaxation Deck',
      subtitle: 'Circular mosaic steps & lounge seating',
    },
    {
      url: '/images/enhanced_pool_night.jpg',
      title: 'Nightlife Poolside Stage & Bar',
      subtitle: 'Live music & evening grills by the pool',
    },
    {
      url: '/images/enhanced_hotel_room_bed.jpg',
      title: 'Executive Room Accommodation',
      subtitle: 'Plush king bed & split-unit AC',
    },
    {
      url: '/images/enhanced_hotel_courtyard.jpg',
      title: 'Courtyard & Guest Balconies',
      subtitle: 'Sunflower mural & serene compound',
    },
  ];

  return (
    <div className="relative">
      {/* 1. HERO SECTION — Full-bleed premises slideshow */}
      <section className="relative min-h-[660px] lg:min-h-[760px] flex items-center justify-center overflow-hidden border-b border-white/15">
        <BackgroundSlideshow
          slides={slideshows.homeHero}
          variant="hero"
          intervalMs={4200}
          label="Dussel Hotels Premises"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="max-w-4xl mx-auto rounded-2xl bg-[#0B0D13]/68 backdrop-blur-md border border-white/15 px-6 sm:px-10 py-10 shadow-2xl">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest text-[#DFCA97] mb-4">
              <span>{hotelInfo.address}</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>Upscale 5-Star Hospitality</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>Continuous 24/7 Power</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-bold max-w-4xl mx-auto tracking-tight leading-tight drop-shadow">
              Affordable Luxury &amp; Serene Comfort in Owerri
            </h1>

            <p className="mt-5 text-base sm:text-lg text-stone-100 max-w-2xl mx-auto leading-relaxed">
              {hotelInfo.tagline}
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-lg whitespace-nowrap"
              >
                Book a Room (From {formatNaira(minPrice)})
              </Link>
              <Link
                href="/location"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#12151E]/90 hover:bg-[#1E2332] text-white border border-white/25 font-semibold text-xs uppercase tracking-wider rounded-md transition-all whitespace-nowrap flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                Driving Directions &amp; Map
              </Link>
            </div>
          </div>

          {/* Key Quick Fact Strip */}
          <div className="mt-10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-[#0D0F16]/75 backdrop-blur-md border border-white/15">
              <span className="text-xs text-[#DFCA97] font-mono font-semibold block">Continuous Power</span>
              <p className="text-xs text-stone-200 mt-0.5">Heavy-duty backup generator</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D0F16]/75 backdrop-blur-md border border-white/15">
              <span className="text-xs text-[#DFCA97] font-mono font-semibold block">Olympic Pool</span>
              <p className="text-xs text-stone-200 mt-0.5">Standard size recreation pool</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D0F16]/75 backdrop-blur-md border border-white/15">
              <span className="text-xs text-[#DFCA97] font-mono font-semibold block">African Cuisine</span>
              <p className="text-xs text-stone-200 mt-0.5">Restaurant, grills &amp; bar</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D0F16]/75 backdrop-blur-md border border-white/15">
              <span className="text-xs text-[#DFCA97] font-mono font-semibold block">24/7 Security</span>
              <p className="text-xs text-stone-200 mt-0.5">Gated perimeter &amp; guards</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ROOMS & SUITES OVERVIEW — Live room photos slideshow behind */}
      <section className="relative py-20 lg:py-24 overflow-hidden border-b border-white/15">
        <BackgroundSlideshow
          slides={slideshows.homeRooms}
          variant="section"
          intervalMs={4800}
          label="Rooms & Suites"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B0D13]/72 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 shadow-2xl">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-1">
                Accommodations &amp; Live Rates
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif text-white font-bold">
                Tastefully Furnished Rooms &amp; Suites
              </h2>
              <p className="text-stone-200 text-sm mt-2 max-w-xl">
                Competitive mid-tier rates for Owerri without compromising on luxury, crisp cleanliness, 24/7 power, or quiet air conditioning.
              </p>
            </div>
            <Link
              href="/services"
              className="px-5 py-2.5 rounded-md bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
            >
              <span>View All Rooms &amp; Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeRooms.slice(0, 4).map((room) => (
              <div
                key={room.id}
                className="bg-[#0D0F16]/80 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden flex flex-col group hover:border-[#C5A059]/70 transition-all shadow-2xl"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <HotelPhoto
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#0D0E11]/90 backdrop-blur-md px-3 py-1 rounded text-xs text-[#DFCA97] font-semibold border border-white/15">
                    {room.badge}
                  </div>
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif text-white font-semibold">{room.name}</h3>
                    <p className="text-stone-200 text-sm mt-2 leading-relaxed">
                      {room.description}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-stone-200">
                      {room.features.slice(0, 4).map((feat, fIdx) => (
                        <span key={fIdx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-stone-300 block">Nightly Rate</span>
                      <span className="text-lg font-bold text-[#DFCA97] font-mono tabular-nums">
                        {room.priceDisplay || formatNaira(room.pricePerNight)}
                      </span>
                      <span className="text-xs text-stone-300"> / night</span>
                    </div>
                    <Link
                      href={`/book?room=${encodeURIComponent(room.id)}`}
                      className="px-4 py-2 bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] rounded text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Reserve Room
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OLYMPIC-SIZE SWIMMING POOL — Pool & Jacuzzi slideshow behind */}
      <section className="relative py-20 lg:py-24 overflow-hidden border-b border-white/15">
        <BackgroundSlideshow
          slides={slideshows.homePool}
          variant="section"
          intervalMs={4500}
          label="Olympic Pool & Deck"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <HotelPhoto
                src="/images/enhanced_pool_wide.jpg"
                alt="Standard size Olympic swimming pool and Great Beer bar at Dussel Hotels Owerri"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#0B0D13]/85 backdrop-blur-md p-3.5 rounded-lg border border-white/15 text-xs text-stone-200 flex items-center justify-between">
                <span className="font-semibold text-[#DFCA97] flex items-center gap-1.5">
                  <Waves className="w-4 h-4" />
                  Standard Olympic Size Swimming Pool
                </span>
                <span className="text-stone-300">Complimentary for Lodging Guests</span>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#0B0D13]/75 backdrop-blur-md border border-white/15 rounded-2xl p-7 sm:p-10 space-y-6 shadow-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97]">
                Recreation &amp; Leisure
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight font-bold">
                Standard Olympic-Size Swimming Pool &amp; Jacuzzi Deck
              </h2>
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                Take a refreshing dip or unwind by the poolside deck after a journey or busy day in Owerri. Our standard Olympic-size swimming pool features crystal-clear treated water, circular mosaic steps, poolside loungers, and evening lighting.
              </p>
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C5A059]/20 text-[#DFCA97] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200">
                    <strong className="text-white">Crystal Clear Treated Water:</strong> Maintained under strict hygiene and safety standards daily.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C5A059]/20 text-[#DFCA97] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200">
                    <strong className="text-white">Great Beer Poolside Bar:</strong> Order chilled drinks, cocktails, and freshly grilled dishes directly to your deck chair.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/dining-pool"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Explore Pool, Food &amp; Drinks Menu
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DINING, DRINKS & NIGHTLIFE SPOTLIGHT — Nightlife & Bar slideshow behind */}
      <section className="relative py-20 lg:py-24 overflow-hidden border-b border-white/15">
        <BackgroundSlideshow
          slides={slideshows.homeDining}
          variant="section"
          intervalMs={4300}
          label="Dining & Nightlife"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="bg-[#0B0D13]/75 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 shadow-2xl">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-1">
                African Kitchen, Great Beer Bar &amp; Nightlife
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif text-white font-bold">
                Authentic Food, Drinks &amp; Poolside Nightlife
              </h2>
              <p className="text-stone-200 text-sm mt-2 max-w-2xl">
                Enjoy authentic Ofe Owerri, fresh catfish pepper soup, spicy Nkwobi, and ice-cold beverages beside our illuminated poolside music stage.
              </p>
            </div>
            <Link
              href="/dining-pool"
              className="px-5 py-2.5 rounded-md bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
            >
              Full Food &amp; Drinks Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Live Food Highlights */}
            <div className="bg-[#0B0D13]/78 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
                <h3 className="text-xl font-serif text-white font-semibold flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#C5A059]" />
                  Kitchen &amp; Food Menu
                </h3>
                <Link href="/dining-pool#food-menu" className="text-xs text-[#DFCA97] hover:underline">
                  See all dishes →
                </Link>
              </div>
              <div className="space-y-4">
                {featuredFood.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                      <p className="text-xs text-stone-300 mt-0.5 line-clamp-2">{item.description}</p>
                    </div>
                    <span className="text-sm font-bold font-mono text-[#DFCA97] shrink-0">
                      {formatNaira(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Drinks Highlights */}
            <div className="bg-[#0B0D13]/78 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
                <h3 className="text-xl font-serif text-white font-semibold flex items-center gap-2">
                  <Wine className="w-5 h-5 text-[#C5A059]" />
                  Drinks, Beer &amp; Lounge Bar
                </h3>
                <Link href="/dining-pool#drinks-menu" className="text-xs text-[#DFCA97] hover:underline">
                  See full bar menu →
                </Link>
              </div>
              <div className="space-y-4">
                {featuredDrinks.map((drink) => (
                  <div key={drink.id} className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{drink.name}</h4>
                      <p className="text-xs text-stone-300 mt-0.5 line-clamp-2">{drink.description}</p>
                    </div>
                    <span className="text-sm font-bold font-mono text-[#DFCA97] shrink-0">
                      {formatNaira(drink.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE DUSSEL & SERVICES PRICING — Night & Courtyard slideshow behind */}
      <section className="relative py-20 lg:py-24 overflow-hidden border-b border-white/15">
        <BackgroundSlideshow
          slides={slideshows.aboutPage}
          variant="section"
          intervalMs={5000}
          label="Hotel Grounds & Services"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto bg-[#0B0D13]/72 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-1">
              Guaranteed Guest Comfort
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
              Why Guests Choose {hotelInfo.name}
            </h2>
            <p className="text-stone-200 text-sm mt-2">
              Built on dependable essentials and transparent service rates so your stay in Owerri is seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#0D0F16]/80 backdrop-blur-md border border-white/15 shadow-xl">
              <Zap className="w-8 h-8 text-[#C5A059] mb-4" />
              <h3 className="text-base font-semibold text-white">Continuous 24/7 Power</h3>
              <p className="text-xs text-stone-200 mt-2 leading-relaxed">
                Heavy-duty backup generator setup keeping your room lighting, devices, and air conditioning running nonstop.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0D0F16]/80 backdrop-blur-md border border-white/15 shadow-xl">
              <Wind className="w-8 h-8 text-[#C5A059] mb-4" />
              <h3 className="text-base font-semibold text-white">Individual Climate Control</h3>
              <p className="text-xs text-stone-200 mt-2 leading-relaxed">
                Modern split-unit air conditioning installed in all functional lodging rooms for total comfort.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0D0F16]/80 backdrop-blur-md border border-white/15 shadow-xl">
              <ShieldCheck className="w-8 h-8 text-[#C5A059] mb-4" />
              <h3 className="text-base font-semibold text-white">Gated Perimeter &amp; Security</h3>
              <p className="text-xs text-stone-200 mt-2 leading-relaxed">
                Secure gated parking space with physical security guard presence around the clock.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0D0F16]/80 backdrop-blur-md border border-white/15 shadow-xl">
              <MapPin className="w-8 h-8 text-[#C5A059] mb-4" />
              <h3 className="text-base font-semibold text-white">Central, Serene Location</h3>
              <p className="text-xs text-stone-200 mt-2 leading-relaxed">
                Peacefully located along {hotelInfo.address} ({hotelInfo.landmark}).
              </p>
            </div>
          </div>

          {/* Guest Services & Add-On Pricing Strip */}
          {featuredServices.length > 0 && (
            <div className="bg-[#0B0D13]/78 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97]">
                    Hospitality Services
                  </span>
                  <h3 className="text-xl font-serif text-white font-semibold">
                    Recreation, VIP Lounge &amp; Guest Service Rates
                  </h3>
                </div>
                <Link href="/services#guest-services" className="text-xs text-[#DFCA97] hover:underline font-semibold">
                  View all service rates →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredServices.map((srv) => (
                  <div key={srv.id} className="p-4 rounded-xl bg-[#141722]/85 border border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-[#C5A059] block">
                      {srv.category}
                    </span>
                    <h4 className="text-sm font-semibold text-white mt-1">{srv.name}</h4>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-base font-bold font-mono text-[#DFCA97]">
                        {formatNaira(srv.price)}
                      </span>
                      <span className="text-[11px] text-stone-300">{srv.priceUnit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. AUTHENTIC ENHANCED HOTEL PHOTO GALLERY */}
      <section className="relative py-20 lg:py-24 overflow-hidden border-b border-white/15">
        <BackgroundSlideshow
          slides={slideshows.diningPoolPage}
          variant="section"
          intervalMs={4600}
          label="Authentic Hotel Views"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 bg-[#0B0D13]/72 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-1">
              Enhanced Real Premises Photography
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
              Real Photos of {hotelInfo.name}
            </h2>
            <p className="text-stone-200 text-sm mt-2">
              Genuine sharpened photographs of our premises, rooms, Olympic swimming pool, and nightlife bar on MCC Uratta Road.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallerySlides.map((photo, idx) => (
              <div
                key={idx}
                className="group relative h-64 sm:h-72 rounded-xl overflow-hidden border border-white/20 bg-[#12141A] shadow-2xl"
              >
                <HotelPhoto
                  src={photo.url}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-105 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11]/85 via-transparent to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4">
                  <span className="text-xs font-semibold text-white block">{photo.title}</span>
                  <span className="text-[11px] text-[#DFCA97]">{photo.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GOOGLE MAPS & DIRECT CONTACT — Exterior slideshow behind */}
      <section className="relative py-20 overflow-hidden">
        <BackgroundSlideshow
          slides={slideshows.locationPage}
          variant="section"
          intervalMs={5200}
          label="MCC Uratta Road Landmark"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <MapDirections hotelInfo={hotelInfo} />

          <div className="bg-[#0B0D13]/82 backdrop-blur-md border border-white/15 rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97]">
                Direct Reservations &amp; Inquiries
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white">
                Planning Your Visit to Owerri?
              </h2>
              <p className="text-stone-200 text-sm max-w-xl">
                Contact our 24-hour front desk directly for instant room confirmation, group rates, or poolside event tables.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call {hotelInfo.phone}
              </a>
              <a
                href={`https://wa.me/${cleanWa}?text=Hello%20Dussel%20Hotels,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#25D366] hover:bg-[#20BE5A] text-[#0A1A0F] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
