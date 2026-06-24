<?php
//@session_start();
ini_set("error_reporting", E_ALL);

//require __DIR__ . '/../config.php';
//require __DIR__ . '/../autoload.php';
//require __DIR__ . '/../bootstrap.php';
use classes\authentication\Authentication;
//use classes\db\Database;
use classes\db\TableBD;

//ID da categoria fixa conforme pedido
$id=24;

//Create an object 
$table= new TableBD();

//Set the path for the html template
$table->setTemplate(_CAMINHO_TEMPLATE_ADMIN . "tables.html");

//Set title of the list
$table->setTitle("Eventos");

//select the table in the datebase
$table->prepareTable("Noticias");

//list of fields for list, new, edit and import records
$table->setFieldsAtive("destaque, ativacao, Imagem, Titulo, Data, local_evento, criador", 'list');
$table->setFieldsAtive("Imagem, Titulo, Texto, Data, local_evento, CodigoCategoria, criador, ativacao, destaque", 'new');
$table->setFieldsAtive("Imagem, Titulo, Texto, Data, local_evento, CodigoCategoria, criador, ativacao, destaque", 'edit');
$table->setFieldsAtive("Imagem, Titulo, Texto, Data, local_evento, CodigoCategoria, criador, ativacao", 'csv');

//define field name passw as a password, hidding the file 
$table->setFieldPass("pass",0, "md5");

$aut=new Authentication();
$a=$aut->getAuthentication();

//admin
if ($a[0]['level']=="administrador"){
    //filtrar categoria
    if($id!=""){
        $table->setCriterio("CodigoCategoria=$id");
        $table->setDefaultValue('CodigoCategoria',$id);
    }
    $sql=" SELECT`id`,`nome` FROM `Escolas` order by nome"; 
    $sql2="SELECT `ID`, `Nome` FROM `Categoria` order by `Nome`";
    $table->setDefaultValue('criador',$a[0]['id']);
}else{
    //escola
    if($id!=""){
        $table->setCriterio("CodigoCategoria=$id and criador=".$a[0]['id']);
        $table->setDefaultValue('CodigoCategoria',$id);
        $sql=" SELECT`id`,`nome` FROM `Escolas` where id=" . $a[0]['id']; 
        $sql2="SELECT `ID`, `Nome` FROM `Categoria` WHERE publico=1 OR CodigoEscola=".$a[0]['id']." order by `Nome`";
    }else{
        $table->setCriterio("criador=" . $a[0]['id']);
        $sql=" SELECT`id`,`nome` FROM `Escolas` where id=" . $a[0]['id']; 
        $sql2="SELECT `ID`, `Nome` FROM `Categoria` WHERE publico=1 OR CodigoEscola=".$a[0]['id']." order by `Nome`";
    }
    $table->setDefaultValue('criador',$a[0]['id']);
}

//define lists of values to supplay to a field
$table->setFieldList("CodigoCategoria",1,$sql2);
$table->setFieldList("criador",1,$sql);

//Tradução de 0/1 para texto amigável
$table->setFieldList("ativacao", 2, "1=>Validado,0=>Pendente");
$table->setFieldList("destaque", 2, "1=>Sim,0=>Não");

//the fiekd to be present as an image
$table->setFieldUpload("Imagem","/home/epas/public_html/imagens/enviadas/",30,"PUT");

//Labels for fields
$table->setLabel('CodigoCategoria',"Categoria");
$table->setLabel('nome',"Nome da Escola");
$table->setLabel('pass',"Password");
$table->setLabel('Texto', "Conteúdo/Resumo (Máx. 250 carateres)");
$table->setLabel('Imagem', "Imagem (Máx alt. 250PX, Máx. Peso 500KB)");
$table->setLabel('local_evento', "Local");
$table->setLabel('criador', "Escola/Criador");
$table->setLabel('ativacao', "Estado (Visível no Site)");
$table->setLabel('destaque', "Destaque (Homepage)");

//Ativa data de hoje por defeito
$table->setDefaultValue('Data', date("Y-m-d"));

//Do what is necessary to maintain the table in an html page.
$table->showHTML();

?>