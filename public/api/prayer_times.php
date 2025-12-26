<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';

try {
    $pdo = db();

    $stmt = $pdo->query('SELECT `key`, adhan_time, iqamah_time FROM prayer_times ORDER BY sort_order ASC, `key` ASC');
    $rows = $stmt->fetchAll();

    $schedule = array_map(function ($r) {
        return [
            'key' => $r['key'],
            'adhan' => $r['adhan_time'],
            'iqamah' => $r['iqamah_time'] !== null ? $r['iqamah_time'] : null,
        ];
    }, $rows);

    // Public endpoint can be cached briefly if desired, but keep simple
    header('Access-Control-Allow-Origin: *');
    json_response(['ok' => true, 'schedule' => $schedule]);
} catch (Throwable $e) {
    json_response(['ok' => false, 'error' => $e->getMessage()], 500);
}
