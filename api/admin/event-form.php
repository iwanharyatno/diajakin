<?php
session_start();

require __DIR__ . "/../db/connection.php";
require __DIR__ . "/../utils/common.php";

$userId = getUserId();

if ($userId == null) {
    $path = $_SERVER['REQUEST_URI'];
    header('Location: /login.php?redirect=' . $path, true);
    exit;
}

$event = null;
$attendances = [];
if (isset($_GET['id'])) {
    $eventId = $_GET['id'];
    $sql = "SELECT * FROM events WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $eventId);
    $stmt->execute();

    $event = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($event['user_id'] != $userId) {
        http_response_code(403);
        exit;
    }

    $sql = "SELECT users.id as user_id, users.email as user_email, users.full_name as user_full_name, attendances.created_at as register_date FROM attendances INNER JOIN users ON users.id = attendances.user_id WHERE attendances.event_id = :id ORDER BY attendances.created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $eventId);
    $stmt->execute();

    $attendances = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $quota = $_POST['quota'];
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];
    $location = $_POST['location'];
    $address = $_POST['address'];

    if (isset($_POST['id'])) {
        $eventId = $_POST['id'];

        $sql = "UPDATE events SET title = :title, description = :description, quota = :quota, start_date = :start_date, end_date = :end_date, location = :location, address = :address WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':quota', $quota);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':start_date', $start_date);
        $stmt->bindParam(':end_date', $end_date);
        $stmt->bindParam(':location', $location);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':id', $eventId);

        if ($stmt->execute()) {
            $swal = "<script>
            window.addEventListener('DOMContentLoaded', function() {
                Swal.fire({
                    icon: 'success',
                    title: 'Data berhasil diubah!',
                });
            });
            </script>";
            setSession('swal', $swal);
            header('Location: /admin/event-form.php?id=' . $eventId);
        }
    } else {
        $sql = "INSERT INTO events (title, description, quota, start_date, end_date, location, address, user_id, created_at) VALUES (:title, :description, :quota, :start_date, :end_date, :location, :address, :user_id, CURRENT_TIMESTAMP)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':quota', $quota);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':start_date', $start_date);
        $stmt->bindParam(':end_date', $end_date);
        $stmt->bindParam(':location', $location);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':user_id', $userId);

        if ($stmt->execute()) {
            $eventId = $conn->lastInsertId();
            $swal = "<script>
            window.addEventListener('DOMContentLoaded', function() {
                Swal.fire({
                    icon: 'success',
                    title: 'Data berhasil ditambahkan!',
                });
            });
            </script>";
            setSession('swal', $swal);
            header('Location: /admin/event-form.php?id=' . $eventId);
        }
    }
}

if (getSession('swal') != null) {
    $message = getSession('swal');
    removeSession('swal');

    echo $message;
}

?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>diajakin. Dashboard - Event Saya</title>
    <link rel="stylesheet" href="/dist/diajakin.css">
    <script src="/dist/diajakin.umd.js"></script>
</head>

<body>
    <main class="container-fluid">
        <div class="row">
            <div class="col-md-3 p-0 min-vh-100 offcanvas-md offcanvas-start" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
                <?php require __DIR__ . "/../components/admin-sidebar.php" ?>
            </div>
            <div class="col-md-9 p-0">
                <header>
                    <?php require __DIR__ . "/../components/admin-navbar.php" ?>
                </header>
                <section class="p-4">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/admin/events.php">Event</a></li>
                            <li class="breadcrumb-item active" aria-current="page"><?= $event == null ? 'Buat event' : 'Edit event' ?></li>
                        </ol>
                    </nav>
                    <h2 class="display-6 mb-2"><?= $event == null ? 'Buat event' : 'Edit event' ?></h2>
                    <form action="" method="post" class="mt-4">
                        <?php if ($event != null): ?>
                            <input type="hidden" name="id" value="<?= $event['id'] ?>">
                        <?php endif; ?>
                        <div class="form-group mb-3">
                            <label for="title" class="form-label">Judul Event<span class="text-danger">*</span></label>
                            <input type="text" name="title" id="title" class="form-control" required <?= $event != null ? 'value="' . $event['title'] . '"' : '' ?>>
                        </div>
                        <div class="form-group mb-3">
                            <label for="description" class="form-label">Deskripsi<span class="text-danger">*</span></label>
                            <textarea name="description" id="description" class="form-control"><?= $event != null ? $event['description'] : '' ?></textarea>
                        </div>
                        <div class="form-group mb-3">
                            <label for="quota" class="form-label">Kuota<span class="text-danger">*</span></label>
                            <input type="number" name="quota" id="quota" class="form-control" required <?= $event != null ? 'value="' . $event['quota'] . '"' : '' ?>>
                        </div>
                        <div class="form-group mb-3">
                            <label for="start_date" class="form-label">Tanggal & Waktu Mulai<span class="text-danger">*</span></label>
                            <input type="datetime-local" name="start_date" id="start_date" class="form-control" required <?= $event != null ? 'value="' . $event['start_date'] . '"' : '' ?>>
                        </div>
                        <div class="form-group mb-3">
                            <label for="end_date" class="form-label">Tanggal & Waktu Selesai<span class="text-danger">*</span></label>
                            <input type="datetime-local" name="end_date" id="end_date" class="form-control" required <?= $event != null ? 'value="' . $event['end_date'] . '"' : '' ?>>
                        </div>
                        <div class="form-group mb-3">
                            <label for="location" class="form-label">Lokasi<span class="text-danger">*</span></label>
                            <select name="location" id="location" class="form-select">
                                <option value="Online" <?= $event != null && $event['location'] == 'Online' ? 'selected' : '' ?>>Online</option>
                                <option value="Offline" <?= $event != null && $event['location'] == 'Offline' ? 'selected' : '' ?>>Offline</option>
                            </select>
                        </div>
                        <div class="form-group mb-4">
                            <label for="address" class="form-label">Address<span class="text-danger">*</span></label>
                            <textarea name="address" id="address" class="form-control" placeholder="Alamat atau tautan online event"><?= $event != null ? $event['address'] : '' ?></textarea>
                        </div>
                        <button class="btn btn-primary">Simpan</button>
                        <button type="reset" class="btn btn-secondary">Reset</button>
                    </form>
                    <?php if ($event != null): ?>
                        <h2 class="display-6 mb-2 mt-4">Daftar Peserta</h2>
                        <div class="table-responsive">
                            <table class="table table-border">
                                <tr>
                                    <th>No</th>
                                    <th>Nama Lengkap</th>
                                    <th>Email</th>
                                    <th>Tanggal Daftar</th>
                                </tr>

                                <?php
                                $i = 1;
                                foreach ($attendances as $attendance):
                                ?>
                                    <tr>
                                        <td><?= $i++ ?></td>
                                        <td><?= $attendance['user_full_name'] ?></td>
                                        <td><?= $attendance['user_email'] ?></td>
                                        <td><?= dateFormatFromString($attendance['register_date']) ?></td>
                                    </tr>
                                <?php
                                endforeach;
                                ?>

                                <?php if (count($attendances) <= 0): ?>
                                    <tr>
                                        <td colspan="4" class="text-center">Belum ada peserta</td>
                                    </tr>
                                <?php endif; ?>
                            </table>
                        </div>
                        <?php if (count($attendances) > 0): ?>
                            <form action="print.php" method="post">
                                <input type="hidden" name="id" value="<?= $event['id'] ?>">
                                <button class="btn btn-primary">Cetak Daftar Hadir</button>
                            </form>
                        <?php endif; ?>
                    <?php endif; ?>
                </section>
                <?php require __DIR__ . "/../components/footer.php" ?>
            </div>
        </div>
    </main>
</body>

</html>