<?php

$path = $_SERVER['REQUEST_URI'];

?>

<div class="bg-primary text-white h-100">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasResponsiveLabel">Menu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body px-3 pt-4">
        <ul class="flex-column w-100 gap-3 m-0 p-0" style="list-style-type: none">
            <li class="px-3 py-2 <?= $path == '/admin' || $path == '/admin/' || $path == '/admin/index.php' ? 'bg-white rounded-3 text-primary' : '' ?>">
                <a class="nav-link" href="/admin/index.php">Beranda</a>
            </li>
            <li class="px-3 py-2 <?= str_starts_with($path, '/admin/events.php') ? 'bg-white rounded-3 text-primary' : '' ?>">
                <a class="nav-link" href="/admin/events.php">Event</a>
            </li>
            <li class="px-3 py-2">
                <a class="nav-link" href="/logout.php">Logout</a>
            </li>
        </ul>
    </div>
</div>