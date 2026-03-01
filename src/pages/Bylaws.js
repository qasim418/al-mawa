import React from 'react';
import SiteLayout from '../components/SiteLayout';

export default function Bylaws() {
  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>Bylaws</h1>
          <p className="sub">Constitution and bylaws of Masjid Annoor</p>

          <div className="card" style={{ padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>📋</div>
            <h2 style={{ color: 'var(--green-900)', marginBottom: 16 }}>Coming Soon</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: 600, margin: '0 auto 24px' }}>
              The official bylaws and constitution of Masjid Annoor will be published here soon.
            </p>
            <p style={{ fontSize: '14px', color: 'var(--muted)' }}>
              Please check back later for updates.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
