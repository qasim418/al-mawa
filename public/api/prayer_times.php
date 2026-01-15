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

function fetch_open_meteo_sun_times(float $lat, float $lng, string $tzName): ?array {
    $tzName = $tzName ?: 'UTC';
    $tz = new DateTimeZone($tzName);
    $today = (new DateTimeImmutable('now', $tz))->format('Y-m-d');

    $cacheKey = md5($lat . '|' . $lng . '|' . $tzName . '|' . $today);
    $cachePath = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'almawa-sun-' . $cacheKey . '.json';
    if (is_file($cachePath)) {
        $cachedRaw = @file_get_contents($cachePath);
        $cached = $cachedRaw ? json_decode($cachedRaw, true) : null;
        if (is_array($cached) && isset($cached['sunrise_ts'], $cached['sunset_ts']) && is_int($cached['sunrise_ts']) && is_int($cached['sunset_ts'])) {
            return ['sunrise' => $cached['sunrise_ts'], 'sunset' => $cached['sunset_ts']];
        }
    }

    $tzEnc = rawurlencode($tzName);
    $url = 'https://api.open-meteo.com/v1/forecast'
        . '?latitude=' . rawurlencode((string)$lat)
        . '&longitude=' . rawurlencode((string)$lng)
        . '&daily=sunrise,sunset'
        . '&timezone=' . $tzEnc
        . '&start_date=' . $today
        . '&end_date=' . $today;

    $ctx = stream_context_create([
        'http' => [
            'timeout' => 3,
            'header' => "User-Agent: al-mawa\r\n",
        ],
    ]);
    $raw = @file_get_contents($url, false, $ctx);
    if (!$raw) return null;

    $data = json_decode($raw, true);
    if (!is_array($data)) return null;

    $sunriseIso = $data['daily']['sunrise'][0] ?? null;
    $sunsetIso = $data['daily']['sunset'][0] ?? null;
    if (!is_string($sunriseIso) || !is_string($sunsetIso)) return null;

    $sunriseTs = (new DateTimeImmutable($sunriseIso, $tz))->getTimestamp();
    $sunsetTs = (new DateTimeImmutable($sunsetIso, $tz))->getTimestamp();

    @file_put_contents($cachePath, json_encode([
        'date' => $today,
        'sunrise_ts' => $sunriseTs,
        'sunset_ts' => $sunsetTs,
    ], JSON_UNESCAPED_SLASHES));

    return ['sunrise' => $sunriseTs, 'sunset' => $sunsetTs];
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

    $sunriseTs = null;
    $sunsetTs = null;
    $fromApi = fetch_open_meteo_sun_times($lat, $lng, $tzName ?: 'UTC');
    if (is_array($fromApi)) {
        $sunriseTs = $fromApi['sunrise'] ?? null;
        $sunsetTs = $fromApi['sunset'] ?? null;
    }

    // Fallback if the host blocks outbound HTTP or API fails.
    if ($sunriseTs === null || $sunsetTs === null) {
        $midday = (new DateTimeImmutable('now', new DateTimeZone($tzName ?: 'UTC')))->setTime(12, 0)->getTimestamp();
        $sun = @date_sun_info($midday, $lat, $lng);
        $sunriseTs = $sunriseTs ?? (is_array($sun) && isset($sun['sunrise']) && is_int($sun['sunrise']) ? $sun['sunrise'] : null);
        $sunsetTs = $sunsetTs ?? (is_array($sun) && isset($sun['sunset']) && is_int($sun['sunset']) ? $sun['sunset'] : null);
    }

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
