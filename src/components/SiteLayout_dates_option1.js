// OPTION 1: Compact dates inside header (NEXT TO LOGO)
// Replace the DateDisplay component with this:

function DateDisplay() {
  const [dateStr, setDateStr] = useState('');
  const [hijriStr, setHijriStr] = useState('');
  const [moonSource, setMoonSource] = useState('Moon Sighting');

  useEffect(() => {
    async function loadDates() {
      const today = new Date();
      const gregorian = today.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      setDateStr(gregorian);

      const config = await fetchMoonSightingConfig();
      const adjustment = config?.adjustment ?? -1;
      setMoonSource(config?.source || 'Moon Sighting');

      const adjustedDate = new Date(today);
      adjustedDate.setDate(adjustedDate.getDate() + adjustment);
      
      const hijri = moment(adjustedDate).format('iD iMMM');
      setHijriStr(hijri);
    }

    loadDates();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 1,
      padding: '4px 10px',
      background: 'var(--green-100)',
      borderRadius: 8,
      marginLeft: 12,
      border: '1px solid rgba(15, 81, 50, 0.1)'
    }}>
      <span style={{
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--green-900)',
        fontFamily: 'Amiri, serif',
        direction: 'rtl',
        lineHeight: 1.2
      }}>
        {hijriStr}
      </span>
      <span style={{
        fontSize: 10,
        color: 'var(--muted)',
        fontWeight: 500,
        lineHeight: 1.2
      }}>
        {dateStr}
      </span>
    </div>
  );
}

// Then place it inside the brand/nav area after the masjid name
