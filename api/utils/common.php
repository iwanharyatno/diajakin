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