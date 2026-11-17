import fs from 'fs';
import path from 'path';
import { createDefaultDatabase } from './default-data';
import type { HotelDatabase, PublicHotelData } from './hotel-types';

function resolveDataDir(): string {
  const localDir = path.join(process.cwd(), 'data');
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    fs.accessSync(localDir, fs.constants.W_OK);
    return localDir;
  } catch {
    const tmpDir = path.join('/tmp', 'dussel-hotels-data');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return tmpDir;
  }
}

export function getDataPaths() {
  const dataDir = resolveDataDir();
  const uploadsDir = path.join(dataDir, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  return {
    dataDir,
    uploadsDir,
    dbFile: path.join(dataDir, 'hotel-store.json'),
  };
}

export function readDatabase(): HotelDatabase {
  const { dbFile } = getDataPaths();
  try {
    if (fs.existsSync(dbFile)) {
      const raw = fs.readFileSync(dbFile, 'utf8');
      const parsed = JSON.parse(raw) as Partial<HotelDatabase>;
      const defaults = createDefaultDatabase();
      // Merge defensively so newly added schema sections are always present
      return {
        rooms: Array.isArray(parsed.rooms) ? parsed.rooms : defaults.rooms,
        foodItems: Array.isArray(parsed.foodItems) ? parsed.foodItems : defaults.foodItems,
        drinkItems: Array.isArray(parsed.drinkItems) ? parsed.drinkItems : defaults.drinkItems,
        serviceItems: Array.isArray(parsed.serviceItems) ? parsed.serviceItems : defaults.serviceItems,
        slideshows: {
          ...defaults.slideshows,
          ...(parsed.slideshows || {}),
        },
        hotelInfo: {
          ...defaults.hotelInfo,
          ...(parsed.hotelInfo || {}),
        },
        adminAuth: parsed.adminAuth && parsed.adminAuth.passwordHash
          ? parsed.adminAuth
          : defaults.adminAuth,
        updatedAt: parsed.updatedAt || defaults.updatedAt,
      };
    }
  } catch (err) {
    console.error('Error reading hotel database, initializing defaults:', err);
  }

  const fresh = createDefaultDatabase();
  writeDatabase(fresh);
  return fresh;
}

export function writeDatabase(db: HotelDatabase): HotelDatabase {
  const { dbFile } = getDataPaths();
  const nextDb: HotelDatabase = {
    ...db,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(dbFile, JSON.stringify(nextDb, null, 2), 'utf8');
  return nextDb;
}

export function toPublicHotelData(db: HotelDatabase): PublicHotelData {
  // Never expose adminAuth hashes or session secrets to clients
  const { adminAuth: _omit, ...publicData } = db;
  void _omit;
  return publicData;
}

export function getPublicHotelData(): PublicHotelData {
  return toPublicHotelData(readDatabase());
}
