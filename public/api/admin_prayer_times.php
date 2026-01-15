<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

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

    $cacheKey = md5('admin|' . $lat . '|' . $lng . '|' . $tzName . '|' . $today);
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
    start_session();

    handle_preflight();
    cors_headers();

    require_login_json();

    $pdo = db();
    $method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');

    $cfg = get_config();
    $tzName = (string)($cfg['timezone'] ?? 'America/Chicago');
    $loc = $cfg['location'] ?? [];
    $lat = is_array($loc) && isset($loc['lat']) ? (float)$loc['lat'] : 37.7197;
    $lng = is_array($loc) && isset($loc['lng']) ? (float)$loc['lng'] : -97.2896;

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

    // Fallback if host blocks outbound HTTP or API fails.
    if ($sunriseTs === null || $sunsetTs === null) {
        $midday = (new DateTimeImmutable('now', new DateTimeZone($tzName ?: 'UTC')))->setTime(12, 0)->getTimestamp();
        $sun = @date_sun_info($midday, $lat, $lng);
        $sunriseTs = $sunriseTs ?? (is_array($sun) && isset($sun['sunrise']) && is_int($sun['sunrise']) ? $sun['sunrise'] : null);
        $sunsetTs = $sunsetTs ?? (is_array($sun) && isset($sun['sunset']) && is_int($sun['sunset']) ? $sun['sunset'] : null);
    }

    if ($method === 'GET') {
        $stmt = $pdo->query('SELECT `key`, adhan_time, iqamah_time, sort_order FROM prayer_times ORDER BY sort_order ASC, `key` ASC');
        $schedule = $stmt->fetchAll();

        // Force Sunrise for display in admin too.
        if ($sunriseTs !== null) {
            $sunriseAdhan = hhmm_from_timestamp($sunriseTs, $tzName ?: 'UTC');

            $found = false;
            foreach ($schedule as &$row) {
                if (($row['key'] ?? '') === 'Sunrise') {
                    $row['adhan_time'] = $sunriseAdhan;
                    $row['iqamah_time'] = null;
                    $row['auto'] = true;
                    $found = true;
                    break;
                }
            }
            unset($row);

            if (!$found) {
                $schedule[] = [
                    'key' => 'Sunrise',
                    'adhan_time' => $sunriseAdhan,
                    'iqamah_time' => null,
                    'sort_order' => 20,
                    'auto' => true,
                ];
            }
        }

        // Force Maghrib for display in admin too.
        if ($sunsetTs !== null) {
            $maghribAdhan = hhmm_from_timestamp($sunsetTs, $tzName ?: 'UTC');
            $maghribIqamah = hhmm_from_timestamp($sunsetTs + (4 * 60), $tzName ?: 'UTC');

            $found = false;
            foreach ($schedule as &$row) {
                if (($row['key'] ?? '') === 'Maghrib') {
                    $row['adhan_time'] = $maghribAdhan;
                    $row['iqamah_time'] = $maghribIqamah;
                    $row['auto'] = true;
                    $found = true;
                    break;
                }
            }
            unset($row);

            if (!$found) {
                $schedule[] = [
                    'key' => 'Maghrib',
                    'adhan_time' => $maghribAdhan,
                    'iqamah_time' => $maghribIqamah,
                    'sort_order' => 50,
                    'auto' => true,
                ];
            }
        }

        json_response(['ok' => true, 'schedule' => $schedule, 'csrf' => csrf_token()]);
    }

    if ($method === 'POST') {
        $body = read_json_body();
        $csrf = (string)($body['csrf'] ?? ($_POST['csrf'] ?? ''));
        verify_csrf($csrf);

        $schedule = $body['schedule'] ?? null;
        if (!is_array($schedule)) {
            json_response(['ok' => false, 'error' => 'schedule must be an array'], 400);
        }

        $pdo->beginTransaction();
            $stmt = $pdo->prepare('INSERT INTO prayer_times (`key`, adhan_time, iqamah_time, sort_order) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE adhan_time=VALUES(adhan_time), iqamah_time=VALUES(iqamah_time), sort_order=VALUES(sort_order)');

        foreach ($schedule as $row) {
            if (!is_array($row)) continue;
            $key = trim((string)($row['key'] ?? ''));

            // Sunrise and Maghrib are automatic; ignore any posted changes.
            if ($key === 'Sunrise' || $key === 'Maghrib') {
                continue;
            }

            $adhan = trim((string)($row['adhan_time'] ?? $row['adhan'] ?? ''));
            $iqamah = $row['iqamah_time'] ?? $row['iqamah'] ?? null;
            $iqamah = $iqamah === '' ? null : ($iqamah !== null ? trim((string)$iqamah) : null);
            $sort = (int)($row['sort_order'] ?? 0);

            if ($key === '' || !preg_match('/^\d{2}:\d{2}$/', $adhan)) {
                $pdo->rollBack();
                json_response(['ok' => false, 'error' => 'Invalid key/adhan_time format (HH:MM)'], 400);
            }
            if ($iqamah !== null && !preg_match('/^\d{2}:\d{2}$/', $iqamah)) {
                $pdo->rollBack();
                json_response(['ok' => false, 'error' => 'Invalid iqamah_time format (HH:MM)'], 400);
            }

            $stmt->execute([$key, $adhan, $iqamah, $sort]);
        }

        $pdo->commit();
        json_response(['ok' => true]);
    }

    json_response(['ok' => false, 'error' => 'Method not allowed'], 405);
} catch (Throwable $e) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    json_response(['ok' => false, 'error' => $e->getMessage()], 500);
}
