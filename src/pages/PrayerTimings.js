import React, { useEffect, useMemo, useState } from 'react';
import SiteLayout from '../components/SiteLayout';
import { fmtTime, makeSchedule, timeLeft } from '../utils/prayerSchedule';

export default function PrayerTimings() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  const { todaySchedule, nextPrayer } = useMemo(() => makeSchedule({ now }), [now]);

  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>Prayer Timings</h1>
          <p className="sub">Daily salah times. Please verify weekly announcements for updates (seasonal adjustments).</p>

          <div className="card" style={{ padding: 22, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #e6ece8' }}>Prayer</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #e6ece8' }}>Adhan</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #e6ece8' }}>Iqamah</th>
                </tr>
              </thead>
              <tbody>
                {todaySchedule.map((p) => (
                  <tr key={p.key}>
                    <td style={{ padding: '10px 12px', borderBottom: '1px dashed #e9efe9', fontWeight: 900, color: 'var(--green-900)' }}>{p.key}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px dashed #e9efe9' }} className="mono">{fmtTime(p.adhan)}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px dashed #e9efe9' }} className="mono">{p.iqamah ? fmtTime(p.iqamah) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ height: 14 }} />

          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'baseline' }}>
              <div>
                <div style={{ fontWeight: 900, color: 'var(--green-900)' }}>Next Prayer</div>
                <div className="sub" style={{ margin: 0 }}>{nextPrayer ? `${nextPrayer.key}${nextPrayer.nextDay ? ' (tomorrow)' : ''}` : '—'}</div>
              </div>
              <div className="mono" style={{ fontWeight: 900, color: 'var(--green-900)' }}>
                {nextPrayer ? timeLeft({ now, to: nextPrayer.date }) : '—'}
              </div>
            </div>
            <div className="sub" style={{ margin: '12px 0 0' }}>
              Note: these are placeholders until the official timetable is added.
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
