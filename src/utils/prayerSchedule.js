
// Fetch schedule from API (returns Promise)
export async function fetchPrayerSchedule() {
  try {
    // DEVELOPMENT (Your PC): Connects to XAMPP server
    if (process.env.NODE_ENV === 'development') {
      const res = await fetch('http://localhost/al-mawa/public/api/prayer_times.php');
      const data = await res.json();
      if (data.ok && Array.isArray(data.schedule)) return data.schedule;
    }
    // PRODUCTION (Namecheap/Live): Uses relative path
    // React's build folder moves 'public/api' -> 'api', so we just ask for 'api/...'
    else {
      const res = await fetch('api/prayer_times.php');
      const data = await res.json();
      if (data.ok && Array.isArray(data.schedule)) return data.schedule;
    }
  } catch (e) { }
  // fallback static
  return [
    { key: 'Fajr', adhan: '05:30', iqamah: '05:45' },
    { key: 'Sunrise', adhan: '06:52' },
    { key: 'Dhuhr', adhan: '13:30', iqamah: '13:45' },
    { key: 'Asr', adhan: '17:10', iqamah: '17:25' },
    { key: 'Maghrib', adhan: '19:45', iqamah: '19:50' },
    { key: 'Isha', adhan: '21:00', iqamah: '21:10' },
    { key: 'Jumuah', adhan: '13:00', iqamah: '13:30' }
  ];
}


export function makeSchedule({ now = new Date(), schedule } = {}) {
  const baseSchedule = Array.isArray(schedule) && schedule.length ? schedule : [];
  const todaySchedule = [...baseSchedule];

  function parseToday(hhmm, dayOffset = 0) {
    const [h, m] = hhmm.split(':').map(Number);
    const d = new Date(now);
    d.setHours(h, m, 0, 0);
    if (dayOffset) d.setDate(d.getDate() + dayOffset);
    return d;
  }

  // Only use these for "next prayer" logic
  const keys = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const list = todaySchedule.filter((p) => keys.includes(p.key));

  let nextPrayer = null;
  for (const p of list) {
    const t = parseToday(p.iqamah || p.adhan);
    if (t > now) {
      nextPrayer = { ...p, date: t };
      break;
    }
  }
  if (!nextPrayer) {
    const fajr = todaySchedule.find((p) => p.key === 'Fajr');
    if (fajr) nextPrayer = { ...fajr, date: parseToday(fajr.iqamah || fajr.adhan, 1), nextDay: true };
  }

  return { todaySchedule, nextPrayer };
}

export function fmtTime(hhmm) {
  const [H, M] = hhmm.split(':').map(Number);
  const d = new Date();
  d.setHours(H, M, 0, 0);
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function timeLeft({ now, to }) {
  const diff = to - now;
  if (diff <= 0) return 'now';
  const mins = Math.floor(diff / 60000);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
