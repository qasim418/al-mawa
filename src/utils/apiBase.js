export function getApiBase() {
  // Dev (CRA): PHP lives under XAMPP path.
  if (process.env.NODE_ENV === 'development') {
    return '/al-mawa/public/api';
  }

  // Prod: choose based on where the app is hosted.
  // - If the site is deployed under /al-mawa/public, use that.
  // - Otherwise (almawa.org root), use /api.
  const path = (typeof window !== 'undefined' && window.location && window.location.pathname) ? window.location.pathname : '/';
  if (path.startsWith('/al-mawa/')) return '/al-mawa/public/api';
  return '/api';
}
