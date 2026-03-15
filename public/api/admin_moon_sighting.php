<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

try {
    start_session();

    if (function_exists('handle_preflight')) {
        handle_preflight();
    }
    if (function_exists('cors_headers')) {
        cors_headers();
    }

    require_login_json();

    $pdo = db();
    $method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');

    // GET - fetch current setting
    if ($method === 'GET') {
        try {
            $stmt = $pdo->query("SELECT adjustment, source FROM moon_sighting_config ORDER BY id DESC LIMIT 1");
            $config = $stmt->fetch();
            
            if (!$config) {
                // Default values
                $config = ['adjustment' => -1, 'source' => 'Chicago Hilal Committee'];
            }
            
            json_response(['ok' => true, 'config' => $config]);
        } catch (Exception $e) {
            json_response(['ok' => false, 'error' => $e->getMessage()], 500);
        }
        exit;
    }

    // POST - update setting
    if ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['adjustment']) || !is_numeric($data['adjustment'])) {
            json_response(['ok' => false, 'error' => 'Invalid adjustment value'], 400);
            exit;
        }
        
        $adjustment = intval($data['adjustment']);
        $source = isset($data['source']) ? trim($data['source']) : 'Moon Sighting';
        
        // Validate source
        $allowedSources = ['Chicago Hilal Committee', 'ICNA', 'ISNA', 'Local Moon Sighting', 'Other'];
        if (!in_array($source, $allowedSources)) {
            $source = 'Moon Sighting';
        }
        
        try {
            // Check if table exists, if not create it
            $pdo->exec("CREATE TABLE IF NOT EXISTS moon_sighting_config (
                id INT AUTO_INCREMENT PRIMARY KEY,
                adjustment INT NOT NULL DEFAULT -1,
                source VARCHAR(100) NOT NULL DEFAULT 'Chicago Hilal Committee',
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )");
            
            // Insert or update
            $stmt = $pdo->prepare("INSERT INTO moon_sighting_config (id, adjustment, source) 
                                   VALUES (1, ?, ?) 
                                   ON DUPLICATE KEY UPDATE 
                                   adjustment = VALUES(adjustment), 
                                   source = VALUES(source)");
            $stmt->execute([$adjustment, $source]);
            
            json_response(['ok' => true, 'message' => 'Moon sighting configuration updated']);
        } catch (Exception $e) {
            json_response(['ok' => false, 'error' => $e->getMessage()], 500);
        }
        exit;
    }

    json_response(['ok' => false, 'error' => 'Method not allowed'], 405);

} catch (Throwable $e) {
    error_log('Admin moon sighting error: ' . $e->getMessage());
    json_response(['ok' => false, 'error' => 'Server error'], 500);
}
