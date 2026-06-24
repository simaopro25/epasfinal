<?php

/**
 * @autores alf
 * @copyright 2025
 * @ver 2.0
 */


namespace app;
use src\Connection;
use PDO;

//require_once 'Database.php'; // Arquivo de conexão com a base de dados

class ControllerLog {

    private $conn;
    private $database;

    public function __construct() {
        $this->database = new Connection();
        $this->conn = $this->database->getConnection();
    }

    // Obter todos os carros
    public function getAll() {
        $carros = $this->database->getData("SELECT * FROM visitas");
        echo json_encode($carros, JSON_UNESCAPED_UNICODE);
    }

    // Obter carro por ID
    public function getById($id) {
        $p['id']=$id;
        $carro = $this->database->getData("SELECT * FROM visitas WHERE id = :id", $p);
        //print_r($carro);
        if ($carro) {
            echo json_encode($carro, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['msg' => 'Carro não encontrado', 'status' => '404']);
        }
    }

    // Criar um novo carro
    public function create() {
        $input = json_decode(file_get_contents('php://input'), true);

        if($input){
            $_POST = $input;
        }
        
        $p['marca']=$_POST['Marca'];
        $p['detalhes']=$_POST['Detalhes'];
        $p['foto']=$_POST['Foto'];
        $resp = $this->database->setData("INSERT INTO `visitas`(`id`, `utilizador`, `data`, `acao`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]')", $p);
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }

    // Atualizar um carro
    public function update() {
        parse_str(file_get_contents("php://input"), $putData);
        $p['marca']=$putData['Marca'];
        $p['detalhes']=$putData['Detalhes'];
        $p['foto']=$putData['Foto'];
        $p['id']=$putData['id'];

        $resp = $this->database->setData("UPDATE visitas SET marca = :marca, detalhes = :detalhes, foto = :foto WHERE id = :id", $p);
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }

    // Deletar um carro
    public function delete($id) {
        $p['id']=$id;

        $resp = $this->database->setData("DELETE FROM visitas WHERE id = :id", $p);
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }


    public function acessosPorMes() {
        $dados = $this->database->getData("
           SELECT 
                    datas.data, 
                    COUNT(l.id) AS numAcesso
                FROM (
                    -- Gera uma lista de datas dos últimos 30 dias
                    SELECT CURDATE() - INTERVAL (a.N + b.N * 10) DAY AS data
                    FROM (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a
                    CROSS JOIN (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3) b
                ) AS datas
                LEFT JOIN login_logs l ON DATE(l.data_login) = datas.data
                WHERE datas.data >= CURDATE() - INTERVAL 1 MONTH
                GROUP BY datas.data
                ORDER BY datas.data ASC;
        ");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

}
?>