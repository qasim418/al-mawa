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
              <h2 style={{ marginTop: 0 }}>Donate via Zelle</h2>
              <p>
                You can transfer funds directly using our Zelle email:
                <br />
                <strong style={{ fontSize: '1.2em', color: 'var(--green-700)' }}>Masjidannoorwichita@yahoo.com</strong>
              </p>

              <div className="rule" />

              <h2>Donate Online (Credit Card)</h2>
              <p>Scan the QR code or click the button below to donate securely online.</p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                  border: '1px solid #e6ece8',
                  borderRadius: 18,
                  padding: 24,
                  background: 'linear-gradient(180deg, #ffffff, #fbfefd)'
                }}
              >
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fapp.autobooks.co%2Fpay%2Fanjuman-e-ahya-il-islam-of-north-america%3Futm_medium%3Dqr%26utm_source%3Dpresented-pf-qr%26utm_campaign%3Dactivation"
                  alt="Donate QR Code"
                  style={{ width: 200, height: 200, mixBlendMode: 'multiply' }}
                />
                <a
                  href="https://app.autobooks.co/pay/anjuman-e-ahya-il-islam-of-north-america?utm_medium=qr&utm_source=presented-pf-qr&utm_campaign=activation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary"
                >
                  Click to Donate Online
                </a>
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
                Email us at <a href="mailto:info@almawa.org">info@almawa.org</a>.
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
