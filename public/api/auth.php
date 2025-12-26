<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

function require_login_json(): void {
    start_session();
    if (empty($_SESSION['admin_user_id'])) {
        json_response(['ok' => false, 'error' => 'Unauthorized'], 401);
    }
}
