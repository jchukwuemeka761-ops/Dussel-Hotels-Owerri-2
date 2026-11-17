import type {
  HotelInfo,
  MenuItem,
  PublicHotelData,
  RoomItem,
  ServiceItem,
  SlideGroupKey,
  SlideItem,
} from './hotel-types';

export const SLIDE_GROUP_KEYS: SlideGroupKey[] = [
  'homeHero',
  'homeRooms',
  'homePool',
  'homeDining',
  'servicesPage',
  'diningPoolPage',
  'aboutPage',
  'locationPage',
  'bookPage',
  'adminPage',
];

export const SLIDE_GROUP_LABELS: Record<SlideGroupKey, { label: string; description: string }> = {
  homeHero: {
    label: 'Home — Hero Banner',
    description: 'Main full-screen slideshow welcoming visitors on the homepage.',
  },
  homeRooms: {
    label: 'Home — Rooms & Suites Section',
    description: 'Background slideshow behind the homepage rooms & suites showcase.',
  },
  homePool: {
    label: 'Home — Olympic Pool Section',
    description: 'Background slideshow behind the Olympic swimming pool showcase.',
  },
  homeDining: {
    label: 'Home — Dining & Nightlife Section',
    description: 'Background slideshow behind the restaurant, bar & nightlife segment.',
  },
  servicesPage: {
    label: 'Rooms & Services Page',
    description: 'Full-page sliding backdrop featuring rooms, suites, and hotel grounds.',
  },
  diningPoolPage: {
    label: 'Dining & Pool Page',
    description: 'Interchanging pool, jacuzzi, nightlife bar, and dining background slides.',
  },
  aboutPage: {
    label: 'About Hotel Page',
    description: 'Clear architectural & compound slideshow behind the Dussel Hotels story.',
  },
  locationPage: {
    label: 'Find Hotel / Location Page',
    description: 'Day & night landmark exterior slideshow behind the map & directions.',
  },
  bookPage: {
    label: 'Book Now Page',
    description: 'Suite & hospitality slideshow behind the live reservation engine.',
  },
  adminPage: {
    label: 'Admin Portal (Night View)',
    description: 'Illuminated night view slideshow behind the management dashboard.',
  },
};

export function formatNaira(amount: number): string {
  const safe = Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0;
  return `₦${safe.toLocaleString('en-NG')}`;
}

export function sanitizeUploadFilename(originalName: string): string {
  const extMatch = originalName.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/);
  const ext = extMatch ? extMatch[1] : 'jpg';
  const base = originalName
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'hotel-photo';
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `${base}-${unique}.${ext}`;
}

export function isSafeStoredFilename(filename: string): boolean {
  return /^[a-z0-9_-]+\.(jpg|jpeg|png|webp)$/i.test(filename);
}

export function groupMenuItemsByCategory(items: MenuItem[]): { category: string; items: MenuItem[] }[] {
  const map = new Map<string, MenuItem[]>();
  for (const item of items) {
    if (!item.available) continue;
    const cat = item.category?.trim() || 'House Specials';
    const existing = map.get(cat) || [];
    existing.push(item);
    map.set(cat, existing);
  }
  return Array.from(map.entries()).map(([category, groupItems]) => ({
    category,
    items: groupItems,
  }));
}

export function validatePasswordChangeInput(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): { valid: boolean; error?: string } {
  if (!currentPassword || !currentPassword.trim()) {
    return { valid: false, error: 'Current password is required.' };
  }
  if (!newPassword || newPassword.trim().length < 6) {
    return { valid: false, error: 'New password must be at least 6 characters long.' };
  }
  if (newPassword.trim() !== confirmPassword.trim()) {
    return { valid: false, error: 'New password and confirmation do not match.' };
  }
  return { valid: true };
}

export function sanitizeAdminPayload(
  input: Partial<PublicHotelData>,
  fallback: PublicHotelData
): { ok: true; data: PublicHotelData } | { ok: false; error: string } {
  const rooms: RoomItem[] = Array.isArray(input.rooms)
    ? input.rooms.map((r, idx) => {
        const price = Math.max(0, Number(r.pricePerNight) || 0);
        return {
          id: String(r.id || `room-${idx + 1}`).trim(),
          name: String(r.name || 'Hotel Room').trim(),
          pricePerNight: price,
          priceDisplay: String(r.priceDisplay || formatNaira(price)).trim(),
          badge: String(r.badge || 'Standard Tier').trim(),
          description: String(r.description || '').trim(),
          features: Array.isArray(r.features)
            ? r.features.map((f) => String(f).trim()).filter(Boolean)
            : [],
          image: String(r.image || '/images/enhanced_hotel_room_bed.jpg').trim(),
          available: r.available !== false,
        };
      })
    : fallback.rooms;

  if (rooms.length === 0) {
    return { ok: false, error: 'At least one room tier must remain listed.' };
  }

  const normalizeMenuList = (list: unknown, def: MenuItem[], defaultImg: string): MenuItem[] => {
    if (!Array.isArray(list)) return def;
    return list.map((item, idx) => {
      const m = item as Partial<MenuItem>;
      return {
        id: String(m.id || `menu-${idx + 1}`).trim(),
        name: String(m.name || 'Menu Item').trim(),
        category: String(m.category || 'Specials').trim(),
        price: Math.max(0, Number(m.price) || 0),
        description: String(m.description || '').trim(),
        tags: Array.isArray(m.tags) ? m.tags.map((t) => String(t).trim()).filter(Boolean) : [],
        image: String(m.image || defaultImg).trim(),
        available: m.available !== false,
      };
    });
  };

  const foodItems = normalizeMenuList(input.foodItems, fallback.foodItems, '/images/enhanced_hotel_courtyard.jpg');
  const drinkItems = normalizeMenuList(input.drinkItems, fallback.drinkItems, '/images/enhanced_pool_wide.jpg');

  const serviceItems: ServiceItem[] = Array.isArray(input.serviceItems)
    ? input.serviceItems.map((s, idx) => ({
        id: String(s.id || `srv-${idx + 1}`).trim(),
        name: String(s.name || 'Hotel Service').trim(),
        category: String(s.category || 'Guest Services').trim(),
        price: Math.max(0, Number(s.price) || 0),
        priceUnit: String(s.priceUnit || 'per service').trim(),
        description: String(s.description || '').trim(),
        image: String(s.image || '/images/enhanced_hotel_day_exterior.jpg').trim(),
        available: s.available !== false,
      }))
    : fallback.serviceItems;

  const slideshows = { ...fallback.slideshows };
  if (input.slideshows && typeof input.slideshows === 'object') {
    for (const key of SLIDE_GROUP_KEYS) {
      const candidate = (input.slideshows as Partial<Record<SlideGroupKey, SlideItem[]>>)[key];
      if (Array.isArray(candidate) && candidate.length > 0) {
        slideshows[key] = candidate
          .filter((sl) => sl && typeof sl.url === 'string' && sl.url.trim().length > 0)
          .map((sl, idx) => ({
            id: String(sl.id || `${key}-${idx + 1}`).trim(),
            url: sl.url.trim(),
            caption: String(sl.caption || 'Dussel Hotels Owerri').trim(),
            subcaption: String(sl.subcaption || '').trim(),
          }));
      }
    }
  }

  const infoInput = (input.hotelInfo || {}) as Partial<HotelInfo>;
  const hotelInfo: HotelInfo = {
    name: String(infoInput.name || fallback.hotelInfo.name).trim(),
    tagline: String(infoInput.tagline || fallback.hotelInfo.tagline).trim(),
    address: String(infoInput.address || fallback.hotelInfo.address).trim(),
    landmark: String(infoInput.landmark || fallback.hotelInfo.landmark).trim(),
    phone: String(infoInput.phone || fallback.hotelInfo.phone).trim(),
    whatsapp: String(infoInput.whatsapp || fallback.hotelInfo.whatsapp).trim(),
    email: String(infoInput.email || fallback.hotelInfo.email).trim(),
    openHours: String(infoInput.openHours || fallback.hotelInfo.openHours).trim(),
    checkInTime: String(infoInput.checkInTime || fallback.hotelInfo.checkInTime).trim(),
    checkOutTime: String(infoInput.checkOutTime || fallback.hotelInfo.checkOutTime).trim(),
    mapsUrl: String(infoInput.mapsUrl || fallback.hotelInfo.mapsUrl).trim(),
    mapsDirectionsUrl: String(infoInput.mapsDirectionsUrl || fallback.hotelInfo.mapsDirectionsUrl).trim(),
  };

  return {
    ok: true,
    data: {
      rooms,
      foodItems,
      drinkItems,
      serviceItems,
      slideshows,
      hotelInfo,
      updatedAt: new Date().toISOString(),
    },
  };
}
