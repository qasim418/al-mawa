<?php
// Run this ONCE to create an admin user, then delete this file.
// Usage: http://localhost/al-mawa/public/api/create_admin_temp.php

require_once __DIR__ . '/db.php';

try {
    $pdo = db();
    
    $username = 'admin';
    $password = 'admin123'; // Change this later!
    $hash = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $pdo->prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)");
    $stmt->execute([$username, $hash]);

    echo "User 'admin' created with password 'admin123'.<br>Please delete this file now.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
