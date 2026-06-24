<?php

/**
 * @autores alf
 * @copyright 2025
 * @ver 2.0
 */

namespace app;
use src\Connection;
use PDO;

class ControllerEscolas {

    private $conn;
    private $database;

    public function __construct() {
        $this->database = new Connection();
        $this->conn = $this->database->getConnection();
    }

    // Função auxiliar para sanitizar arrays de resultados
    private function sanitizarArray($dados) {
        if (is_array($dados)) {
            foreach ($dados as &$item) {
                if (is_string($item)) {
                    $item = htmlspecialchars($item, ENT_QUOTES, 'UTF-8');
                }
            }
        }
        return $dados;
    }

    // Obter todas as escolas
    public function getAll() {
        $dados = $this->database->getData("SELECT `id`, `nome`, `localizacao`, `Foto`, `telefone`, `email`, `TipoEscola`, `PaginaWeb`, `latitude`, `longitude` FROM `Escolas` WHERE `confirmada`=1 ORDER BY `nome`");
        $dadosSanitizados = array_map([$this, 'sanitizarArray'], $dados);
        echo json_encode($dadosSanitizados, JSON_UNESCAPED_UNICODE); 
    }

    public function getAllLocalizacoes() {
        $dados = $this->database->getData("SELECT `Id`, `Tipo` FROM `TipoEscolas` ORDER BY Tipo;");
        $dadosSanitizados = array_map([$this, 'sanitizarArray'], $dados);
        echo json_encode($dadosSanitizados, JSON_UNESCAPED_UNICODE);
    }

    public function contarEscolas() {
        $dados = $this->database->getData("SELECT COUNT(id) AS numEscolas FROM Escolas WHERE confirmada = 1 and TipoEscola!=2");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    public function getByPais() {
        $dados = $this->database->getData("SELECT pais, COUNT(*) as numEscolas FROM Escolas WHERE confirmada=1 GROUP BY pais ORDER BY pais");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    public function contarEmbaixadores() {
        $dados = $this->database->getData("SELECT COUNT(id) AS numEmbaixadores FROM Embaixadores WHERE ativo=1 AND tipo='Senior'");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }
   
    public function contarTipoEscolas() {
        $dados = $this->database->getData("SELECT TipoEscola, COUNT(`TipoEscola`) AS numEscolas FROM Escolas WHERE confirmada = 1 GROUP BY `TipoEscola` ");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    public function getByCat($cat) {
        $p['cat']=$cat;
        $carro = $this->database->getData("SELECT `Imagem`, `Titulo`, `Texto`, `CodigoCategoria`, `ID` FROM `Noticias` WHERE CodigoCategoria= :cat", $p);
        if ($carro) {
            $carro = array_map([$this, 'sanitizarArray'], $carro);
            echo json_encode($carro, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['msg' => 'Notícia não encontrada', 'status' => '404']);
        }
    }

    public function getById($id) {
        $p['id']=$id;
        $carro = $this->database->getData("SELECT `Imagem`, `Titulo`, `Texto`, `CodigoCategoria`, `ID` FROM `Noticias` WHERE ID= :id", $p);
        if ($carro) {
            $carro = array_map([$this, 'sanitizarArray'], $carro);
            echo json_encode($carro, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['msg' => 'Carro não encontrado', 'status' => '404']);
        }
    }

    // Criar uma nova escola (COM PROTEÇÃO reCAPTCHA v3)
    public function create() {
        // 1. Validar o reCAPTCHA
        $token = $_POST['g-recaptcha-response'] ?? '';
        $secret = '6LdjYRktAAAAAChlGuXf7DRp4f8vGg3ADPTuluDb'; 
    
        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$token");
        $result = json_decode($response);
    
        // DEBUG: Descomente a linha abaixo se continuar a dar erro para ver a pontuação real
        // error_log("Recaptcha Result: " . json_encode($result));
    
        // CORREÇÃO: Baixamos o score para 0.3 (mais tolerante) e validamos a action 'submit'
        if (!$result->success || $result->score < 0.3 || ($result->action ?? '') !== 'submit') {
            http_response_code(403);
            echo json_encode([
                "status" => "error", 
                "message" => "Acesso negado: comportamento suspeito.",
                "debug_score" => $result->score ?? 0 // Ajuda a ver a nota no console (Remover em produção)
            ]);
            return;
        }

        // 2. Processar dados
        $input = json_decode(file_get_contents('php://input'), true);
        if($input){
            $_POST = $input;
        }

        $p['nome']=$_POST['name'];
        $p['localizacao']=$_POST['localizacao'];
        $p['telefone']=$_POST['telefone'];
        $p['email']=$_POST['email'];
        $p['TipoEscola']=$_POST['tipoEscola'];
        $p['PaginaWeb']=$_POST['paginaWeb'];
        $p['utilizador']=$_POST['utilizador'];
        $p['passw']=md5($_POST['passw']);
        $p['pessoaContacto']=$_POST['PessoaContacto'];
        $p['latitude']=$_POST['latitude'];
        $p['longitude']=$_POST['longitude'];
        $p['motivacao']=$_POST['motivacao'];

        $resp = $this->database->setData("INSERT INTO `Escolas`(`nome`, `localizacao`, `telefone`, `email`, `TipoEscola`, `PaginaWeb`, `utilizador`, `passw`, 
                                           `pessoaContacto`, `latitude`, `longitude`, motivacao) 
                                           VALUES (:nome, :localizacao, :telefone, :email, :TipoEscola, :PaginaWeb, :utilizador, :passw, :pessoaContacto, 
                                           :latitude, :longitude, :motivacao)", $p);
        
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }

    public function update() {
        parse_str(file_get_contents("php://input"), $putData);
        $p['marca']=$putData['Marca'];
        $p['detalhes']=$putData['Detalhes'];
        $p['foto']=$putData['Foto'];
        $p['id']=$putData['id'];

        $resp = $this->database->setData("UPDATE alfCarros SET marca = :marca, detalhes = :detalhes, foto = :foto WHERE id = :id", $p);
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }

    public function delete($id) {
        $p['id']=$id;
        $resp = $this->database->setData("DELETE FROM alfCarros WHERE id = :id", $p);
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }

    public function getByIdEscola($id) {
        $p['id'] = $id;
        $escola = $this->database->getData(
            "SELECT `id`, `nome`, `localizacao`, `foto`, `telefone`, `email`, 
            `TipoEscola`, `PaginaWeb`, `latitude`, `longitude` 
            FROM `Escolas` 
            WHERE `id` = :id AND `confirmada` = 1",
            $p
        );
        if ($escola) {
            $escola[0] = $this->sanitizarArray($escola[0]);
            echo json_encode($escola[0], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['msg' => 'Escola não encontrada', 'status' => '404']);
        }
    }
}
?>