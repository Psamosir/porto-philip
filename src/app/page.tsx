import Link from 'next/link';
import { 
  Briefcase, 
  GraduationCap, 
  Layers, 
  MapPin, 
  Mail, 
  Phone, 
  Award, 
  ExternalLink, 
  Globe
} from 'lucide-react';
import { getPortfolioData } from '@/lib/blobDb';

export const revalidate = 0; // Disable caching so it always gets the latest data from Vercel Blob

export default async function HomePage() {
  const data = await getPortfolioData();
  const { bio = {}, contact = {}, skills = [], experience = [], education = [], activities = [], languages = [], projects = [] } = data;

  return (
    <div className="fade-in-up">
      {/* 1. Hero Section */}
      <section id="hero" style={{ padding: '10rem 0 6rem', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '30px', background: 'rgba(162, 123, 92, 0.12)', border: '1px solid rgba(162, 123, 92, 0.2)', marginBottom: '1.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)', display: 'inline-block' }}></span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>AVAILABLE FOR FREELANCE & INTERNSHIP</span>
            </div>
            <h1 style={{ fontSize: '4.2rem', lineHeight: '1.1', marginBottom: '1.5rem', fontWeight: 800 }}>
              Hi, I am <br />
              <span className="gradient-accent">{bio.name || 'Philip Damian Samosir'}</span>
            </h1>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              {bio.title || 'UI/UX Designer & Frontend Developer'}
            </h2>
            <p style={{ fontSize: '1.15rem', marginBottom: '3rem', maxWidth: '600px' }}>
              {bio.about || 'Informatics Engineering student with a strong interest in UI/UX Design and web development.'}
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary">
                Get in Touch <Mail size={16} />
              </Link>
              <a href="#projects" className="btn btn-secondary">
                View My Projects <Layers size={16} />
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              position: 'relative', 
              width: '320px', 
              height: '320px', 
              borderRadius: '24px', 
              background: 'linear-gradient(135deg, rgba(78, 54, 41, 0.15) 0%, rgba(162, 123, 92, 0.15) 100%)',
              border: '2px solid var(--border-color)',
              boxShadow: '0 15px 40px rgba(78, 54, 41, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {bio.avatar ? (
                <img 
                  src={bio.avatar} 
                  alt={bio.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '6.5rem', 
                    fontWeight: 800, 
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.05em'
                  }}>
                    PS
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', marginTop: '-0.5rem' }}>
                    BATAM, INDONESIA
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Skills Section */}
      <section id="skills" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Technical <span className="gradient-accent">Skills</span></h2>
          <p className="section-subtitle">
            Tools and technologies I use to turn ideas into prototypes, wireframes, and responsive codebases.
          </p>

          <div className="skills-grid">
            {/* Design & Tools */}
            <div className="glass-card skill-card">
              <h3 style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Layers size={20} className="gradient-accent" style={{ color: 'var(--secondary)' }} />
                <span>Design & Tools</span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {skills.filter((s: any) => s.category !== 'Frontend').map((skill: any, idx: number) => (
                  <div key={idx}>
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      <span style={{ color: 'var(--secondary)' }}>{skill.level}%</span>
                    </div>
                    <div className="skill-track">
                      <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Development & Frontend */}
            <div className="glass-card skill-card">
              <h3 style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Layers size={20} className="gradient-accent" style={{ color: 'var(--primary)' }} />
                <span>Development & Languages</span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {skills.filter((s: any) => s.category === 'Frontend').map((skill: any, idx: number) => (
                  <div key={idx}>
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      <span style={{ color: 'var(--primary)' }}>{skill.level}%</span>
                    </div>
                    <div className="skill-track">
                      <div className="skill-progress" style={{ width: `${skill.level}%`, background: 'linear-gradient(90deg, var(--secondary), var(--primary))' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Experience Section */}
      <section id="experience">
        <div className="container">
          <h2 className="section-title">Work & Projects <span className="gradient-accent">Experience</span></h2>
          <p className="section-subtitle">
            My professional journey, internships, and layout development projects.
          </p>

          <div className="timeline">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{exp.role}</h3>
                  <div className="company">{exp.company}</div>
                  <span className="period">{exp.period}</span>
                  <ul>
                    {exp.description.map((desc: string, i: number) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Projects Section */}
      <section id="projects" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Selected <span className="gradient-accent">Projects</span></h2>
          <p className="section-subtitle">
            A curated showcase of design and development projects.
          </p>

          <div className="projects-grid">
            {projects.map((project: any) => (
              <div key={project.id} className="glass-card project-card">
                <div className="project-img-wrapper">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="project-img-placeholder">
                      <Layers size={36} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                      <span>{project.title} Preview</span>
                    </div>
                  )}
                </div>
                
                <div className="project-tags">
                  {project.tags.map((tag: string, i: number) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-links">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      Live Demo <ExternalLink size={14} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      Codebase <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Education & Languages Section */}
      <section id="education-languages">
        <div className="container">
          <div className="edu-lang-grid">
            {/* Education */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <GraduationCap size={28} className="gradient-accent" style={{ color: 'var(--primary)' }} />
                <span>Education</span>
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {education.map((edu: any, index: number) => (
                  <div key={index} className="edu-item">
                    <h3>{edu.degree}</h3>
                    <div className="institution">{edu.institution}</div>
                    <span className="period">{edu.period}</span>
                    <p style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Globe size={28} className="gradient-accent" style={{ color: 'var(--secondary)' }} />
                <span>Languages</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {languages.map((lang: any, index: number) => (
                  <div key={index}>
                    <div className="skill-info" style={{ marginBottom: '0.8rem' }}>
                      <span>{lang.name}</span>
                      <span style={{ color: 'var(--secondary)' }}>{lang.level === 100 ? 'Native / Fluent' : `${lang.level}%`}</span>
                    </div>
                    <div className="skill-track" style={{ height: '6px' }}>
                      <div className="skill-progress" style={{ width: `${lang.level}%`, background: 'linear-gradient(90deg, var(--secondary), var(--primary))' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Activities & Certificates Section */}
      <section id="activities" style={{ background: 'var(--bg-secondary)', paddingBottom: '8rem' }}>
        <div className="container">
          <h2 className="section-title">Activities & <span className="gradient-accent">Certificates</span></h2>
          <p className="section-subtitle">
            External engagements and recognitions.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {activities.map((act: any, idx: number) => (
              <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ display: 'inline-flex', padding: '0.4rem', borderRadius: '8px', background: 'rgba(162, 123, 92, 0.12)', color: 'var(--secondary)' }}>
                    <Award size={20} />
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{act.date}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>{act.title}</h3>
                <p style={{ fontSize: '0.95rem' }}>{act.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
