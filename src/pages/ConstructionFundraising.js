import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import { siteConfig } from '../config/siteConfig';
import { fetchFundraisingRaised } from '../utils/fundraising';

export default function ConstructionFundraising() {
  const phase1Goal = siteConfig?.fundraising?.phase1Goal ?? 1305000;
  const [raised, setRaised] = useState(0);

  useEffect(() => {
    fetchFundraisingRaised().then(setRaised);
  }, []);

  const percent = phase1Goal > 0 ? Math.min(100, Math.round((raised / phase1Goal) * 100)) : 0;
  const remaining = Math.max(0, phase1Goal - raised);

  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>Fundraising</h1>
          <p className="sub">Help us build the future of Masjid Annoor. Every contribution counts.</p>

          <div className="card" style={{ padding: 32 }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h2 style={{ margin: '0 0 10px', fontSize: 'clamp(24px, 4vw, 36px)' }}>Phase 1 Fundraising Goal</h2>
              <div style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--green-900)' }} className="mono">
                {phase1Goal.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="sub" style={{ margin: 0 }}>Progress</span>
                <span style={{ fontWeight: 700 }}>{percent}%</span>
              </div>
              <div style={{ height: 20, background: '#edf4ef', borderRadius: 999, overflow: 'hidden', border: '1px solid #e0ebe4' }} aria-label="Fundraising progress">
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${percent}%`, 
                    background: 'linear-gradient(90deg, var(--gold-500), #f5d77b)',
                    transition: 'width 0.5s ease'
                  }} 
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
              <div className="card" style={{ padding: 20, textAlign: 'center', background: 'var(--green-100)' }}>
                <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 8 }}>Raised So Far</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--green-900)' }} className="mono">
                  {raised.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                </div>
              </div>
              <div className="card" style={{ padding: 20, textAlign: 'center', background: '#fff8e1' }}>
                <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 8 }}>Still Needed</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--green-900)' }} className="mono">
                  {remaining.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <NavLink className="btn primary" to="/donate" style={{ fontSize: 18, padding: '16px 32px' }}>
                Donate Now
              </NavLink>
            </div>
          </div>

          <div style={{ height: 24 }} />

          <div className="card" style={{ padding: 22 }}>
            <h2 style={{ marginTop: 0 }}>Ways to Contribute</h2>
            <div className="prose">
              <p><strong>Online:</strong> Use our secure online donation portal to make a one-time or recurring donation.</p>
              <p><strong>Check:</strong> Mail your check payable to "Masjid Annoor Wichita Area" to our address.</p>
              <p><strong>In-Person:</strong> Visit the masjid and donate directly at the donation box or office.</p>
              <p><strong>Bank Transfer:</strong> Contact us for wire transfer information for larger donations.</p>
            </div>
            <div className="rule" />
            <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)' }}>
              Masjid Annoor Wichita Area (MAWA), Inc is a 501(c)(3) non-profit organization. 
              All donations are tax-deductible to the extent allowed by law.
            </p>
          </div>

          <div style={{ height: 24 }} />

          <div className="card" style={{ padding: 22 }}>
            <h2 style={{ marginTop: 0 }}>The Impact of Your Donation</h2>
            <div className="prose">
              <p>
                Your contribution to the Masjid Annoor construction project is more than just a donation — 
                it's a <strong>Sadaqah Jariyah</strong> (continuous charity) that will benefit you and your 
                loved ones for generations to come.
              </p>
              <p>
                The Prophet Muhammad (peace be upon him) said: <em>"When a person dies, all their deeds 
                end except three: a continuing charity, beneficial knowledge, or a righteous child who 
                prays for them."</em> (Sahih Muslim)
              </p>
              <p>
                By supporting this masjid, you are investing in a place of worship, education, and 
                community service that will continue to earn rewards for you long after this life.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
