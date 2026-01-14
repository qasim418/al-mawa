import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import { siteConfig } from '../config/siteConfig';
import { fetchFundraisingRaised } from '../utils/fundraising';

const phases = [
  {
    title: 'Phase 1',
    total: 1305000,
    items: [
      { label: 'Designing the new Masjid and getting the approval from the city', amount: 80000 },
      { label: 'Demolishing the existing Masjid Annoor', amount: 20000 },
      { label: 'Converting the adjacent house into temporary Musaallah', amount: 5000 },
      {
        label:
          'Construction of a new 6000 sq. ft Masjid (including basement, bigger women prayer area, community hall, kitchen), replacing the existing 4000 sq.ft structure',
        amount: 1200000
      }
    ]
  },
  {
    title: 'Phase 2',
    total: 360000,
    items: [
      { label: 'Demolishing the adjacent house', amount: 10000 },
      { label: 'Construction of new parking lot', amount: 250000 },
      { label: 'Developing a recreational area for the adults and kids', amount: 100000 }
    ]
  },
  {
    title: 'Phase 3',
    total: 100000,
    items: [{ label: 'Constructing the house for the imam in the neighborhood', amount: 100000 }]
  },
  {
    title: 'Phase 4 (To Be Decided)',
    total: null,
    items: [
      {
        label:
          'Acquire additional properties to construct duplexes, which will help generate income for the Masjid’s ongoing operational expenses',
        amount: null
      }
    ]
  }
];

const management = [
  { name: 'Khalid Ahmed', role: 'Administration', phone: '316-300-9834' },
  { name: 'Ather Shakeel Siddiqi', role: 'Administration', phone: '703-863-5449' },
  { name: 'Dr. Arshad, Ph.D.', role: 'Member', phone: '316-550-9435' },
  { name: 'Syed Mehmood Siddiq', role: 'Member', phone: '316-305-1322' },
  { name: 'Basim', role: 'Member', phone: '316-371-9069' },
  { name: 'Dr. Abdirahman', role: 'Member', phone: '872-305-2745' },
  { name: 'Hafiz Nuredin', role: 'Member', phone: '585-284-8986' }
];

function money(amount) {
  if (amount == null) return '—';
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

export default function ConstructionProject() {
  const phase1Goal = siteConfig?.fundraising?.phase1Goal ?? 1305000;
  const [raised, setRaised] = useState(0);

  useEffect(() => {
    fetchFundraisingRaised().then(setRaised);
  }, []);

  const percent = phase1Goal > 0 ? Math.min(100, Math.round((raised / phase1Goal) * 100)) : 0;

  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>Construction Project</h1>
          <p className="sub">A major transformation for Masjid Annoor — built in 1983, serving Wichita for over 40 years.</p>

          <div className="card" style={{ padding: 22 }}>
            <div className="prose">
              <p>
                Masjid Annoor holds the distinction of being the first mosque established in the city of Wichita, Kansas. Built in 1983, through the efforts of Saudi and Kuwaiti students,
                it is strategically located near Wichita State University and has served as a spiritual home for both Muslim students and the broader Wichita Muslim community for over 40 years.
              </p>
              <p>
                With the building becoming increasingly dilapidated, it has become increasingly difficult and costly to maintain. Ongoing issues such as a leaking roof, flooded basement,
                broken HVAC systems, and deteriorating fencing have made it clear that temporary fixes are no longer a sustainable solution.
              </p>

              <div className="rule" />

              <h2 style={{ marginTop: 0 }}>We believe it is time for a major transformation</h2>
              <p>
                Masjid Annoor is embarking on a comprehensive renovation and remodeling project to modernize the facility and better serve the current and future needs of our growing community.
                We are reaching out to you — our beloved community — to help bring this vision to life. Your generous support can make a lasting impact for generations to come.
              </p>
              <p>
                Masjid Annoor Wichita Area (MAWA), Inc, is a registered non-profit organization in the State of Kansas and is federally recognized as a tax-exempt entity.
                All donations are tax-deductible to the extent allowed by law.
              </p>

              <p>
                Please donate generously. May you be abundantly rewarded for your kind support. This is a unique opportunity to contribute to the cause of Deen — an investment not only for our future
                generations but also a lasting act of SADAQAH JARIYAH for yourself.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 10 }}>
                <NavLink className="btn primary" to="/donate">Donate Now</NavLink>
              </div>
            </div>
          </div>

          <div style={{ height: 18 }} />

          <div className="card" style={{ padding: 22 }}>
            <div className="prose">
              <h2 style={{ marginTop: 0 }}>Fundraising Progress</h2>
              <p className="sub" style={{ marginTop: 6 }}>
                Phase 1 goal and raised-to-date.
              </p>

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
                  <div className="mono" style={{ fontWeight: 900 }}>
                    {raised.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })} ({percent}%)
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 10 }}>
                  <NavLink className="btn primary" to="/donate">Donate</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'linear-gradient(180deg, #f7fbf8, #ffffff)' }}>
        <div className="container">
          <h2>Project Phases</h2>
          <p className="sub">Costs listed are provided by the project plan. Builders’ commission (~10%) is not included in the estimates.</p>

          <div className="card" style={{ padding: 22, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #e6ece8' }}>Phase</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #e6ece8' }}>Item</th>
                  <th style={{ textAlign: 'right', padding: '10px 12px', borderBottom: '1px solid #e6ece8' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {phases.flatMap((p) =>
                  p.items.map((it, idx) => (
                    <tr key={`${p.title}-${idx}`}>
                      <td style={{ verticalAlign: 'top', padding: '10px 12px', borderBottom: '1px dashed #e9efe9', fontWeight: 800, color: 'var(--green-900)' }}>
                        {idx === 0 ? p.title : ''}
                      </td>
                      <td style={{ verticalAlign: 'top', padding: '10px 12px', borderBottom: '1px dashed #e9efe9' }}>{it.label}</td>
                      <td style={{ verticalAlign: 'top', padding: '10px 12px', borderBottom: '1px dashed #e9efe9', textAlign: 'right' }} className="mono">
                        {money(it.amount)}
                      </td>
                    </tr>
                  ))
                )}
                <tr>
                  <td colSpan={2} style={{ padding: '12px 12px', borderTop: '1px solid #e6ece8', fontWeight: 900 }}>Phase 1 Total</td>
                  <td style={{ padding: '12px 12px', borderTop: '1px solid #e6ece8', textAlign: 'right', fontWeight: 900 }} className="mono">
                    {money(phases[0].total)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ padding: '12px 12px', borderTop: '1px solid #e6ece8', fontWeight: 900 }}>Phase 2 Total</td>
                  <td style={{ padding: '12px 12px', borderTop: '1px solid #e6ece8', textAlign: 'right', fontWeight: 900 }} className="mono">
                    {money(phases[1].total)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ padding: '12px 12px', borderTop: '1px solid #e6ece8', fontWeight: 900 }}>Phase 3 Total</td>
                  <td style={{ padding: '12px 12px', borderTop: '1px solid #e6ece8', textAlign: 'right', fontWeight: 900 }} className="mono">
                    {money(phases[2].total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Management</h2>
          <p className="sub">Management and Board members of Masjid Annoor Wichita</p>

          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'grid', gap: 10 }}>
              {management.map((m) => (
                <div key={m.phone} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'space-between', padding: '10px 12px', border: '1px solid #e6ece8', borderRadius: 14 }}>
                  <div>
                    <div style={{ fontWeight: 900, color: 'var(--green-900)' }}>{m.name}</div>
                    <div className="sub" style={{ margin: 0 }}>{m.role}</div>
                  </div>
                  <div className="mono" style={{ fontWeight: 900 }}>
                    <a href={`tel:${m.phone}`} style={{ color: 'var(--green-700)', textDecoration: 'none' }}>{m.phone}</a>
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
