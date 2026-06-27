import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Philip Damian Samosir | Portfolio',
  description: 'Informatics Engineering Student & UI/UX Designer Portfolio. Experienced in wireframing, prototyping, and modern web layouts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {/* Glow backgrounds */}
        <div className="bg-glow bg-glow-1"></div>
        <div className="bg-glow bg-glow-2"></div>
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main style={{ minHeight: '85vh' }}>
          {children}
        </main>
        
        {/* Footer */}
        <footer>
          <div className="container">
            <div className="footer-socials">
              <a href="https://github.com/philipsamosir" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                GitHub
              </a>
              <a href="https://linkedin.com/in/philip-damian-samosir" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                LinkedIn
              </a>
              <a href="mailto:philipsamosir3@gmail.com" aria-label="Email">
                Email
              </a>
            </div>
            <p>&copy; {new Date().getFullYear()} Philip Damian Samosir. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
