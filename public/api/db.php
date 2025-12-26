<?php

declare(strict_types=1);

function get_config(): array {
    $path = __DIR__ . '/config.local.php';
    if (!file_exists($path)) {
        throw new RuntimeException('Missing api/config.local.php. Copy config.local.php.example to config.local.php');
    }
    $cfg = require $path;
    if (!is_array($cfg)) {
        throw new RuntimeException('Invalid api/config.local.php');
    }
    return $cfg;
}

function db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;

    $cfg = get_config();
    $db = $cfg['db'] ?? [];

    $host = $db['host'] ?? '127.0.0.1';
    $name = $db['name'] ?? '';
    $user = $db['user'] ?? '';
    $pass = $db['pass'] ?? '';
    $charset = $db['charset'] ?? 'utf8mb4';

    if (!$name) throw new RuntimeException('DB name missing in config.local.php');

    $dsn = "mysql:host={$host};dbname={$name};charset={$charset}";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}
