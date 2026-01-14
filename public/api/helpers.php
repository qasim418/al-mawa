<?php

declare(strict_types=1);

function cors_headers(): void {
    $origin = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
    if ($origin === '') return;

    // Dev: allow the React dev server to call PHP API with credentials.
    // We intentionally restrict this to localhost/127.0.0.1.
    if (!preg_match('#^https?://(localhost|127\.0\.0\.1)(:\d+)?$#', $origin)) {
        return;
    }

    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
}

function handle_preflight(): void {
    cors_headers();
    $method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    if ($method === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function json_response($data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function read_json_body(): array {
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function require_method(string $method): void {
    $actual = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    if ($actual !== strtoupper($method)) {
        json_response(['ok' => false, 'error' => 'Method not allowed'], 405);
    }
}

function start_session(): void {
    if (session_status() === PHP_SESSION_NONE) {
        // Basic hardening
        ini_set('session.use_strict_mode', '1');
        ini_set('session.cookie_httponly', '1');
        // If HTTPS is used, you can set this to 1 in php.ini:
        // ini_set('session.cookie_secure', '1');
        session_start();
    }
}

function csrf_token(): string {
    start_session();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return (string)$_SESSION['csrf'];
}

function verify_csrf(?string $token): void {
    start_session();
    $expected = $_SESSION['csrf'] ?? '';
    if (!$token || !$expected || !hash_equals($expected, $token)) {
        json_response(['ok' => false, 'error' => 'Invalid CSRF token'], 403);
    }
}
