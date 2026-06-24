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

class ControllerCategorias {

    private $conn;
    private $database;

    public function __construct() {
        $this->database = new Connection();
        $this->conn = $this->database->getConnection();
    }

    // Obter todas as categorias
    public function getAll() {
        $dados = $this->database->getData("SELECT `Imagem`, `Titulo`, `Texto`, `CodigoCategoria`, `ID` FROM `Noticias`");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    //Contar categorias
    public function contarCategorias() {
        $dados = $this->database->getData("SELECT COUNT(id) AS numCategorias FROM Categoria");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    // Obter todas as escolas de uma categoria
    public function getByCat($cat) {
        $p['cat']=$cat;
        $carro = $this->database->getData("SELECT `Imagem`, `Titulo`, `Texto`, `CodigoCategoria`, `ID` FROM `Noticias` WHERE CodigoCategoria= :cat", $p);
        //print_r($carro);
        if ($carro) {
            echo json_encode($carro, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['msg' => 'Notícia não encontrada', 'status' => '404']);
        }
    }

    public function getById($id) {
        $p['id']=$id;
        $carro = $this->database->getData("SELECT `Imagem`, `Titulo`, `Texto`, `CodigoCategoria`, `ID` FROM `Noticias` WHERE ID= :id", $p);
        //print_r($carro);
        if ($carro) {
            echo json_encode($carro, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['msg' => 'Carro não encontrado', 'status' => '404']);
        }
    }

    // Criar um novo carro
    public function create() {
        $p['marca']=$_POST['Marca'];
        $p['detalhes']=$_POST['Detalhes'];
        $p['foto']=$_POST['Foto'];
        $resp = $this->database->setData("INSERT INTO alfCarros (marca, detalhes, foto) VALUES (:marca, :detalhes, :foto)", $p);
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }

    // Atualizar um carro
    public function update() {
        parse_str(file_get_contents("php://input"), $putData);
        $p['marca']=$putData['Marca'];
        $p['detalhes']=$putData['Detalhes'];
        $p['foto']=$putData['Foto'];
        $p['id']=$putData['id'];

        $resp = $this->database->setData("UPDATE alfCarros SET marca = :marca, detalhes = :detalhes, foto = :foto WHERE id = :id", $p);
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }

    // Deletar um carro
    public function delete($id) {
        $p['id']=$id;

        $resp = $this->database->setData("DELETE FROM alfCarros WHERE id = :id", $p);
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }

}
?>

