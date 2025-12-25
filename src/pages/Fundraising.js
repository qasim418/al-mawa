import React from 'react';
import { NavLink } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';

export default function Fundraising() {
  const phase1Goal = 1305000;

  // Placeholder progress (update when you have real numbers)
  const raised = 0;
  const percent = phase1Goal > 0 ? Math.min(100, Math.round((raised / phase1Goal) * 100)) : 0;

  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>Fundraising</h1>
          <p className="sub">Help us rebuild Masjid Annoor as a lasting Sadaqah Jariyah.</p>

          <div className="card" style={{ padding: 22 }}>
            <div className="prose">
              <p>
                Masjid Annoor is embarking on a comprehensive renovation and remodeling project to modernize the facility and better serve the current and future needs of our growing community.
                Your support can make a lasting impact for generations.
              </p>

              <div className="rule" />

              <h2 style={{ marginTop: 0 }}>Phase 1 Goal</h2>

              <div style={{ display: 'grid', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div className="sub" style={{ margin: 0 }}>Goal (Phase 1)</div>
                  <div className="mono" style={{ fontWeight: 900, color: 'var(--green-900)' }}>
                    {phase1Goal.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}
                  </div>
                </div>

                <div style={{ height: 12, background: '#edf4ef', borderRadius: 999, overflow: 'hidden', border: '1px solid #e0ebe4' }} aria-label="Fundraising progress">
                  <div style={{ height: '100%', width: `${percent}%`, background: 'linear-gradient(90deg, var(--gold-500), #f5d77b)' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div className="sub" style={{ margin: 0 }}>Raised so far</div>
                  <div className="mono" style={{ fontWeight: 900 }}>{raised.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })} ({percent}%)</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
                <NavLink className="btn primary" to="/donate">Donate</NavLink>
                <NavLink className="btn ghost" to="/construction">View Project Phases</NavLink>
              </div>

              <p className="sub" style={{ marginTop: 14 }}>
                When you share the real fundraising numbers (raised-to-date and what phase you’re currently in), I’ll update this page to reflect accurate progress.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
