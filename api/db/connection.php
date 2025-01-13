<?php

$servername = getenv('POSTGRES_HOST') ? getenv('POSTGRES_HOST') : 'localhost';
$database = getenv('POSTGRES_DATABASE') ? getenv('POSTGRES_DATABASE') : 'diajakinapp';
$username = getenv('POSTGRES_USER') ? getenv('POSTGRES_USER') : 'postgres';
$password = getenv('POSTGRES_PASSWORD') ? getenv('POSTGRES_PASSWORD') : 'admin';

try {
    $conn = new PDO("pgsql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}   