<?php

namespace app;
use src\Connection;

class ControllerLoginSimples {
}

// Usar a conexão do projeto
require_once __DIR__ . '/../src/Connection.php';

$database = new \src\Connection();
$conn = $database->getConnection();

$stmt = $conn->query("
    SELECT DATE_FORMAT(data_login, '%b') AS mes, COUNT(*) AS total_logins
    FROM login_logs
    GROUP BY MONTH(data_login)
    ORDER BY MONTH(data_login) ASC
");

header('Content-Type: application/json');
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));