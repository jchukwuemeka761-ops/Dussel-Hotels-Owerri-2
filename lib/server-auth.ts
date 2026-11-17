import { cookies } from 'next/headers';
import { verifySessionToken } from './auth';
import { readDatabase } from './store';

export const ADMIN_COOKIE_NAME = 'dussel_admin_session';

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  const db = readDatabase();
  const payload = verifySessionToken(token, db.adminAuth.sessionSecret);
  return payload !== null;
}
