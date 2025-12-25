import React from 'react';
import SiteLayout from '../components/SiteLayout';

export default function Contact() {
  const address = '3104 E 17th St, Wichita, KS 67214';
  const email = 'Masjidannoorwichita@yahoo.com';

  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="sub">We welcome students, visitors, and long-time residents. Please reach out for questions, volunteering, or support.</p>

          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 18, alignItems: 'start' }}>
              <div className="prose">
                <p>
                  <strong>Address:</strong> {address}
                </p>
                <p>
                  <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
                </p>
                <p className="sub" style={{ marginBottom: 0 }}>
                  For faster help, please include your name and phone number in the email.
                </p>
              </div>

              <iframe
                title="Map"
                style={{ border: 0, width: '100%', height: 320, borderRadius: 16 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
              />
            </div>
          </div>

          <style>{`
            @media (max-width: 980px) {
              .card > div { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>
    </SiteLayout>
  );
}
