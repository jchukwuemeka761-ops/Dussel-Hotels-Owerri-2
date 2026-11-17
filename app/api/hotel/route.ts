import { NextResponse } from 'next/server';
import { getPublicHotelData } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = getPublicHotelData();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
