import React from 'react';
import SiteLayout from '../components/SiteLayout';

const management = [
  { name: 'Khalid Ahmed', role: 'Administration', phone: '316-300-9834' },
  { name: 'Ather Shakeel Siddiqi', role: 'Administration', phone: '703-863-5449' },
  { name: 'Dr. Arshad, Ph.D.', role: 'Member', phone: '316-550-9435' },
  { name: 'Syed Mehmood Siddiq', role: 'Member', phone: '316-305-1322' },
  { name: 'Basim', role: 'Member', phone: '316-371-9069' },
  { name: 'Dr. Abdirahman', role: 'Member', phone: '872-305-2745' },
  { name: 'Hafiz Nuredin', role: 'Member', phone: '585-284-8986' }
];

export default function ShuraManagement() {
  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>Shura / Management</h1>
          <p className="sub">Management and Board members of Masjid Annoor Wichita</p>

          <div className="card" style={{ padding: 32 }}>
            <div style={{ display: 'grid', gap: 12 }}>
              {management.map((m) => (
                <div 
                  key={m.phone} 
                  style={{ 
                    display: 'flex', 
                    gap: 12, 
                    flexWrap: 'wrap', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '14px 16px', 
                    border: '1px solid #e6ece8', 
                    borderRadius: 14,
                    background: '#fafdfb'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 900, color: 'var(--green-900)', fontSize: 16 }}>{m.name}</div>
                    <div className="sub" style={{ margin: '4px 0 0', fontSize: 14 }}>{m.role}</div>
                  </div>
                  <div className="mono" style={{ fontWeight: 800 }}>
                    <a 
                      href={`tel:${m.phone}`} 
                      style={{ 
                        color: 'var(--green-700)', 
                        textDecoration: 'none',
                        padding: '6px 12px',
                        background: 'var(--green-100)',
                        borderRadius: 8,
                        fontSize: 14
                      }}
                    >
                      {m.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
