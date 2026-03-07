import React from 'react';
import SiteLayout from '../components/SiteLayout';

export default function MissionVision() {
  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>Mission & Vision</h1>
          <p className="sub">The guiding principles of Masjid Annoor</p>

          <div className="card" style={{ padding: 32 }}>
            <div className="prose">
              <h2 style={{ marginTop: 0, color: 'var(--green-900)' }}>Who We Are</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', background: 'var(--green-100)', padding: 20, borderRadius: 12, borderLeft: '4px solid var(--green-700)' }}>
                <strong>Masjid Annoor Wichita Area (MAWA), Inc</strong> is a registered non-profit organization and federally recognized as tax-exempt.
              </p>

              <div className="rule" />

              <h2 style={{ color: 'var(--green-900)' }}>Mission</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                To serve the Muslim community by providing various services to meet their spiritual and social needs and by promoting
                the values and teachings of Islam in accordance with the Qur'an and following the commandments and orders of Allah Subhana Wa Ta'ala, and Sunnah of His Prophet, Muhammad (pbuh).
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                To establish, protect, and maintain:
              </p>
              <ul style={{ paddingLeft: 24, lineHeight: '1.8' }}>
                <li style={{ marginBottom: 12 }}>
                  A Masjid as a Center of Knowledge & Worship. A place where the Quran is recited, Islamic values are taught, and every Muslim finds a sense of belonging.
                </li>
                <li style={{ marginBottom: 12 }}>
                  An Islamic School/ Madressah
                </li>
                <li style={{ marginBottom: 12 }}>
                  Adult and youth educational programs, for the Muslim Community.
                </li>
                <li style={{ marginBottom: 12 }}>
                  To enjoin what is right and forbid what is wrong (Amr bil Ma'roof Wannahi anil Munkar)
                </li>
                <li style={{ marginBottom: 12 }}>
                  To encourage religious, cultural, educational, and social services for the upliftment of mankind.
                </li>
                <li style={{ marginBottom: 12 }}>
                  To contribute positively, peacefully, and respectfully to the rich diversity of American society while upholding Islamic principles.
                </li>
              </ul>

              <div className="rule" />

              <h2 style={{ color: 'var(--green-900)' }}>Vision</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                A Future Built on Faith, our vision is to establish an Islamic Community Environment based on the model of the community of the Prophet Mohammad (PBUH) and to become a comprehensive center of learning and spirituality for all age groups and demographics within the Muslim community. To exemplify the best of character by contributing to the neighborhoods in which we live, through intense attention to the spiritual, educational, and material needs of our unified community, in a transparent, inclusive, and equitable manner.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
