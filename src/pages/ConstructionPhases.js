import React from 'react';
import SiteLayout from '../components/SiteLayout';

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
          "Acquire additional properties to construct duplexes, which will help generate income for the Masjid's ongoing operational expenses",
        amount: null
      }
    ]
  }
];

function money(amount) {
  if (amount == null) return '—';
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

export default function ConstructionPhases() {
  return (
    <SiteLayout>
      <section className="section" style={{ background: 'linear-gradient(180deg, #f7fbf8, #ffffff)' }}>
        <div className="container">
          <h1>Project Phases</h1>
          <p className="sub">A comprehensive breakdown of the construction project phases and associated costs.</p>

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

          <div style={{ height: 24 }} />

          <div className="card" style={{ padding: 22 }}>
            <h2 style={{ marginTop: 0 }}>Phase Overview</h2>
            <div className="prose">
              <p><strong>Phase 1:</strong> The main construction phase including design, demolition, temporary musalla setup, and construction of the new 6000 sq. ft Masjid with basement, expanded women's prayer area, community hall, and kitchen.</p>
              <p><strong>Phase 2:</strong> Parking lot construction and recreational area development after demolishing the adjacent house.</p>
              <p><strong>Phase 3:</strong> Construction of a residence for the Imam in the neighborhood.</p>
              <p><strong>Phase 4:</strong> Future expansion through acquiring additional properties for income-generating duplexes to support ongoing operational expenses.</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
