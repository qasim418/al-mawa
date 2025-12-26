import React, { useEffect, useMemo, useState } from 'react';
import SiteLayout from '../components/SiteLayout';
import { fmtTime, makeSchedule, timeLeft, fetchPrayerSchedule } from '../utils/prayerSchedule';

export default function PrayerTimings() {
  const [now, setNow] = useState(() => new Date());
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrayerSchedule().then((s) => {
      setSchedule(s);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  const { todaySchedule, nextPrayer } = useMemo(() => makeSchedule({ now, schedule }), [now, schedule]);

  // Separate Jumuah if present
  const jumuah = todaySchedule.find((p) => p.key && p.key.toLowerCase().startsWith('jumu'));
  const mainPrayers = todaySchedule.filter((p) => !p.key.toLowerCase().startsWith('jumu'));

  if (loading) return <SiteLayout><section className="section"><div className="container">Loading prayer times...</div></section></SiteLayout>;

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
                {mainPrayers.map((p) => (
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

          {jumuah && (
            <div className="card" style={{ padding: 22, marginBottom: 18 }} aria-label="Jumu'ah time">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Jumu'ah</th>
                    <th>Adhan</th>
                    <th>Iqamah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Khutbah & Salah</strong></td>
                    <td className="mono">{fmtTime(jumuah.adhan)}</td>
                    <td className="mono">{jumuah.iqamah ? fmtTime(jumuah.iqamah) : '—'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

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
              Note: times are updated by the masjid admin panel.
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
