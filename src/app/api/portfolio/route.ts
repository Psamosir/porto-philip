import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/blobDb';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const resultUrl = await savePortfolioData(data);

    return NextResponse.json({ success: true, url: resultUrl });
  } catch (err) {
    console.error('Portfolio PUT API Error:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to update portfolio data' },
      { status: 500 }
    );
  }
}
