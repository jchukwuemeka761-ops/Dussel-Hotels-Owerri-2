import crypto from 'crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialAdminAuth,
  hashPassword,
  INITIAL_DEFAULT_PASSWORD,
  signSessionToken,
  verifyPassword,
  verifySessionToken,
} from './auth';
import {
  formatNaira,
  groupMenuItemsByCategory,
  isSafeStoredFilename,
  sanitizeAdminPayload,
  sanitizeUploadFilename,
  validatePasswordChangeInput,
} from './hotel-logic';
import { createDefaultPublicData } from './default-data';

test('default admin password authenticates DusselHotels2026 and rejects wrong password', () => {
  const auth = createInitialAdminAuth();
  assert.equal(verifyPassword(INITIAL_DEFAULT_PASSWORD, auth), true);
  assert.equal(verifyPassword('dussel hotels 2026', auth), true);
  assert.equal(verifyPassword('wrongpass', auth), false);
  assert.equal(verifyPassword('', auth), false);
});

test('changing password invalidates default password and enforces exact new hash', () => {
  const auth = createInitialAdminAuth();
  const newSalt = crypto.randomBytes(16).toString('hex');
  const updatedAuth = {
    ...auth,
    salt: newSalt,
    passwordHash: hashPassword('OwnerSecret99!', newSalt),
    isDefaultPassword: false,
  };

  assert.equal(verifyPassword(INITIAL_DEFAULT_PASSWORD, updatedAuth), false);
  assert.equal(verifyPassword('OwnerSecret99!', updatedAuth), true);
  assert.equal(verifyPassword('ownersecret99!', updatedAuth), false);
});

test('session token signing, tampering check, and expiration', () => {
  const secret = 'test-session-secret';
  const token = signSessionToken(secret, 3600);
  const decoded = verifySessionToken(token, secret);
  assert.ok(decoded);
  assert.equal(decoded?.role, 'admin');

  const tampered = `${token.slice(0, -2)}xx`;
  assert.equal(verifySessionToken(tampered, secret), null);

  const expired = signSessionToken(secret, -10);
  assert.equal(verifySessionToken(expired, secret), null);
});

test('upload filename sanitization prevents path traversal', () => {
  const safe = sanitizeUploadFilename('../../My Luxury Suite!!.PNG');
  assert.match(safe, /^my-luxury-suite-[a-z0-9-]+\.png$/);
  assert.equal(isSafeStoredFilename(safe), true);
  assert.equal(isSafeStoredFilename('../secret.jpg'), false);
  assert.equal(isSafeStoredFilename('script.js'), false);
});

test('menu grouping filters unavailable items and groups by category', () => {
  const groups = groupMenuItemsByCategory([
    {
      id: '1',
      name: 'Ofe Owerri',
      category: 'Soups',
      price: 7500,
      description: 'Classic',
      tags: [],
      image: '/images/enhanced_hotel_courtyard.jpg',
      available: true,
    },
    {
      id: '2',
      name: 'Hidden Dish',
      category: 'Soups',
      price: 5000,
      description: 'Hidden',
      tags: [],
      image: '/images/enhanced_hotel_courtyard.jpg',
      available: false,
    },
    {
      id: '3',
      name: 'Jollof Rice',
      category: 'Rice',
      price: 5500,
      description: 'Smoky',
      tags: [],
      image: '/images/enhanced_hotel_day_exterior.jpg',
      available: true,
    },
  ]);

  assert.equal(groups.length, 2);
  assert.equal(groups[0].category, 'Soups');
  assert.equal(groups[0].items.length, 1);
  assert.equal(groups[1].category, 'Rice');
});

test('validatePasswordChangeInput enforces length and matching confirmation', () => {
  assert.equal(validatePasswordChangeInput('', 'NewPass123', 'NewPass123').valid, false);
  assert.equal(validatePasswordChangeInput('old', '123', '123').valid, false);
  assert.equal(validatePasswordChangeInput('old', 'NewPass123', 'Mismatch').valid, false);
  assert.equal(validatePasswordChangeInput('old', 'NewPass123', 'NewPass123').valid, true);
});

test('sanitizeAdminPayload preserves valid edits and formats Naira cleanly', () => {
  const defaults = createDefaultPublicData();
  const updatedRooms = [
    {
      ...defaults.rooms[0],
      pricePerNight: 32500,
      priceDisplay: formatNaira(32500),
    },
  ];
  const res = sanitizeAdminPayload({ ...defaults, rooms: updatedRooms }, defaults);
  assert.equal(res.ok, true);
  if (res.ok) {
    assert.equal(res.data.rooms[0].pricePerNight, 32500);
    assert.equal(res.data.rooms[0].priceDisplay, '₦32,500');
  }
});
