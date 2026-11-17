import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { sanitizeAdminPayload } from '@/lib/hotel-logic';
import type { PublicHotelData } from '@/lib/hotel-types';
import { isAdminAuthenticated } from '@/lib/server-auth';
import { readDatabase, toPublicHotelData, writeDatabase } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = readDatabase();
  return NextResponse.json(
    {
      ...toPublicHotelData(db),
      isDefaultPassword: db.adminAuth.isDefaultPassword,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function PUT(req: NextRequest) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as Partial<PublicHotelData>;
    const currentDb = readDatabase();
    const currentPublic = toPublicHotelData(currentDb);

    const validated = sanitizeAdminPayload(body, currentPublic);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const updatedDb = writeDatabase({
      ...validated.data,
      adminAuth: currentDb.adminAuth,
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/services');
      revalidatePath('/dining-pool');
      revalidatePath('/about');
      revalidatePath('/location');
      revalidatePath('/book');
    } catch {
      // Ignore revalidation errors outside Next request lifecycle
    }

    return NextResponse.json({
      success: true,
      data: toPublicHotelData(updatedDb),
    });
  } catch {
    return NextResponse.json({ error: 'Invalid update payload.' }, { status: 400 });
  }
}
