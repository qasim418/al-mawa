<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';

try {
    $pdo = db();

    $stmt = $pdo->query('SELECT `key`, label, value FROM islamic_measures ORDER BY sort_order ASC, `key` ASC');
    $rows = $stmt->fetchAll();

    $measures = array_map(function ($r) {
        return [
            'key' => $r['key'],
            'label' => $r['label'],
            'value' => $r['value'],
        ];
    }, $rows);

    header('Access-Control-Allow-Origin: *');
    json_response(['ok' => true, 'measures' => $measures]);
} catch (Throwable $e) {
    json_response(['ok' => false, 'error' => $e->getMessage()], 500);
}
