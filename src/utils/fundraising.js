export async function fetchFundraisingRaised() {
  try {
    const res = await fetch('/al-mawa/public/api/fundraising.php');
    const data = await res.json();
    if (data.ok && typeof data.raised === 'number') return data.raised;
  } catch (e) {}
  return 0;
}
