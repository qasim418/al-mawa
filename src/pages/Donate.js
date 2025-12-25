import React from 'react';
import SiteLayout from '../components/SiteLayout';

export default function Donate() {
  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>Donate</h1>
          <p className="sub">Support Masjid Annoor’s reconstruction and ongoing services. Donations are tax-deductible to the extent allowed by law.</p>

          <div className="card" style={{ padding: 22 }}>
            <div className="prose">
              <h2 style={{ marginTop: 0 }}>Donate by Credit Card</h2>
              <p>Scan the QR code below (coming soon). We can add your QR image when you’re ready.</p>

              <div
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  border: '1px dashed #dfe8e3',
                  borderRadius: 18,
                  padding: 24,
                  background: 'linear-gradient(180deg, #ffffff, #fbfefd)'
                }}
              >
                <div style={{ fontWeight: 900, color: 'var(--green-900)' }}>QR Code Placeholder</div>
                <div className="sub" style={{ margin: 0 }}>Add image later</div>
              </div>

              <div className="rule" />

              <h2>Donate by Check</h2>
              <p>
                <strong>Please make checks payable to:</strong> “MASJID ANNOOR CONSTRUCTION”
              </p>
              <p>
                <strong>Mail to:</strong> 3104 E 17th St, Wichita, KS 67214
              </p>

              <div className="rule" />

              <h2>Questions</h2>
              <p>
                Email us at <a href="mailto:Masjidannoorwichita@yahoo.com">Masjidannoorwichita@yahoo.com</a>.
              </p>

              <p>
                May Allah accept it as <strong>sadaqah jariyah</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
