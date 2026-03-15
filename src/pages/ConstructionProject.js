import React from 'react';
import { NavLink } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';

export default function ConstructionProject() {
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


        </div>
      </section>
    </SiteLayout>
  );
}
