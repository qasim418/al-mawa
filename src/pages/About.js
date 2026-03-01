import React from 'react';
import { NavLink } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';

export default function About() {
  const aboutLinks = [
    {
      to: '/about/mission-vision',
      title: 'Mission & Vision',
      description: 'Our objective, mission, and vision for serving the Muslim community.',
      icon: '🎯'
    },
    {
      to: '/about/our-history',
      title: 'Our History',
      description: 'The story of Masjid Annoor from 1979 to present, told by co-founder Brother Saeed S. Kohlban Al Kahtani.',
      icon: '📜'
    },
    {
      to: '/about/shura-management',
      title: 'Shura / Management',
      description: 'Leadership and governance structure of Masjid Annoor.',
      icon: '🤝'
    },
    {
      to: '/about/bylaws',
      title: 'Bylaws',
      description: 'Constitution and bylaws governing Masjid Annoor.',
      icon: '📋'
    }
  ];

  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>About Masjid Annoor</h1>
          <p className="sub">Wichita, Kansas — established in 1983</p>

          <div style={{ display: 'grid', gap: 20, marginTop: 24 }}>
            {aboutLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="card"
                style={{
                  padding: 28,
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 20,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 14px 28px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div style={{ fontSize: 40, flexShrink: 0 }}>{link.icon}</div>
                <div>
                  <h2 style={{ margin: '0 0 8px', color: 'var(--green-900)', fontSize: 22 }}>{link.title}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>{link.description}</p>
                </div>
                <div style={{ marginLeft: 'auto', alignSelf: 'center', color: 'var(--green-700)', fontSize: 24 }}>→</div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
