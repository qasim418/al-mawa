<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

try {
    start_session();

    handle_cors();

    require_login_json();

    $pdo = db();
    $method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');

    if ($method === 'GET') {
        $stmt = $pdo->query('SELECT `key`, adhan_time, iqamah_time, sort_order FROM prayer_times ORDER BY sort_order ASC, `key` ASC');
        json_response(['ok' => true, 'schedule' => $stmt->fetchAll(), 'csrf' => csrf_token()]);
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
