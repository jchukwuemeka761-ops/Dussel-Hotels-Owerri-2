import { createInitialAdminAuth } from './auth';
import type { HotelDatabase, PublicHotelData } from './hotel-types';

export function createDefaultPublicData(): PublicHotelData {
  return {
    rooms: [
      {
        id: 'classic-queen',
        name: 'Standard / Classic Room (Queen Bed)',
        pricePerNight: 30000,
        priceDisplay: '₦30,000',
        badge: 'Mid-Tier Budget Value',
        description:
          'Crisp, comfortable air-conditioned room with plush queen bed, 24/7 continuous backup generator power, flat-screen TV, and full en-suite bathroom.',
        features: [
          'Comfortable Queen-size Bed',
          'Independent Split-Unit AC',
          '24/7 Backup Generator Power',
          'Flat-Screen Cable TV',
          'Complimentary Olympic Pool Access',
          'Gated Compound Parking',
        ],
        image: '/images/enhanced_hotel_room_bed.jpg',
        available: true,
      },
      {
        id: 'classic-king',
        name: 'Standard / Classic Room (King Bed)',
        pricePerNight: 35000,
        priceDisplay: '₦35,000',
        badge: 'Popular Choice',
        description:
          'Spacious classic bedroom featuring a plush king-size bed, dedicated work desk, split-unit climate control, and high-speed wireless internet.',
        features: [
          'Expansive King-size Bed',
          'Independent Split-Unit AC',
          '24/7 Continuous Power Supply',
          'Work Desk & Reading Lamp',
          'High-Speed WiFi Access',
          'Complimentary Olympic Pool Access',
        ],
        image: '/images/enhanced_hotel_room_bed.jpg',
        available: true,
      },
      {
        id: 'executive-suite',
        name: 'Executive Suite with Lounge Area',
        pricePerNight: 40000,
        priceDisplay: '₦40,000',
        badge: 'Executive Comfort',
        description:
          'Tastefully furnished upscale suite offering a spacious lounge sitting area, king master bed, mini refrigerator, ambient lighting, and breakfast options.',
        features: [
          'Separate Lounge Sitting Area',
          'King Master Bed',
          'Mini Refrigerator',
          'Split-Unit AC & 24/7 Power',
          'Quality Breakfast Options',
          'VIP Room Service',
        ],
        image: '/images/enhanced_hotel_courtyard.jpg',
        available: true,
      },
      {
        id: 'royal-suite',
        name: 'Dussel Royal / Executive VIP Suite',
        pricePerNight: 45000,
        priceDisplay: '₦45,000+',
        badge: 'Top Upscale Tier',
        description:
          'Top-tier luxury accommodation with expansive living lounge, executive furnishings, priority service, complimentary pool deck access, and quality breakfast.',
        features: [
          'VIP Executive Living Lounge',
          'Complimentary Quality Breakfast',
          '24/7 Continuous Generator Power',
          'Reserved Olympic Pool Loungers',
          'Priority Concierge Service',
          '24/7 Physical Security',
        ],
        image: '/images/enhanced_hotel_night_facade.jpg',
        available: true,
      },
    ],
    foodItems: [
      {
        id: 'food-ofe-owerri',
        name: 'Authentic Ofe Owerri & Pounded Yam',
        category: 'Traditional Nigerian Soups',
        price: 7500,
        description:
          'The iconic heritage soup of Owerri prepared with fresh Ukazi & Uziza leaves, stockfish, dried fish, and tender beef, paired with hot Pounded Yam or Semovita.',
        tags: ['Signature Dish', 'Imo Heritage'],
        image: '/images/enhanced_hotel_courtyard.jpg',
        available: true,
      },
      {
        id: 'food-egusi',
        name: 'Rich Melon Egusi Soup & Swallow',
        category: 'Traditional Nigerian Soups',
        price: 6000,
        description:
          'Hearty ground melon seed soup simmered with leafy greens, smoked fish, beef, and cow foot. Served with Pounded Yam, Eba, Wheat, or Semovita.',
        tags: ['Guest Favorite'],
        image: '/images/enhanced_hotel_courtyard.jpg',
        available: true,
      },
      {
        id: 'food-catfish-peppersoup',
        name: 'Fresh Catfish Point & Kill Pepper Soup',
        category: 'Pepper Soups & Grills',
        price: 9500,
        description:
          'Whole fresh catfish simmered in aromatic hot pepper soup broth with local scent leaves, Uda spice, and boiled yam or plantain.',
        tags: ['Made to Order', 'Nightlife Favorite'],
        image: '/images/enhanced_pool_night.jpg',
        available: true,
      },
      {
        id: 'food-nkwobi',
        name: 'Authentic Spicy Nkwobi Delicacy',
        category: 'Pepper Soups & Grills',
        price: 7000,
        description:
          'Tender chopped cow foot tossed in rich spiced palm oil sauce, garnished with fresh Utazi leaves and sweet onion rings.',
        tags: ['Eastern Special'],
        image: '/images/enhanced_pool_night.jpg',
        available: true,
      },
      {
        id: 'food-jollof',
        name: 'Smoky Party Jollof Rice & Grilled Chicken',
        category: 'Rice & Continental Breakfast',
        price: 5500,
        description:
          'Classic Nigerian smoky Jollof rice cooked in rich tomato-pepper reduction, served with sweet fried plantain (dodo) and spiced grilled chicken.',
        tags: ['Classic', 'All Day'],
        image: '/images/enhanced_hotel_day_exterior.jpg',
        available: true,
      },
      {
        id: 'food-breakfast',
        name: 'Dussel Executive Morning Breakfast',
        category: 'Rice & Continental Breakfast',
        price: 4500,
        description:
          'Fluffy omelette or scrambled eggs with fried yam/plantain or toasted bread, paired with hot tea, coffee, or rich cocoa.',
        tags: ['Morning Special'],
        image: '/images/enhanced_hotel_room_bed.jpg',
        available: true,
      },
    ],
    drinkItems: [
      {
        id: 'drink-beer-lag',
        name: 'Chilled Premium Lager Beer (60cl)',
        category: 'Beer & Malt',
        price: 1800,
        description:
          'Ice-cold Star, Heineken, Gulder, Trophy, or Hero served straight from our Great Beer poolside bar.',
        tags: ['Ice Cold', 'Poolside Bar'],
        image: '/images/enhanced_pool_wide.jpg',
        available: true,
      },
      {
        id: 'drink-stout',
        name: 'Guinness Foreign Extra Stout / Trophy Stout',
        category: 'Beer & Malt',
        price: 2200,
        description:
          'Rich dark stout chilled to perfection, ideal with spicy catfish pepper soup or Nkwobi.',
        tags: ['Nightlife Classic'],
        image: '/images/enhanced_pool_night.jpg',
        available: true,
      },
      {
        id: 'drink-cocktail',
        name: 'Dussel Sunset Poolside Cocktail',
        category: 'Cocktails & Spirits',
        price: 5500,
        description:
          'Refreshing tropical blend of citrus, pineapple, and premium spirit served over crushed ice by the Olympic pool.',
        tags: ['Signature Mix'],
        image: '/images/enhanced_pool_jacuzzi.jpg',
        available: true,
      },
      {
        id: 'drink-wine-bottle',
        name: 'Selected Red / Sweet Table Wine (Bottle)',
        category: 'Wines & Champagne',
        price: 15000,
        description:
          'Curated bottles of Carlo Rossi, Four Cousins, or Drostdy Hof chilled or room temperature for lounge and suite enjoyment.',
        tags: ['Bottle Service'],
        image: '/images/enhanced_hotel_night_facade.jpg',
        available: true,
      },
      {
        id: 'drink-spirit-bottle',
        name: 'Premium Spirit Bottle (Whiskey / Cognac)',
        category: 'Cocktails & Spirits',
        price: 45000,
        description:
          'VIP table bottle service with mixers and ice bucket at our illuminated poolside nightlife lounge.',
        tags: ['VIP Lounge'],
        image: '/images/enhanced_pool_night.jpg',
        available: true,
      },
      {
        id: 'drink-soft-water',
        name: 'Chilled Soft Drinks / Bottled Water / Malt',
        category: 'Soft Drinks & Juices',
        price: 1000,
        description:
          'Refreshing Coca-Cola, Fanta, Sprite, Maltina, Hollandia Yoghurt, or chilled spring water.',
        tags: ['Non-Alcoholic'],
        image: '/images/enhanced_pool_wide.jpg',
        available: true,
      },
    ],
    serviceItems: [
      {
        id: 'srv-pool-daypass',
        name: 'Olympic Swimming Pool Day Pass (Non-Guest)',
        category: 'Recreation & Pool',
        price: 3500,
        priceUnit: 'per person',
        description:
          'Full day recreational access to our standard Olympic-size swimming pool, jacuzzi relaxation deck, and changing facilities (complimentary for lodging guests).',
        image: '/images/enhanced_pool_wide.jpg',
        available: true,
      },
      {
        id: 'srv-pool-night-vip',
        name: 'VIP Poolside Lounge Table Reservation',
        category: 'Nightlife & Bar',
        price: 15000,
        priceUnit: 'minimum spend',
        description:
          'Reserved poolside table near the illuminated music stage and Great Beer bar for evening hangouts and celebrations.',
        image: '/images/enhanced_pool_night.jpg',
        available: true,
      },
      {
        id: 'srv-airport-pickup',
        name: 'Sam Mbakwe Airport Private Pickup',
        category: 'Guest Transport',
        price: 20000,
        priceUnit: 'per trip',
        description:
          'Air-conditioned private vehicle transfer directly between Sam Mbakwe Cargo Airport and Dussel Hotels on MCC Uratta Road.',
        image: '/images/enhanced_hotel_day_exterior.jpg',
        available: true,
      },
      {
        id: 'srv-laundry',
        name: 'Express Laundry & Steam Pressing',
        category: 'Guest Services',
        price: 3000,
        priceUnit: 'per outfit set',
        description:
          'Same-day wash, dry, and crisp pressing delivered directly back to your room.',
        image: '/images/enhanced_hotel_room_bed.jpg',
        available: true,
      },
      {
        id: 'srv-late-checkout',
        name: 'Extended Late Check-Out (Up to 4:00 PM)',
        category: 'Accommodation Add-On',
        price: 10000,
        priceUnit: 'per room',
        description:
          'Extend your stay comfortably past noon with continued 24/7 power and AC until 4:00 PM.',
        image: '/images/enhanced_hotel_courtyard.jpg',
        available: true,
      },
    ],
    slideshows: {
      homeHero: [
        {
          id: 'hh-1',
          url: '/images/enhanced_hotel_day_exterior.jpg',
          caption: 'Dussel Hotels Grand Entrance — MCC Uratta Road, Owerri',
          subcaption: 'Iconic white columns, hand-painted murals & serene gated compound',
        },
        {
          id: 'hh-2',
          url: '/images/enhanced_hotel_night_facade.jpg',
          caption: 'Illuminated Nighttime Luxury Facade',
          subcaption: 'Vibrant evening ambiance with uninterrupted 24/7 generator power',
        },
        {
          id: 'hh-3',
          url: '/images/enhanced_pool_wide.jpg',
          caption: 'Standard Olympic-Size Swimming Pool & Bar',
          subcaption: 'Crystal-clear treated pool beside the Great Beer lounge',
        },
        {
          id: 'hh-4',
          url: '/images/enhanced_pool_night.jpg',
          caption: 'Vibrant Poolside Nightlife & Music Stage',
          subcaption: 'Evening entertainment, grills, and chilled drinks under the stars',
        },
        {
          id: 'hh-5',
          url: '/images/enhanced_hotel_room_bed.jpg',
          caption: 'Tastefully Furnished Suites & Rooms',
          subcaption: 'Air-conditioned comfort starting from ₦30,000 per night',
        },
      ],
      homeRooms: [
        {
          id: 'hr-1',
          url: '/images/enhanced_hotel_room_bed.jpg',
          caption: 'Executive & Classic King Bedrooms',
          subcaption: 'Plush bedding, wood-paneled walls & quiet split-unit AC',
        },
        {
          id: 'hr-2',
          url: '/images/enhanced_hotel_courtyard.jpg',
          caption: 'Private Courtyard Guest Wings & Balconies',
          subcaption: 'Peaceful upper-floor accommodations overlooking the grounds',
        },
        {
          id: 'hr-3',
          url: '/images/enhanced_hotel_night_facade.jpg',
          caption: '24/7 Continuous Power Across Every Suite',
          subcaption: 'Reliable comfort day and night',
        },
      ],
      homePool: [
        {
          id: 'hp-1',
          url: '/images/enhanced_pool_wide.jpg',
          caption: 'Standard Olympic-Size Swimming Pool',
          subcaption: 'Complimentary daily access for all registered guests',
        },
        {
          id: 'hp-2',
          url: '/images/enhanced_pool_jacuzzi.jpg',
          caption: 'Circular Mosaic Relaxation Deck & Steps',
          subcaption: 'Safe shallow steps and shaded poolside seating',
        },
        {
          id: 'hp-3',
          url: '/images/enhanced_pool_night.jpg',
          caption: 'Illuminated Night Pool & Live Music Deck',
          subcaption: 'Unwind by the water with evening drinks and music',
        },
      ],
      homeDining: [
        {
          id: 'hd-1',
          url: '/images/enhanced_pool_night.jpg',
          caption: 'Nightlife Poolside Lounge & Stage',
          subcaption: 'Fresh catfish pepper soup, Asun, and ice-cold drinks',
        },
        {
          id: 'hd-2',
          url: '/images/enhanced_pool_wide.jpg',
          caption: 'Great Beer Poolside Bar & Terrace',
          subcaption: 'Open-air dining and chilled refreshments all day',
        },
        {
          id: 'hd-3',
          url: '/images/enhanced_hotel_courtyard.jpg',
          caption: 'Courtyard Outdoor Seating',
          subcaption: 'Authentic Ofe Owerri, Egusi, and Nigerian delicacies',
        },
      ],
      servicesPage: [
        {
          id: 'sp-1',
          url: '/images/enhanced_hotel_room_bed.jpg',
          caption: 'Spotless Air-Conditioned Rooms',
          subcaption: 'Starting from ₦30,000 per night',
        },
        {
          id: 'sp-2',
          url: '/images/enhanced_hotel_courtyard.jpg',
          caption: 'Executive Wing & Suite Balconies',
          subcaption: 'Serene surroundings with 24/7 backup power',
        },
        {
          id: 'sp-3',
          url: '/images/enhanced_hotel_night_facade.jpg',
          caption: 'Illuminated Reception & Gated Compound',
          subcaption: '24-hour check-in and physical security',
        },
      ],
      diningPoolPage: [
        {
          id: 'dp-1',
          url: '/images/enhanced_pool_wide.jpg',
          caption: 'Olympic Swimming Pool & Great Beer Bar',
          subcaption: 'Daytime recreation and poolside dining',
        },
        {
          id: 'dp-2',
          url: '/images/enhanced_pool_jacuzzi.jpg',
          caption: 'Mosaic Pool Steps & Lounge Seating',
          subcaption: 'Clean treated water maintained daily',
        },
        {
          id: 'dp-3',
          url: '/images/enhanced_pool_night.jpg',
          caption: 'Poolside Nightlife & DJ Stage',
          subcaption: 'Sizzling grills, cocktails, and evening music',
        },
        {
          id: 'dp-4',
          url: '/images/enhanced_hotel_courtyard.jpg',
          caption: 'Outdoor Terrace & African Kitchen',
          subcaption: 'Ofe Owerri, Nkwobi, and fresh Nigerian soups',
        },
      ],
      aboutPage: [
        {
          id: 'ap-1',
          url: '/images/enhanced_hotel_day_exterior.jpg',
          caption: 'Dussel Hotels Main Architectural Facade',
          subcaption: 'Strategically positioned along MCC Uratta Road, Owerri',
        },
        {
          id: 'ap-2',
          url: '/images/enhanced_hotel_courtyard.jpg',
          caption: 'Signature Sunflower Murals & Courtyard',
          subcaption: 'Artistic elegance in a peaceful Imo State environment',
        },
        {
          id: 'ap-3',
          url: '/images/enhanced_pool_wide.jpg',
          caption: 'Full Resort Leisure Facilities',
          subcaption: 'Olympic pool, bar, and authentic local hospitality',
        },
        {
          id: 'ap-4',
          url: '/images/enhanced_hotel_night_facade.jpg',
          caption: '24/7 Uninterrupted Power & Night Security',
          subcaption: 'Peace of mind for business and family travelers',
        },
      ],
      locationPage: [
        {
          id: 'lp-1',
          url: '/images/enhanced_hotel_day_exterior.jpg',
          caption: 'Daytime Landmark View — MCC Uratta Road',
          subcaption: 'Directly after ABC Workshop Uratta, Ikenegbu, Owerri',
        },
        {
          id: 'lp-2',
          url: '/images/enhanced_hotel_night_facade.jpg',
          caption: 'Nighttime Illuminated Landmark',
          subcaption: 'Unmistakable blue & crimson lighting visible from MCC Road',
        },
        {
          id: 'lp-3',
          url: '/images/enhanced_hotel_courtyard.jpg',
          caption: 'Spacious Gated Driveway & Parking',
          subcaption: 'Secure parking inside our walled compound',
        },
      ],
      bookPage: [
        {
          id: 'bp-1',
          url: '/images/enhanced_hotel_room_bed.jpg',
          caption: 'Reserve Your Suite Directly',
          subcaption: 'Instant confirmation via WhatsApp or Phone',
        },
        {
          id: 'bp-2',
          url: '/images/enhanced_hotel_night_facade.jpg',
          caption: '24-Hour Front Desk Reception',
          subcaption: 'Seamless late check-in & secure parking',
        },
        {
          id: 'bp-3',
          url: '/images/enhanced_pool_wide.jpg',
          caption: 'Every Stay Includes Olympic Pool Access',
          subcaption: 'Complimentary recreation & continuous 24/7 power',
        },
      ],
      adminPage: [
        {
          id: 'adm-1',
          url: '/images/enhanced_hotel_night_facade.jpg',
          caption: 'Dussel Hotels Night View — Management Portal',
          subcaption: 'Live pricing, menus & media control center',
        },
        {
          id: 'adm-2',
          url: '/images/enhanced_pool_night.jpg',
          caption: 'Nightlife & Poolside Operations',
          subcaption: 'Real-time updates reflected across all guest pages',
        },
      ],
    },
    hotelInfo: {
      name: 'Dussel Hotels',
      tagline:
        'Modern upscale 5-star boutique hospitality in a serene environment on MCC Uratta Road, Owerri — featuring continuous 24/7 power, Olympic swimming pool, and authentic African dining.',
      address: 'MCC, Uratta Road, Ikenegbu, Owerri 460281, Imo State',
      landmark: 'After ABC Workshop Uratta',
      phone: '+234 913 476 4393',
      whatsapp: '+234 913 476 4393',
      email: 'dusselhotel@gmail.com',
      openHours: 'Monday – Sunday, 24 Hours',
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM',
      mapsUrl: 'https://www.google.com/maps/place/Dussel+Hotels/@5.4907042,7.0548521,17z',
      mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=5.4907042,7.0548521',
    },
    updatedAt: new Date().toISOString(),
  };
}

export function createDefaultDatabase(): HotelDatabase {
  return {
    ...createDefaultPublicData(),
    adminAuth: createInitialAdminAuth(),
  };
}
