<nav class="navbar navbar-expand-lg bg-primary navbar-dark position-fixed top-0 left-0 w-100 z-3">
    <div class="container">
        <a class="navbar-brand fw-semibold" href="/">diajakin.</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Beranda</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/list-event.php">Event</a>
                </li>
            </ul>
            <div class="d-flex justify-content-center align-items-center gap-2">
                <?php if (getUserId() == null): ?>
                    <a href="/login.php" class="btn btn-outline-light">Login</a>
                    <a href="/register.php" class="btn btn-light">Registrasi</a>
                <?php endif; ?>
                <?php if (getUserId() != null): ?>
                    <a href="/admin/index.php" class="btn btn-link text-white">Dashboard</a>
                    <a href="/logout.php" class="btn btn-outline-light">Logout</a>
                <?php endif; ?>
            </div>
        </div>
    </div>
</nav>