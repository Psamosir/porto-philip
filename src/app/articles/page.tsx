import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getArticles } from '@/lib/blobDb';

export const revalidate = 0; // Disable cache so the latest blog posts always load immediately

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="container fade-in-up" style={{ padding: '8rem 0 6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '30px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', marginBottom: '1rem' }}>
          <BookOpen size={14} style={{ color: 'var(--secondary)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>MY WRITINGS</span>
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.2rem' }}>
          Articles & <span className="gradient-accent">Blogs</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Thoughts, design guides, and developer stories. Exploring human-computer interaction, coding patterns, and layout aesthetics.
        </p>
      </div>

      {articles.length === 0 ? (
        <div style={{ textCombineUpright: 'center', textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
          <p>No articles published yet. Check back soon!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem' }}>
          {articles.map((article: any) => (
            <article key={article.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Cover Image Placeholder or Actual Image */}
              <div style={{ height: '200px', background: '#121927', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.5rem', position: 'relative' }}>
                {article.coverImage ? (
                  <img 
                    src={article.coverImage} 
                    alt={article.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(139,92,246,0.1) 100%)', color: 'var(--text-muted)' }}>
                    <BookOpen size={40} style={{ opacity: 0.4 }} />
                  </div>
                )}
              </div>

              {/* Meta tags */}
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} />
                  {article.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={14} />
                  {article.readTime || '3 min read'}
                </span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '1.45rem', marginBottom: '1rem', lineHeight: '1.3' }}>
                <Link href={`/articles/${article.id}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  {article.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1, lineBreak: 'anywhere' }}>
                {article.excerpt}
              </p>

              {/* Tags and Link */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: 'auto' }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {article.tags?.slice(0, 2).map((tag: string, i: number) => (
                    <span key={i} className="project-tag" style={{ fontSize: '0.7rem' }}>{tag}</span>
                  ))}
                </div>
                <Link href={`/articles/${article.id}`} className="project-link">
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
