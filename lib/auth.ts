import crypto from 'crypto';
import type { AdminAuthRecord } from './hotel-types';

export const INITIAL_DEFAULT_PASSWORD = 'DusselHotels2026';

const DEFAULT_NORMALIZED_VARIANTS = new Set([
  'dusselhotels2026',
  'dusselhotel2026',
  'dussel2026',
]);

export function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

export function createInitialAdminAuth(): AdminAuthRecord {
  const salt = crypto.randomBytes(16).toString('hex');
  const sessionSecret = crypto.randomBytes(32).toString('hex');
  return {
    passwordHash: hashPassword(INITIAL_DEFAULT_PASSWORD, salt),
    salt,
    isDefaultPassword: true,
    sessionSecret,
  };
}

export function safeEqualHex(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'hex');
  const bufB = Buffer.from(b, 'hex');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyPassword(input: string, authRecord: AdminAuthRecord): boolean {
  if (!input || typeof input !== 'string') return false;
  const trimmed = input.trim();
  const candidateHash = hashPassword(trimmed, authRecord.salt);
  if (safeEqualHex(candidateHash, authRecord.passwordHash)) {
    return true;
  }

  // Only while the initial default password is still active, allow spacing/casing variations
  // of the hotel name + 2026 (e.g., "Dussel Hotels 2026", "dusselhotels2026", "Dussel2026").
  if (authRecord.isDefaultPassword) {
    const normalized = trimmed.toLowerCase().replace(/\s+/g, '');
    if (DEFAULT_NORMALIZED_VARIANTS.has(normalized)) {
      return true;
    }
  }

  return false;
}

export interface SessionPayload {
  role: 'admin';
  iat: number;
  exp: number;
}

export function signSessionToken(secret: string, ttlSeconds = 60 * 60 * 12): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    role: 'admin',
    iat: now,
    exp: now + ttlSeconds,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');
  return `${payloadB64}.${signature}`;
}

export function verifySessionToken(token: string | undefined, secret: string): SessionPayload | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;

  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8')) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);
    if (parsed.role !== 'admin' || typeof parsed.exp !== 'number' || parsed.exp < now) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
