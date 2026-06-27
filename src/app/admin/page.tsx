import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { getPortfolioData, getArticles } from '@/lib/blobDb';
import AdminDashboard from '@/components/AdminDashboard';

export const revalidate = 0; // Disable caching to fetch updated data

export default async function AdminPage() {
  const isAuth = await isAdminAuthenticated();
  
  if (!isAuth) {
    redirect('/admin/login');
  }

  // Fetch current database data to seed the editing dashboard
  const portfolio = await getPortfolioData();
  const articles = await getArticles();

  return (
    <div className="fade-in-up">
      <AdminDashboard portfolio={portfolio} articles={articles} />
    </div>
  );
}
