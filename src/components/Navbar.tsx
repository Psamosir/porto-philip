'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Terminal } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Articles', path: '/articles' },
    { label: 'Contact', path: '/contact' },
    { label: 'Admin', path: '/admin' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="logo">
          <Terminal size={22} className="gradient-accent" style={{ stroke: 'url(#svg-gradient)' }} />
          <span>Philip<span className="gradient-accent">.dev</span></span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links" style={{ display: 'flex' }}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`nav-link ${pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="mobile-toggle"
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SVG Gradient definition for Lucide icons */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <linearGradient id="svg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--secondary)" />
        </linearGradient>
      </svg>

      {/* Mobile Links Modal/Dropdown */}
      {isOpen && (
        <div 
          className="mobile-menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem 2rem',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`nav-link ${pathname === link.path ? 'active' : ''}`}
              style={{ fontSize: '1.1rem', padding: '0.5rem 0' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

    </nav>
  );
}
