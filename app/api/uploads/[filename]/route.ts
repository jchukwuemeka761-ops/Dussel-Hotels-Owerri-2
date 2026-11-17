import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { isSafeStoredFilename } from '@/lib/hotel-logic';
import { getDataPaths } from '@/lib/store';

export const dynamic = 'force-dynamic';

const MIME_BY_EXT: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;
  if (!isSafeStoredFilename(filename)) {
    return NextResponse.json({ error: 'Invalid file reference.' }, { status: 400 });
  }

  const { uploadsDir } = getDataPaths();
  const filePath = path.join(uploadsDir, filename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
  }

  const ext = filename.split('.').pop()?.toLowerCase() || 'jpg';
  const contentType = MIME_BY_EXT[ext] || 'image/jpeg';
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
