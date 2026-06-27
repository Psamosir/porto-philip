import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react';
import { getArticles } from '@/lib/blobDb';

export const revalidate = 0; // Ensure fresh articles are always loaded

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const articles = await getArticles();
  const article = articles.find((art: any) => art.id === id);

  if (!article) {
    notFound();
  }

  // A light, client-free text renderer that formats standard paragraphs, subheadings, and bullet lists
  const renderParagraphs = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={index} style={{ fontSize: '1.4rem', fontWeight: 700, margin: '2rem 0 1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={index} style={{ fontSize: '1.8rem', fontWeight: 700, margin: '2.5rem 0 1.2rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      
      if (trimmed.startsWith('- ')) {
        const listItems = trimmed.split('\n').map(item => item.replace('- ', '').trim());
        return (
          <ul key={index} style={{ margin: '1.5rem 0', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
            {listItems.map((item, itemIdx) => (
              <li key={itemIdx} style={{ marginBottom: '0.6rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {item}
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} style={{ margin: '1.2rem 0 1.5rem', lineHeight: '1.85', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="container fade-in-up" style={{ padding: '8rem 0 6rem', maxWidth: '800px' }}>
      {/* Back button */}
      <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, marginBottom: '2.5rem', transition: 'color 0.2s' }} className="project-link">
        <ArrowLeft size={16} /> Back to Articles
      </Link>

      <article>
        {/* Cover image placeholder or actual cover image */}
        <div style={{ height: '380px', width: '100%', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden', marginBottom: '2.5rem', position: 'relative' }}>
          {article.coverImage ? (
            <img 
              src={article.coverImage} 
              alt={article.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(139,92,246,0.08) 100%)', color: 'var(--text-muted)' }}>
              <BookOpen size={64} style={{ opacity: 0.3 }} />
            </div>
          )}
        </div>

        {/* Date and read time */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={16} />
            {article.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={16} />
            {article.readTime || '3 min read'}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '3rem', lineHeight: '1.2', fontWeight: 800, marginBottom: '2rem', fontFamily: 'var(--font-heading)' }} className="gradient-text">
          {article.title}
        </h1>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
          {article.tags?.map((tag: string, i: number) => (
            <span key={i} className="project-tag" style={{ padding: '0.3rem 0.8rem', borderRadius: '6px' }}>{tag}</span>
          ))}
        </div>

        {/* Body content */}
        <div className="article-body" style={{ marginTop: '2rem' }}>
          {renderParagraphs(article.content)}
        </div>
      </article>
    </div>
  );
}
