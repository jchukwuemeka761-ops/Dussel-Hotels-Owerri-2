import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { sanitizeUploadFilename } from '@/lib/hotel-logic';
import { isAdminAuthenticated } from '@/lib/server-auth';
import { getDataPaths } from '@/lib/store';

export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]);

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please select an image file to upload.' }, { status: 400 });
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_TYPES.has(file.type) && !['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
      return NextResponse.json(
        { error: 'Only JPG, PNG, and WEBP image formats are supported.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'Image size must be 10 MB or smaller.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = sanitizeUploadFilename(file.name);

    try {
      const { uploadsDir } = getDataPaths();
      const targetPath = path.join(uploadsDir, filename);
      fs.writeFileSync(targetPath, buffer);
      return NextResponse.json({
        url: `/api/uploads/${filename}`,
        filename,
        storage: 'disk',
      });
    } catch {
      const mime = file.type && ALLOWED_TYPES.has(file.type) ? file.type : 'image/jpeg';
      const dataUrl = `data:${mime};base64,${buffer.toString('base64')}`;
      return NextResponse.json({
        url: dataUrl,
        filename,
        storage: 'inline',
      });
    }
  } catch {
    return NextResponse.json({ error: 'Failed to process image upload.' }, { status: 400 });
  }
}
