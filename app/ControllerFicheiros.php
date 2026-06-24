<?php

/**
 * @autores alf
 * @copyright 2026
 * @ver 2.0
 */


namespace app;
use src\Connection;
use PDO;

//require_once 'Database.php'; // Arquivo de conexão com a base de dados

//Cria uma classe que se conecta à base de dados automaticamente quando é iniciada.
class ControllerFicheiros {

    private $conn;
    private $database;

    public function __construct() {
        $this->database = new Connection();
        $this->conn = $this->database->getConnection();
    }

    // Obter todas as notícias
    public function getAll() {
        // REGRA: Só esconde os inativos se for da categoria 24 (Eventos). Outras categorias aparecem sempre.
        $dados = $this->database->getData("SELECT Ficheiros.`id`, Ficheiros.`titulo`, Noticias.Titulo as recurso, `ficheiro`, `idNoticia` 
                                            FROM `Ficheiros` inner join Noticias on Ficheiros.idNoticia=Noticias.ID 
                                            ORDER BY recurso, Ficheiros.titulo");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }


   

    // Obter todas as notícias de uma categoria
    public function getByRec($rec) {
        header('Content-Type: application/json; charset=utf-8'); // Adicionado para garantir o formato
        $p['rec'] = $rec;
        
        // REGRA: Se a categoria solicitada (:cat) for 24, obriga a estar ativo (ativacao = 1). Se for outra, ignora o filtro.
        $sql = "SELECT Ficheiros.`id`, Ficheiros.`titulo`, Noticias.Titulo as recurso, `ficheiro`, `idNoticia` 
                FROM `Ficheiros` inner join Noticias on Ficheiros.idNoticia=Noticias.ID 
                WHERE Ficheiros.idNoticia=:rec";
                
        $carro = $this->database->getData($sql, $p);

        if ($carro) {
            echo json_encode($carro, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode([], JSON_UNESCAPED_UNICODE); // Retorna array vazio em vez de erro
        }
        exit; // Adicionado para evitar saídas extras
    }
}
?>