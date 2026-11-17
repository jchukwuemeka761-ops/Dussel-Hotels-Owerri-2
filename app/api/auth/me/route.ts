import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/server-auth';
import { readDatabase } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ authenticated: false }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  }
  const db = readDatabase();
  return NextResponse.json(
    {
      authenticated: true,
      isDefaultPassword: db.adminAuth.isDefaultPassword,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
