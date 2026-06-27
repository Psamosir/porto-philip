'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Layers, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Plus, 
  Trash2, 
  Save, 
  LogOut, 
  Upload, 
  Globe, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

interface AdminDashboardProps {
  portfolio: any;
  articles: any[];
}

type TabType = 'bio' | 'skills' | 'experience' | 'education' | 'projects' | 'articles';

export default function AdminDashboard({ portfolio: initialPortfolio, articles: initialArticles }: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('bio');
  
  // State variables for portfolio and articles data
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [articles, setArticles] = useState<any[]>(initialArticles);
  
  // Notification states
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // General Save handler for Portfolio Data
  const handleSavePortfolio = async (updatedData = portfolio) => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPortfolio(updatedData);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
    }
  };

  // General Save handler for Articles Data
  const handleSaveArticles = async (updatedArticles = articles) => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedArticles),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setArticles(updatedArticles);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth', { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);

    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        callback(data.url);
      } else {
        alert('File upload failed: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Upload failed due to connection error.');
    } finally {
      setUploadingField(null);
    }
  };

  // 1. BIO & CONTACT EDITORS
  const handleBioChange = (key: string, value: string) => {
    const updated = {
      ...portfolio,
      bio: { ...portfolio.bio, [key]: value }
    };
    setPortfolio(updated);
  };

  const handleContactChange = (key: string, value: string) => {
    const updated = {
      ...portfolio,
      contact: { ...portfolio.contact, [key]: value }
    };
    setPortfolio(updated);
  };

  // 2. SKILLS EDITORS
  const handleSkillChange = (index: number, key: string, value: any) => {
    const updatedSkills = [...portfolio.skills];
    updatedSkills[index] = { ...updatedSkills[index], [key]: value };
    const updated = { ...portfolio, skills: updatedSkills };
    setPortfolio(updated);
  };

  const handleAddSkill = () => {
    const updated = {
      ...portfolio,
      skills: [...portfolio.skills, { name: 'New Skill', category: 'Design', level: 80 }]
    };
    setPortfolio(updated);
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = portfolio.skills.filter((_: any, idx: number) => idx !== index);
    const updated = { ...portfolio, skills: updatedSkills };
    setPortfolio(updated);
  };

  // 3. EXPERIENCE EDITORS
  const handleExpChange = (index: number, key: string, value: any) => {
    const updatedExp = [...portfolio.experience];
    updatedExp[index] = { ...updatedExp[index], [key]: value };
    const updated = { ...portfolio, experience: updatedExp };
    setPortfolio(updated);
  };

  const handleExpDescChange = (expIndex: number, descIndex: number, value: string) => {
    const updatedExp = [...portfolio.experience];
    const updatedDesc = [...updatedExp[expIndex].description];
    updatedDesc[descIndex] = value;
    updatedExp[expIndex] = { ...updatedExp[expIndex], description: updatedDesc };
    setPortfolio({ ...portfolio, experience: updatedExp });
  };

  const handleAddExpDesc = (expIndex: number) => {
    const updatedExp = [...portfolio.experience];
    updatedExp[expIndex] = {
      ...updatedExp[expIndex],
      description: [...updatedExp[expIndex].description, 'New task description detail']
    };
    setPortfolio({ ...portfolio, experience: updatedExp });
  };

  const handleDeleteExpDesc = (expIndex: number, descIndex: number) => {
    const updatedExp = [...portfolio.experience];
    const updatedDesc = updatedExp[expIndex].description.filter((_: any, idx: number) => idx !== descIndex);
    updatedExp[expIndex] = { ...updatedExp[expIndex], description: updatedDesc };
    setPortfolio({ ...portfolio, experience: updatedExp });
  };

  const handleAddExp = () => {
    const newExp = {
      company: 'New Company',
      role: 'Role / Job Position',
      period: '2026 - Present',
      description: ['Accomplished task or project detail']
    };
    const updated = {
      ...portfolio,
      experience: [newExp, ...portfolio.experience]
    };
    setPortfolio(updated);
  };

  const handleDeleteExp = (index: number) => {
    const updatedExp = portfolio.experience.filter((_: any, idx: number) => idx !== index);
    setPortfolio({ ...portfolio, experience: updatedExp });
  };

  // 4. EDUCATION EDITORS
  const handleEduChange = (index: number, key: string, value: any) => {
    const updatedEdu = [...portfolio.education];
    updatedEdu[index] = { ...updatedEdu[index], [key]: value };
    setPortfolio({ ...portfolio, education: updatedEdu });
  };

  const handleAddEdu = () => {
    const newEdu = {
      institution: 'Name of School / University',
      degree: 'Degree of Studies',
      period: 'Year Start - End',
      details: 'Specific description'
    };
    setPortfolio({ ...portfolio, education: [newEdu, ...portfolio.education] });
  };

  const handleDeleteEdu = (index: number) => {
    const updatedEdu = portfolio.education.filter((_: any, idx: number) => idx !== index);
    setPortfolio({ ...portfolio, education: updatedEdu });
  };

  // 5. PROJECTS EDITORS
  const handleProjChange = (index: number, key: string, value: any) => {
    const updatedProj = [...portfolio.projects];
    updatedProj[index] = { ...updatedProj[index], [key]: value };
    setPortfolio({ ...portfolio, projects: updatedProj });
  };

  const handleProjTagsChange = (index: number, value: string) => {
    const tagsArray = value.split(',').map(tag => tag.trim()).filter(Boolean);
    const updatedProj = [...portfolio.projects];
    updatedProj[index] = { ...updatedProj[index], tags: tagsArray };
    setPortfolio({ ...portfolio, projects: updatedProj });
  };

  const handleAddProj = () => {
    const newProj = {
      id: `project-${Date.now()}`,
      title: 'New Design Project',
      description: 'Project summary descriptions.',
      image: '',
      tags: ['Figma', 'UI/UX'],
      demoUrl: '',
      githubUrl: ''
    };
    setPortfolio({ ...portfolio, projects: [newProj, ...portfolio.projects] });
  };

  const handleDeleteProj = (index: number) => {
    const updatedProj = portfolio.projects.filter((_: any, idx: number) => idx !== index);
    setPortfolio({ ...portfolio, projects: updatedProj });
  };

  // 6. ARTICLES EDITORS
  const handleArticleChange = (index: number, key: string, value: any) => {
    const updatedArticles = [...articles];
    updatedArticles[index] = { ...updatedArticles[index], [key]: value };
    setArticles(updatedArticles);
  };

  const handleArticleTagsChange = (index: number, value: string) => {
    const tagsArray = value.split(',').map(tag => tag.trim()).filter(Boolean);
    const updatedArticles = [...articles];
    updatedArticles[index] = { ...updatedArticles[index], tags: tagsArray };
    setArticles(updatedArticles);
  };

  const handleAddArticle = () => {
    const newArticle = {
      id: `article-${Date.now()}`,
      title: 'New Article Title',
      slug: `new-article-title-${Date.now()}`,
      excerpt: 'Brief 1-2 sentence overview of the article content.',
      content: 'Write your thoughts here. You can separate paragraphs with double enters. Use ### for subheadings and - for bullet points.',
      date: new Date().toISOString().split('T')[0],
      tags: ['Design', 'Web Dev'],
      coverImage: '',
      readTime: '3 min read'
    };
    setArticles([newArticle, ...articles]);
  };

  const handleDeleteArticle = (index: number) => {
    const updatedArticles = articles.filter((_, idx) => idx !== index);
    setArticles(updatedArticles);
  };

  return (
    <div className="container" style={{ padding: '8rem 0 6rem' }}>
      
      {/* Save Notification Toast */}
      {saveStatus !== 'idle' && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 999,
          padding: '1rem 1.5rem',
          borderRadius: '10px',
          background: saveStatus === 'saving' ? 'var(--primary)' : saveStatus === 'success' ? '#2d5a27' : '#8b2626',
          border: '1px solid ' + (saveStatus === 'saving' ? 'var(--secondary)' : saveStatus === 'success' ? '#4caf50' : '#f44336'),
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          boxShadow: '0 10px 30px rgba(78, 54, 41, 0.15)',
          animation: 'fadeInUp 0.3s ease'
        }}>
          {saveStatus === 'saving' && <span style={{ width: '16px', height: '16px', border: '2px solid transparent', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }}></span>}
          {saveStatus === 'success' && <Check size={18} />}
          {saveStatus === 'error' && <AlertTriangle size={18} />}
          <span style={{ fontWeight: 600 }}>
            {saveStatus === 'saving' ? 'Saving changes to Blob...' : saveStatus === 'success' ? 'Saved successfully!' : 'Saving failed.'}
          </span>
        </div>
      )}

      {/* Header Panel */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Admin <span className="gradient-accent">Dashboard</span></h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your personal details, project gallery, skills list, and blog articles</p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '3rem' }}>
        
        {/* Navigation Tabs */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('bio')} 
            className={`btn ${activeTab === 'bio' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start', gap: '0.8rem' }}
          >
            <User size={16} /> Bio & Contacts
          </button>
          <button 
            onClick={() => setActiveTab('skills')} 
            className={`btn ${activeTab === 'skills' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start', gap: '0.8rem' }}
          >
            <Globe size={16} /> Skills & Languages
          </button>
          <button 
            onClick={() => setActiveTab('experience')} 
            className={`btn ${activeTab === 'experience' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start', gap: '0.8rem' }}
          >
            <Briefcase size={16} /> Experiences
          </button>
          <button 
            onClick={() => setActiveTab('education')} 
            className={`btn ${activeTab === 'education' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start', gap: '0.8rem' }}
          >
            <GraduationCap size={16} /> Education
          </button>
          <button 
            onClick={() => setActiveTab('projects')} 
            className={`btn ${activeTab === 'projects' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start', gap: '0.8rem' }}
          >
            <Layers size={16} /> Projects Gallery
          </button>
          <button 
            onClick={() => setActiveTab('articles')} 
            className={`btn ${activeTab === 'articles' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start', gap: '0.8rem' }}
          >
            <BookOpen size={16} /> Articles / Blogs
          </button>
        </aside>

        {/* Content Pane */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          
          {/* TAB 1: BIO & CONTACTS */}
          {activeTab === 'bio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.6rem' }}>Biography & Bio-Photo</h2>
                <button onClick={() => handleSavePortfolio()} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                  <Save size={16} /> Save Changes
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={portfolio.bio.name} 
                      onChange={(e) => handleBioChange('name', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Professional Title</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={portfolio.bio.title} 
                      onChange={(e) => handleBioChange('title', e.target.value)} 
                    />
                  </div>
                </div>

                {/* Profile Photo Uploader */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <label className="form-label" style={{ alignSelf: 'flex-start' }}>Profile Avatar</label>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    background: 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    {portfolio.bio.avatar ? (
                      <img src={portfolio.bio.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <User size={48} style={{ opacity: 0.2 }} />
                    )}
                  </div>
                  <label className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', cursor: 'pointer', gap: '0.3rem' }}>
                    <Upload size={12} /> {uploadingField === 'avatar' ? 'Uploading...' : 'Upload'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, 'avatar', (url) => handleBioChange('avatar', url))} 
                      style={{ display: 'none' }} 
                      disabled={uploadingField !== null}
                    />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Biography / About Me</label>
                <textarea 
                  className="form-textarea" 
                  rows={4} 
                  value={portfolio.bio.about} 
                  onChange={(e) => handleBioChange('about', e.target.value)}
                ></textarea>
              </div>

              <h2 style={{ fontSize: '1.6rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', marginTop: '1rem' }}>Contact Channels</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label"><Phone size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} /> Phone Number</label>
                  <input type="text" className="form-input" value={portfolio.contact.phone} onChange={(e) => handleContactChange('phone', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label"><Mail size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} /> Email Address</label>
                  <input type="email" className="form-input" value={portfolio.contact.email} onChange={(e) => handleContactChange('email', e.target.value)} />
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label"><MapPin size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} /> Living Location</label>
                  <input type="text" className="form-input" value={portfolio.contact.location} onChange={(e) => handleContactChange('location', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn Profile URL</label>
                  <input type="text" className="form-input" value={portfolio.contact.linkedin} onChange={(e) => handleContactChange('linkedin', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input type="text" className="form-input" value={portfolio.contact.github} onChange={(e) => handleContactChange('github', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Instagram Profile URL</label>
                  <input type="text" className="form-input" value={portfolio.contact.instagram} onChange={(e) => handleContactChange('instagram', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp Direct Link</label>
                  <input type="text" className="form-input" value={portfolio.contact.whatsapp} onChange={(e) => handleContactChange('whatsapp', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SKILLS & LANGUAGES */}
          {activeTab === 'skills' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.6rem' }}>Technical Skills</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={handleAddSkill} className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                    <Plus size={16} /> Add Skill
                  </button>
                  <button onClick={() => handleSavePortfolio()} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>

              {/* Skills editing rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {portfolio.skills.map((skill: any, index: number) => (
                  <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr auto', gap: '1.2rem', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={skill.name} 
                      onChange={(e) => handleSkillChange(index, 'name', e.target.value)} 
                      placeholder="Skill name" 
                    />
                    <select 
                      className="form-input" 
                      value={skill.category} 
                      onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                      style={{ background: '#0b0f19' }}
                    >
                      <option value="Design">Design</option>
                      <option value="Tools">Tools</option>
                      <option value="Frontend">Frontend</option>
                    </select>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={skill.level} 
                        onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))} 
                        style={{ flexGrow: 1, accentColor: 'var(--primary)' }}
                      />
                      <span style={{ width: '40px', fontWeight: 600, color: 'var(--secondary)' }}>{skill.level}%</span>
                    </div>

                    <button 
                      onClick={() => handleDeleteSkill(index)} 
                      style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', display: 'flex', padding: '0.5rem' }}
                      title="Delete Skill"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Languages Edit */}
              <h2 style={{ fontSize: '1.6rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Language Proficiencies</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {portfolio.languages?.map((lang: any, index: number) => (
                  <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr auto', gap: '1.2rem', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={lang.name} 
                      onChange={(e) => {
                        const updatedLang = [...portfolio.languages];
                        updatedLang[index] = { ...updatedLang[index], name: e.target.value };
                        setPortfolio({ ...portfolio, languages: updatedLang });
                      }} 
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={lang.level} 
                        onChange={(e) => {
                          const updatedLang = [...portfolio.languages];
                          updatedLang[index] = { ...updatedLang[index], level: parseInt(e.target.value) };
                          setPortfolio({ ...portfolio, languages: updatedLang });
                        }} 
                        style={{ flexGrow: 1, accentColor: 'var(--secondary)' }}
                      />
                      <span style={{ width: '40px', fontWeight: 600, color: 'var(--primary)' }}>{lang.level}%</span>
                    </div>
                    <div></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EXPERIENCES */}
          {activeTab === 'experience' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.6rem' }}>Timeline Experiences</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={handleAddExp} className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                    <Plus size={16} /> Add Experience
                  </button>
                  <button onClick={() => handleSavePortfolio()} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>

              {/* Experience forms */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {portfolio.experience.map((exp: any, expIdx: number) => (
                  <div key={expIdx} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                    <button 
                      onClick={() => handleDeleteExp(expIdx)}
                      style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}
                      title="Remove Experience"
                    >
                      <Trash2 size={18} />
                    </button>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginRight: '2.5rem' }}>
                      <div className="form-group">
                        <label className="form-label">Company / Platform</label>
                        <input type="text" className="form-input" value={exp.company} onChange={(e) => handleExpChange(expIdx, 'company', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Role Position</label>
                        <input type="text" className="form-input" value={exp.role} onChange={(e) => handleExpChange(expIdx, 'role', e.target.value)} />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label className="form-label">Working / Completion Period</label>
                        <input type="text" className="form-input" value={exp.period} onChange={(e) => handleExpChange(expIdx, 'period', e.target.value)} placeholder="e.g. 2024 - 2025" />
                      </div>
                    </div>

                    {/* Bullet Points Details */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <label className="form-label">Bullet Point Details</label>
                        <button 
                          onClick={() => handleAddExpDesc(expIdx)} 
                          className="btn btn-secondary" 
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', gap: '0.2rem' }}
                        >
                          <Plus size={12} /> Add Point
                        </button>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {exp.description.map((desc: string, descIdx: number) => (
                          <div key={descIdx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                            <input 
                              type="text" 
                              className="form-input" 
                              value={desc} 
                              onChange={(e) => handleExpDescChange(expIdx, descIdx, e.target.value)} 
                              style={{ flexGrow: 1 }}
                            />
                            <button 
                              onClick={() => handleDeleteExpDesc(expIdx, descIdx)}
                              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
                              title="Delete Point"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EDUCATION */}
          {activeTab === 'education' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.6rem' }}>Academic Education</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={handleAddEdu} className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                    <Plus size={16} /> Add School
                  </button>
                  <button onClick={() => handleSavePortfolio()} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>

              {/* Education forms */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {portfolio.education.map((edu: any, index: number) => (
                  <div key={index} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                    <button 
                      onClick={() => handleDeleteEdu(index)}
                      style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}
                      title="Remove Education"
                    >
                      <Trash2 size={18} />
                    </button>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', marginRight: '2.5rem' }}>
                      <div className="form-group">
                        <label className="form-label">Institution Name</label>
                        <input type="text" className="form-input" value={edu.institution} onChange={(e) => handleEduChange(index, 'institution', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Degree / Studies Title</label>
                        <input type="text" className="form-input" value={edu.degree} onChange={(e) => handleEduChange(index, 'degree', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Period of Attendance</label>
                      <input type="text" className="form-input" value={edu.period} onChange={(e) => handleEduChange(index, 'period', e.target.value)} placeholder="e.g. 2023 - Present" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Additional details / achievements</label>
                      <textarea className="form-textarea" rows={3} value={edu.details} onChange={(e) => handleEduChange(index, 'details', e.target.value)}></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROJECTS GALLERY */}
          {activeTab === 'projects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.6rem' }}>Manage Project Showcase</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={handleAddProj} className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                    <Plus size={16} /> Add New Project
                  </button>
                  <button onClick={() => handleSavePortfolio()} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>

              {/* Projects Forms */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {portfolio.projects.map((proj: any, index: number) => (
                  <div key={proj.id} style={{ padding: '2rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'relative' }}>
                    <button 
                      onClick={() => handleDeleteProj(index)}
                      style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}
                      title="Remove Project"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '2rem', marginRight: '2rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="form-group">
                          <label className="form-label">Project Title</label>
                          <input type="text" className="form-input" value={proj.title} onChange={(e) => handleProjChange(index, 'title', e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Tags (comma-separated)</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={proj.tags?.join(', ') || ''} 
                            onChange={(e) => handleProjTagsChange(index, e.target.value)} 
                            placeholder="e.g. Figma, Web Design, HTML/CSS"
                          />
                        </div>
                      </div>

                      {/* Project Image Uploader */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                        <label className="form-label" style={{ alignSelf: 'flex-start' }}>Project Thumbnail</label>
                        <div style={{
                          width: '100%',
                          height: '110px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          background: 'rgba(255,255,255,0.02)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          {proj.image ? (
                            <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <Layers size={28} style={{ opacity: 0.15 }} />
                          )}
                        </div>
                        <label className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', cursor: 'pointer', gap: '0.3rem', width: '100%', justifyContent: 'center' }}>
                          <Upload size={12} /> {uploadingField === `project-img-${index}` ? 'Uploading...' : 'Upload Image'}
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileUpload(e, `project-img-${index}`, (url) => handleProjChange(index, 'image', url))} 
                            style={{ display: 'none' }} 
                            disabled={uploadingField !== null}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Project Description</label>
                      <textarea className="form-textarea" rows={3} value={proj.description} onChange={(e) => handleProjChange(index, 'description', e.target.value)}></textarea>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Live Demo URL</label>
                        <input type="text" className="form-input" value={proj.demoUrl || ''} onChange={(e) => handleProjChange(index, 'demoUrl', e.target.value)} placeholder="https://..." />
                      </div>
                      <div className="form-group">
                        <label className="form-label">GitHub Repository URL</label>
                        <input type="text" className="form-input" value={proj.githubUrl || ''} onChange={(e) => handleProjChange(index, 'githubUrl', e.target.value)} placeholder="https://github.com/..." />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ARTICLES / BLOGS */}
          {activeTab === 'articles' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.6rem' }}>Manage Blog Articles</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={handleAddArticle} className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                    <Plus size={16} /> New Article
                  </button>
                  <button onClick={() => handleSaveArticles()} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>

              {/* Articles edit list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {articles.map((art, index) => (
                  <div key={art.id} style={{ padding: '2rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'relative' }}>
                    <button 
                      onClick={() => handleDeleteArticle(index)}
                      style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}
                      title="Delete Article"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '2rem', marginRight: '2rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="form-group">
                          <label className="form-label">Article Title</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={art.title} 
                            onChange={(e) => {
                              const title = e.target.value;
                              const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                              handleArticleChange(index, 'title', title);
                              handleArticleChange(index, 'slug', slug);
                            }} 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Slug (url path)</label>
                          <input type="text" className="form-input" value={art.slug} readOnly style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.01)' }} />
                        </div>
                      </div>

                      {/* Cover Image Uploader */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                        <label className="form-label" style={{ alignSelf: 'flex-start' }}>Cover Image</label>
                        <div style={{
                          width: '100%',
                          height: '110px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          background: 'rgba(255,255,255,0.02)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          {art.coverImage ? (
                            <img src={art.coverImage} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <BookOpen size={28} style={{ opacity: 0.15 }} />
                          )}
                        </div>
                        <label className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', cursor: 'pointer', gap: '0.3rem', width: '100%', justifyContent: 'center' }}>
                          <Upload size={12} /> {uploadingField === `article-img-${index}` ? 'Uploading...' : 'Upload Cover'}
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleFileUpload(e, `article-img-${index}`, (url) => handleArticleChange(index, 'coverImage', url))} 
                            style={{ display: 'none' }} 
                            disabled={uploadingField !== null}
                          />
                        </label>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Tags (comma-separated)</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={art.tags?.join(', ') || ''} 
                          onChange={(e) => handleArticleTagsChange(index, e.target.value)} 
                          placeholder="e.g. Design, CSS, Tutorial"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Estimated Read Time</label>
                        <input type="text" className="form-input" value={art.readTime || ''} onChange={(e) => handleArticleChange(index, 'readTime', e.target.value)} placeholder="e.g. 4 min read" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Excerpt / Summary</label>
                      <input type="text" className="form-input" value={art.excerpt} onChange={(e) => handleArticleChange(index, 'excerpt', e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Article Body Content (Markdown supported)</label>
                      <textarea 
                        className="form-textarea" 
                        rows={12} 
                        value={art.content} 
                        onChange={(e) => handleArticleChange(index, 'content', e.target.value)}
                        style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6' }}
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
