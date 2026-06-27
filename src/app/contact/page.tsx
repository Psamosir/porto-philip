import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { getPortfolioData } from '@/lib/blobDb';
import ContactForm from '@/components/ContactForm';

export const revalidate = 0; // Fresh contact information is fetched each time

export default async function ContactPage() {
  const data = await getPortfolioData();
  const contact = data.contact || {};

  return (
    <div className="container fade-in-up" style={{ padding: '8rem 0 6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '30px', background: 'rgba(162, 123, 92, 0.12)', border: '1px solid rgba(162, 123, 92, 0.2)', marginBottom: '1rem' }}>
          <MessageSquare size={14} style={{ color: 'var(--primary)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>GET IN TOUCH</span>
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.2rem' }}>
          Let's Work <span className="gradient-accent">Together</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Have an exciting project, an internship opportunity, or just want to connect? Drop a message or reach out on social media!
        </p>
      </div>

      <div className="contact-grid">
        {/* Left side: Information badges */}
        <div className="contact-info">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Contact Information</h3>
          <p style={{ marginBottom: '1rem' }}>Feel free to contact me directly using any of the networks below.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Phone */}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="contact-badge">
                <div className="contact-badge-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-badge-text">
                  <h4>Phone Number</h4>
                  <p>{contact.phone}</p>
                </div>
              </a>
            )}

            {/* Email */}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="contact-badge">
                <div className="contact-badge-icon" style={{ background: 'rgba(162, 123, 92, 0.12)', color: 'var(--primary)' }}>
                  <Mail size={20} />
                </div>
                <div className="contact-badge-text">
                  <h4>Email Address</h4>
                  <p>{contact.email}</p>
                </div>
              </a>
            )}

            {/* Location */}
            {contact.location && (
              <div className="contact-badge" style={{ cursor: 'default' }}>
                <div className="contact-badge-icon" style={{ background: 'rgba(194, 122, 63, 0.12)', color: 'var(--accent)' }}>
                  <MapPin size={20} />
                </div>
                <div className="contact-badge-text">
                  <h4>Location</h4>
                  <p>{contact.location}</p>
                </div>
              </div>
            )}
          </div>

          {/* Social Links Badge */}
          <div className="glass-card" style={{ marginTop: '1.5rem', padding: '1.8rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem' }}>Connect on Social Media</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn
                </a>
              )}
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> GitHub
                </a>
              )}
              {contact.instagram && (
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg> Instagram
                </a>
              )}
              {contact.whatsapp && (
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', background: '#22c55e', boxShadow: '0 4px 15px rgba(34, 197, 94, 0.2)' }}>
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right side: Contact Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
