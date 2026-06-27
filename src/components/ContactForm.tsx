'use client';

import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('loading');

    // Simulate API request timeout
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div 
        className="glass-card fade-in-up" 
        style={{ 
          textAlign: 'center', 
          padding: '3rem 2rem', 
          borderColor: 'var(--secondary)', 
          background: 'rgba(6, 182, 212, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <CheckCircle size={48} style={{ color: 'var(--secondary)' }} />
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Message Sent Successfully!</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Thank you for reaching out, Philip will get back to you as soon as possible.
        </p>
        <button 
          onClick={() => setStatus('idle')} 
          className="btn btn-secondary" 
          style={{ marginTop: '1rem' }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>Send a Message</h3>
      
      {status === 'error' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid var(--accent)', borderRadius: '8px', color: 'var(--accent)' }}>
          <AlertCircle size={20} />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. John Doe"
          required
          disabled={status === 'loading'}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. johndoe@example.com"
          required
          disabled={status === 'loading'}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={5}
          className="form-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your project, freelance offer, or message details..."
          required
          disabled={status === 'loading'}
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '1rem' }}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
        <Send size={16} />
      </button>
    </form>
  );
}
