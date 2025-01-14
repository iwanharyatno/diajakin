<?php

require __DIR__ . "/../db/connection.php";
require __DIR__ . "/../utils/common.php";

$userId = getUserId();

if ($userId == null) {
    $path = $_SERVER['REQUEST_URI'];
    header('Location: /login.php?redirect=' . $path, true);
    exit;
}
$searchQuery = isset($_GET['search']) ? '%' . $_GET['search'] . '%' : '%';

$sql = "SELECT * FROM events WHERE events.user_id = :id ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':id', $userId);
$stmt->execute();

$myEvents = $stmt->fetchAll(PDO::FETCH_ASSOC);

$sql = "SELECT events.*, users.id as user_id, users.full_name FROM events INNER JOIN users ON users.id = events.user_id INNER JOIN attendances ON events.id = attendances.event_id WHERE attendances.user_id = :id AND (events.title ILIKE :search OR events.description ILIKE :search)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':id', $userId);
$stmt->bindParam(':search', $searchQuery);
$stmt->execute();

$mySchedule = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['delete'])) {
    $eventId = $_POST['id'];
    $sql = "DELETE FROM events WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $eventId);
    if ($stmt->execute()) {
        echo "<script>
        window.addEventListener('DOMContentLoaded', function() {
            Swal.fire({
                icon: 'success',
                title: 'Data berhasil dihapus!',
            });
        });
        </script>";
    }
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
                    <h2 class="display-6 mb-4">Event saya</h2>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="myschedule" data-bs-toggle="tab" data-bs-target="#myschedule-pane" type="button" role="tab" aria-controls="myschedule-pane" aria-selected="true">Jadwal Saya</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="myevent" data-bs-toggle="tab" data-bs-target="#myevent-pane" type="button" role="tab" aria-controls="myevent-pane" aria-selected="false">Event Saya</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade p-4" id="myevent-pane" role="tabpanel" aria-labelledby="myevent" tabindex="0">
                            <a href="event-form.php" class="btn btn-primary">Buat Event Baru</a>
                            <section class="py-4">
                                <form action="" method="get">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Cari event..." name="search" value="<?= isset($_GET['search']) ? $_GET['search'] : '' ?>">
                                        <button class="btn btn-primary" type="submit">Cari</button>
                                        <?php if (isset($_GET['search']) && $_GET['search'] != ''): ?>
                                            <a href="events.php" class="btn btn-secondary">Clear</a>
                                        <?php endif; ?>
                                    </div>
                                </form>
                                <div class="row row-cols-1 row-cols-md-3 g-4">
                                    <?php foreach ($myEvents as $event): ?>
                                        <div class="col">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title mb-3 fs-4">
                                                        <a href="/event-detail.php?id=<?= $event['id'] ?>"><?= $event['title'] ?></a>
                                                    </h5>
                                                    <p class="card-text mb-4"><?= substr($event['description'], 0, 100) ?> <?= strlen($event['description']) > 100 ? '...' : '' ?></p>
                                                    <a href="event-form.php?id=<?= $event['id'] ?>" class="btn btn-success">Edit</a>
                                                    <form class="d-inline" method="POST" onsubmit="confirmDelete">
                                                        <button name="delete" class="btn btn-danger">Hapus</button>
                                                    </form>
                                                </div>
                                                <div class="card-footer d-flex justify-content-between py-3">
                                                    <span>Sisa Kuota: <?= $event['quota'] ?></span>
                                                    <span><?= dateFormatFromString($event['start_date']) ?></span>
                                                </div>
                                            </div>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </section>
                        </div>
                        <div class="tab-pane fade show active p-4" id="myschedule-pane" role="tabpanel" aria-labelledby="myschedule" tabindex="0">
                            <a href="/list-event.php" class="btn btn-primary">Join event</a>
                            <section class="py-4">
                                <form action="" method="get">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Cari event..." name="search" value="<?= isset($_GET['search']) ? $_GET['search'] : '' ?>">
                                        <button class="btn btn-primary" type="submit">Cari</button>
                                        <?php if (isset($_GET['search']) && $_GET['search'] != ''): ?>
                                            <a href="events.php" class="btn btn-secondary">Clear</a>
                                        <?php endif; ?>
                                    </div>
                                </form>
                                <div class="row row-cols-1 row-cols-md-3 g-4">
                                    <?php foreach ($mySchedule as $event): ?>
                                        <div class="col">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title mb-3 fs-4">
                                                        <a href="/event-detail.php?id=<?= $event['id'] ?>"><?= $event['title'] ?></a>
                                                    </h5>
                                                    <h6 class="card-subtitle text-secondary mb-4">Oleh: <?= $event['full_name'] ?></h6>
                                                    <p class="card-text"><?= substr($event['description'], 0, 100) ?> <?= strlen($event['description']) > 100 ? '...' : '' ?></p>
                                                </div>
                                                <div class="card-footer d-flex justify-content-between py-3">
                                                    <span>Sisa Kuota: <?= $event['quota'] ?></span>
                                                    <span><?= dateFormatFromString($event['start_date']) ?></span>
                                                </div>
                                            </div>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
                <?php require __DIR__ . "/../components/footer.php" ?>
            </div>
        </div>
    </main>

    <script>
        function confirmDelete(event) {
            event.preventDefault();
            console.log(event);
        }
    </script>
</body>

</html>