'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageSquare, Menu, X, MapPin, Shield } from 'lucide-react';
import type { HotelInfo } from '@/lib/hotel-types';

interface NavbarProps {
  hotelInfo?: HotelInfo;
}

export default function Navbar({ hotelInfo }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const phone = hotelInfo?.phone || '+234 913 476 4393';
  const whatsapp = hotelInfo?.whatsapp || '+234 913 476 4393';
  const cleanPhone = phone.replace(/[^+\d]/g, '');
  const cleanWa = whatsapp.replace(/\D/g, '');
  const addressShort = hotelInfo?.address || 'MCC Uratta Road (After ABC Workshop), Owerri, Imo State';
  const openHours = hotelInfo?.openHours || 'Open 24/7 Mon – Sun';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rooms & Services', href: '/services' },
    { name: 'Dining & Pool', href: '/dining-pool' },
    { name: 'About', href: '/about' },
    { name: 'Find Hotel', href: '/location' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="relative z-50 bg-[#111319]/95 backdrop-blur-md border-b border-[#262832] text-xs text-[#C5A059] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 truncate">
            <span className="flex items-center gap-1.5 text-stone-200 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="truncate">{addressShort}</span>
            </span>
            <span className="text-stone-500">·</span>
            <span className="text-stone-300 shrink-0">{openHours}</span>
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <a
              href={`tel:${cleanPhone}`}
              className="hover:text-white flex items-center gap-1 text-stone-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              {phone}
            </a>
            <a
              href={`https://wa.me/${cleanWa}?text=Hello%20Dussel%20Hotels,%20I%20would%20like%20to%20inquire%20about%20room%20availability`}
              target="_blank"
              rel="noreferrer"
              className="text-[#C5A059] hover:underline flex items-center gap-1 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Direct
            </a>
            <Link
              href="/admin"
              className="text-stone-300 hover:text-[#C5A059] flex items-center gap-1 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <header className="sticky top-0 z-50 bg-[#0D0E11]/88 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-6">
            {/* Brand wordmark */}
            <Link
              href="/"
              className="text-xl sm:text-2xl font-serif tracking-widest text-[#F3EFE6] hover:text-[#C5A059] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <span className="text-[#C5A059] font-bold">DUSSEL</span> HOTELS
            </Link>

            {/* Navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                      isActive
                        ? 'text-[#C5A059] border-b-2 border-[#C5A059]'
                        : 'text-stone-200 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Primary CTA + Admin Access */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <Link
                href="/admin"
                className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  pathname === '/admin'
                    ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#DFCA97]'
                    : 'bg-white/5 hover:bg-white/10 border-white/15 text-stone-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
                Admin
              </Link>
              <Link
                href="/book"
                className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0D0E11] bg-[#C5A059] hover:bg-[#DFCA97] rounded-md transition-all shadow-sm whitespace-nowrap shrink-0"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/book"
                className="px-3.5 py-1.5 text-xs font-semibold uppercase text-[#0D0E11] bg-[#C5A059] rounded transition-all whitespace-nowrap shrink-0"
              >
                Book
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-200 hover:text-white focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121317]/95 backdrop-blur-md border-b border-white/15 px-5 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-base font-medium ${
                  pathname === link.href ? 'text-[#C5A059]' : 'text-stone-200 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 py-2 text-base font-medium ${
                pathname === '/admin' ? 'text-[#C5A059]' : 'text-stone-200 hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4 text-[#C5A059]" />
              Admin Portal
            </Link>
            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2 text-sm text-stone-200 py-1"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                Call: {phone}
              </a>
              <a
                href={`https://wa.me/${cleanWa}?text=Hello%20Dussel%20Hotels,%20I%20want%20to%20book%20a%20room`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-[#C5A059] py-1"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp: {whatsapp}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
