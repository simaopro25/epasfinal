<?php
use app\ControllerMail ;


$mail = new ControllerMail();
$mail->sendMail("alf246@gmail.com", "Recuperação de Password", "Código de recuperação: teste em gmail "  );


?>