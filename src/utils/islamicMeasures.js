import { getApiBase } from './apiBase';

// Fetch Islamic Measures from API (returns Promise)
export async function fetchIslamicMeasures() {
  try {
    const res = await fetch(`${getApiBase()}/islamic_measures.php`);
    const data = await res.json();
    if (data.ok && Array.isArray(data.measures)) {
      return data.measures;
    }
  } catch (e) {}
  // fallback static
  return [
    { key: 'zakat_nisab_gold', label: 'Zakat Nisab (Gold)', value: '87.48 g / 3.09 oz' },
    { key: 'zakat_nisab_silver', label: 'Zakat Nisab (Silver)', value: '612.36 g / 21.60 oz' },
    { key: 'qurbani_nisab', label: 'Qurbani Nisab', value: '612.36 g / 21.60 oz (or its value)' },
    { key: 'sadaqat_fitr_wheat', label: 'Sadaqat al-Fitr (wheat)', value: '1.574 kg / 55.53 oz (or its value)' },
    { key: 'sadaqat_fitr_dates', label: 'Sadaqat al-Fitr (dates/raisins)', value: '3.149 kg / 111.09 oz (or its value)' },
    { key: 'fidya', label: 'Fidya (per missed fast/prayer)', value: 'Same as Sadaqat al-Fitr' },
    { key: 'mahr_fatimi', label: 'Mahr Fātimī', value: '1,530.9 g / 54.00 oz silver' },
    { key: 'distance_safar', label: 'Distance of Safar', value: '77.25 km (≈ 48 miles)' }
  ];
}
