<?php

require __DIR__ . "/../db/connection.php";
require __DIR__ . "/../utils/common.php";

$userId = getUserId();

if ($userId == null) {
    $path = $_SERVER['REQUEST_URI'];
    header('Location: /login.php?redirect=' . $path, true);
    exit;
}

$sql = "SELECT COUNT(*) as created FROM events WHERE user_id = :id LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':id', $userId);
$stmt->execute();
$created = $stmt->fetch(PDO::FETCH_ASSOC);

$sql = "SELECT COUNT(*) as attended FROM attendances WHERE user_id = :id LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':id', $userId);
$stmt->execute();
$attended = $stmt->fetch(PDO::FETCH_ASSOC);

if ($created) {
    $created = $created['created'];
} else {
    $created = 0;
}

if ($attended) {
    $attended = $attended['attended'];
} else {
    $created = 0;
}

$events = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>diajakin. - Dashboard</title>
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
                    <h2 class="display-6 mb-4">Dashboard</h2>
                    <div class="container-fluid">
                        <div class="row row-cols-1 row-cols-md-3 gap-4">
                            <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                    <p class="card-text display-2"><?= $created ?></p>
                                    <h5 class="card-title text-secondary fs-6">Event dibuat</h5>
                                </div>
                            </div>
                            <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                    <p class="card-text display-2"><?= $attended ?></p>
                                    <h5 class="card-title text-secondary fs-6">Event diikuti</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <?php require __DIR__ . "/../components/footer.php"; ?>
            </div>
        </div>
    </main>
</body>

</html>