export interface RoomItem {
  id: string;
  name: string;
  pricePerNight: number;
  priceDisplay: string;
  badge: string;
  description: string;
  features: string[];
  image: string;
  available: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  image: string;
  available: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  priceUnit: string;
  description: string;
  image: string;
  available: boolean;
}

export interface SlideItem {
  id: string;
  url: string;
  caption: string;
  subcaption: string;
}

export type SlideGroupKey =
  | 'homeHero'
  | 'homeRooms'
  | 'homePool'
  | 'homeDining'
  | 'servicesPage'
  | 'diningPoolPage'
  | 'aboutPage'
  | 'locationPage'
  | 'bookPage'
  | 'adminPage';

export interface HotelInfo {
  name: string;
  tagline: string;
  address: string;
  landmark: string;
  phone: string;
  whatsapp: string;
  email: string;
  openHours: string;
  checkInTime: string;
  checkOutTime: string;
  mapsUrl: string;
  mapsDirectionsUrl: string;
}

export interface AdminAuthRecord {
  passwordHash: string;
  salt: string;
  isDefaultPassword: boolean;
  sessionSecret: string;
}

export interface PublicHotelData {
  rooms: RoomItem[];
  foodItems: MenuItem[];
  drinkItems: MenuItem[];
  serviceItems: ServiceItem[];
  slideshows: Record<SlideGroupKey, SlideItem[]>;
  hotelInfo: HotelInfo;
  updatedAt: string;
}

export interface HotelDatabase extends PublicHotelData {
  adminAuth: AdminAuthRecord;
}
