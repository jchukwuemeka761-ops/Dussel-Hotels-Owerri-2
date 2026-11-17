import { NextRequest, NextResponse } from 'next/server';
import { signSessionToken, verifyPassword } from '@/lib/auth';
import { ADMIN_COOKIE_NAME } from '@/lib/server-auth';
import { readDatabase } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { password?: string };
    const password = typeof body.password === 'string' ? body.password : '';

    const db = readDatabase();
    const isValid = verifyPassword(password, db.adminAuth);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials. Please verify your password and try again.' },
        { status: 401 }
      );
    }

    const token = signSessionToken(db.adminAuth.sessionSecret);
    const isHttps =
      req.headers.get('x-forwarded-proto') === 'https' ||
      req.url.startsWith('https://');

    const response = NextResponse.json({
      authenticated: true,
      isDefaultPassword: db.adminAuth.isDefaultPassword,
    });

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isHttps,
      path: '/',
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Unable to process login request.' },
      { status: 400 }
    );
  }
}
