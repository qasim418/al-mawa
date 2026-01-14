<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';

try {
    handle_preflight();
    cors_headers();
    require_method('POST');
    start_session();

    $body = read_json_body();
    $username = trim((string)($body['username'] ?? ($_POST['username'] ?? '')));
    $password = (string)($body['password'] ?? ($_POST['password'] ?? ''));

    if ($username === '' || $password === '') {
        json_response(['ok' => false, 'error' => 'Username and password required'], 400);
    }

    $pdo = db();
    $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, (string)$user['password_hash'])) {
        json_response(['ok' => false, 'error' => 'Invalid credentials'], 401);
    }

    session_regenerate_id(true);
    $_SESSION['admin_user_id'] = (int)$user['id'];
    $_SESSION['admin_username'] = (string)$user['username'];

    json_response(['ok' => true, 'username' => (string)$user['username']]);
} catch (Throwable $e) {
    json_response(['ok' => false, 'error' => $e->getMessage()], 500);
}
