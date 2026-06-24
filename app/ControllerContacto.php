<?php

/**
 * @autores alf
 * @copyright 2025
 * @ver 2.0
 */


namespace app;
use src\Connection;
use app\ControllerMail ;
use PDO;

//require_once 'Database.php'; // Arquivo de conexão com a base de dados

class ControllerContacto {

    private $conn;
    private $database;

    public function __construct() {
        $this->database = new Connection();
        $this->conn = $this->database->getConnection();
    }

    // Obter todos os contactos
    public function getAll() {
        $carros = $this->database->getData("SELECT * FROM `contactos` ORDER BY `estado` DESC, `data_criacao`");
        echo json_encode($carros, JSON_UNESCAPED_UNICODE);
    }

    // Obter contacto por ID
    public function getById($id) {
        $p['id']=$id;
        $carro = $this->database->getData("SELECT * FROM `contactos`  WHERE id = :id", $p);
        //print_r($carro);
        if ($carro) {
            echo json_encode($carro, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['msg' => 'Contacto não encontrado', 'status' => '404']);
        }
    }

    // Criar um novo carro
    public function create($json=1) {
        $p['nome']=$_POST['nome'];
        $p['email']=$_POST['email'];
        $p['telefone']=$_POST['telefone'];
        $p['assunto']=$_POST['assunto'];
        $p['mensagem']=$_POST['mensagem'];
        //print_r($p);
        $resp = $this->database->setData("INSERT INTO `contactos`(`nome`, `email`, `telefone`, `assunto`, `mensagem`, `estado`) 
                                        VALUES (:nome,:email,:telefone,:assunto,:mensagem,0)", $p);
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
        header('Location: /public/contacto/sucesso');
    }

    // Atualizar um carro
    public function update() {

        $input = json_decode(file_get_contents('php://input'), true);

        if($input){
            $putData = $input;
        }

        //parse_str(file_get_contents("php://input"), $putData);
        $p['resposta']=$putData['resposta'];
        $p['id']=$putData['id'];
        $p['estado']=$putData['estado'];
        $email=$putData['email_envio'];
        //print_r($p);
        $resp = $this->database->setData("UPDATE contactos SET resposta_texto = :resposta, estado=:estado WHERE id = :id", $p);
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);

        $mail = new ControllerMail();
        $mail->sendMail($email, "Resposta EPAS", $p['resposta'] );
    }

    // Deletar um carro
    public function delete($id) {
        $p['id']=$id;

        $resp = $this->database->setData("DELETE FROM alfCarros WHERE id = :id", $p);
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }

}
?>

