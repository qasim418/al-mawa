import React, { useEffect, useState } from 'react';
import SiteLayout from '../components/SiteLayout';
import { getApiBase } from '../utils/apiBase';

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

    const [raised, setRaised] = useState('0');
    const [fundsMsg, setFundsMsg] = useState('');
    const [fundsErr, setFundsErr] = useState('');
    const [savingFunds, setSavingFunds] = useState(false);

    // Islamic Measures
    const [measures, setMeasures] = useState([]);
    const [measuresMsg, setMeasuresMsg] = useState('');
    const [measuresErr, setMeasuresErr] = useState('');
    const [savingMeasures, setSavingMeasures] = useState(false);

    const apiBase = getApiBase();

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

                // Load fundraising raised amount
                const fr = await fetch(`${apiBase}/admin_fundraising.php`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const frData = await fr.json();
                if (frData.ok) {
                    setRaised(String(frData.raised ?? 0));
                    if (frData.csrf) setCsrf(frData.csrf);
                }

                // Load Islamic Measures
                const im = await fetch(`${apiBase}/admin_islamic_measures.php`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const imData = await im.json();
                if (imData.ok) {
                    setMeasures(imData.measures || []);
                    if (imData.csrf) setCsrf(imData.csrf);
                }
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

    const handleSaveFunds = async () => {
        setSavingFunds(true);
        setFundsMsg('');
        setFundsErr('');
        try {
            const res = await fetch(`${apiBase}/admin_fundraising.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ raised, csrf }),
            });
            const data = await res.json();
            if (data.ok) {
                setFundsMsg('Fundraising updated!');
                checkSession();
            } else {
                setFundsErr(data.error || 'Failed to update fundraising');
            }
        } catch (e) {
            setFundsErr('Network error updating fundraising');
        } finally {
            setSavingFunds(false);
        }
    };

    const handleMeasureChange = (e, index, field) => {
        const newMeasures = [...measures];
        newMeasures[index] = { ...newMeasures[index], [field]: e.target.value };
        setMeasures(newMeasures);
    };

    const handleSaveMeasures = async () => {
        setSavingMeasures(true);
        setMeasuresMsg('');
        setMeasuresErr('');
        try {
            const res = await fetch(`${apiBase}/admin_islamic_measures.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ measures, csrf }),
            });
            const data = await res.json();
            if (data.ok) {
                setMeasuresMsg('Islamic Measures updated!');
                checkSession();
            } else {
                setMeasuresErr(data.error || 'Failed to update Islamic Measures');
            }
        } catch (e) {
            setMeasuresErr('Network error updating Islamic Measures');
        } finally {
            setSavingMeasures(false);
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

                        <div className="sub" style={{ margin: '0 0 12px' }}>
                            Note: Sunrise is automatic. Maghrib is automatic (sunset) and Iqamah is set to +4 minutes.
                        </div>

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
                                    (() => {
                                        const isAuto = row.auto === true || row.key === 'Maghrib' || row.key === 'Sunrise';
                                        return (
                                    <tr key={row.key || i} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px' }}>
                                            <strong>{row.key}{isAuto ? ' (Auto)' : ''}</strong>
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            <input
                                                type="text"
                                                value={row.adhan_time || ''}
                                                onChange={(e) => handleChange(e, i, 'adhan_time')}
                                                style={{ padding: '6px', width: '80px', fontFamily: 'monospace' }}
                                                disabled={isAuto}
                                            />
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            <input
                                                type="text"
                                                value={row.iqamah_time || ''}
                                                onChange={(e) => handleChange(e, i, 'iqamah_time')}
                                                placeholder="null"
                                                style={{ padding: '6px', width: '80px', fontFamily: 'monospace' }}
                                                disabled={isAuto}
                                            />
                                        </td>
                                    </tr>
                                        );
                                    })()
                                ))}
                            </tbody>
                        </table>

                        <div style={{ marginTop: 20, textAlign: 'right' }}>
                            <button className="btn primary" onClick={handleSave} disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 20, marginTop: 18 }}>
                        <h2 style={{ marginTop: 0 }}>Fundraising</h2>
                        <p className="sub" style={{ marginTop: 0 }}>Update the “Raised so far” amount shown on the site.</p>

                        {fundsMsg && <div style={{ background: '#d4edda', color: '#155724', padding: 10, borderRadius: 4, marginBottom: 15 }}>{fundsMsg}</div>}
                        {fundsErr && <div style={{ background: '#f8d7da', color: '#721c24', padding: 10, borderRadius: 4, marginBottom: 15 }}>{fundsErr}</div>}

                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'end' }}>
                            <div style={{ minWidth: 220 }}>
                                <label style={{ display: 'block', marginBottom: 6, fontWeight: 700 }}>Raised so far (USD)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={raised}
                                    onChange={(e) => setRaised(e.target.value)}
                                    style={{ width: '100%', padding: '10px', borderRadius: 4, border: '1px solid #ddd', fontFamily: 'monospace' }}
                                />
                            </div>
                            <button className="btn primary" onClick={handleSaveFunds} disabled={savingFunds}>
                                {savingFunds ? 'Saving...' : 'Save Fundraising'}
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 20, marginTop: 18 }}>
                        <h2 style={{ marginTop: 0 }}>Islamic Measures & Standards</h2>
                        <p className="sub" style={{ marginTop: 0 }}>Update the Islamic Measures values shown on the home page (Zakat Nisab, Sadaqat al-Fitr, etc.).</p>

                        {measuresMsg && <div style={{ background: '#d4edda', color: '#155724', padding: 10, borderRadius: 4, marginBottom: 15 }}>{measuresMsg}</div>}
                        {measuresErr && <div style={{ background: '#f8d7da', color: '#721c24', padding: 10, borderRadius: 4, marginBottom: 15 }}>{measuresErr}</div>}

                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: '10px' }}>Item</th>
                                    <th style={{ textAlign: 'left', padding: '10px' }}>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {measures.map((row, i) => (
                                    <tr key={row.key || i} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px' }}>
                                            <input
                                                type="text"
                                                value={row.label || ''}
                                                onChange={(e) => handleMeasureChange(e, i, 'label')}
                                                style={{ padding: '6px', width: '100%', maxWidth: '280px' }}
                                            />
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            <input
                                                type="text"
                                                value={row.value || ''}
                                                onChange={(e) => handleMeasureChange(e, i, 'value')}
                                                style={{ padding: '6px', width: '100%', maxWidth: '320px', fontFamily: 'monospace' }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div style={{ marginTop: 20, textAlign: 'right' }}>
                            <button className="btn primary" onClick={handleSaveMeasures} disabled={savingMeasures}>
                                {savingMeasures ? 'Saving...' : 'Save Islamic Measures'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
