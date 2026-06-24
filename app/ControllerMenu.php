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

class ControllerMenu {

    private $conn;
    private $database;

    public function __construct() {
        $this->database = new Connection();
        $this->conn = $this->database->getConnection();
    }

    // Obter todos os menus
    public function getAll() {
        $carros = $this->database->getData("SELECT `ID`, `Opcao`, `Ordem`, `pai`, link FROM `Menu` order by `Ordem`, pai");
        echo json_encode($carros, JSON_UNESCAPED_UNICODE);
    }

    // Obter todos os menus
    public function getMenus() {
        $matriz=[];
        $Menus = $this->database->getData("SELECT `ID`, `Opcao`, `Ordem`, `pai`, link FROM `Menu` order by `Ordem`, pai");
        foreach($Menus as $item){
            //print_r($item);
            $matriz[$item["pai"]][$item['ID']]=$item;
            //$matriz["a"]=$item  ;          

        }
        //echo "<pre>";
        //print_r($matriz);
        //echo "</pre>";
        echo json_encode($matriz, JSON_UNESCAPED_UNICODE);
    }


     //Contar menus
     public function contarMenus() {
        $dados = $this->database->getData("SELECT COUNT(id) AS numMenus FROM Menu");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    // Obter menu por pai
    public function getByPai($pai) {
        $p['pai']=$pai;
        $carro = $this->database->getData("SELECT `ID`, `Opcao`, `Ordem`, `pai`, link FROM `Menu` WHERE pai=:pai  order by `Ordem`", $p);
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

