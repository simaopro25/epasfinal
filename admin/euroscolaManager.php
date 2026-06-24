<?php
//@session_start();
ini_set("error_reporting", E_ALL);

//require __DIR__ . '/../config.php';
//require __DIR__ . '/../autoload.php';
//require __DIR__ . '/../bootstrap.php';
use classes\authentication\Authentication;
//use classes\db\Database;
use classes\db\TableBD;

//echo $cat;

/* if(isset($cat)){
    $id=$cat;
}else {
    $id="36";
} */

$id=36;

//Create an object 
$table= new TableBD();

//Set the path for the html template
//$table->setTemplate(_CAMINHO_CLASSES . "/db/TableBD.html");
$table->setTemplate(_CAMINHO_TEMPLATE_ADMIN . "tables.html");



//Set title of the list
$table->setTitle("Euroscola");

//select the table in the datebase
$table->prepareTable("Noticias");
//SELECT `id`, `nome`, `localizacao`, `foto`, `telefone`, `email`, `TipoEscola`, `PaginaWeb`, `utilizador`, `password` FROM `Escolas` WHERE 1
//list of fields for list, new, edit and import records
$table->setFieldsAtive("Imagem, Titulo, Texto, local_evento, criador, ativacao", 'list');
$table->setFieldsAtive("Imagem, Titulo, Texto, local_evento, CodigoCategoria, criador, ativacao", 'new');
$table->setFieldsAtive("Imagem, Titulo, Texto, local_evento, CodigoCategoria, criador, ativacao", 'edit');
$table->setFieldsAtive("Imagem, Titulo, Texto, local_evento, CodigoCategoria, criador, ativacao", 'csv');

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
    }else{

    }
    //$table->setDefaultValue('criador',$a[0]['id']);
    //$table->setCriterio("criador=" . $a[0]['id']); 
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
        $table->setCriterio("criador',$a[0]['id']");
        $sql=" SELECT`id`,`nome` FROM `Escolas` where id=" . $a[0]['id']; 
        $sql2="SELECT `ID`, `Nome` FROM `Categoria` WHERE publico=1 OR CodigoEscola=".$a[0]['id']." order by `Nome`";
    }
    $table->setDefaultValue('criador',$a[0]['id']);
}

//define lists of values to supplay to a field
$table->setFieldList("CodigoCategoria",1,$sql2);
$table->setFieldList("criador",1,$sql);
//$table->setFieldList("active",2,"1=>Active,0=>Inactive");

//the fiekd to be present as an image
//$table->setImageField("Imagem","",80);
$table->setFieldUpload("Imagem","/home/epas/public_html/imagens/enviadas/",30,"PUT");

//Link each record on the listo to external page passing the key value
//$table->setLinkPage("/public/perfil.php");

//Labels for fields
$table->setLabel('CodigoCategoria',"Categoria");
$table->setLabel('nome',"Nome da Escola");
$table->setLabel('pass',"Password");
$table->setLabel('Texto', "Conteúdo/Resumo (Máx. 250 carateres)");
$table->setLabel('Imagem', "Imagem (Máx alt. 250PX, Máx. Peso 500KB)");
$table->setLabel('local_evento', "Link");
$table->setLabel('criador', "Criador");
$table->setLabel('ativacao', "Campo de Ativação");

//defines a criterion for the viewing action, where criterion is an sql (where) criterion that equals fields with values



//Allow multiple delections
//$table->setMultiple(true);

//Set a default value to a field
//$table->setDefaultValue('fielName',$value);

//Active debug mode
//$table->setDebugShow(true);

//Do what is necessary to maintain the table in an html page. Lists the data and allows you to insert new ones, edit and delete records. Use a 'do' parameter to make decisions
$table->showHTML();


?>
