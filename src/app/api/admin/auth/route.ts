import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateAdminToken } from '@/lib/auth';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      const token = generateAdminToken();
      const cookieStore = await cookies();
      
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({ success: true, message: 'Authenticated successfully' });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid password. Please check your credentials.' },
      { status: 401 }
    );
  } catch (err) {
    console.error('Auth API Error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error occurred.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Immediately delete
      path: '/',
    });
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Failed to clear session.' },
      { status: 500 }
    );
  }
}
