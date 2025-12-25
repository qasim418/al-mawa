import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import { fmtTime, makeSchedule, timeLeft } from '../utils/prayerSchedule';

// One-file, responsive landing page for
// Al‑Mawa (Al Masjid Annoor Wichita)
// - No external CSS or libraries required
// - Includes prayer timetable, services, reconstruction appeal, donate CTA, location/contact
// - Subtle Islamic aesthetic (greens/gold, geometric pattern, crescent/star)
// - Smooth scroll + lightweight CSS animations
//
// Usage: copy into src/AlMawaLanding.jsx and render <AlMawaLanding /> in your App.
// Update the placeholders (times, address, donation link) as needed.

export default function Home() {
  const [now, setNow] = useState(new Date());
  const heroRef = useRef(null);

  const center = {
    legalName: 'Masjid Annoor Wichita',
    city: 'Wichita, KS',
    address: '3104 E 17th St, Wichita, KS 67214',
    email: 'Masjidannoorwichita@yahoo.com'
  };

  const { todaySchedule, nextPrayer } = useMemo(() => makeSchedule({ now }), [now]);

  const scrollToVisit = () => {
    const el = document.getElementById('visit');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <SiteLayout>
      <style>{`
        /* HOME ONLY */
        .hero { position: relative; overflow: hidden; background: radial-gradient(1200px 500px at 10% -10%, #eaf7f0 30%, transparent 60%), radial-gradient(1200px 500px at 110% -30%, #f3faf6 20%, transparent 70%), linear-gradient(180deg, #fff 0%, #f8fbf9 100%); }
        .hero .inner { display: grid; grid-template-columns: 1.25fr 1fr; align-items: center; gap: 36px; padding: 64px 0; }
        .eyebrow { color: var(--green-700); font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; font-size: 12px; }
        .title { font-family: "DM Serif Display", serif; font-size: clamp(32px, 5vw, 52px); line-height: 1.05; margin: 10px 0 16px; color: var(--green-900); }
        .title .gold { color: var(--gold-500); }
        .lede { font-size: 18px; color: #355044; max-width: 60ch; }
        .hero-ctas { display: flex; gap: 12px; margin-top: 18px; flex-wrap: wrap; }

        .crescent { position: absolute; right: -80px; top: -60px; width: 260px; height: 260px; opacity: 0.2; }

        /* NEXT PRAYER CARD */
        .np-card { background: #fff; border: 1px solid #e6ece8; border-radius: 18px; padding: 18px; box-shadow: 0 12px 20px rgba(0,0,0,0.04); display: grid; gap: 8px; }
        .np-title { font-weight: 800; letter-spacing: 0.02em; color: var(--green-900); }
        .np-row { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
        .np-time { font-size: 22px; font-weight: 800; color: var(--green-900); }
        .pill { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #fff; background: var(--green-700); padding: 6px 8px; border-radius: 999px; }

        .prayer-table { width: 100%; border-collapse: collapse; }
        .prayer-table th, .prayer-table td { padding: 12px 14px; text-align: left; border-bottom: 1px dashed #e9efe9; }
        .prayer-table th { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
        .prayer-table td strong { color: var(--green-900); }

        /* SERVICES */
        .grid { display: grid; gap: 16px; }
        .grid.cards { grid-template-columns: repeat(12, 1fr); }
        .service { grid-column: span 12; padding: 18px; border-radius: 16px; border: 1px solid #e6ece8; background: linear-gradient(180deg, #ffffff, #fbfefd); }
        .service h3 { margin: 8px 0; font-size: 18px; color: var(--green-900); }
        .service p { color: #466157; font-size: 14px; }

        /* RECONSTRUCTION */
        .recon { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 22px; align-items: center; }
        .progress { height: 12px; background: #edf4ef; border-radius: 999px; overflow: hidden; border: 1px solid #e0ebe4; }
        .bar { height: 100%; background: linear-gradient(90deg, var(--gold-500), #f5d77b); }
        .note { font-size: 13px; color: #3f5b52; }

        /* VISIT / CONTACT (home) */
        .visit-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 18px; align-items: start; }
        .map { border: 0; width: 100%; height: 320px; border-radius: 16px; filter: saturate(0.95) contrast(1.02); }
        .admin-row { display: flex; gap: 10px; flex-wrap: wrap; justify-content: space-between; padding: 10px 12px; border: 1px solid #e6ece8; border-radius: 14px; }

        /* Animations (home only) */
        @keyframes floatSlow { from { transform: translateY(0) rotate(0); } to { transform: translateY(6px) rotate(1.5deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .anim { animation: fadeUp 600ms ease forwards; opacity: 0; }
        .anim.delay-1 { animation-delay: 90ms; }
        .anim.delay-2 { animation-delay: 180ms; }
        .anim.delay-3 { animation-delay: 270ms; }
        .crescent { animation: floatSlow 4s ease-in-out infinite alternate; }

        /* Responsive */
        @media (max-width: 980px) {
          .hero .inner { grid-template-columns: 1fr; }
          .recon { grid-template-columns: 1fr; }
          .visit-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 640px) {
          .service { grid-column: span 6; }
        }
        @media (min-width: 960px) {
          .service { grid-column: span 3; }
        }
        @media (max-width: 640px) {
          .hero .inner { padding: 40px 0; gap: 24px; }
          .title { font-size: clamp(28px, 6vw, 40px); }
          .lede { font-size: 16px; }
          .hero-ctas { flex-direction: column; align-items: center; gap: 12px; }
          .hero-ctas .btn { width: auto; max-width: 280px; margin: 0 auto; }
          .np-card { padding: 14px; }
          .np-time { font-size: 18px; }
          .prayer-table th, .prayer-table td { padding: 10px 12px; font-size: 14px; }
          .service { padding: 14px; }
          .service h3 { font-size: 16px; }
          .service p { font-size: 13px; }
          .recon { gap: 16px; }
          .map { height: 240px; }
          .btn { padding: 10px 16px; font-size: 14px; }
        }
      `}</style>

      <section className="hero" ref={heroRef}>
        <svg className="crescent" viewBox="0 0 200 200" aria-hidden>
          <CrescentBg />
        </svg>
        <div className="container inner">
          <div className="anim">
            <div className="eyebrow">Bismillah</div>
            <h1 className="title">
              Welcome to <span className="gold">Masjid Annoor</span> Wichita
            </h1>
            <p className="lede">
              “A sanctuary of serenity and reflection, Masjid Annoor is more than just a place of worship—it is a home filled with faith, warmth, and tradition. Rooted in the timeless teachings of Islam, we are a community devoted to worship, learning, and service. Whether you are a student, a visitor, or a long-time resident, we welcome you to join us—explore, connect, and share in the spirit of faith and friendship. Come experience the peace, unity, and sense of belonging that define our religion.”
            </p>
            <div className="hero-ctas">
              <NavLink className="btn primary" to="/donate" aria-label="Donate for construction">
                <span>Donate</span>
              </NavLink>
              <NavLink className="btn ghost" to="/prayer-timings">Prayer Timings</NavLink>
            </div>
            <div className="rule" />
            <div className="np-card" role="complementary" aria-live="polite">
              <div className="np-title">Next Prayer</div>
              {nextPrayer ? (
                <div className="np-row">
                  <div>
                    <strong>{nextPrayer.key}</strong>
                    <div className="sub" style={{ fontSize: 12 }}>Iqamah {fmtTime(nextPrayer.iqamah || nextPrayer.adhan)}{nextPrayer.nextDay ? " (tomorrow)" : ""}</div>
                  </div>
                  <div className="np-time mono">{timeLeft({ now, to: nextPrayer.date })}</div>
                </div>
              ) : (
                <div>Alhamdulillah</div>
              )}
            </div>
          </div>

          <div className="anim delay-2">
            <div className="card" style={{ padding: 18 }}>
              <h3 style={{ margin: "2px 0 10px", color: "var(--green-900)" }}>Jumu'ah</h3>
              <p className="sub" style={{ marginTop: -6 }}>Khutbah & Salah every Friday</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="np-card" style={{ padding: 14 }}>
                  <div className="sub" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: ".08em" }}>First Khutbah</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>1:30 PM</strong>
                    <span className="pill">Jum'ah 1</span>
                  </div>
                </div>
                <div className="np-card" style={{ padding: 14 }}>
                  <div className="sub" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: ".08em" }}>Second Khutbah</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>2:30 PM</strong>
                    <span className="pill">Jum'ah 2</span>
                  </div>
                </div>
              </div>
              <p className="note" style={{ marginTop: 10 }}>Times may shift seasonally. Please verify weekly announcements.</p>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* PRAYER TIMES */}
        <section className="section">
          <div className="container">
            <h2>Prayer Times</h2>
            <p className="sub">Congregational (Iqamah) times for today in {center.city}. These are placeholders until the official timetable is added.</p>
            <div className="card" style={{ overflowX: 'auto' }}>
              <table className="prayer-table">
                <thead>
                  <tr>
                    <th>Prayer</th>
                    <th>Adhan</th>
                    <th>Iqamah</th>
                  </tr>
                </thead>
                <tbody>
                  {todaySchedule.map((p) => (
                    <tr key={p.key}>
                      <td><strong>{p.key}</strong></td>
                      <td className="mono">{fmtTime(p.adhan)}</td>
                      <td className="mono">{p.iqamah ? fmtTime(p.iqamah) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 14 }}>
              <NavLink className="btn primary" to="/prayer-timings">View Full Timings</NavLink>
              <button type="button" className="btn ghost" onClick={scrollToVisit}>Visit & Contact</button>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section" style={{ background: "linear-gradient(180deg, #f7fbf8, #ffffff)" }}>
          <div className="container">
            <h2>Programs & Services</h2>
            <p className="sub">Serving families with spiritual care, sacred knowledge, and community support.</p>
            <div className="grid cards">
              {services.map((s, i) => (
                <article className="service anim" style={{ animationDelay: `${i * 70}ms` }} key={s.title}>
                  <div className="eyebrow" style={{ color: "var(--gold-500)" }}>{s.tag}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* RECONSTRUCTION / DONATE */}
        <section className="section">
          <div className="container recon">
            <div>
              <h2>Construction Project</h2>
              <p className="sub">
                With the building becoming increasingly dilapidated, ongoing issues such as a leaking roof, flooded basement, broken HVAC systems, and deteriorating fencing have made it clear that temporary fixes are no longer a sustainable solution.
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#3b5b52' }}>
                <li>Modernize the facility for current and future community needs</li>
                <li>Improve prayer spaces including women’s area and accessibility</li>
                <li>Community hall and kitchen for programs and gatherings</li>
                <li>Parking and grounds improvements</li>
              </ul>
              <div className="rule" />
              <div className="card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <div className="eyebrow">Phase 1 Goal</div>
                  <div className="mono" style={{ fontWeight: 800, color: 'var(--green-900)' }}>$1,305,000.00</div>
                </div>
                <div className="progress" aria-label="Fundraising progress">
                  <div className="bar" style={{ width: '0%' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <div className="note">Raised so far</div>
                  <div className="mono" style={{ fontWeight: 700 }}>$0 (update soon)</div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                  <NavLink className="btn primary" to="/donate">Donate Now</NavLink>
                  <NavLink className="btn ghost" to="/construction">Read Full Project Details</NavLink>
                </div>
              </div>
            </div>
            <div>
              <div className="card" style={{ padding: 18 }}>
                <h3 style={{ marginTop: 0, color: 'var(--green-900)' }}>Why It Matters</h3>
                <p>
                  The Prophet ﷺ said: <em>“Whoever builds a mosque for Allah, Allah will build for him a house in Paradise.”</em>
                </p>
                <p>Every contribution, large or small, helps create a safe, beautiful, and accessible space for salah, learning, and community.</p>
                <blockquote className="note" style={{ borderLeft: '3px solid var(--gold-500)', paddingLeft: 12, margin: '10px 0 0' }}>
                  Masjid Annoor Wichita Area (MAWA), Inc is a registered non-profit organization and federally recognized as tax-exempt.
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section id="visit" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="card" style={{ padding: 22 }}>
            <h2 style={{ marginTop: 0 }}>Visit & Contact</h2>
            <p className="sub">Map, address, email, and administration contact.</p>

            <div className="visit-grid">
              <iframe
                title="Masjid Location"
                className="map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(center.address)}&output=embed`}
              />

              <div className="prose">
                <p style={{ marginTop: 0 }}>
                  <strong>Address:</strong> {center.address}
                  <br />
                  <strong>Email:</strong> <a href={`mailto:${center.email}`}>{center.email}</a>
                </p>

                <div className="rule" />

                <h3 style={{ margin: '0 0 10px', color: 'var(--green-900)' }}>Administration</h3>
                <div className="admin-row">
                  <div>
                    <div style={{ fontWeight: 900, color: 'var(--green-900)' }}>Khalid Ahmed</div>
                    <div className="sub" style={{ margin: 0 }}>Administration</div>
                  </div>
                  <div className="mono" style={{ fontWeight: 900 }}>
                    <a href="tel:316-300-9834" style={{ color: 'var(--green-700)', textDecoration: 'none' }}>316-300-9834</a>
                  </div>
                </div>

                <p className="sub" style={{ marginTop: 12 }}>
                  For construction questions, donations by check, or volunteering, email us and we’ll respond as soon as possible.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <NavLink className="btn primary" to="/donate">Donate</NavLink>
                  <NavLink className="btn ghost" to="/construction">Construction Details</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

const services = [
  { tag: "Daily Salah", title: "Five Daily Prayers", desc: "Congregational salah with calm atmosphere and Quran recitation." },
  { tag: "Friday", title: "Jumu'ah Khutbah", desc: "Weekly sermon and congregational prayer with two khutbah times." },
  { tag: "Education", title: "Quran & Weekend School", desc: "Tajwid, memorization, and Islamic studies for children and adults." },
  { tag: "Youth", title: "Youth Circles", desc: "Mentorship, sports, and halaqah to nurture strong identity and character." },
  { tag: "Family", title: "Nikah & Counseling", desc: "Marriage services and confidential pastoral counseling by appointment." },
  { tag: "Support", title: "Zakat & Aid", desc: "Zakat distribution and assistance for those in need (screened)." },
  { tag: "Community", title: "Open House & Dawah", desc: "Visits for schools and neighbors; interfaith and civic partnerships." },
  { tag: "Janazah", title: "Funeral Support", desc: "Guidance with ghusl, janazah prayer, and burial coordination." }
];

function CrescentBg() {
  const publicUrl = process.env.PUBLIC_URL || '';
  return (
    <img 
      src={`${publicUrl}/logo.png`} 
      alt="" 
      style={{ 
        position: 'absolute', 
        right: '-80px', 
        top: '-60px', 
        width: '260px', 
        height: '260px', 
        opacity: '0.2',
        borderRadius: '50%'
      }}
      aria-hidden="true"
    />
  );
}
