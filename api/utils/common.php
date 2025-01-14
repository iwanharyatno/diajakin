<?php

require __DIR__ . "/constants.php";

function dateFormatFromString($date) {
    return date_format(date_create($date), 'd F Y');
}

function getUserId() {
    if (isset($_COOKIE[USER_ID_COOKIE_KEY])) {
        return $_COOKIE[USER_ID_COOKIE_KEY];
    }
    return null;
}

function setUserId($id) {
    setcookie(USER_ID_COOKIE_KEY, $id, time() + REMEMBER_ME_DURATION, "/");
}

function logout() {
    setcookie(USER_ID_COOKIE_KEY, "", time() - 3600, "/");
    header("Location: /");
    exit;
}

function removeSession($key) {
    unset($_COOKIE[$key]);
    setcookie($key, '', time() - 60, "/");
}
function setSession($key, $value) {
    setcookie($key, $value, time() + 30, "/");
}
function getSession($key) {
    if (isset($_COOKIE[$key])) {
        return $_COOKIE[$key];
    }
    return null;
}

function getFullURL() {
    $link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] 
                === 'on' ? "https" : "http") . 
                "://" . $_SERVER['HTTP_HOST'] . 
                $_SERVER['REQUEST_URI'];
    return $link;
}