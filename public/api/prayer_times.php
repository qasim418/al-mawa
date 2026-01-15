<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';

function hhmm_from_timestamp(int $ts, string $tzName): string {
    $tz = new DateTimeZone($tzName);
    $dt = new DateTimeImmutable('@' . $ts);
    $dt = $dt->setTimezone($tz);
    return $dt->format('H:i');
}

try {
    $pdo = db();

    $cfg = get_config();
    $tzName = (string)($cfg['timezone'] ?? 'America/Chicago');
    $loc = $cfg['location'] ?? [];
    $lat = is_array($loc) && isset($loc['lat']) ? (float)$loc['lat'] : 37.7197;
    $lng = is_array($loc) && isset($loc['lng']) ? (float)$loc['lng'] : -97.2896;

    // Ensure sunset is calculated in the intended timezone.
    if ($tzName) {
        @date_default_timezone_set($tzName);
    }

    // Use midday to avoid DST edge cases.
    $midday = (new DateTimeImmutable('now', new DateTimeZone($tzName ?: 'UTC')))->setTime(12, 0)->getTimestamp();
    $sun = @date_sun_info($midday, $lat, $lng);
    $sunriseTs = is_array($sun) && isset($sun['sunrise']) && is_int($sun['sunrise']) ? $sun['sunrise'] : null;
    $sunsetTs = is_array($sun) && isset($sun['sunset']) && is_int($sun['sunset']) ? $sun['sunset'] : null;

    $stmt = $pdo->query('SELECT `key`, adhan_time, iqamah_time FROM prayer_times ORDER BY sort_order ASC, `key` ASC');
    $rows = $stmt->fetchAll();

    $schedule = array_map(function ($r) {
        return [
            'key' => $r['key'],
            'adhan' => $r['adhan_time'],
            'iqamah' => $r['iqamah_time'] !== null ? $r['iqamah_time'] : null,
        ];
    }, $rows);

    // Force Sunrise adhan to today's sunrise.
    if ($sunriseTs !== null) {
        $sunriseAdhan = hhmm_from_timestamp($sunriseTs, $tzName ?: 'UTC');

        $found = false;
        foreach ($schedule as &$row) {
            if (($row['key'] ?? '') === 'Sunrise') {
                $row['adhan'] = $sunriseAdhan;
                $row['iqamah'] = null;
                $found = true;
                break;
            }
        }
        unset($row);

        if (!$found) {
            $schedule[] = ['key' => 'Sunrise', 'adhan' => $sunriseAdhan, 'iqamah' => null];
        }
    }

    // Force Maghrib adhan to today's sunset and iqamah to +4 minutes.
    if ($sunsetTs !== null) {
        $maghribAdhan = hhmm_from_timestamp($sunsetTs, $tzName ?: 'UTC');
        $maghribIqamah = hhmm_from_timestamp($sunsetTs + (4 * 60), $tzName ?: 'UTC');

        $found = false;
        foreach ($schedule as &$row) {
            if (($row['key'] ?? '') === 'Maghrib') {
                $row['adhan'] = $maghribAdhan;
                $row['iqamah'] = $maghribIqamah;
                $found = true;
                break;
            }
        }
        unset($row);

        if (!$found) {
            $schedule[] = ['key' => 'Maghrib', 'adhan' => $maghribAdhan, 'iqamah' => $maghribIqamah];
        }
    }

    // Public endpoint can be cached briefly if desired, but keep simple
    header('Access-Control-Allow-Origin: *');
    json_response(['ok' => true, 'schedule' => $schedule]);
} catch (Throwable $e) {
    json_response(['ok' => false, 'error' => $e->getMessage()], 500);
}
