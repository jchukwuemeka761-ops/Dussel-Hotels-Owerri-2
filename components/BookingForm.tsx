'use client';

import React, { useState, useId } from 'react';
import { Phone, MessageSquare, CheckCircle, ShieldCheck, Zap, Sparkles, AlertCircle } from 'lucide-react';
import type { HotelInfo, RoomItem } from '@/lib/hotel-types';
import { calculateNights, calculateTotalPrice } from '@/lib/booking';

interface BookingFormProps {
  initialRoomId?: string;
  rooms: RoomItem[];
  hotelInfo?: HotelInfo;
}

export default function BookingForm({ initialRoomId, rooms, hotelInfo }: BookingFormProps) {
  const formId = useId();
  const availableRooms = rooms.filter((r) => r.available);
  const roomList = availableRooms.length > 0 ? availableRooms : rooms;

  const [selectedRoomId, setSelectedRoomId] = useState<string>(() => {
    if (initialRoomId && roomList.some((r) => r.id === initialRoomId)) {
      return initialRoomId;
    }
    return roomList[0]?.id || 'classic-queen';
  });

  const [checkIn, setCheckIn] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const phone = hotelInfo?.phone || '+234 913 476 4393';
  const whatsapp = hotelInfo?.whatsapp || '+234 913 476 4393';
  const cleanPhone = phone.replace(/[^+\d]/g, '');
  const cleanWa = whatsapp.replace(/\D/g, '');

  const nights = calculateNights(checkIn, checkOut);
  const selectedRoom = roomList.find((r) => r.id === selectedRoomId) || roomList[0];
  const totalPrice = selectedRoom ? calculateTotalPrice(selectedRoom.pricePerNight, nights) : 0;

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!guestName.trim() || !guestPhone.trim()) {
      setErrorMsg('Please fill in your full name and phone number to proceed.');
      return;
    }
    if (!selectedRoom) {
      setErrorMsg('Please select a room tier.');
      return;
    }

    const message = encodeURIComponent(
      `Hello Dussel Hotels!\n\n` +
        `I would like to reserve a room with the following details:\n` +
        `• Guest Name: ${guestName.trim()}\n` +
        `• Phone Number: ${guestPhone.trim()}\n` +
        (guestEmail.trim() ? `• Email: ${guestEmail.trim()}\n` : '') +
        `• Room Selected: ${selectedRoom.name}\n` +
        `• Rate: ₦${selectedRoom.pricePerNight.toLocaleString()} / night\n` +
        `• Check-In: ${checkIn}\n` +
        `• Check-Out: ${checkOut} (${nights} night${nights > 1 ? 's' : ''})\n` +
        `• Guests: ${guests}\n` +
        `• Total Estimated: ₦${totalPrice.toLocaleString()}\n` +
        (specialRequests.trim() ? `• Special Requests: ${specialRequests.trim()}\n` : '') +
        `\nPlease confirm availability and payment details. Thank you!`
    );

    const waUrl = `https://wa.me/${cleanWa}?text=${message}`;
    const win = window.open(waUrl, '_blank', 'noopener,noreferrer');
    void win;
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#0D0F15]/82 backdrop-blur-lg border border-white/15 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Direct Hotel Booking Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#F3EFE6]">
          Reserve Your Luxury Stay at {hotelInfo?.name || 'Dussel Hotels'}
        </h2>
        <p className="text-stone-300 text-sm mt-2">
          Transparent live rates with no hidden fees. All bookings include continuous 24/7 backup power, air conditioning, gated security, and access to our Olympic swimming pool.
        </p>
      </div>

      {isSubmitted && selectedRoom ? (
        <div className="bg-[#111C16]/90 border border-emerald-500/40 rounded-xl p-8 text-center space-y-4">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-serif text-[#F3EFE6]">Booking Request Prepared!</h3>
          <p className="text-sm text-stone-200 max-w-lg mx-auto">
            Thank you, <strong className="text-white">{guestName}</strong>. Your reservation request for{' '}
            <strong className="text-[#C5A059]">{selectedRoom.name}</strong> ({nights} night{nights > 1 ? 's' : ''} at{' '}
            <span className="font-mono font-semibold">₦{totalPrice.toLocaleString()}</span>) is ready. Our front desk team will confirm your room immediately.
          </p>
          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] text-[#0D0E11] text-xs font-semibold uppercase rounded-md hover:bg-[#DFCA97] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Front Desk ({phone})
            </a>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="px-4 py-2 text-xs text-stone-200 hover:text-white border border-white/20 rounded-md transition-colors"
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleWhatsAppBooking} className="space-y-8">
          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Step 1: Select Room Tier */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3">
              1. Select Room Tier &amp; Suite Type
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {roomList.map((room) => {
                const isSelected = selectedRoom?.id === room.id;
                return (
                  <button
                    type="button"
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`text-left cursor-pointer rounded-xl p-4 transition-all border ${
                      isSelected
                        ? 'bg-[#1C202B]/95 border-[#C5A059] ring-1 ring-[#C5A059] shadow-lg'
                        : 'bg-[#13161E]/80 border-white/15 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-[#F3EFE6]">{room.name}</h4>
                        <p className="text-xs text-stone-300 mt-1 line-clamp-2">{room.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-base font-bold text-[#C5A059] font-mono tabular-nums">
                          ₦{room.pricePerNight.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-stone-400 block">/ night</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                      {room.features.slice(0, 5).map((feat, idx) => (
                        <span key={idx} className="text-[11px] text-stone-300 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Dates and Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor={`${formId}-checkin`} className="block text-xs font-semibold uppercase tracking-wider text-stone-200 mb-2">
                Check-in Date
              </label>
              <input
                id={`${formId}-checkin`}
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#13161F]/90 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div>
              <label htmlFor={`${formId}-checkout`} className="block text-xs font-semibold uppercase tracking-wider text-stone-200 mb-2">
                Check-out Date
              </label>
              <input
                id={`${formId}-checkout`}
                type="date"
                min={checkIn}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#13161F]/90 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div>
              <label htmlFor={`${formId}-guests`} className="block text-xs font-semibold uppercase tracking-wider text-stone-200 mb-2">
                Number of Guests
              </label>
              <select
                id={`${formId}-guests`}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-[#13161F]/90 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-[#C5A059]"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Guests (Family)</option>
              </select>
            </div>
          </div>

          {/* Step 3: Guest Details */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3">
              2. Guest Contact Information
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-name`} className="sr-only">Full Name</label>
                <input
                  id={`${formId}-name`}
                  type="text"
                  placeholder="Full Name *"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                  className="w-full bg-[#13161F]/90 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <div>
                <label htmlFor={`${formId}-phone`} className="sr-only">Phone Number or WhatsApp</label>
                <input
                  id={`${formId}-phone`}
                  type="tel"
                  placeholder="Phone Number / WhatsApp *"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  required
                  className="w-full bg-[#13161F]/90 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <div>
                <label htmlFor={`${formId}-email`} className="sr-only">Email Address</label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  placeholder="Email Address (Optional)"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full bg-[#13161F]/90 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <div>
                <label htmlFor={`${formId}-requests`} className="sr-only">Special Requests</label>
                <input
                  id={`${formId}-requests`}
                  type="text"
                  placeholder="Special Requests (e.g. Late check-in, Airport pickup)"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#13161F]/90 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          </div>

          {/* Pricing Summary & Direct CTAs */}
          <div className="bg-[#141720]/90 border border-white/15 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-xs text-stone-300">
                Estimated Total for {nights} Night{nights > 1 ? 's' : ''}
              </div>
              <div className="text-2xl sm:text-3xl font-serif text-[#C5A059] font-bold font-mono tabular-nums">
                ₦{totalPrice.toLocaleString()}
              </div>
              <div className="text-xs text-stone-300 mt-1 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#C5A059]" /> 24/7 Power Included
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Pay at Check-in Available
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BE5A] text-[#0A1A0F] font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                Book via WhatsApp Instant
              </button>
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#1F222C] hover:bg-[#292D3B] text-stone-100 border border-white/20 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                Call {phone}
              </a>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
