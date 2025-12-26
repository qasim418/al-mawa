import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout';

export default function AdminDashboard() {
    const [session, setSession] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Data
    const [schedule, setSchedule] = useState([]);
    const [csrf, setCsrf] = useState('');
    const [msg, setMsg] = useState('');

    const isDev = process.env.NODE_ENV === 'development';
    const apiBase = isDev ? 'http://localhost/al-mawa/public/api' : 'api';

    async function checkSession() {
        try {
            // Just try to fetch the schedule from admin endpoint (which requires auth)
            // If 401, we are logged out. If 200, logged in.
            const res = await fetch(`${apiBase}/admin_prayer_times.php`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await res.json();
            if (res.status === 401) {
                setSession(null);
                return;
            }
            if (data.ok) {
                setSession({ user: 'Admin' });
                setSchedule(data.schedule);
                setCsrf(data.csrf);
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        checkSession();
    }, []); // eslint-disable-line

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${apiBase}/login.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (data.ok) {
                setSession({ user: data.username });
                // Fetch data now
                checkSession();
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch(`${apiBase}/logout.php`, { method: 'POST', credentials: 'include' });
        setSession(null);
        setSchedule([]);
        setUsername('');
        setPassword('');
    };

    const handleChange = (e, index, field) => {
        const newSched = [...schedule];
        newSched[index] = { ...newSched[index], [field]: e.target.value };
        setSchedule(newSched);
    };

    const handleSave = async () => {
        setLoading(true);
        setMsg('');
        setError('');
        try {
            const res = await fetch(`${apiBase}/admin_prayer_times.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ schedule, csrf }),
            });
            const data = await res.json();
            if (data.ok) {
                setMsg('Saved successfully!');
                // Refresh local data to be safe
                checkSession();
            } else {
                setError(data.error || 'Failed to save');
            }
        } catch (e) {
            setError('Network error saving');
        } finally {
            setLoading(false);
        }
    };

    if (!session) {
        return (
            <SiteLayout>
                <div style={{ maxWidth: 400, margin: '60px auto', padding: 20 }} className="card">
                    <h1>Admin Login</h1>
                    <form onSubmit={handleLogin} style={{ display: 'grid', gap: 14 }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 700 }}>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: 4, border: '1px solid #ddd' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 700 }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: 4, border: '1px solid #ddd' }}
                                required
                            />
                        </div>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <button type="submit" className="btn primary" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </SiteLayout>
        );
    }

    return (
        <SiteLayout>
            <section className="section">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1>Manage Timings</h1>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <span>Hi, {session.user}</span>
                            <button onClick={handleLogout} className="btn ghost" style={{ padding: '6px 12px' }}>Logout</button>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 20, marginTop: 20, overflowX: 'auto' }}>
                        {msg && <div style={{ background: '#d4edda', color: '#155724', padding: 10, borderRadius: 4, marginBottom: 15 }}>{msg}</div>}
                        {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: 10, borderRadius: 4, marginBottom: 15 }}>{error}</div>}

                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: '10px' }}>Prayer</th>
                                    <th style={{ textAlign: 'left', padding: '10px' }}>Adhan (24h)</th>
                                    <th style={{ textAlign: 'left', padding: '10px' }}>Iqamah (24h)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map((row, i) => (
                                    <tr key={row.key || i} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px' }}>
                                            <strong>{row.key}</strong>
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            <input
                                                type="text"
                                                value={row.adhan_time || ''}
                                                onChange={(e) => handleChange(e, i, 'adhan_time')}
                                                style={{ padding: '6px', width: '80px', fontFamily: 'monospace' }}
                                            />
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            <input
                                                type="text"
                                                value={row.iqamah_time || ''}
                                                onChange={(e) => handleChange(e, i, 'iqamah_time')}
                                                placeholder="null"
                                                style={{ padding: '6px', width: '80px', fontFamily: 'monospace' }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div style={{ marginTop: 20, textAlign: 'right' }}>
                            <button className="btn primary" onClick={handleSave} disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
