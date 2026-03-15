import { getApiBase } from './apiBase';

const apiBase = getApiBase();

export async function fetchMoonSightingConfig() {
  try {
    const res = await fetch(`${apiBase}/moon_sighting.php`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    if (data.ok && data.config) {
      return data.config;
    }
    return { adjustment: -1, source: 'Chicago Hilal Committee' };
  } catch (e) {
    console.error('Failed to fetch moon sighting config:', e);
    return { adjustment: -1, source: 'Chicago Hilal Committee' };
  }
}
