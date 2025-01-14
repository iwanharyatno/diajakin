<?php

require __DIR__ . "/../db/connection.php";
require __DIR__ . "/../utils/common.php";

$userId = getUserId();

if ($userId == null) {
    $path = $_SERVER['REQUEST_URI'];
    header('Location: /login.php?redirect=' . $path, true);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $eventId = $_POST['id'];

    $sql = "SELECT users.id as user_id, users.email as user_email, users.full_name as user_full_name, attendances.created_at as register_date FROM attendances INNER JOIN users ON users.id = attendances.user_id WHERE attendances.event_id = :id ORDER BY attendances.created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $eventId);
    $stmt->execute();

    $attendances = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $sql = "SELECT * FROM events WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $eventId);
    $stmt->execute();

    $event = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$attendances) {
        http_response_code(404);
        exit;
    }
} else {
    http_response_code(405);
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= "Daftar Hadir - " . $event['title'] ?></title>
    <link rel="stylesheet" href="/dist/diajakin.css">
</head>

<body>
    <header style="min-height: 150px;" class="bg-light d-flex flex-column justify-content-center align-items-center">
        <h1 class="display-5">Daftar Hadir</h1>
        <p class="fw-semibold fst-italic m-0">"<?= $event['title'] ?>"</p>
        <span class="text-secondary"><?= dateFormatFromString($event['start_date']) ?></span>
    </header>
    <table class="table border w-100">
        <tr>
            <th style="width: 5%;" class="text-center">No</th>
            <th style="width: 35%;">Nama Lengkap</th>
            <th style="width: 30%;">Email</th>
            <th style="width: 20%;">Tanggal Daftar</th>
            <th style="width: 10%;">Paraf</th>
        </tr>

        <?php
        $i = 1;
        foreach ($attendances as $attendance):
        ?>
            <tr>
                <td class="text-center"><?= $i++ ?></td>
                <td><?= $attendance['user_full_name'] ?></td>
                <td><?= $attendance['user_email'] ?></td>
                <td><?= dateFormatFromString($attendance['register_date']) ?></td>
                <td></td>
            </tr>
        <?php
        endforeach;
        ?>
    </table>

    <script>
        window.addEventListener('DOMContentLoaded', function() {
            window.print()
        });

        window.onafterprint = function() {
            window.history.back();
        }
    </script>
</body>

</html>