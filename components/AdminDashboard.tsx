'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Save,
  Plus,
  Trash2,
  Upload,
  BedDouble,
  Utensils,
  Wine,
  Sparkles,
  Images,
  Settings,
  KeyRound,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  ExternalLink,
} from 'lucide-react';
import type {
  MenuItem,
  PublicHotelData,
  RoomItem,
  ServiceItem,
  SlideGroupKey,
} from '@/lib/hotel-types';
import { formatNaira, SLIDE_GROUP_KEYS, SLIDE_GROUP_LABELS } from '@/lib/hotel-logic';
import HotelPhoto from './HotelPhoto';

type AdminTab =
  | 'rooms'
  | 'food'
  | 'drinks'
  | 'services'
  | 'slideshows'
  | 'settings';

const PREMISES_LIBRARY = [
  { label: 'Night Illuminated Facade', url: '/images/enhanced_hotel_night_facade.jpg' },
  { label: 'Daytime Grand Entrance', url: '/images/enhanced_hotel_day_exterior.jpg' },
  { label: 'Olympic Swimming Pool & Bar', url: '/images/enhanced_pool_wide.jpg' },
  { label: 'Poolside Nightlife & Stage', url: '/images/enhanced_pool_night.jpg' },
  { label: 'Jacuzzi & Mosaic Pool Deck', url: '/images/enhanced_pool_jacuzzi.jpg' },
  { label: 'Executive Bedroom Suite', url: '/images/enhanced_hotel_room_bed.jpg' },
  { label: 'Courtyard & Guest Balconies', url: '/images/enhanced_hotel_courtyard.jpg' },
];

interface AdminDashboardProps {
  initialAuthenticated: boolean;
  initialData: PublicHotelData;
}

export default function AdminDashboard({
  initialAuthenticated,
  initialData,
}: AdminDashboardProps) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [data, setData] = useState<PublicHotelData>(initialData);
  const [activeTab, setActiveTab] = useState<AdminTab>('rooms');
  const [selectedSlideGroup, setSelectedSlideGroup] = useState<SlideGroupKey>('homeHero');

  // Login form state (strictly zero password hints)
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Save & upload state
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [uploadedLibrary, setUploadedLibrary] = useState<string[]>([]);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });
      const json = (await res.json()) as { authenticated?: boolean; error?: string };
      if (!res.ok || !json.authenticated) {
        setLoginError(json.error || 'Incorrect password.');
        return;
      }

      const dataRes = await fetch('/api/admin/hotel', { cache: 'no-store' });
      if (dataRes.ok) {
        const freshData = (await dataRes.json()) as PublicHotelData;
        setData(freshData);
      }
      setLoginPassword('');
      setAuthenticated(true);
    } catch {
      setLoginError('Network error while signing in.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setAuthenticated(false);
    setSaveMessage(null);
    setPasswordStatus(null);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch('/api/admin/hotel', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as {
        success?: boolean;
        data?: PublicHotelData;
        error?: string;
      };
      if (!res.ok || !json.success) {
        setSaveMessage({
          type: 'error',
          text: json.error || 'Failed to save changes.',
        });
        return;
      }
      if (json.data) {
        setData(json.data);
      }
      setSaveMessage({
        type: 'success',
        text: 'All prices, menus, rooms, and pictures saved and published live!',
      });
      router.refresh();
    } catch {
      setSaveMessage({
        type: 'error',
        text: 'Connection error while saving changes.',
      });
    } finally {
      setSaving(false);
    }
  };

  const uploadImageFile = async (
    file: File,
    uploadId: string,
    onSuccess: (url: string) => void
  ) => {
    setUploadingKey(uploadId);
    setSaveMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        setSaveMessage({
          type: 'error',
          text: json.error || 'Image upload failed.',
        });
        return;
      }
      onSuccess(json.url);
      setUploadedLibrary((prev) => (prev.includes(json.url!) ? prev : [json.url!, ...prev]));
      setSaveMessage({
        type: 'success',
        text: 'Picture uploaded! Click "Save All Changes" to publish to the live site.',
      });
    } catch {
      setSaveMessage({
        type: 'error',
        text: 'Failed to upload image.',
      });
    } finally {
      setUploadingKey(null);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);
    setChangingPassword(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
      };
      if (!res.ok || !json.success) {
        setPasswordStatus({
          type: 'error',
          text: json.error || 'Could not update password.',
        });
        return;
      }
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordStatus({
        type: 'success',
        text: json.message || 'Admin password updated successfully.',
      });
    } catch {
      setPasswordStatus({
        type: 'error',
        text: 'Network error while updating password.',
      });
    } finally {
      setChangingPassword(false);
    }
  };

  // Helper updaters for segmented items
  const updateRoom = (index: number, patch: Partial<RoomItem>) => {
    setData((prev) => {
      const next = [...prev.rooms];
      const updated = { ...next[index], ...patch };
      if (typeof patch.pricePerNight === 'number' && patch.priceDisplay === undefined) {
        updated.priceDisplay = formatNaira(patch.pricePerNight);
      }
      next[index] = updated;
      return { ...prev, rooms: next };
    });
  };

  const addRoom = () => {
    const id = `room-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      rooms: [
        ...prev.rooms,
        {
          id,
          name: 'New Deluxe Suite',
          pricePerNight: 35000,
          priceDisplay: '₦35,000',
          badge: 'New Suite',
          description: 'Air-conditioned room with 24/7 continuous power and Olympic pool access.',
          features: ['King Bed', 'Split-Unit AC', '24/7 Power', 'Olympic Pool Access'],
          image: '/images/enhanced_hotel_room_bed.jpg',
          available: true,
        },
      ],
    }));
  };

  const removeRoom = (index: number) => {
    setData((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((_, idx) => idx !== index),
    }));
  };

  const updateMenuItem = (
    kind: 'foodItems' | 'drinkItems',
    index: number,
    patch: Partial<MenuItem>
  ) => {
    setData((prev) => {
      const next = [...prev[kind]];
      next[index] = { ...next[index], ...patch };
      return { ...prev, [kind]: next };
    });
  };

  const addMenuItem = (kind: 'foodItems' | 'drinkItems') => {
    const isFood = kind === 'foodItems';
    setData((prev) => ({
      ...prev,
      [kind]: [
        ...prev[kind],
        {
          id: `${isFood ? 'food' : 'drink'}-${Date.now()}`,
          name: isFood ? 'New Kitchen Dish' : 'New Bar Beverage',
          category: isFood ? 'Traditional Nigerian Soups' : 'Cocktails & Spirits',
          price: isFood ? 6000 : 2500,
          description: isFood
            ? 'Freshly prepared Nigerian meal served hot.'
            : 'Chilled beverage served poolside or in your room.',
          tags: [isFood ? 'Chef Special' : 'Ice Cold'],
          image: isFood ? '/images/enhanced_hotel_courtyard.jpg' : '/images/enhanced_pool_wide.jpg',
          available: true,
        },
      ],
    }));
  };

  const removeMenuItem = (kind: 'foodItems' | 'drinkItems', index: number) => {
    setData((prev) => ({
      ...prev,
      [kind]: prev[kind].filter((_, idx) => idx !== index),
    }));
  };

  const updateService = (index: number, patch: Partial<ServiceItem>) => {
    setData((prev) => {
      const next = [...prev.serviceItems];
      next[index] = { ...next[index], ...patch };
      return { ...prev, serviceItems: next };
    });
  };

  const addService = () => {
    setData((prev) => ({
      ...prev,
      serviceItems: [
        ...prev.serviceItems,
        {
          id: `srv-${Date.now()}`,
          name: 'New Hotel Service',
          category: 'Guest Services',
          price: 5000,
          priceUnit: 'per service',
          description: 'Premium guest service at Dussel Hotels Owerri.',
          image: '/images/enhanced_hotel_day_exterior.jpg',
          available: true,
        },
      ],
    }));
  };

  const removeService = (index: number) => {
    setData((prev) => ({
      ...prev,
      serviceItems: prev.serviceItems.filter((_, idx) => idx !== index),
    }));
  };

  const addSlideToGroup = (groupKey: SlideGroupKey, url: string, caption = 'Dussel Hotels Owerri') => {
    setData((prev) => ({
      ...prev,
      slideshows: {
        ...prev.slideshows,
        [groupKey]: [
          ...prev.slideshows[groupKey],
          {
            id: `${groupKey}-${Date.now()}`,
            url,
            caption,
            subcaption: 'MCC Uratta Road, Owerri',
          },
        ],
      },
    }));
  };

  const updateSlideInGroup = (
    groupKey: SlideGroupKey,
    index: number,
    patch: { url?: string; caption?: string; subcaption?: string }
  ) => {
    setData((prev) => {
      const list = [...prev.slideshows[groupKey]];
      list[index] = { ...list[index], ...patch };
      return {
        ...prev,
        slideshows: {
          ...prev.slideshows,
          [groupKey]: list,
        },
      };
    });
  };

  const moveSlide = (groupKey: SlideGroupKey, index: number, direction: -1 | 1) => {
    setData((prev) => {
      const list = [...prev.slideshows[groupKey]];
      const target = index + direction;
      if (target < 0 || target >= list.length) return prev;
      const temp = list[index];
      list[index] = list[target];
      list[target] = temp;
      return {
        ...prev,
        slideshows: {
          ...prev.slideshows,
          [groupKey]: list,
        },
      };
    });
  };

  const removeSlide = (groupKey: SlideGroupKey, index: number) => {
    setData((prev) => {
      const list = prev.slideshows[groupKey];
      if (list.length <= 1) return prev;
      return {
        ...prev,
        slideshows: {
          ...prev.slideshows,
          [groupKey]: list.filter((_, i) => i !== index),
        },
      };
    });
  };

  // Unauthenticated View — Zero password hints
  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto my-10 sm:my-20">
        <div className="bg-[#0B0D14]/82 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#DFCA97]">
              <Lock className="w-7 h-7" />
            </div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#DFCA97]">
              Dussel Hotels Management
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-white font-bold">
              Admin Portal Login
            </h1>
            <p className="text-xs text-stone-300 leading-relaxed">
              Sign in to manage rooms, food &amp; drink prices, services, background slideshows, and hotel photographs.
            </p>
          </div>

          {loginError && (
            <div
              role="alert"
              className="p-3.5 rounded-lg bg-red-950/85 border border-red-500/40 text-red-200 text-xs flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="admin-password-input"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-200 mb-2"
              >
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showLoginPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  className="w-full bg-[#121622]/90 border border-white/20 rounded-lg pl-4 pr-11 py-3 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-[#C5A059]"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword((prev) => !prev)}
                  aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-white p-1"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-[#C5A059] hover:bg-[#DFCA97] disabled:opacity-60 text-[#0D0E11] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-lg"
            >
              {loginLoading ? 'Verifying...' : 'Sign In to Admin Dashboard'}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <Link href="/" className="text-xs text-stone-300 hover:text-[#DFCA97] transition-colors">
              ← Return to Public Hotel Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }[] = [
    { id: 'rooms', label: 'Rooms', icon: BedDouble, count: data.rooms.length },
    { id: 'food', label: 'Food Menu', icon: Utensils, count: data.foodItems.length },
    { id: 'drinks', label: 'Drinks & Bar', icon: Wine, count: data.drinkItems.length },
    { id: 'services', label: 'Services & All Prices', icon: Sparkles, count: data.serviceItems.length },
    { id: 'slideshows', label: 'Slideshows & Pictures', icon: Images },
    { id: 'settings', label: 'Hotel Info & Password', icon: Settings },
  ];

  const allQuickImages = [
    ...uploadedLibrary.map((url, idx) => ({ label: `Uploaded #${idx + 1}`, url })),
    ...PREMISES_LIBRARY,
  ];

  return (
    <div className="space-y-8">
      {/* Top Management Header Bar */}
      <div className="bg-[#0B0D14]/82 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#DFCA97] mb-1">
            <Shield className="w-4 h-4" />
            <span>Dussel Hotels Management Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white font-bold">
            Live Content, Pricing &amp; Media Studio
          </h1>
          <p className="text-xs text-stone-300 mt-1">
            Every segment is separated below. Update rooms, food prices, drink prices, service rates, upload photos, or change your admin password.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#DFCA97]" />
            View Live Site
          </Link>
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#DFCA97] disabled:opacity-60 text-[#0D0E11] font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-red-950/70 hover:bg-red-900/80 text-red-200 border border-red-500/30 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {saveMessage && (
        <div
          role="status"
          className={`p-4 rounded-xl border backdrop-blur-md flex items-center gap-3 text-sm shadow-lg ${
            saveMessage.type === 'success'
              ? 'bg-emerald-950/85 border-emerald-500/40 text-emerald-100'
              : 'bg-red-950/85 border-red-500/40 text-red-100'
          }`}
        >
          {saveMessage.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{saveMessage.text}</span>
        </div>
      )}

      {/* Segmented Navigation Tabs */}
      <div
        role="tablist"
        aria-label="Hotel management segments"
        className="flex flex-wrap gap-2 bg-[#0B0D14]/78 backdrop-blur-md border border-white/15 rounded-2xl p-2 shadow-xl"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-75 ${
                isActive
                  ? 'bg-[#C5A059] text-[#0D0E11] shadow'
                  : 'text-stone-200 hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                    isActive ? 'bg-[#0D0E11]/20 text-[#0D0E11]' : 'bg-white/10 text-[#DFCA97]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: ROOMS SEGMENT */}
      {activeTab === 'rooms' && (
        <section className="space-y-6">
          <div className="bg-[#0B0D14]/80 backdrop-blur-md border border-white/15 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif text-white font-bold">
                Rooms &amp; Suite Pricing Segment
              </h2>
              <p className="text-xs text-stone-300 mt-1">
                Modify room names, nightly rates (₦), descriptions, features, or upload new room photography.
              </p>
            </div>
            <button
              type="button"
              onClick={addRoom}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Room Tier
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {data.rooms.map((room, idx) => (
              <div
                key={room.id}
                className="bg-[#0B0D14]/82 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-4 space-y-3">
                  <div className="relative h-52 rounded-xl overflow-hidden border border-white/15 bg-[#131620]">
                    <HotelPhoto src={room.image} alt={room.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] text-xs font-bold cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>
                        {uploadingKey === `room-${idx}` ? 'Uploading...' : 'Upload Room Photo'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            uploadImageFile(file, `room-${idx}`, (url) =>
                              updateRoom(idx, { image: url })
                            );
                          }
                        }}
                      />
                    </label>
                    <select
                      aria-label={`Select preset photo for ${room.name}`}
                      value={room.image}
                      onChange={(e) => updateRoom(idx, { image: e.target.value })}
                      className="flex-1 min-w-[140px] bg-[#131622] border border-white/15 rounded-lg px-2.5 py-2 text-xs text-stone-100"
                    >
                      {!allQuickImages.some((p) => p.url === room.image) && (
                        <option value={room.image}>Current Uploaded Image</option>
                      )}
                      {allQuickImages.map((img) => (
                        <option key={img.url} value={img.url}>
                          {img.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Room Name
                      </label>
                      <input
                        type="text"
                        value={room.name}
                        onChange={(e) => updateRoom(idx, { name: e.target.value })}
                        className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Nightly Rate (₦)
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={500}
                        value={room.pricePerNight}
                        onChange={(e) =>
                          updateRoom(idx, { pricePerNight: Number(e.target.value) || 0 })
                        }
                        className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm font-mono text-[#DFCA97]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Price Display Label
                      </label>
                      <input
                        type="text"
                        value={room.priceDisplay}
                        onChange={(e) => updateRoom(idx, { priceDisplay: e.target.value })}
                        className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Badge Label
                      </label>
                      <input
                        type="text"
                        value={room.badge}
                        onChange={(e) => updateRoom(idx, { badge: e.target.value })}
                        className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={room.description}
                      onChange={(e) => updateRoom(idx, { description: e.target.value })}
                      className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Included Features (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={room.features.join(', ')}
                      onChange={(e) =>
                        updateRoom(idx, {
                          features: e.target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-xs text-stone-200"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="inline-flex items-center gap-2 text-xs text-stone-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={room.available}
                        onChange={(e) => updateRoom(idx, { available: e.target.checked })}
                        className="rounded border-white/20"
                      />
                      <span>Visible &amp; Available for Booking</span>
                    </label>
                    {data.rooms.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRoom(idx)}
                        className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Room
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2 & 3: FOOD MENU OR DRINKS MENU SEGMENT */}
      {(activeTab === 'food' || activeTab === 'drinks') && (
        <section className="space-y-6">
          {(() => {
            const isFood = activeTab === 'food';
            const kind = isFood ? 'foodItems' : 'drinkItems';
            const items = data[kind];
            return (
              <>
                <div className="bg-[#0B0D14]/80 backdrop-blur-md border border-white/15 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-serif text-white font-bold">
                      {isFood ? 'Food & Kitchen Menu Pricing Segment' : 'Drinks, Beer & Bar Menu Pricing Segment'}
                    </h2>
                    <p className="text-xs text-stone-300 mt-1">
                      {isFood
                        ? 'Modify prices of soups, rice dishes, pepper soups, breakfast, or add new dishes with photos.'
                        : 'Modify prices of beers, stouts, cocktails, wines, spirits, and soft drinks, or upload drink photos.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addMenuItem(kind)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    {isFood ? 'Add Food Dish' : 'Add Drink Item'}
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="bg-[#0B0D14]/82 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-xl space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-36 space-y-2 shrink-0">
                          <div className="relative h-28 rounded-xl overflow-hidden border border-white/15 bg-[#131620]">
                            <HotelPhoto src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <label className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] text-[11px] font-bold cursor-pointer transition-colors">
                            <Upload className="w-3 h-3" />
                            <span>
                              {uploadingKey === `${kind}-${idx}` ? 'Uploading...' : 'Upload Photo'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  uploadImageFile(file, `${kind}-${idx}`, (url) =>
                                    updateMenuItem(kind, idx, { image: url })
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                                Item Name
                              </label>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) =>
                                  updateMenuItem(kind, idx, { name: e.target.value })
                                }
                                className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                                Price (₦)
                              </label>
                              <input
                                type="number"
                                min={0}
                                step={100}
                                value={item.price}
                                onChange={(e) =>
                                  updateMenuItem(kind, idx, {
                                    price: Number(e.target.value) || 0,
                                  })
                                }
                                className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm font-mono text-[#DFCA97]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                                Category
                              </label>
                              <input
                                type="text"
                                value={item.category}
                                onChange={(e) =>
                                  updateMenuItem(kind, idx, { category: e.target.value })
                                }
                                className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                                Photo Preset
                              </label>
                              <select
                                aria-label={`Preset photo for ${item.name}`}
                                value={item.image}
                                onChange={(e) =>
                                  updateMenuItem(kind, idx, { image: e.target.value })
                                }
                                className="w-full bg-[#131622] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-stone-100"
                              >
                                {!allQuickImages.some((p) => p.url === item.image) && (
                                  <option value={item.image}>Uploaded Photo</option>
                                )}
                                {allQuickImages.map((img) => (
                                  <option key={img.url} value={img.url}>
                                    {img.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) =>
                            updateMenuItem(kind, idx, { description: e.target.value })
                          }
                          className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <label className="inline-flex items-center gap-2 text-xs text-stone-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.available}
                            onChange={(e) =>
                              updateMenuItem(kind, idx, { available: e.target.checked })
                            }
                          />
                          <span>Available on Menu</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => removeMenuItem(kind, idx)}
                          className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/30"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </section>
      )}

      {/* TAB 4: SERVICES & MASTER PRICE BOARD */}
      {activeTab === 'services' && (
        <section className="space-y-8">
          <div className="bg-[#0B0D14]/80 backdrop-blur-md border border-white/15 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif text-white font-bold">
                Hotel Services &amp; Everything-Else Pricing Segment
              </h2>
              <p className="text-xs text-stone-300 mt-1">
                Modify Olympic pool day passes, VIP lounge tables, airport transfers, laundry, late checkout, and adjust any price on the hotel below.
              </p>
            </div>
            <button
              type="button"
              onClick={addService}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.serviceItems.map((srv, idx) => (
              <div
                key={srv.id}
                className="bg-[#0B0D14]/82 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-36 space-y-2 shrink-0">
                    <div className="relative h-28 rounded-xl overflow-hidden border border-white/15 bg-[#131620]">
                      <HotelPhoto src={srv.image} alt={srv.name} fill className="object-cover" />
                    </div>
                    <label className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] text-[11px] font-bold cursor-pointer transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>
                        {uploadingKey === `srv-${idx}` ? 'Uploading...' : 'Upload Photo'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            uploadImageFile(file, `srv-${idx}`, (url) =>
                              updateService(idx, { image: url })
                            );
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Service Name
                      </label>
                      <input
                        type="text"
                        value={srv.name}
                        onChange={(e) => updateService(idx, { name: e.target.value })}
                        className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                          Price (₦)
                        </label>
                        <input
                          type="number"
                          min={0}
                          step={500}
                          value={srv.price}
                          onChange={(e) =>
                            updateService(idx, { price: Number(e.target.value) || 0 })
                          }
                          className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm font-mono text-[#DFCA97]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                          Billing Unit
                        </label>
                        <input
                          type="text"
                          value={srv.priceUnit}
                          onChange={(e) => updateService(idx, { priceUnit: e.target.value })}
                          className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={srv.category}
                        onChange={(e) => updateService(idx, { category: e.target.value })}
                        className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={srv.description}
                    onChange={(e) => updateService(idx, { description: e.target.value })}
                    className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <label className="inline-flex items-center gap-2 text-xs text-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={srv.available}
                      onChange={(e) => updateService(idx, { available: e.target.checked })}
                    />
                    <span>Active Service</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeService(idx)}
                    className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Master Quick-Edit Price Board for Everything */}
          <div className="bg-[#0B0D14]/85 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-serif text-white font-semibold">
              Quick Price Master Board (All Categories)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-[#DFCA97] uppercase block">Rooms (₦)</span>
                {data.rooms.map((r, i) => (
                  <div key={r.id} className="flex items-center justify-between gap-2">
                    <span className="truncate text-stone-200">{r.name}</span>
                    <input
                      type="number"
                      aria-label={`Quick price for ${r.name}`}
                      value={r.pricePerNight}
                      onChange={(e) =>
                        updateRoom(i, { pricePerNight: Number(e.target.value) || 0 })
                      }
                      className="w-24 bg-[#131622] border border-white/15 rounded px-2 py-1 text-right font-mono text-[#DFCA97]"
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-[#DFCA97] uppercase block">Food (₦)</span>
                {data.foodItems.map((f, i) => (
                  <div key={f.id} className="flex items-center justify-between gap-2">
                    <span className="truncate text-stone-200">{f.name}</span>
                    <input
                      type="number"
                      aria-label={`Quick price for ${f.name}`}
                      value={f.price}
                      onChange={(e) =>
                        updateMenuItem('foodItems', i, { price: Number(e.target.value) || 0 })
                      }
                      className="w-24 bg-[#131622] border border-white/15 rounded px-2 py-1 text-right font-mono text-[#DFCA97]"
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-[#DFCA97] uppercase block">Drinks (₦)</span>
                {data.drinkItems.map((d, i) => (
                  <div key={d.id} className="flex items-center justify-between gap-2">
                    <span className="truncate text-stone-200">{d.name}</span>
                    <input
                      type="number"
                      aria-label={`Quick price for ${d.name}`}
                      value={d.price}
                      onChange={(e) =>
                        updateMenuItem('drinkItems', i, { price: Number(e.target.value) || 0 })
                      }
                      className="w-24 bg-[#131622] border border-white/15 rounded px-2 py-1 text-right font-mono text-[#DFCA97]"
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-[#DFCA97] uppercase block">Services (₦)</span>
                {data.serviceItems.map((s, i) => (
                  <div key={s.id} className="flex items-center justify-between gap-2">
                    <span className="truncate text-stone-200">{s.name}</span>
                    <input
                      type="number"
                      aria-label={`Quick price for ${s.name}`}
                      value={s.price}
                      onChange={(e) =>
                        updateService(i, { price: Number(e.target.value) || 0 })
                      }
                      className="w-24 bg-[#131622] border border-white/15 rounded px-2 py-1 text-right font-mono text-[#DFCA97]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: SLIDESHOWS & PICTURES SEGMENT */}
      {activeTab === 'slideshows' && (
        <section className="space-y-6">
          <div className="bg-[#0B0D14]/82 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif text-white font-bold">
                  Upload Pictures &amp; Page Background Slideshows
                </h2>
                <p className="text-xs text-stone-300 mt-1">
                  Upload new hotel pictures and customize the sliding backgrounds for every page and homepage subheading.
                </p>
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#DFCA97] text-[#0D0E11] text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shrink-0">
                <Upload className="w-4 h-4" />
                <span>
                  {uploadingKey === 'gallery-add'
                    ? 'Uploading Picture...'
                    : 'Upload & Add to Selected Slideshow'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      uploadImageFile(file, 'gallery-add', (url) =>
                        addSlideToGroup(selectedSlideGroup, url, file.name.replace(/\.[^/.]+$/, ''))
                      );
                    }
                  }}
                />
              </label>
            </div>

            {/* Slideshow Target Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              {SLIDE_GROUP_KEYS.map((key) => {
                const isSelected = selectedSlideGroup === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSlideGroup(key)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#C5A059] text-[#0D0E11] border-[#DFCA97] font-semibold'
                        : 'bg-[#131622] text-stone-200 border-white/15 hover:border-white/30'
                    }`}
                  >
                    <div className="text-xs truncate">{SLIDE_GROUP_LABELS[key].label}</div>
                    <div
                      className={`text-[10px] font-mono mt-0.5 ${
                        isSelected ? 'text-[#0D0E11]/80' : 'text-[#DFCA97]'
                      }`}
                    >
                      {data.slideshows[key].length} slides
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Slideshow Editor */}
          <div className="bg-[#0B0D14]/82 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-serif text-white font-semibold">
                  {SLIDE_GROUP_LABELS[selectedSlideGroup].label}
                </h3>
                <p className="text-xs text-stone-300">
                  {SLIDE_GROUP_LABELS[selectedSlideGroup].description}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  addSlideToGroup(
                    selectedSlideGroup,
                    '/images/enhanced_hotel_night_facade.jpg',
                    'Dussel Hotels Owerri'
                  )
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 shrink-0"
              >
                <Plus className="w-3.5 h-3.5 text-[#DFCA97]" />
                Add Slide from Library
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {data.slideshows[selectedSlideGroup].map((slide, idx) => (
                <div
                  key={slide.id}
                  className="bg-[#12151E]/90 border border-white/15 rounded-xl p-4 space-y-3"
                >
                  <div className="relative h-44 rounded-lg overflow-hidden border border-white/15">
                    <HotelPhoto src={slide.url} alt={slide.caption} fill className="object-cover" />
                    <div className="absolute top-2 left-2 bg-[#0D0E11]/90 px-2 py-0.5 rounded text-[10px] font-mono text-[#DFCA97]">
                      Slide #{idx + 1}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      aria-label={`Caption for slide ${idx + 1}`}
                      value={slide.caption}
                      onChange={(e) =>
                        updateSlideInGroup(selectedSlideGroup, idx, { caption: e.target.value })
                      }
                      placeholder="Slide caption"
                      className="w-full bg-[#161926] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                    <select
                      aria-label={`Photo selection for slide ${idx + 1}`}
                      value={slide.url}
                      onChange={(e) =>
                        updateSlideInGroup(selectedSlideGroup, idx, { url: e.target.value })
                      }
                      className="w-full bg-[#161926] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-stone-100"
                    >
                      {!allQuickImages.some((p) => p.url === slide.url) && (
                        <option value={slide.url}>Uploaded Picture</option>
                      )}
                      {allQuickImages.map((img) => (
                        <option key={img.url} value={img.url}>
                          {img.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      <label className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#C5A059] text-[#0D0E11] text-[11px] font-bold cursor-pointer">
                        <Upload className="w-3 h-3" />
                        <span>Replace Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              uploadImageFile(file, `slide-${selectedSlideGroup}-${idx}`, (url) =>
                                updateSlideInGroup(selectedSlideGroup, idx, { url })
                              );
                            }
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        aria-label={`Move slide ${idx + 1} earlier`}
                        onClick={() => moveSlide(selectedSlideGroup, idx, -1)}
                        className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Move slide ${idx + 1} later`}
                        onClick={() => moveSlide(selectedSlideGroup, idx, 1)}
                        className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {data.slideshows[selectedSlideGroup].length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSlide(selectedSlideGroup, idx)}
                        className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200 px-2.5 py-1 rounded bg-red-950/60 border border-red-500/30"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 6: HOTEL INFO & ADMIN PASSWORD SETUP */}
      {activeTab === 'settings' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Hotel Contact & Brand Details */}
          <div className="lg:col-span-7 bg-[#0B0D14]/82 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
            <div>
              <h2 className="text-xl font-serif text-white font-bold">
                Hotel Details &amp; Contact Information
              </h2>
              <p className="text-xs text-stone-300 mt-1">
                Updates phone numbers, WhatsApp links, address, and hours across all public pages.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  Hotel Name
                </label>
                <input
                  type="text"
                  value={data.hotelInfo.name}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      hotelInfo: { ...prev.hotelInfo, name: e.target.value },
                    }))
                  }
                  className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  Open Hours
                </label>
                <input
                  type="text"
                  value={data.hotelInfo.openHours}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      hotelInfo: { ...prev.hotelInfo, openHours: e.target.value },
                    }))
                  }
                  className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={data.hotelInfo.phone}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      hotelInfo: { ...prev.hotelInfo, phone: e.target.value },
                    }))
                  }
                  className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={data.hotelInfo.whatsapp}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      hotelInfo: { ...prev.hotelInfo, whatsapp: e.target.value },
                    }))
                  }
                  className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={data.hotelInfo.email}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      hotelInfo: { ...prev.hotelInfo, email: e.target.value },
                    }))
                  }
                  className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  Nearby Landmark
                </label>
                <input
                  type="text"
                  value={data.hotelInfo.landmark}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      hotelInfo: { ...prev.hotelInfo, landmark: e.target.value },
                    }))
                  }
                  className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                Physical Address
              </label>
              <input
                type="text"
                value={data.hotelInfo.address}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    hotelInfo: { ...prev.hotelInfo, address: e.target.value },
                  }))
                }
                className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                Hero Tagline
              </label>
              <textarea
                rows={3}
                value={data.hotelInfo.tagline}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    hotelInfo: { ...prev.hotelInfo, tagline: e.target.value },
                  }))
                }
                className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2 text-sm text-white"
              />
            </div>
          </div>

          {/* Admin Password Setup */}
          <div className="lg:col-span-5 bg-[#0B0D14]/82 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5 h-fit">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#DFCA97]">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-serif text-white font-bold">
                  Change Admin Password
                </h2>
                <p className="text-xs text-stone-300">
                  Replace the initial password with your own custom admin password.
                </p>
              </div>
            </div>

            {passwordStatus && (
              <div
                role="status"
                className={`p-3.5 rounded-lg border text-xs flex items-center gap-2 ${
                  passwordStatus.type === 'success'
                    ? 'bg-emerald-950/85 border-emerald-500/40 text-emerald-100'
                    : 'bg-red-950/85 border-red-500/40 text-red-100'
                }`}
              >
                {passwordStatus.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{passwordStatus.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label
                  htmlFor="current-admin-password"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1"
                >
                  Current Password
                </label>
                <input
                  id="current-admin-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="new-admin-password"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1"
                >
                  New Password (minimum 6 characters)
                </label>
                <input
                  id="new-admin-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={6}
                  required
                  className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-admin-password"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirm-admin-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                  required
                  className="w-full bg-[#131622] border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white"
                />
              </div>

              <button
                type="submit"
                disabled={changingPassword}
                className="w-full py-3 bg-[#C5A059] hover:bg-[#DFCA97] disabled:opacity-60 text-[#0D0E11] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                {changingPassword ? 'Updating Password...' : 'Update Admin Password'}
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
