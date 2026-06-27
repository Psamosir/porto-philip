import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';
import { isAdminAuthenticated } from '@/lib/auth';
import { hasBlobToken } from '@/lib/blobDb';

export async function POST(request: Request) {
  try {
    // 1. Verify Authentication
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ success: false, message: 'Filename is required' }, { status: 400 });
    }

    // Read request body as a buffer or blob
    const data = await request.arrayBuffer();
    const buffer = Buffer.from(data);

    // 2. Check if we should use Vercel Blob or local storage
    if (hasBlobToken()) {
      console.log(`Uploading file ${filename} to Vercel Blob Store...`);
      // Standard upload to Vercel Blob
      const blob = await put(`assets/${Date.now()}-${filename}`, buffer, {
        access: 'public',
      });
      return NextResponse.json({ success: true, url: blob.url });
    } else {
      console.log(`Saving file ${filename} locally...`);
      // Save locally to public/uploads/
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const safeFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(uploadDir, safeFilename);

      fs.writeFileSync(filePath, buffer);
      return NextResponse.json({ success: true, url: `/uploads/${safeFilename}` });
    }
  } catch (err) {
    console.error('Upload API Error:', err);
    return NextResponse.json(
      { success: false, message: 'Upload failed due to server error' },
      { status: 500 }
    );
  }
}
