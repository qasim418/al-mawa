import React from 'react';
import SiteLayout from '../components/SiteLayout';

export default function Media() {
  return (
    <SiteLayout>
      <style>{`
        .coming-soon {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 20px;
        }
        .coming-soon h1 {
          font-family: "DM Serif Display", serif;
          font-size: clamp(36px, 6vw, 56px);
          color: var(--green-900);
          margin: 0 0 20px;
        }
        .coming-soon p {
          font-size: 18px;
          color: #51655a;
          max-width: 500px;
          margin: 0;
        }
        .coming-soon-icon {
          font-size: 64px;
          margin-bottom: 24px;
          opacity: 0.8;
        }
      `}</style>
      <section className="section">
        <div className="container">
          <div className="coming-soon">
            <div className="coming-soon-icon">📹</div>
            <h1>Media</h1>
            <p>Coming Soon! Stay tuned for our media content including lectures, events, and community highlights.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
