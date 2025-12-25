import React from 'react';
import { NavLink } from 'react-router-dom';

function BrandMark() {
  const publicUrl = process.env.PUBLIC_URL || '';
  return (
    <img
      src={`${publicUrl}/star.png`}
      alt="Masjid Annoor Wichita"
      style={{ width: '36px', height: '36px', borderRadius: '50%' }}
    />
  );
}

export default function SiteLayout({ children }) {
  const year = new Date().getFullYear();

  return (
    <div className="al-mawa-site">
      <style>{`
        :root {
          --green-900: #0f5132;
          --green-700: #166e47;
          --green-600: #1b7a50;
          --green-100: #e9f6ef;
          --gold-500: #d4af37;
          --ink: #0d1b1a;
          --muted: #51655a;
          --bg: #ffffff;
        }

        * { box-sizing: border-box; }
        .al-mawa-site { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color: var(--ink); background: var(--bg); min-height: 100vh; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        header { position: sticky; top: 0; z-index: 40; backdrop-filter: saturate(1.2) blur(6px); background: rgba(255,255,255,0.82); border-bottom: 1px solid #e6ece8; }
        .nav { display: flex; align-items: center; justify-content: space-between; gap: 14px; min-height: 64px; padding: 10px 0; }
        .brand { display: flex; align-items: center; gap: 12px; font-weight: 800; letter-spacing: 0.2px; text-decoration: none; }
        .brand .mark { width: 36px; height: 36px; position: relative; flex: 0 0 auto; }
        .brand .name { line-height: 1.05; }
        .brand .name .sub { font-size: 12px; color: var(--muted); font-weight: 600; }

        nav ul { display: flex; flex-wrap: wrap; gap: 10px; list-style: none; padding: 0; margin: 0; align-items: center; }
        nav a { text-decoration: none; font-weight: 700; color: var(--green-900); padding: 8px 10px; border-radius: 10px; }
        nav a:hover { background: var(--green-100); }
        nav a.active { background: var(--green-100); }

        nav a.btn { padding: 12px 18px; border-radius: 14px; }
        nav a.btn.primary { color: #fff; background: linear-gradient(135deg, var(--green-700), var(--green-900)); box-shadow: 0 6px 20px rgba(15,81,50,0.25); }
        nav a.btn.primary:hover { background: linear-gradient(135deg, var(--green-700), var(--green-900)); transform: translateY(-1px); }
        nav a.btn.primary.active { background: linear-gradient(135deg, var(--green-700), var(--green-900)); }
        nav a.donate-link { margin-left: 6px; }

        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; border: none; border-radius: 14px; padding: 12px 18px; font-weight: 800; cursor: pointer; text-decoration: none; }
        .btn.primary { background: linear-gradient(135deg, var(--green-700), var(--green-900)); color: #fff; box-shadow: 0 6px 20px rgba(15,81,50,0.25); }
        .btn.primary:hover { transform: translateY(-1px); }
        .btn.ghost { background: transparent; color: var(--green-900); border: 2px solid var(--green-900); }

        .section { padding: 60px 0; position: relative; }
        .section h1, .section h2 { font-family: "DM Serif Display", serif; color: var(--green-900); margin: 0 0 14px; }
        .section h1 { font-size: clamp(28px, 5vw, 46px); line-height: 1.05; }
        .section h2 { font-size: clamp(22px, 3.8vw, 34px); }
        .sub { color: var(--muted); margin: 0 0 18px; }

        .card { background: #fff; border: 1px solid #e6ece8; border-radius: 18px; box-shadow: 0 10px 24px rgba(0,0,0,0.04); }
        .rule { height: 14px; background-image: repeating-linear-gradient(45deg, rgba(212,175,55,0.28) 0 2px, transparent 2px 8px); border-radius: 999px; margin: 24px 0; }
        .mono { font-feature-settings: "tnum" on, "lnum" on; font-variant-numeric: tabular-nums lining-nums; }

        .prose { color: #355044; line-height: 1.75; }
        .prose p { margin: 0 0 14px; }
        .prose strong { color: var(--green-900); }

        footer { padding: 40px 0 50px; background: linear-gradient(180deg, #fafdfb, #f1f8f4); border-top: 1px solid #e6ece8; }
        .foot { display: flex; align-items: center; justify-content: space-between; gap: 22px; flex-wrap: wrap; }

        @media (max-width: 980px) {
          .nav { flex-direction: column; align-items: stretch; }
          .nav-right { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        }
        @media (max-width: 640px) {
          .container { padding: 0 16px; }
          .section { padding: 40px 0; }
          .btn { padding: 10px 16px; font-size: 14px; }
          .foot { flex-direction: column; text-align: center; gap: 16px; }
        }
      `}</style>

      <header>
        <div className="container nav">
          <div className="nav-right">
            <NavLink exact to="/" className="brand" aria-label="Go to Home">
              <div className="mark" aria-hidden>
                <BrandMark />
              </div>
              <div className="name">
                <div style={{ fontSize: 16, color: 'var(--green-900)' }}>Masjid Annoor</div>
                <div className="sub">Wichita, Kansas</div>
              </div>
            </NavLink>
          </div>

          <nav aria-label="Primary">
            <ul>
              <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
              <li><NavLink exact to="/about" activeClassName="active">About</NavLink></li>
              <li><NavLink exact to="/construction" activeClassName="active">Construction Project</NavLink></li>
              <li><NavLink exact to="/prayer-timings" activeClassName="active">Prayer Timings</NavLink></li>
              <li><NavLink exact to="/fundraising" activeClassName="active">Fundraising</NavLink></li>
              <li><NavLink className="btn primary donate-link" to="/donate">Donate</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>

      {children}

      <footer>
        <div className="container foot">
          <div className="brand" style={{ gap: 10 }}>
            <div className="mark" aria-hidden>
              <BrandMark />
            </div>
            <div className="name">
              <div style={{ fontSize: 16, color: 'var(--green-900)' }}>Masjid Annoor</div>
              <div className="sub">Wichita, Kansas</div>
            </div>
          </div>
          <div className="sub">© {year} Masjid Annoor Wichita. All rights reserved.</div>
          <div className="sub">Sadaqah Jariyah for generations.</div>
        </div>
      </footer>
    </div>
  );
}
