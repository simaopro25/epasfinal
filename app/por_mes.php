<?php

namespace app;
use src\Connection;

require_once '../../vendor/autoload.php';
require_once '../../config.php';

$database = new Connection();

$result = $database->getData("
    SELECT DATE_FORMAT(data_login, '%b') AS mes, COUNT(*) AS total_logins
    FROM login_logs
    GROUP BY MONTH(data_login)
    ORDER BY MONTH(data_login) ASC
", []);

header('Content-Type: application/json');
echo json_encode($result, JSON_UNESCAPED_UNICODE);