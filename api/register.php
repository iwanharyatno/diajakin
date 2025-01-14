<?php

require __DIR__ . "/db/connection.php";

$full_name = "";
$email = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Ambil data dari form
    $full_name = trim($_POST['full_name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validasi input
    if (empty($full_name) || empty($email) || empty($password) || empty($confirm_password)) {
        echo "<script>document.addEventListener('DOMContentLoaded', function() { Swal.fire({icon: 'error', title: 'Oops...', text: 'Semua kolom wajib diisi.'}); });</script>";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>document.addEventListener('DOMContentLoaded', function() { Swal.fire({icon: 'error', title: 'Oops...', text: 'Format email tidak valid.'}); });</script>";
    } elseif ($password !== $confirm_password) {
        echo "<script>document.addEventListener('DOMContentLoaded', function() { Swal.fire({icon: 'error', title: 'Oops...', text: 'Password dan konfirmasi password tidak sama.'}); });</script>";
    } else {
        // Hash password
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        try {
            // Simpan ke database
            $stmt = $conn->prepare("INSERT INTO users (full_name, email, password) VALUES (:full_name, :email, :password)");
            $stmt->execute([
                ':full_name' => $full_name,
                ':email' => $email,
                ':password' => $hashed_password
            ]);

            echo "<script>document.addEventListener('DOMContentLoaded', function() { Swal.fire({icon: 'success', title: 'Berhasil!', text: 'Registrasi berhasil! Silakan login.'}).then(() => { window.location.href='/login.php'; }); });</script>";
        } catch (PDOException $e) {
            if ($e->getCode() == 23505) { // Duplicate entry error code
                echo "<script>document.addEventListener('DOMContentLoaded', function() { Swal.fire({icon: 'error', title: 'Oops...', text: 'Email sudah terdaftar.'}); });</script>";
            } else {
                echo "<script>document.addEventListener('DOMContentLoaded', function() { Swal.fire({icon: 'error', title: 'Oops...', text: 'Terjadi kesalahan. Silakan coba lagi.'}); });</script>";
            }
        }
    }
}

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
                                <input type="text" class="form-control" id="full_name" name="full_name" placeholder="cth: Rohman" value="<?php echo htmlspecialchars($full_name); ?>" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="cth: rohman@example.org" value="<?php echo htmlspecialchars($email); ?>" required>
                            </div>
                            <div class="form-group mb-3">
                                <label for="password">Password</label>
                                <input type="password" class="form-control password" id="password" name="password" placeholder="kata sandi anda" required>
                            </div>
                            <div class="form-group mb-4">
                                <label for="confirm_password">Konfirmasi Password</label>
                                <input type="password" class="form-control mb-2 password" id="confirm_password" name="confirm_password" placeholder="ketik ulang kata sandi anda" required>
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