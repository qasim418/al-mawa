<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';

try {
    if (function_exists('cors_headers')) {
        cors_headers();
    }

    $pdo = db();
    
    $stmt = $pdo->query("SELECT adjustment, source FROM moon_sighting_config ORDER BY id DESC LIMIT 1");
    $config = $stmt->fetch();
    
    if (!$config) {
        // Default values
        $config = ['adjustment' => -1, 'source' => 'Chicago Hilal Committee'];
    }
    
    json_response(['ok' => true, 'config' => $config]);
} catch (Throwable $e) {
    // Return default on error
    json_response(['ok' => true, 'config' => ['adjustment' => -1, 'source' => 'Chicago Hilal Committee']]);
}
