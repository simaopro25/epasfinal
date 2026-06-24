<?php

/**
 * @autores alf
 * @copyright 2025
 * @ver 2.0
 */

namespace app;

use src\Connection;
use PDO;

use classes\authentication\Authentication;
use classes\authentication\Users;
//use classes\google\GoogleClient;

//require_once('../config.php');
//require_once('../vendor/autoload.php');

class ControllerLoginSimples
{

  private $conn;
  private $database;

  public function __construct()
  {
    $this->database = new Connection();
    $this->conn = $this->database->getConnection();
  }

  // Obter um user por email
  public function getUserByUserPass($user, $passw, $json = true) {
    $p['user'] = $user;
    $p['passw'] = md5($passw);
    print_r($p);
    $user = $this->database->getData("SELECT `id`, `nome`, `foto`, `email`, `utilizador` as user, `passw`, `confirmada`, TipoEscola  
                                      FROM `Escolas` WHERE `confirmada`=1 and utilizador=:user and passw=:passw", $p);
    if ($json) {
      echo json_encode($user);
    } else {
      return $user;
    }
  }


  // Obter um user por email
  public function getUserbyEmail($email, $json = true)  {
    $p['email'] = $email;
    $user = $this->database->getData("SELECT `Processo` as id, `Nome` as name, `Email` as email, `Telefone`, `DC` as type, `ativo` FROM `fctProfessores` WHERE email=:email and ativo=1", $p);
    if ($json) {
      echo json_encode($user);
    } else {
      return $user;
    }
  }

  // =========================================================================
  // NOVO MÉTODO: Processa o clique do botão "Enviar Código" (Passo 1)
  // =========================================================================
  public function recoverLoginSimple()  {
    // Garantir que a resposta sai sempre em formato JSON
    header("Content-Type: application/json");

    // Iniciar sessão para podermos guardar o código gerado temporariamente
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    // Capturar o JSON enviado pelo 'fetch' do JavaScript
    $inputData = json_decode(file_get_contents("php://input"), true);
    $email = $inputData['email'] ?? null;

    // 1. Validar se o email veio preenchido e é válido
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "status" => 400,
            "message" => "Por favor, insira um e-mail válido."
        ]);
        exit;
    }

    // 2. [OPCIONAL] Validar se o e-mail existe na base de dados antes de enviar o código
    $p['email'] = $email;
    $checkUser = $this->database->getData("SELECT `id` FROM `Escolas` WHERE `email` = :email LIMIT 1", $p);
    
    // Se não encontrar na tabela Escolas, podes tentar também na fctProfessores se for o caso
    if (empty($checkUser) || $checkUser[0]['numElements'] == 0) {
        // Se quiseres dar uma mensagem de erro caso o e-mail não exista:
        echo json_encode([
            "status" => 404,
            "message" => "Este e-mail não está registado no sistema."
        ]);
        exit;
    }

    // 3. Gerar o código de verificação numérico de 6 dígitos
    $codigoVerificacao = rand(100000, 900000);

    // 4. Guardar na sessão PHP para usar na validação do Passo 2
    $_SESSION['recover_email'] = $email;
    $_SESSION['recover_code'] = $codigoVerificacao;

    // 5. Configurar o e-mail
    $para = $email;
    $assunto = "Codigo de Recuperacao - Coleciona+";
    
    // Layout simples em HTML para o corpo do e-mail
    $mensagem = "
    <html>
    <head>
      <title>Recuperação de Password - Coleciona+</title>
    </head>
    <body style='font-family: Arial, sans-serif; color: #333; background-color: #f2f5f9; padding: 20px;'>
      <div style='max-width: 500px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);'>
        <h2 style='color: #003a8f; margin-bottom: 20px;'>Coleciona+</h2>
        <p>Olá,</p>
        <p>Pediste a recuperação da tua password. Utiliza o código de verificação abaixo para avançar no processo:</p>
        <div style='background: #f2f5f9; padding: 15px; text-align: center; font-size: 26px; font-weight: bold; letter-spacing: 3px; color: #003a8f; border-radius: 5px; margin: 25px 0; border: 1px id='e0e6ed';>
          $codigoVerificacao
        </div>
        <p style='font-size: 12px; color: #6c757d; margin-top: 30px;'>Se não fizeste este pedido, podes ignorar este e-mail com total segurança.</p>
      </div>
    </body>
    </html>
    ";

    // Headers necessários para enviar o e-mail como HTML legível e UTF-8
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Coleciona+ <no-reply@teudominio.com>" . "\r\n"; // Substitui pelo teu domínio quando fores para produção

    // 6. Enviar o e-mail de facto utilizando a função nativa do PHP
    if (mail($para, $assunto, $mensagem, $headers)) {
        echo json_encode([
            "status" => 200,
            "message" => "Código enviado com sucesso!"
        ]);
    } else {
        echo json_encode([
            "status" => 500,
            "message" => "Erro do servidor ao despachar o e-mail. Tente novamente."
        ]);
    }
    exit;
  }

  public function validaLogin()  {
    
    //header('location: ' . _CAMINHO_LOGIN . '?e=400');
    //exit;

    //verifica os campos obrigatórios
    //print_r($_REQUEST);

    if (!isset($_POST['user']) || !isset($_POST['passw'])) {
      header('location: ' . _CAMINHO_LOGIN . '?e=400');
      exit;
    } else {
      $user = $this->getUserByUserPass($_POST['user'], $_POST['passw'], false);
      //verifica se o user e pass existe na base de dados
      //echo "<br>Resultado da pesquisa na base de dados:<br>";
      //print_r(sizeof($user));
      //print_r($user);
      //exit;

      if ($user[0]['numElements'] > 0) {
        if($user[0]['TipoEscola'] ==2){
          $tipo="administrador";
        }else{
          $tipo="escola";
        }
        $aut = new Authentication();
        //setAuthentication($user, $name,$email, $foto, $id, $level=1)
        $aut->setAuthentication($user[0]['id'], $user[0]['nome'], $user[0]['email'], $user[0]['foto'], $user[0]['id'], $tipo);

        $this->database->setData("INSERT INTO login_logs (data_login) VALUES (NOW())", []);  //mudei para testar o grafico de barras, se ser errado apagar esta linha

        header("location: " . _CAMINHO_BACKEND);
        exit;
      } else {
        //o apy load não tem email
        //die('Problemas com a API da google');
        header('location: ' . _CAMINHO_LOGIN . '?e=401');
        exit;
      }
    }
  }


  public function getAutentication()
  {
    $aut = new Authentication();
    $aut->getAuthentication();
    echo $aut->webService();
  }

  public function logout()
  {
    $aut = new Authentication();
    $aut->logout();
  }


  public function error() {}
}