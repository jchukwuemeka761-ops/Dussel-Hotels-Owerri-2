import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, signSessionToken, verifyPassword } from '@/lib/auth';
import { validatePasswordChangeInput } from '@/lib/hotel-logic';
import { ADMIN_COOKIE_NAME, isAdminAuthenticated } from '@/lib/server-auth';
import { readDatabase, writeDatabase } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    };

    const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : '';
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';
    const confirmPassword = typeof body.confirmPassword === 'string' ? body.confirmPassword : '';

    const validation = validatePasswordChangeInput(currentPassword, newPassword, confirmPassword);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const db = readDatabase();
    if (!verifyPassword(currentPassword, db.adminAuth)) {
      return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 400 });
    }

    const newSalt = crypto.randomBytes(16).toString('hex');
    const newHash = hashPassword(newPassword.trim(), newSalt);
    const nextDb = writeDatabase({
      ...db,
      adminAuth: {
        ...db.adminAuth,
        passwordHash: newHash,
        salt: newSalt,
        isDefaultPassword: false,
      },
    });

    const refreshedToken = signSessionToken(nextDb.adminAuth.sessionSecret);
    const isHttps =
      req.headers.get('x-forwarded-proto') === 'https' ||
      req.url.startsWith('https://');

    const response = NextResponse.json({
      success: true,
      isDefaultPassword: false,
      message: 'Admin password updated successfully.',
    });

    response.cookies.set(ADMIN_COOKIE_NAME, refreshedToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isHttps,
      path: '/',
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Failed to update password.' }, { status: 400 });
  }
}
