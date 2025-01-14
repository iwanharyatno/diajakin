<?php

require __DIR__ . "/db/connection.php";
require __DIR__ . "/utils/common.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $userId = getUserId();
    $path = $_POST['path'];

    $sql = "SELECT * FROM users WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $userId);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    $sql = "SELECT * FROM attendances WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $_POST['id']);
    $stmt->execute();
    $attendance = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$attendance) {
        http_response_code(404);
        exit;
    }

    $sql = "SELECT events.*, users.id, users.full_name FROM events INNER JOIN users ON users.id = events.user_id WHERE events.id = :id LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $attendance['event_id']);
    $stmt->execute();

    $event = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$event) {
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
    <title><?= "diajakin. Tiket -" . $user['full_name'] ?></title>
    <link rel="stylesheet" href="/dist/diajakin.css">
    <style>
        #cover {
            position: fixed;
            top: 0;
            height: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
        }
    </style>
</head>

<body>
    <div class="card" style="width: 300px;">
        <div class="card-header text-center">diajakin.</div>
        <div class="card-body text-center">
            <img onload="reveal()" src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=<?= $path ?>" alt="" class="card-img-top" style="width: 150px;">
            <h2 class="card-title fs-5 mt-4 fw-light"><?= $event['title'] ?></h2>
            <p class="card-subtitle text-secondary">Oleh: <?= $event['full_name'] ?></p>

            <table class="table table-border mt-2 text-start">
                <tr>
                    <th>Nama</th>
                    <td><?= $user['full_name'] ?></td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td><?= $user['email'] ?></td>
                </tr>
                <tr>
                    <th>Tanggal</th>
                    <td><?= dateFormatFromString($event['start_date']) ?> -<br> <?= dateFormatFromString($event['end_date']) ?></td>
                </tr>
                <tr>
                    <th>Waktu</th>
                    <td><?= date_format(date_create($event['start_date']), 'H:i') ?> - <?= date_format(date_create($event['end_date']), 'H:i') ?> WIB</td>
                </tr>
                <tr>
                    <th>Tempat</th>
                    <td><?= $event['location'] ?></td>
                </tr>
                <tr class="text-center">
                    <td colspan="2"><?= $event['address'] ?></td>
                </tr>
            </table>
        </div>
        <div class="card-footer text-center">
            <span class="text-secondary">Terdaftar pada: <?= dateFormatFromString($attendance['created_at']) ?></span>
        </div>
    </div>
    <div id="cover">
        Generating ticket...
    </div>
    <script>
        window.addEventListener('DOMContentLoaded', function() {
            window.print();
        });

        window.onafterprint = function() {
            window.history.back();
        }

        function reveal() {
            document.getElementById('cover').style.display = 'none';
        }
    </script>
</body>

</html>