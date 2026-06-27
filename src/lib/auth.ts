import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'portfolio-philip-secret-token-key-2026';

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return !!decoded;
  } catch (err) {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return false;
    
    return await verifyAdminToken(token);
  } catch (err) {
    return false;
  }
}

export function generateAdminToken(): string {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
}
