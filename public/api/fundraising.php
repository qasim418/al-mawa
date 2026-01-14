<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';

try {
    $pdo = db();

    $stmt = $pdo->query('SELECT raised_amount FROM fundraising_progress WHERE id = 1 LIMIT 1');
    $row = $stmt->fetch();

    $raised = 0.0;
    if (is_array($row) && isset($row['raised_amount'])) {
        $raised = (float)$row['raised_amount'];
    }

    header('Access-Control-Allow-Origin: *');
    json_response(['ok' => true, 'raised' => $raised]);
} catch (Throwable $e) {
    json_response(['ok' => false, 'error' => $e->getMessage()], 500);
}
