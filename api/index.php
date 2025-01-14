<?php

require __DIR__ . "/db/connection.php";
require __DIR__ . "/utils/common.php";

$sql = "SELECT events.*, users.id, users.full_name FROM events INNER JOIN users ON users.id = events.user_id WHERE start_date >= CURRENT_TIMESTAMP ORDER BY start_date ASC LIMIT 3";
$stmt = $conn->prepare($sql);
$stmt->execute();

$events = $stmt->fetchAll(PDO::FETCH_ASSOC);

$sql = "SELECT events.*, users.id, users.full_name FROM events INNER JOIN users ON users.id = events.user_id WHERE start_date < CURRENT_TIMESTAMP ORDER BY start_date ASC LIMIT 3";
$stmt = $conn->prepare($sql);
$stmt->execute();

$pastEvents = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>diajakin. - Create, organize, and join events</title>
    <link rel="stylesheet" href="/dist/diajakin.css">
    <script src="/dist/diajakin.umd.js"></script>
</head>

<body>
    <header>
        <?php require __DIR__ . "/components/navbar.php" ?>
        <div class="position-relative container-fluid min-vh-100 d-flex justify-content-center align-items-center" style="background-image: url('/dist/header-background.jpg '); background-size: cover; background-position: center;">
            <div class="position-absolute w-100 h-100 top-0-left-0 bg-dark bg-gradient opacity-50 z-0"></div>
            <div class="w-50 mx-auto text-center py-5 text-white z-1">
                <h1 class="display-2 fw-semibold">diajakin.</span></h1>
                <p class="lead"><em>Create, organize, and join events.</em></p>
                <hr class="my-4">
                <p>Pusat informasi webinar dan seminar dengan tema yang bervariasi dan menarik.</p>
                <a class="btn btn-primary btn-lg" href="/list-event.php" role="button">Jelajahi event</a>
            </div>
        </div>
    </header>
    <main class="container my-5">
        <section class="container-md mx-auto my-5">
            <h2 class="text-center display-6 mb-4">Event Terbaru</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <?php foreach ($events as $event): ?>
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title mb-3 fs-4">
                                    <a href="event-detail.php?id=<?= $event['id'] ?>"><?= $event['title'] ?></a>
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
            <div class="d-flex justify-content-center">
                <a href="/list-event.php" class="btn btn-primary mt-4">Lihat semua event</a>
            </div>
        </section>
        <section class="container-md mx-auto my-4">
            <h2 class="text-center display-6 mb-4">Event yang telah Sukses</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <?php foreach ($pastEvents as $event): ?>
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title mb-3 fs-4">
                                    <a href="event-detail.php?id=<?= $event['id'] ?>"><?= $event['title'] ?></a>
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
    </main>
    <?php require __DIR__ . "/components/footer.php"; ?>
</body>

</html>