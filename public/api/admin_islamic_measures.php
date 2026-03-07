<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

try {
    start_session();

    handle_preflight();
    cors_headers();

    require_login_json();

    $pdo = db();
    $method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');

    if ($method === 'GET') {
        $stmt = $pdo->query('SELECT `key`, label, value, sort_order FROM islamic_measures ORDER BY sort_order ASC, `key` ASC');
        $measures = $stmt->fetchAll();

        json_response(['ok' => true, 'measures' => $measures, 'csrf' => csrf_token()]);
    }

    if ($method === 'POST') {
        $body = read_json_body();
        $csrf = (string)($body['csrf'] ?? ($_POST['csrf'] ?? ''));
        verify_csrf($csrf);

        $measures = $body['measures'] ?? null;
        if (!is_array($measures)) {
            json_response(['ok' => false, 'error' => 'measures must be an array'], 400);
        }

        $pdo->beginTransaction();
        $stmt = $pdo->prepare('INSERT INTO islamic_measures (`key`, label, value, sort_order) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE label=VALUES(label), value=VALUES(value), sort_order=VALUES(sort_order)');

        foreach ($measures as $row) {
            if (!is_array($row)) continue;
            $key = trim((string)($row['key'] ?? ''));
            $label = trim((string)($row['label'] ?? ''));
            $value = trim((string)($row['value'] ?? ''));
            $sort = (int)($row['sort_order'] ?? 0);

            if ($key === '' || $label === '' || $value === '') {
                $pdo->rollBack();
                json_response(['ok' => false, 'error' => 'key, label, and value are required'], 400);
            }

            $stmt->execute([$key, $label, $value, $sort]);
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
