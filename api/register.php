<?php

require __DIR__ . "/db/connection.php";

?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Register | diajakin.</title>
    <link rel="stylesheet" href="/dist/diajakin.css">
    <script src="/dist/diajakin.umd.js"></script>
</head>

<body>
    <header class="container-fluid bg-primary bg-gradient" style="height: 200px;">
        <h1 class="text-white display-6 pt-5 text-center">Selamat datang!</h1>
    </header>
    <main>
        <section class="container-md mx-auto my-5">
            <div class="row">
                <div class="col-md-5 mx-auto">
                    <div class="card" style="transform: translateY(-100px);">
                        <form class="card-body pt-4" method="POST">
                            <p class="card-subtitle text-secondary mb-4">Isi data berikut untuk segera mendaftar event!</p>
                            <div class="form-group mb-3">
                                <label for="full_name" class="form-label">Nama Lengkap</label>
                                <input type="text" class="form-control" id="full_name" name="full_name" placeholder="cth: Rohman" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="cth: rohman@example.org" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="password">Password</label>
                                <input type="password" class="form-control password" id="password" name="password" placeholder="kata sandi anda" required>
                            </div>
                            <div class="form-group mb-4">
                                <label for="password">Konfirmasi Password</label>
                                <input type="password" class="form-control mb-2 password" id="password" name="password" placeholder="ketik ulang kata sandi anda" required>
                                <input type="checkbox" id="showPass" onclick="showPassword()">
                                <label for="showPass">Tampil password</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100 mb-4">Daftar</button>
                            <p class="text-center">Sudah punya akun? <a href="/login.php">Login sekarang</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script>
        function showPassword() {
            var passwords = document.querySelectorAll(".password");
            passwords.forEach(password => {
                if (password.type === "password") {
                    password.type = "text";
                } else {
                    password.type = "password";
                }
            });
        }
    </script>
</body>

</html>