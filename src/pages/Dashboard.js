import React, { useEffect, useMemo, useRef, useState } from "react";

// One-file, responsive landing page for
// Al‑Mawa (Al Masjid Annoor Wichita)
// - No external CSS or libraries required
// - Includes prayer timetable, services, reconstruction appeal, donate CTA, location/contact
// - Subtle Islamic aesthetic (greens/gold, geometric pattern, crescent/star)
// - Smooth scroll + lightweight CSS animations
//
// Usage: copy into src/AlMawaLanding.jsx and render <AlMawaLanding /> in your App.
// Update the placeholders (times, address, donation link) as needed.

export default function AlMawaLanding() {
  const [now, setNow] = useState(new Date());
  const heroRef = useRef(null);

  // --- CONFIG ---
  const center = {
    name: "Al‑Mawa Islamic Center",
    legalName: "Al Masjid Annoor Wichita",
    city: "Wichita, KS",
    address: "(Update) 1234 Example Rd, Wichita, KS",
    email: "info@al-mawa.org",
    phone: "(316) 555-0115",
    donationUrl: "#donate" // replace with real donation link when ready
  };

  // Simple placeholder schedule — replace with your daily times or integrate an API (e.g., AlAdhan)
  // 24-hour strings, local time. Friday shows Jum'ah times automatically.
  const baseSchedule = [
    { key: "Fajr", adhan: "05:30", iqamah: "05:45" },
    { key: "Sunrise", adhan: "06:52" },
    { key: "Dhuhr", adhan: "13:30", iqamah: "13:45" },
    { key: "Asr", adhan: "17:10", iqamah: "17:25" },
    { key: "Maghrib", adhan: "19:45", iqamah: "19:50" },
    { key: "Isha", adhan: "21:00", iqamah: "21:10" }
  ];

  const fridayExtras = [
    { key: "Jum'ah 1", adhan: "13:30", iqamah: "13:45" },
    { key: "Jum'ah 2", adhan: "14:30", iqamah: "14:45" }
  ];

  const isFriday = useMemo(() => new Date(now).getDay() === 5, [now]);

  const todaySchedule = useMemo(() => {
    const arr = [...baseSchedule];
    if (isFriday) arr.splice(3, 0, ...fridayExtras); // show after Dhuhr
    return arr;
  }, [isFriday]);

  function parseToday(hhmm, dayOffset = 0) {
    const [h, m] = hhmm.split(":").map(Number);
    const d = new Date(now);
    d.setHours(h, m, 0, 0);
    if (dayOffset) d.setDate(d.getDate() + dayOffset);
    return d;
  }

  function timeLeft(to) {
    const diff = to - now;
    if (diff <= 0) return "now";
    const mins = Math.floor(diff / 60000);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  const nextPrayer = useMemo(() => {
    // choose from Fajr, Dhuhr, Asr, Maghrib, Isha (skip Sunrise)
    const keys = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    const list = todaySchedule.filter(p => keys.includes(p.key));

    for (const p of list) {
      const t = parseToday(p.iqamah || p.adhan);
      if (t > now) return { ...p, date: t };
    }
    // none left today → Fajr tomorrow
    const fajr = todaySchedule.find(p => p.key === "Fajr");
    return fajr ? { ...fajr, date: parseToday(fajr.iqamah || fajr.adhan, 1), nextDay: true } : null;
  }, [now, todaySchedule]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000); // update every 15s
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Smooth scroll for in-page links
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href')?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="al-mawa-site">
      {/* Inline styles for easy drop-in */}
      <style>{`
        /* Fonts */
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;600;700;800&display=swap');

        :root {
          --green-900: #0f5132;  /* deep mosque green */
          --green-700: #166e47;  /* emerald */
          --green-600: #1b7a50;
          --green-100: #e9f6ef;  /* mint tint */
          --gold-500: #d4af37;  /* warm gold */
          --ink: #0d1b1a;
          --muted: #51655a;
          --bg: #ffffff;
        }

        .al-mawa-site { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; color: var(--ink); background: var(--bg); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        /* NAV */
        header { position: sticky; top: 0; z-index: 40; backdrop-filter: saturate(1.2) blur(6px); background: rgba(255,255,255,0.75); border-bottom: 1px solid #e6ece8; }
        .nav { display: flex; align-items: center; justify-content: space-between; height: 64px; }
        .brand { display: flex; align-items: center; gap: 12px; font-weight: 800; letter-spacing: 0.2px; }
        .brand .mark { width: 36px; height: 36px; position: relative; }
        .brand .name { line-height: 1; }
        .brand .name .sub { font-size: 12px; color: var(--muted); font-weight: 600; }
        nav ul { display: flex; gap: 18px; list-style: none; }
        nav a { text-decoration: none; font-weight: 600; color: var(--green-900); padding: 8px 10px; border-radius: 10px; }
        nav a:hover { background: var(--green-100); }
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; border: none; border-radius: 14px; padding: 12px 18px; font-weight: 700; cursor: pointer; text-decoration: none; }
        .btn.primary { background: linear-gradient(135deg, var(--green-700), var(--green-900)); color: #fff; box-shadow: 0 6px 20px rgba(15,81,50,0.25); }
        .btn.primary:hover { transform: translateY(-1px); }
        .btn.ghost { background: transparent; color: var(--green-900); border: 2px solid var(--green-900); }

        /* HERO */
        .hero { position: relative; overflow: hidden; background: radial-gradient(1200px 500px at 10% -10%, #eaf7f0 30%, transparent 60%), radial-gradient(1200px 500px at 110% -30%, #f3faf6 20%, transparent 70%), linear-gradient(180deg, #fff 0%, #f8fbf9 100%); }
        .hero .inner { display: grid; grid-template-columns: 1.25fr 1fr; align-items: center; gap: 36px; padding: 64px 0; }
        .eyebrow { color: var(--green-700); font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; font-size: 12px; }
        .title { font-family: "DM Serif Display", serif; font-size: clamp(32px, 5vw, 52px); line-height: 1.05; margin: 10px 0 16px; color: var(--green-900); }
        .title .gold { color: var(--gold-500); }
        .lede { font-size: 18px; color: #355044; max-width: 54ch; }
        .hero-ctas { display: flex; gap: 12px; margin-top: 18px; flex-wrap: wrap; }

        .crescent { position: absolute; right: -80px; top: -60px; width: 260px; height: 260px; opacity: 0.2; }

        /* NEXT PRAYER CARD */
        .np-card { background: #fff; border: 1px solid #e6ece8; border-radius: 18px; padding: 18px; box-shadow: 0 12px 20px rgba(0,0,0,0.04); display: grid; gap: 8px; }
        .np-title { font-weight: 800; letter-spacing: 0.02em; color: var(--green-900); }
        .np-row { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
        .np-time { font-size: 22px; font-weight: 800; color: var(--green-900); }
        .pill { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #fff; background: var(--green-700); padding: 6px 8px; border-radius: 999px; }

        /* PRAYER TABLE */
        .section { padding: 60px 0; position: relative; }
        .section h2 { font-family: "DM Serif Display", serif; font-size: clamp(24px,3.8vw,36px); color: var(--green-900); margin-bottom: 14px; }
        .section .sub { color: var(--muted); margin-bottom: 24px; }
        .card { background: #fff; border: 1px solid #e6ece8; border-radius: 18px; box-shadow: 0 10px 24px rgba(0,0,0,0.04); }
        .prayer-table { width: 100%; border-collapse: collapse; }
        .prayer-table th, .prayer-table td { padding: 12px 14px; text-align: left; border-bottom: 1px dashed #e9efe9; }
        .prayer-table th { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
        .prayer-table td strong { color: var(--green-900); }
        .legend { margin-top: 10px; font-size: 12px; color: var(--muted); }

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

        /* CONTACT */
        .contact { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 22px; }
        .map { border: 0; width: 100%; height: 280px; border-radius: 16px; filter: saturate(0.95) contrast(1.02); }
        .list { display: grid; gap: 8px; }

        /* FOOTER */
        footer { padding: 40px 0 50px; background: linear-gradient(180deg, #fafdfb, #f1f8f4); border-top: 1px solid #e6ece8; }
        .foot { display: flex; align-items: center; justify-content: space-between; gap: 22px; flex-wrap: wrap; }
        .mono { font-feature-settings: "tnum" on, "lnum" on; font-variant-numeric: tabular-nums lining-nums; }

        /* Decorative geometric rule */
        .rule { height: 14px; background-image: repeating-linear-gradient(45deg, rgba(212,175,55,0.28) 0 2px, transparent 2px 8px); border-radius: 999px; margin: 24px 0; }

        /* Animations */
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
          .contact { grid-template-columns: 1fr; }
          nav ul { display: none; }
        }
        @media (min-width: 640px) {
          .service { grid-column: span 6; }
        }
        @media (min-width: 960px) {
          .service { grid-column: span 3; }
        }
        @media (max-width: 640px) {
          .container { padding: 0 16px; }
          .hero .inner { padding: 40px 0; gap: 24px; }
          .title { font-size: clamp(28px, 6vw, 40px); }
          .lede { font-size: 16px; }
          .hero-ctas { flex-direction: column; align-items: center; gap: 12px; }
          .hero-ctas .btn { width: auto; max-width: 280px; margin: 0 auto; }
          .np-card { padding: 14px; }
          .np-time { font-size: 18px; }
          .section { padding: 40px 0; }
          .section h2 { font-size: clamp(20px, 4vw, 32px); }
          .prayer-table th, .prayer-table td { padding: 10px 12px; font-size: 14px; }
          .service { padding: 14px; }
          .service h3 { font-size: 16px; }
          .service p { font-size: 13px; }
          .recon { gap: 16px; }
          .contact { gap: 16px; }
          .map { height: 200px; }
          .foot { flex-direction: column; text-align: center; gap: 16px; }
          .btn { padding: 10px 16px; font-size: 14px; }
          .input { padding: 10px; font-size: 14px; }
        }
      `}</style>

      <header>
        <div className="container nav">
          <div className="brand">
            <div className="mark" aria-hidden>
              <CrescentMark />
            </div>
            <div className="name">
              <div style={{ fontSize: 16, color: "var(--green-900)" }}>Al‑Mawa</div>
              <div className="sub">{center.legalName}</div>
            </div>
          </div>
          <nav aria-label="Primary">
            <ul>
              <li><a href="#prayers">Prayer Times</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#reconstruction">Reconstruction</a></li>
              <li><a href="#contact">Visit Us</a></li>
            </ul>
          </nav>
          <a className="btn primary" href="#donate">Donate</a>
        </div>
      </header>

      <section className="hero" ref={heroRef}>
        <svg className="crescent" viewBox="0 0 200 200" aria-hidden>
          <CrescentBg />
        </svg>
        <div className="container inner">
          <div className="anim">
            <div className="eyebrow">Bismillah</div>
            <h1 className="title">
              Welcome to <span className="gold">Al‑Mawa</span> — {center.legalName}
            </h1>
            <p className="lede">
              A welcoming Islamic center serving the Wichita community with daily prayers, Jumu'ah, sacred knowledge, youth programs, family services, and outreach. "Al‑Mawa" reflects shelter and compassion — a home for hearts.
            </p>
            <div className="hero-ctas">
              <a className="btn primary" href="#donate" aria-label="Donate for reconstruction">
                {/* icon */}
                <span>Donate for Reconstruction</span>
              </a>
              <a className="btn ghost" href="#prayers">See Prayer Times</a>
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
                  <div className="np-time mono">{timeLeft(nextPrayer.date)}</div>
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
        <section id="prayers" className="section">
          <div className="container">
            <h2>Prayer Times</h2>
            <p className="sub">Congregational (Iqamah) times for today in {center.city}. Replace these placeholders with your official schedule.</p>
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
            <div className="legend">Tip: Integrate a prayer API later and update this table dynamically. For now, edit times in the component.</div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section" style={{ background: "linear-gradient(180deg, #f7fbf8, #ffffff)" }}>
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
        <section id="reconstruction" className="section">
          <div className="container recon">
            <div>
              <h2>Reconstruction Campaign</h2>
              <p className="sub">Our facility is undergoing a major renewal to better serve worship, education, and community needs. Join us in rebuilding a house of Allah that will serve generations to come.</p>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#3b5b52' }}>
                <li>Prayer hall renovation (HVAC, carpet, sound)</li>
                <li>Classroom upgrades for Quran & Weekend School</li>
                <li>Wudu & restroom improvements (accessibility)</li>
                <li>Safety, parking, and community hall updates</li>
              </ul>
              <div className="rule" />
              <div className="card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <div className="eyebrow">Goal</div>
                  <div className="mono" style={{ fontWeight: 800, color: 'var(--green-900)' }}>$500,000</div>
                </div>
                <div className="progress" aria-label="Fundraising progress">
                  <div className="bar" style={{ width: '44%' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <div className="note">Raised so far</div>
                  <div className="mono" style={{ fontWeight: 700 }}>$220,000 (44%)</div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }} id="donate">
                  <a className="btn primary" href={center.donationUrl}>Donate Now</a>
                  <a className="btn ghost" href="#contact">Pledge / Mail a Check</a>
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
                  Transparent reporting: quarterly updates on spend & milestones.
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* VISIT / CONTACT */}
        <section id="contact" className="section" style={{ background: "linear-gradient(180deg, #f9fcfa, #f4faf6)" }}>
          <div className="container contact">
            <div>
              <h2>Visit Us</h2>
              <p className="sub">You are always welcome. Please arrive early for Jumu'ah to allow for parking.</p>
              <div className="card" style={{ padding: 18 }}>
                <div className="list">
                  <div><strong>Address:</strong> {center.address}</div>
                  <div><strong>Email:</strong> <a href={`mailto:${center.email}`}>{center.email}</a></div>
                  <div><strong>Phone:</strong> <a href={`tel:${center.phone}`}>{center.phone}</a></div>
                  <div><strong>City:</strong> {center.city}</div>
                </div>
                <div style={{ height: 12 }} />
                <iframe
                  title="Map"
                  className="map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.0000000000005!2d-97.343!3d37.687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWichita!5e0!3m2!1sen!2sus!4v00000000000"
                  allowFullScreen
                />
              </div>
            </div>
            <div>
              <div className="card" style={{ padding: 18 }}>
                <h3 style={{ marginTop: 0, color: 'var(--green-900)' }}>Stay Connected</h3>
                <p>Announcements, prayer updates, and events straight to your inbox.</p>
                <form onSubmit={(e) => e.preventDefault()} className="list">
                  <label>
                    <span className="sub" style={{ display: 'block', marginBottom: 8 }}>Full Name</span>
                    <input required placeholder="Your name" className="input" />
                  </label>
                  <label>
                    <span className="sub" style={{ display: 'block', marginBottom: 8 }}>Email</span>
                    <input required type="email" placeholder="you@example.com" className="input" />
                  </label>
                  <button className="btn primary" type="submit">Subscribe</button>
                </form>
                <style>{`
                  .input { width: 100%; padding: 12px 12px; border-radius: 12px; border: 1px solid #dfe8e3; font-size: 14px; box-sizing: border-box; }
                  .input:focus { outline: none; border-color: var(--green-700); box-shadow: 0 0 0 3px rgba(22,110,71,0.15); }
                  @media (max-width: 640px) {
                    .input { padding: 14px 16px; font-size: 16px; border-radius: 10px; }
                    .list label { margin-bottom: 12px; }
                    .list .sub { font-size: 14px; margin-bottom: 6px; }
                    .list .btn { width: 100%; margin-top: 8px; box-sizing: border-box; }
                  }
                `}</style>
                <p className="note" style={{ marginTop: 10 }}>We respect your privacy. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container foot">
          <div className="brand" style={{ gap: 10 }}>
            <div className="mark" aria-hidden>
              <CrescentMark />
            </div>
            <div className="name">
              <div style={{ fontSize: 16, color: "var(--green-900)" }}>Al‑Mawa</div>
              <div className="sub">{center.legalName}</div>
            </div>
          </div>
          <div className="note">© {new Date().getFullYear()} {center.legalName}. All rights reserved.</div>
          <div className="note">“Whoever relieves a believer’s distress, Allah will relieve his distress on the Day of Resurrection.”</div>
        </div>
      </footer>
    </div>
  );
}

function fmtTime(hhmm) {
  // hh:mm (24h) → local 12h string
  const [H, M] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(H, M, 0, 0);
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
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

function CrescentMark() {
  return (
    <img 
      src="/al-mawa/star.png" 
      alt="Al-Mawa Logo" 
      style={{ width: '36px', height: '36px', borderRadius: '50%' }}
      role="img" 
      aria-label="Al-Mawa Islamic Center Logo"
    />
  );
}

function CrescentBg() {
  return (
    <img 
      src="/al-mawa/logo.png" 
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
