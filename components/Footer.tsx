import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Mail, MapPin, Clock, ShieldCheck, Zap, Shield } from 'lucide-react';
import type { HotelInfo, RoomItem } from '@/lib/hotel-types';

interface FooterProps {
  hotelInfo?: HotelInfo;
  rooms?: RoomItem[];
}

export default function Footer({ hotelInfo, rooms }: FooterProps) {
  const name = hotelInfo?.name || 'Dussel Hotels';
  const tagline =
    hotelInfo?.tagline ||
    'Upscale, tastefully furnished hospitality centrally located in a serene environment along MCC Uratta Road, Owerri. Featuring continuous 24/7 power supply, Olympic swimming pool, and authentic dining.';
  const address = hotelInfo?.address || 'MCC, Uratta Road, Ikenegbu, Owerri 460281, Imo State';
  const landmark = hotelInfo?.landmark || 'After ABC Workshop Uratta';
  const phone = hotelInfo?.phone || '+234 913 476 4393';
  const whatsapp = hotelInfo?.whatsapp || '+234 913 476 4393';
  const email = hotelInfo?.email || 'dusselhotel@gmail.com';
  const openHours = hotelInfo?.openHours || '24 Hours / 7 Days a Week';
  const mapsUrl =
    hotelInfo?.mapsUrl || 'https://www.google.com/maps/place/Dussel+Hotels/@5.4907042,7.0548521,17z';
  const cleanPhone = phone.replace(/[^+\d]/g, '');
  const cleanWa = whatsapp.replace(/\D/g, '');

  const visibleRooms = (rooms || []).filter((r) => r.available).slice(0, 3);

  return (
    <footer className="relative z-20 bg-[#0A0B0E]/92 backdrop-blur-md border-t border-white/15 text-stone-200 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Introduction */}
          <div className="space-y-4">
            <span className="text-2xl font-serif tracking-widest text-[#F3EFE6] block">
              <span className="text-[#C5A059] font-bold">DUSSEL</span> HOTELS
            </span>
            <p className="text-stone-300 text-sm leading-relaxed">{tagline}</p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-stone-300">
              <span className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#C5A059]" /> Uninterrupted Generator Power Backup
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Gated Compound &amp; 24/7 Physical Security
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-stone-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Rooms, Rates &amp; Services
                </Link>
              </li>
              <li>
                <Link href="/dining-pool" className="hover:text-white transition-colors">
                  Food, Drinks &amp; Olympic Pool
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About {name}
                </Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-white transition-colors">
                  Driving Directions &amp; Google Map
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-[#C5A059] hover:underline transition-colors font-medium">
                  Instant Room Reservation
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-stone-300 hover:text-[#C5A059] transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
                  Admin Management Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Room Rates & Amenities */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
              Current Room Rates
            </h4>
            <div className="space-y-3 text-sm text-stone-300">
              {visibleRooms.length > 0 ? (
                visibleRooms.map((rm) => (
                  <div key={rm.id}>
                    <p className="text-stone-100 font-medium">{rm.name}</p>
                    <p className="text-xs text-[#C5A059] font-mono">
                      ₦{rm.pricePerNight.toLocaleString()} / night
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <p className="text-stone-100 font-medium">Standard / Classic Room</p>
                    <p className="text-xs text-[#C5A059]">₦30,000 – ₦35,000 / night</p>
                  </div>
                  <div>
                    <p className="text-stone-100 font-medium">Executive Suite</p>
                    <p className="text-xs text-[#C5A059]">₦40,000 – ₦45,000+ / night</p>
                  </div>
                </>
              )}
              <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs text-stone-300">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Front Desk: {openHours}</span>
              </div>
            </div>
          </div>

          {/* Contact & Physical Address */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
              Contact &amp; Location
            </h4>
            <ul className="space-y-3 text-stone-300 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  {address} ({landmark})
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a
                  href={`https://wa.me/${cleanWa}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#0D0E11] font-semibold bg-[#C5A059] hover:bg-[#DFCA97] px-3.5 py-2 rounded transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                Open Live Google Map
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p>{address} · 24/7 Luxury Lodging</p>
        </div>
      </div>
    </footer>
  );
}
