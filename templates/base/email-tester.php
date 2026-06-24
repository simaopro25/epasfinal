<?php
use app\ControllerMail;


$controller = new ControllerMail();
$controller->sendMail("simaogoncalves025@gmail.com", "Teste de email", "o corpo está funcionando");


?>
