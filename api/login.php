<?php

require __DIR__ . "/db/connection.php";
require __DIR__ . "/utils/common.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if (password_verify($password, $user['password'])) {
            setUserId($user['id']);
            if (isset($_SESSION['redirect'])) {
                header('Location: ' . $_SESSION['redirect']);
                unset($_SESSION['redirect']);
            } else {
                header('Location: /');
            }
        } else {
            echo "<script>
            window.addEventListener('DOMContentLoaded', function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password salah!',
                });
            });
            </script>";
        }
    } else {
        echo "<script>
            window.addEventListener('DOMContentLoaded', function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email belum terdaftar',
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
    <title>Login | diajakin.</title>
    <link rel="stylesheet" href="/dist/diajakin.css">
    <script src="/dist/diajakin.umd.js"></script>
</head>

<body>
    <header class="container-fluid bg-primary bg-gradient" style="height: 200px;">
        <h1 class="text-white display-6 pt-5 text-center">Selamat datang kembali!</h1>
    </header>
    <main>
        <section class="container-md mx-auto my-5">
            <div class="row">
                <div class="col-md-5 mx-auto">
                    <div class="card" style="transform: translateY(-100px);">
                        <form class="card-body pt-4" method="POST">
                            <p class="card-subtitle text-secondary mb-4">Silahkan masuk menggunakan email dan password anda</p>
                            <div class="form-group mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="cth: rohman@example.org" required>
                            </div>
                            <div class="form-group mb-4">
                                <label for="password">Password</label>
                                <input type="password" class="form-control mb-2" id="password" name="password" placeholder="kata sandi anda" required>
                                <input type="checkbox" id="showPass" onclick="showPassword()">
                                <label for="showPass">Tampil password</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100 mb-4">Masuk</button>
                            <p class="text-center">Belum punya akun? <a href="/register.php">Daftar sekarang</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script>
        function showPassword() {
            var password = document.getElementById("password");
            if (password.type === "password") {
                password.type = "text";
            } else {
                password.type = "password";
            }
        }
    </script>
</body>

</html>