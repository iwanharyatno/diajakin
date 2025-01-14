<?php

require __DIR__ . "/db/connection.php";
require __DIR__ . "/utils/common.php";

$searchQuery = isset($_GET['search']) ? '%' . $_GET['search'] . '%' : '%';

$sql = "SELECT events.*, users.id as user_id, users.full_name FROM events INNER JOIN users ON users.id = events.user_id WHERE start_date >= CURRENT_TIMESTAMP AND (title ILIKE :search OR description ILIKE :search) ORDER BY start_date ASC LIMIT 3";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':search', $searchQuery);
$stmt->execute();

if (isset($_GET['attend'])) {
    $sql = "SELECT events.*, users.id, users.full_name FROM events INNER JOIN users ON users.id = events.user_id INNER JOIN attendances ON events.id = attendances.event_id WHERE attendances.user_id = :user_id AND start_date >= CURRENT_TIMESTAMP AND (events.title ILIKE :search OR events.description ILIKE :search)";
    $stmt = $conn->prepare($sql);
    $userId = getUserId();
    $stmt->bindParam(':user_id', $userId);
    $stmt->bindParam(':search', $searchQuery);
}
$stmt->execute();

$events = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Semua Event - diajakin.</title>
    <link rel="stylesheet" href="/dist/diajakin.css">
    <script src="/dist/diajakin.umd.js"></script>
</head>

<body>
    <header>
        <?php require __DIR__ . "/components/navbar.php" ?>
    </header>
    <main class="container py-5">
        <section class="container-md mx-auto my-5">
            <h2 class="display-6 mb-4"><?= isset($_GET['attend']) ? 'Event yang saya hadiri' : 'Semua Event' ?></h2>
            <form action="" method="get">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Cari event..." name="search" value="<?= isset($_GET['search']) ? $_GET['search'] : '' ?>">
                    <button class="btn btn-primary" type="submit">Cari</button>
                    <?php if (isset($_GET['search']) && $_GET['search'] != ''): ?>
                        <a href="list-event.php" class="btn btn-secondary">Clear</a>
                    <?php endif; ?>
                </div>
            </form>
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
        </section>
    </main>
    <?php require __DIR__ . "/components/footer.php"; ?>
</body>

</html>