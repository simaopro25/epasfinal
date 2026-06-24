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
class ControllerNoticias {

    private $conn;
    private $database;

    public function __construct() {
        $this->database = new Connection();
        $this->conn = $this->database->getConnection();
    }

    // Obter todas as notícias
    public function getAll() {
        // REGRA: Só esconde os inativos se for da categoria 24 (Eventos). Outras categorias aparecem sempre.
        $dados = $this->database->getData("SELECT `Imagem`, `Titulo`, `Texto`, `local_evento`, `CodigoCategoria`, Categoria.Nome as nomeCategoria, Categoria.CodigoEscola, 
                                            Escolas.nome AS nomeEscola, Noticias.`ID`, Noticias.Data FROM `Noticias` 
                                            inner join Categoria on Categoria.ID=Noticias.CodigoCategoria 
                                            INNER JOIN Escolas on Escolas.id=criador 
                                            WHERE (Noticias.CodigoCategoria != 24 OR Noticias.ativacao = 1) 
                                            ORDER BY Noticias.ID DESC;");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }


    //Contar noticias (Esta função já filtrava apenas a categoria 24)
    public function contarNoticias() {
        $dados = $this->database->getData("SELECT COUNT(id) AS numNoticias FROM Noticias WHERE CodigoCategoria = 24 AND ativacao = 1");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }


    // Obter todas as notícias de uma categoria
    public function getByCat($cat) {
        header('Content-Type: application/json; charset=utf-8'); // Adicionado para garantir o formato
        $p['cat'] = $cat;
        
        // REGRA: Se a categoria solicitada (:cat) for 24, obriga a estar ativo (ativacao = 1). Se for outra, ignora o filtro.
        $sql = "SELECT n.`Imagem` AS Imagem, 
                       n.`Titulo` AS Titulo, 
                       n.`Texto` AS Texto, 
                       n.`local_evento` AS local_evento, 
                       n.`CodigoCategoria`, 
                       Categoria.Nome AS NomeCategoria, 
                       n.`ID` AS ID, 
                       DATE_FORMAT(n.`Data`, '%d-%m') as datacurta, 
                       n.Data,
                       e.nome AS nomeEscola,
                       e.foto AS fotoEscola
                FROM `Noticias` n
                LEFT JOIN `Escolas` e ON e.id = n.criador
                INNER JOIN Categoria on Categoria.ID=n.CodigoCategoria 
                WHERE n.CodigoCategoria = :cat  and n.ativacao = 1 
                ORDER BY n.Data DESC";
                
        $carro = $this->database->getData($sql, $p);

        if ($carro) {
            echo json_encode($carro, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode([], JSON_UNESCAPED_UNICODE); // Retorna array vazio em vez de erro
        }
        exit; // Adicionado para evitar saídas extras
    }

    // Obter todas as notícias de uma categoria com limite
    public function getByCatLim($cat, $limi) {
            header('Content-Type: application/json; charset=utf-8');
            $p['cat'] = $cat;
            
            // REGRA: Mesma lógica aplicada à listagem com limite
            $sql = "SELECT n.`Imagem` AS Imagem, 
                           n.`Titulo` AS Titulo, 
                           n.`Texto` AS Texto, 
                           n.`local_evento` AS local_evento, 
                           n.`ID` AS ID, 
                           n.`criador`,
                           DATE_FORMAT(n.`Data`, '%d-%m') as datacurta, 
                           e.nome AS nomeEscola,
                           e.foto AS fotoEscola 
                    FROM `Noticias` n
                    LEFT JOIN `Escolas` e ON e.id = n.criador 
                    WHERE n.CodigoCategoria = :cat 
                    AND (n.CodigoCategoria != 24 OR n.ativacao = 1) 
                    ORDER BY n.Data DESC 
                    LIMIT " . intval($limi);
                    
            $noticias = $this->database->getData($sql, $p);
            
            echo json_encode($noticias ? $noticias : [], JSON_UNESCAPED_UNICODE);
            exit;
        }

    public function contarArtigos() {
        $dados = $this->database->getData("SELECT COUNT(`ID`) AS NUMERO, DATE_FORMAT(`Data`, '%m/%d') AS DATAS FROM `Noticias` WHERE CodigoCategoria = 24 AND ativacao = 1 GROUP BY DATAS ORDER BY DATAS;");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }
    
    public function getById($id) {
        $p['id']=$id;
        $noticia = $this->database->getData("SELECT `Imagem`, `Titulo`, `Texto`, `CodigoCategoria`, `ID` FROM `Noticias` WHERE ID= :id", $p);
        if ($noticia) {
            echo json_encode($noticia, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['msg' => 'Noticia não encontrada', 'status' => '404']);
        }
    }

    // Criar um novo carro
    public function create() {
        $p['marca']=$_POST['Marca'];
        $p['detalhes']=$_POST['Detalhes'];
        $p['foto']=$_POST['Foto'];
        $resp = $this->database->setData("INSERT INTO alfCarros (marca, details, foto) VALUES (:marca, :detalhes, :foto)", $p);
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

    //FUNÇÃO DESTACAR EVENTOS (Esta função já puxa fixo a categoria 24)
    public function getEventosDestaque() {
        $sql = "SELECT n.`Imagem`, n.`Titulo`, n.`Texto`, IFNULL(n.`local_evento`, 'A definir') as local_evento, 
                    n.`ID`, n.`Data`, e.nome AS nomeEscola 
                FROM `Noticias` n
                LEFT JOIN `Escolas` e ON e.id = n.criador
                WHERE n.CodigoCategoria = 24 
                AND n.ativacao = 1 
                AND n.destaque = 1 
                ORDER BY n.Data DESC 
                LIMIT 6";
                
        $dados = $this->database->getData($sql);
        echo json_encode($dados ? $dados : [], JSON_UNESCAPED_UNICODE);
    }


    public function getByEscola($id) {
        $p['id'] = $id;
        
        // REGRA: Filtro por escola também respeita a mesma lógica (só bloqueia se for a categoria 24)
        $dados = $this->database->getData(
            "SELECT Noticias.`ID`, Noticias.`Titulo`, Noticias.`Texto`, 
                    Noticias.`Imagem`, Noticias.`Data`,
                    Categoria.`Nome` as nomeCategoria, Categoria.`ID` as idCategoria
             FROM `Noticias`
             INNER JOIN `Categoria` ON Categoria.ID = Noticias.CodigoCategoria
             WHERE `criador` = :id 
             AND (Noticias.CodigoCategoria != 24 OR Noticias.ativacao = 1) 
             ORDER BY Categoria.Nome, Noticias.Data DESC",
            $p
        );
        echo json_encode($dados ? $dados : [], JSON_UNESCAPED_UNICODE);
    }

}
?>