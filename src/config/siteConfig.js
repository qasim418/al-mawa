export const siteConfig = {
  // Wichita, KS (Masjid Annoor)
  coords: {
    lat: 37.7197,
    lng: -97.2896,
  },

  // If true, Maghrib adhan is computed from sunset daily.
  // Maghrib iqamah is set to adhan + offset (minutes).
  autoMaghrib: true,
  maghribIqamahOffsetMins: 4,

  // Fundraising defaults (overridden by API if available)
  fundraising: {
    phase1Goal: 1305000,
  },
};
