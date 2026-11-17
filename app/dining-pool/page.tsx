import React from 'react';
import Link from 'next/link';
import {
  Waves,
  Utensils,
  Wine,
  Clock,
  Check,
  MessageSquare,
  Phone,
} from 'lucide-react';
import BackgroundSlideshow from '@/components/BackgroundSlideshow';
import HotelPhoto from '@/components/HotelPhoto';
import { getPublicHotelData } from '@/lib/store';
import { formatNaira, groupMenuItemsByCategory } from '@/lib/hotel-logic';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'African Restaurant, Drinks Bar & Olympic Pool | Dussel Hotels Owerri',
  description:
    'Explore live food prices, chilled drinks & cocktail bar menu, and our standard Olympic-size swimming pool at Dussel Hotels on MCC Uratta Road, Owerri.',
};

export default function DiningAndPoolPage() {
  const data = getPublicHotelData();
  const { foodItems, drinkItems, slideshows, hotelInfo } = data;

  const foodGroups = groupMenuItemsByCategory(foodItems);
  const drinkGroups = groupMenuItemsByCategory(drinkItems);

  const cleanPhone = hotelInfo.phone.replace(/[^+\d]/g, '');
  const cleanWa = hotelInfo.whatsapp.replace(/\D/g, '');

  return (
    <div className="relative min-h-screen py-12 sm:py-20">
      {/* Visible Interchanging Pool, Nightlife & Dining Slideshow from top to bottom */}
      <BackgroundSlideshow
        slides={slideshows.diningPoolPage}
        variant="page"
        intervalMs={4200}
        label="Pool, Bar & Dining Views"
      />

      <div className="relative z-10 space-y-16">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl bg-[#0B0D13]/72 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-2">
              Recreation, Kitchen &amp; Great Beer Bar
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
              Olympic Pool, African Kitchen &amp; Cocktail Bar
            </h1>
            <p className="mt-4 text-stone-100 text-base leading-relaxed">
              {hotelInfo.name} offers one of the liveliest recreation and dining atmospheres in Owerri. Swim in our full standard Olympic-size pool, unwind at our illuminated nightlife stage, and enjoy fresh Nigerian delicacies and ice-cold drinks.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#food-menu"
                className="px-4 py-2 rounded-md bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Food Menu &amp; Prices
              </a>
              <a
                href="#drinks-menu"
                className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Drinks &amp; Bar Prices
              </a>
            </div>
          </div>
        </div>

        {/* 1. OLYMPIC SWIMMING POOL FEATURE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B0D13]/80 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-80 sm:h-[460px] w-full">
                <HotelPhoto
                  src="/images/enhanced_pool_wide.jpg"
                  alt="Standard Olympic-size Swimming Pool at Dussel Hotels Owerri"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover brightness-105"
                />
                <div className="absolute top-4 left-4 bg-[#0D0E11]/90 backdrop-blur-md px-3.5 py-1.5 rounded-md text-xs text-[#DFCA97] font-semibold border border-white/15">
                  Dussel Hotels Olympic Pool &amp; Bar
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-2">
                    <Waves className="w-4 h-4" />
                    <span>The Aquatic Center</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                    Standard Olympic-Size Swimming Pool
                  </h2>
                  <p className="text-sm text-stone-200 mt-3 leading-relaxed">
                    Engineered to full standard Olympic dimensions with circular mosaic steps and spacious lounge decks, our pool is ideal for morning laps, afternoon family swims, and illuminated evening relaxation.
                  </p>

                  <div className="mt-6 space-y-3 text-xs text-stone-200">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Complimentary Access:</strong> All in-house lodging guests enjoy unlimited pool access.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Rigorous Filtration:</strong> Automated filtration and daily water hygiene treatment.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Poolside Service:</strong> Order cold drinks, cocktails, and grilled fish right to your deck chair.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    Pool Hours: 7:00 AM – 10:00 PM
                  </span>
                  <Link
                    href="/book"
                    className="px-4 py-2 bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] font-semibold uppercase rounded transition-colors"
                  >
                    Book Stay &amp; Swim
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. NIGHTLIFE & CULINARY EXPERIENCE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B0D13]/80 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between order-2 lg:order-1">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-2">
                    <Utensils className="w-4 h-4" />
                    <span>Nightlife &amp; Kitchen</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                    Authentic African Restaurant &amp; Poolside Stage
                  </h2>
                  <p className="text-sm text-stone-200 mt-3 leading-relaxed">
                    As dusk settles, our poolside transforms into an energetic evening destination with ambient red-and-blue stage lighting, sizzling grills, and chilled drinks from the Great Beer bar.
                  </p>

                  <div className="mt-6 space-y-3 text-xs text-stone-200">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Fresh Local Ingredients:</strong> Sourced daily from trusted markets in Imo State.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">24/7 Room Delivery:</strong> Hot meals and chilled drinks delivered directly to your room.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    24/7 In-House Dining
                  </span>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="px-4 py-2 bg-[#1E222D] hover:bg-[#2A2F3E] text-white border border-white/20 font-semibold uppercase rounded transition-colors"
                  >
                    Order Room Service
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 relative h-80 sm:h-[460px] w-full order-1 lg:order-2">
                <HotelPhoto
                  src="/images/enhanced_pool_night.jpg"
                  alt="Poolside Lounge, Nightlife Music Stage and Bar at Dussel Hotels"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover brightness-105"
                />
                <div className="absolute top-4 right-4 bg-[#0D0E11]/90 backdrop-blur-md px-3.5 py-1.5 rounded-md text-xs text-[#DFCA97] font-semibold border border-white/15">
                  Poolside Nightlife &amp; Live Stage
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. FOOD MENU SECTION (Live Backend Data) */}
        <section id="food-menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B0D13]/80 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-1 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4" />
                  <span>African Kitchen &amp; Breakfast</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                  Food Menu &amp; Live Kitchen Prices
                </h2>
                <p className="text-stone-200 text-sm mt-1">
                  Freshly prepared soups, rice specials, pepper soups, and executive breakfast served hot.
                </p>
              </div>
              <span className="text-xs font-mono text-[#DFCA97] bg-white/5 border border-white/15 px-3 py-1.5 rounded-lg">
                {foodItems.filter((f) => f.available).length} Dishes Available
              </span>
            </div>

            <div className="space-y-10">
              {foodGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-lg font-serif text-[#DFCA97] font-semibold mb-4">
                    {group.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#12151E]/85 border border-white/15 rounded-xl overflow-hidden flex flex-col sm:flex-row"
                      >
                        <div className="relative sm:w-40 h-44 sm:h-auto shrink-0">
                          <HotelPhoto
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 100vw, 160px"
                            className="object-cover brightness-105"
                          />
                        </div>
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm sm:text-base font-semibold text-white">
                                {item.name}
                              </h4>
                              <span className="text-base font-bold font-mono text-[#DFCA97] shrink-0">
                                {formatNaira(item.price)}
                              </span>
                            </div>
                            <p className="text-xs text-stone-200 mt-1.5 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          {item.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[11px] text-[#C5A059] font-medium"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. DRINKS & BAR MENU SECTION (Live Backend Data) */}
        <section id="drinks-menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B0D13]/80 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-1 flex items-center gap-1.5">
                  <Wine className="w-4 h-4" />
                  <span>Great Beer Poolside Bar &amp; Lounge</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                  Drinks, Beers, Wines &amp; Spirits Menu
                </h2>
                <p className="text-stone-200 text-sm mt-1">
                  Chilled beers, signature cocktails, premium spirits, wines, and non-alcoholic refreshments.
                </p>
              </div>
              <span className="text-xs font-mono text-[#DFCA97] bg-white/5 border border-white/15 px-3 py-1.5 rounded-lg">
                {drinkItems.filter((d) => d.available).length} Beverages Available
              </span>
            </div>

            <div className="space-y-10">
              {drinkGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-lg font-serif text-[#DFCA97] font-semibold mb-4">
                    {group.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {group.items.map((drink) => (
                      <div
                        key={drink.id}
                        className="bg-[#12151E]/85 border border-white/15 rounded-xl overflow-hidden flex flex-col justify-between"
                      >
                        <div className="relative h-40 w-full">
                          <HotelPhoto
                            src={drink.image}
                            alt={drink.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover brightness-105"
                          />
                          <div className="absolute top-3 right-3 bg-[#0D0E11]/90 px-2.5 py-1 rounded text-xs font-mono font-bold text-[#DFCA97] border border-white/15">
                            {formatNaira(drink.price)}
                          </div>
                        </div>
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm sm:text-base font-semibold text-white">
                              {drink.name}
                            </h4>
                            <p className="text-xs text-stone-200 mt-1.5 leading-relaxed">
                              {drink.description}
                            </p>
                          </div>
                          {drink.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {drink.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[11px] text-[#C5A059] font-medium"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reservation CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 bg-[#0B0D13]/82 backdrop-blur-md border border-white/15 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <h3 className="text-2xl font-serif text-white font-bold">
                Join Us for a Refreshing Swim, Cold Drinks &amp; Authentic Dinner
              </h3>
              <p className="text-sm text-stone-200 mt-2 max-w-xl">
                Table reservations, poolside VIP lounges, and suite bookings are confirmed instantly with our front desk team.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#C5A059] text-[#0D0E11] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#DFCA97] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call {hotelInfo.phone}
              </a>
              <a
                href={`https://wa.me/${cleanWa}?text=Hello%20Dussel%20Hotels,%20I%20would%20like%20to%20reserve%20a%20table%20or%20inquire%20about%20the%20pool`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-[#0A1A0F] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#20BE5A] transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
