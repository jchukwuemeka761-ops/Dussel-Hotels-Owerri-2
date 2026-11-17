import React from 'react';
import { Phone, Compass } from 'lucide-react';
import MapDirections from '@/components/MapDirections';
import BackgroundSlideshow from '@/components/BackgroundSlideshow';
import { getPublicHotelData } from '@/lib/store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Google Maps Location & Driving Directions | Dussel Hotels Owerri',
  description:
    'Find Dussel Hotels on Google Maps. Detailed driving directions to MCC Uratta Road, after ABC Workshop Uratta, Ikenegbu, Owerri 460281, Imo State.',
};

export default function LocationPage() {
  const data = getPublicHotelData();
  const { slideshows, hotelInfo } = data;
  const cleanPhone = hotelInfo.phone.replace(/[^+\d]/g, '');

  const landmarks = [
    {
      name: 'ABC Workshop Uratta',
      distance: 'Adjacent (150 meters)',
      time: '1 min',
      tip: `The immediate physical landmark on MCC Uratta road. ${hotelInfo.name} is located directly after this workshop.`,
    },
    {
      name: 'Wetheral Road / Ikenegbu Junction',
      distance: '2.5 km',
      time: '6–8 mins',
      tip: 'Direct straight route down MCC Road from the vibrant Ikenegbu commercial axis.',
    },
    {
      name: 'Chukwuma Nwoha Intersection',
      distance: '1.2 km',
      time: '3–4 mins',
      tip: 'Major crossroads connecting Egbu road to MCC Uratta road.',
    },
    {
      name: 'Sam Mbakwe Cargo Airport Owerri',
      distance: '22 km',
      time: '25–35 mins',
      tip: 'Via Owerri-Aba Expressway and Aba Road / MCC connection. Fast and smooth paved route.',
    },
    {
      name: 'Control Post / Assumpta Roundabout',
      distance: '7 km',
      time: '15–20 mins',
      tip: 'Connect through Wetheral Road straight into MCC Uratta Road.',
    },
    {
      name: 'Dan Anyiam Stadium / Wetheral Axis',
      distance: '4.5 km',
      time: '10–12 mins',
      tip: 'Central sports & commercial zone within quick driving reach.',
    },
  ];

  return (
    <div className="relative min-h-screen py-12 sm:py-20">
      {/* Visible Day & Night Facade Slideshow behind Find Hotel page */}
      <BackgroundSlideshow
        slides={slideshows.locationPage}
        variant="page"
        intervalMs={4500}
        label="Hotel Exterior & Landmarks"
      />

      <div className="relative z-10 space-y-14">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl bg-[#0B0D13]/72 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA97] mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>Turn-by-Turn GPS Navigation</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
              Find &amp; Drive Directly to {hotelInfo.name}
            </h1>
            <p className="mt-4 text-stone-100 text-base leading-relaxed">
              Never get lost or delayed. Use our live interactive Google Maps finder, GPS coordinates, and local driving landmark directions to drive straight to our gated entrance on {hotelInfo.address}.
            </p>
          </div>
        </div>

        {/* Main Map & Interactive Route Finder */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MapDirections fullPage={true} hotelInfo={hotelInfo} />
        </div>

        {/* Local Landmarks & Distances Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B0D13]/80 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="max-w-2xl mb-8">
              <h2 className="text-2xl font-serif text-white font-semibold">
                Key Owerri Landmarks &amp; Driving Times
              </h2>
              <p className="text-stone-200 text-sm mt-1">
                Estimated drive times under normal traffic conditions in Owerri, Imo State.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {landmarks.map((landmark, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#12151E]/85 border border-white/15 rounded-xl space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white">{landmark.name}</h3>
                    <span className="text-[11px] font-mono text-[#DFCA97] bg-white/10 px-2 py-0.5 rounded shrink-0">
                      {landmark.time}
                    </span>
                  </div>
                  <div className="text-xs text-stone-300 font-mono">
                    Distance: {landmark.distance}
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed pt-1 border-t border-white/10">
                    {landmark.tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* On-Road Assistance Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 bg-[#0B0D13]/82 backdrop-blur-md border border-white/15 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#222533] text-[#C5A059] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-white font-semibold">
                  Need Driving Assistance Right Now?
                </h3>
                <p className="text-xs text-stone-200 mt-0.5">
                  Our 24-hour reception desk is on standby to guide you or your driver directly to our gate.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`tel:${cleanPhone}`}
                className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
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
