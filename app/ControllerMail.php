<?php

/**
 * @autores alf
 * @copyright 2026
 * @ver 2.0
 */


namespace app;

use src\Connection;
use vendor\phpmailer\phpmailer\src\PHPMailer;
use vendor\phpmailer\phpmailer\src\SMTP;
use vendor\phpmailer\phpmailer\src\Exception;

//require 'vendor/autoload.php'; // Ajuste o caminho conforme sua estrutura

class ControllerMail {
    private $conn;
    private $database;
    private $emissor = "epasptnaooficial@gmail.com"; // Seu email Gmail
    private $senha = "cdyy byxc qait pspy"; // Senha de app do Gmail
    private $noReplay = "nao-responder@epas.pt";
    private $sendOk = "Email enviado com sucesso!";
    private $sendFail = "Falha ao enviar email.";

    public function __construct() {
        $this->database = new Connection();
        $this->conn = $this->database->getConnection();
    }

    public function getMail() {
        $para = $_REQUEST['email'] ?? '';
        $assunto = $_REQUEST['assunto'] ?? '';
        $mensagem = $_REQUEST['mensagem'] ?? '';
        
        if(empty($para) || empty($assunto) || empty($mensagem)) {
            echo "Todos os campos são obrigatórios!";
            return;
        }
        
        $this->sendMail($para, $assunto, $mensagem);
    }

    public function sendMail($para, $assunto, $mensagem) {
        $mail = new PHPMailer(true);
        
        try {
            // Configurações do servidor SMTP do Gmail
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $this->emissor;
            $mail->Password = $this->senha;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // ou ENCRYPTION_SMTPS para SSL
            $mail->Port = 587; // TLS: 587, SSL: 465
            
            // Remetente e destinatário
            $mail->setFrom($this->emissor, 'Seu Nome');
            $mail->addAddress($para);
            $mail->addReplyTo($this->noReplay, 'Não Responder');
            
            // Conteúdo
            $mail->isHTML(true);
            $mail->Subject = $assunto;
            $mail->Body = nl2br($mensagem);
            $mail->AltBody = strip_tags($mensagem); // Versão texto puro
            
            $mail->send();
            //echo $this->sendOk;
            
        } catch (Exception $e) {
            echo "{$this->sendFail} Erro: {$mail->ErrorInfo}";
        }
    }
    
    // Restante dos métodos...
}
?>
