<?php
$userId = getUserId();

if ($userId == null) {
    $path = $_SERVER['REQUEST_URI'];
    header('Location: /login.php?redirect=' . $path, true);
    exit;
}

$sql = "SELECT * FROM users WHERE id = :id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':id', $userId);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<nav class="navbar navbar-expand-lg bg-primary navbar-dark top-0 left-0 w-100 z-3">
    <div class="container">
        <a class="navbar-brand fw-semibold" href="/"><?= $user['full_name'] ?></a>
        <button class="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
</nav>