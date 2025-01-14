<?php

require __DIR__ . "/db/connection.php";
require __DIR__ . "/utils/common.php";

$userId = getUserId();
$eventId = $_GET['id'];

$sql = "SELECT events.*, users.id, users.full_name FROM events INNER JOIN users ON users.id = events.user_id WHERE events.id = :id LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':id', $eventId);
$stmt->execute();

$event = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$event) {
    http_response_code(404);
    exit;
}

$sql = "SELECT * FROM attendances WHERE user_id = :user_id AND event_id = :event_id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':user_id', $userId);
$stmt->bindParam(':event_id', $eventId);
$stmt->execute();

$registered = $stmt->rowCount() > 0;
$attendance = $stmt->fetch(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['register'])) {
        if ($event['quota'] <= 0) {
            $swal = "<script>
                window.addEventListener('DOMContentLoaded', function() {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Kuota event sudah habis!',
                    });
                });
                </script>";
            setSession('swal', $swal);
            header('Location: /event-detail.php?id=' . $eventId);
        }

        if ($registered) {
            $swal = "<script>
                window.addEventListener('DOMContentLoaded', function() {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Anda sudah terdaftar pada event ini!',
                    });
                });
                </script>";
            setSession('swal', $swal);
            header('Location: /event-detail.php?id=' . $eventId);
        } else {
            $sql = "INSERT INTO attendances (user_id, event_id, created_at) VALUES (:user_id, :event_id, CURRENT_TIMESTAMP)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':user_id', $userId);
            $stmt->bindParam(':event_id', $_POST['event_id']);
            $stmt->execute();

            $sql = "UPDATE events SET quota = quota - 1 WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $_POST['event_id']);
            $stmt->execute();

            $swal = "<script>
                window.addEventListener('DOMContentLoaded', function() {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Anda berhasil mendaftar event ini!',
                    });
                });
                </script>";
            setSession('swal', $swal);
            header('Location: /event-detail.php?id=' . $eventId);
        }
    }

    if (isset($_POST['unregister'])) {
        $sql = "DELETE FROM attendances WHERE user_id = :user_id AND event_id = :event_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':event_id', $_POST['event_id']);
        $stmt->execute();

        $sql = "UPDATE events SET quota = quota + 1 WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $_POST['event_id']);
        $stmt->execute();

        $swal = "<script>
            window.addEventListener('DOMContentLoaded', function() {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Anda berhasil membatalkan pendaftaran event ini!',
                });
            });
            </script>";
        setSession('swal', $swal);
        header('Location: /event-detail.php?id=' . $eventId);
    }
}

$sql = "SELECT * FROM attendances WHERE user_id = :user_id AND event_id = :event_id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':user_id', $userId);
$stmt->bindParam(':event_id', $_GET['id']);
$stmt->execute();

$registered = $stmt->rowCount() > 0;

if (getSession('swal') != null) {
    echo getSession('swal');
    removeSession('swal');
}
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Detail event | <?= $event['title'] ?> - diajakin.</title>
    <link rel="stylesheet" href="/dist/diajakin.css">
    <script src="/dist/diajakin.umd.js"></script>
</head>

<body>
    <header>
        <?php require __DIR__ . "/components/navbar.php" ?>
    </header>
    <main class="container py-5">
        <section class="container-md mx-auto py-5">
            <div class="row g-4">
                <div class="col-md-4 mt-5">
                    <div class="card w-100">
                        <div class="card-header">
                            <span><strong>Keikutsertaan</strong></span>
                        </div>
                        <div class="card-body">
                            <?php if ($userId == null): ?>
                                <div class="alert alert-warning">
                                    <p>Anda harus login terlebih dahulu untuk mendaftar event.</p>
                                </div>
                                <a href="/login.php?redirect=<?= $_SERVER['REQUEST_URI'] ?>" class="btn btn-primary w-100">Login</a>
                            <?php elseif ($registered): ?>
                                <div class="alert alert-success">
                                    <span>Anda sudah terdaftar.</span>
                                </div>
                                <form method="POST" action="print.php" class="mb-2">
                                    <input type="hidden" name="id" value="<?= $attendance['id'] ?>">
                                    <button type="submit" class="btn btn-success w-100" name="unregister">Print Tiket</button>
                                </form>
                                <form method="POST">
                                    <input type="hidden" name="event_id" value="<?= $event['id'] ?>">
                                    <button type="submit" class="btn btn-danger w-100" name="unregister">Batalkan</button>
                                </form>
                            <?php elseif ($event['quota'] <= 0): ?>
                                <div class="alert alert-warning">
                                    <span>Kuota event sudah habis</span>
                                </div>
                            <?php else: ?>
                                <form method="POST">
                                    <input type="hidden" name="event_id" value="<?= $event['id'] ?>">
                                    <button type="submit" class="btn btn-primary w-100" name="register">Daftar</button>
                                </form>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <h1 class="display-3 mb-4"><?= $event['title'] ?></h1>
                    <img src="/dist/header-background.jpg" alt="" class="img-fluid d-block" style="min-height: 200px;">
                    <table class="table table-border my-4">
                        <tr>
                            <th>Penyelenggara</th>
                            <td><?= $event['full_name'] ?></td>
                        </tr>
                        <tr>
                            <th>Tanggal</th>
                            <td><?= dateFormatFromString($event['start_date']) ?> - <?= dateFormatFromString($event['end_date']) ?></td>
                        </tr>
                        <tr>
                            <th>Waktu</th>
                            <td><?= date_format(date_create($event['start_date']), 'H:i') ?> - <?= date_format(date_create($event['end_date']), 'H:i') ?> WIB</td>
                        </tr>
                        <tr>
                            <th>Tempat</th>
                            <td><?= $event['location'] ?></td>
                        </tr>
                        <tr>
                            <th>Alamat</th>
                            <td><?= $event['address'] ?></td>
                        </tr>
                        <tr>
                            <th>Sisa Kuota</th>
                            <td><?= $event['quota'] ?></td>
                        </tr>
                    </table>

                    <p><?= $event['description'] ?></p>
                </div>
            </div>
        </section>
    </main>
    <?php require __DIR__ . "/components/footer.php"; ?>
</body>

</html>