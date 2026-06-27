import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import LoginForm from '@/components/LoginForm';

export const revalidate = 0; // Prevent page cache to evaluate auth state correctly

export default async function AdminLoginPage() {
  const isAuth = await isAdminAuthenticated();
  
  if (isAuth) {
    redirect('/admin');
  }

  return (
    <div className="container fade-in-up" style={{ padding: '10rem 0 6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '75vh' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <LoginForm />
      </div>
    </div>
  );
}
