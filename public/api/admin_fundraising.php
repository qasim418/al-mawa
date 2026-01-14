<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

try {
    start_session();

    // If these exist (from earlier dev CORS work), use them.
    if (function_exists('handle_preflight')) {
        handle_preflight();
    }
    if (function_exists('cors_headers')) {
        cors_headers();
    }

    require_login_json();

    $pdo = db();
    $method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');

    if ($method === 'GET') {
        $stmt = $pdo->query('SELECT raised_amount FROM fundraising_progress WHERE id = 1 LIMIT 1');
        $row = $stmt->fetch();
        $raised = 0.0;
        if (is_array($row) && isset($row['raised_amount'])) {
            $raised = (float)$row['raised_amount'];
        }
        json_response(['ok' => true, 'raised' => $raised, 'csrf' => csrf_token()]);
    }

    if ($method === 'POST') {
        $body = read_json_body();
        $csrf = (string)($body['csrf'] ?? ($_POST['csrf'] ?? ''));
        verify_csrf($csrf);

        $raisedRaw = $body['raised'] ?? ($_POST['raised'] ?? null);
        if ($raisedRaw === null || $raisedRaw === '') {
            json_response(['ok' => false, 'error' => 'raised is required'], 400);
        }

        if (!is_numeric($raisedRaw)) {
            json_response(['ok' => false, 'error' => 'raised must be numeric'], 400);
        }

        $raised = (float)$raisedRaw;
        if ($raised < 0) {
            json_response(['ok' => false, 'error' => 'raised must be >= 0'], 400);
        }

        $pdo->beginTransaction();
        $pdo->exec('INSERT INTO fundraising_progress (id, raised_amount) VALUES (1, 0) ON DUPLICATE KEY UPDATE raised_amount=raised_amount');
        $stmt = $pdo->prepare('UPDATE fundraising_progress SET raised_amount = ? WHERE id = 1');
        $stmt->execute([$raised]);
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
