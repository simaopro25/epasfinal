<?php
//@session_start();
ini_set("error_reporting", E_ALL);

//require __DIR__ . '/../config.php';
//require __DIR__ . '/../autoload.php';
//require __DIR__ . '/../bootstrap.php';
use classes\authentication\Authentication;
//use classes\db\Database;
use classes\db\TableBD;

if(isset($cat)){
    $id=$cat;
}else {
    $id="";
}

//Create an object 
$table= new TableBD();

//Set the path for the html template
$table->setTemplate(_CAMINHO_TEMPLATE_ADMIN . "tables.html");

//Set title of the list
$table->setTitle("Recursos");

//select the table in the datebase
$table->prepareTable("Noticias");

// ======================================================================
// CONFIGURAÇÃO DOS CAMPOS: Data removida dos formulários visuais
// ======================================================================
$table->setFieldsAtive("ID, Imagem, Titulo, Data, CodigoCategoria", 'list');
$table->setFieldsAtive("Imagem, Titulo, Texto, CodigoCategoria, criador, ativacao", 'new');
$table->setFieldsAtive("Imagem, Titulo, Texto, CodigoCategoria, criador, ativacao", 'edit');
$table->setFieldsAtive("Imagem, Titulo, Texto, CodigoCategoria, criador, ativacao", 'csv');

//define field name passw as a password, hidding the file 
//$table->setFieldPass("pass",0, "md5");

$aut=new Authentication();
$a=$aut->getAuthentication();

$sql2="SELECT `ID`, `Nome` FROM `Categoria` where ID=$id ";
//admin
if ($a[0]['level']=="administrador"){
    //filtrar categoria
    if($id!=""){
        $table->setCriterio("CodigoCategoria=$id");
        $table->setDefaultValue('CodigoCategoria',$id);
    }
    $sql=" SELECT`id`,`nome` FROM `Escolas` order by nome"; 
    //$sql2="SELECT `ID`, `Nome` FROM `Categoria` order by `Nome`";
    $table->setDefaultValue('criador',$a[0]['id']);
}else{
    //escola
    if($id!=""){
        $table->setCriterio("CodigoCategoria=$id and criador=".$a[0]['id']);
        $table->setDefaultValue('CodigoCategoria',$id);
        $sql=" SELECT`id`,`nome` FROM `Escolas` where id=" . $a[0]['id']; 
       // $sql2="SELECT `ID`, `Nome` FROM `Categoria` WHERE publico=1 OR CodigoEscola=".$a[0]['id']." order by `Nome`";
    }else{
        $table->setCriterio("criador=" . $a[0]['id']);
        $sql=" SELECT`id`,`nome` FROM `Escolas` where id=" . $a[0]['id']; 
        //$sql2="SELECT `ID`, `Nome` FROM `Categoria` WHERE publico=1 OR CodigoEscola=".$a[0]['id']." order by `Nome`";
    }
    $table->setDefaultValue('criador',$a[0]['id']);
}

//define lists of values to supplay to a field
$table->setFieldList("CodigoCategoria",1,$sql2);
$table->setFieldList("criador",1,$sql);


//Link each record on the listo to external page passing the key value
$table->setLinkPage("/public/admin/recursos/ficheiros",2);

// =========================================================================

//the field to be present as an image
$table->setFieldUpload("Imagem","/home/epas/public_html/imagens/enviadas/","20%","PUT");

//Labels for fields
$table->setLabel('CodigoCategoria',"Categoria");
$table->setLabel('nome',"Nome da Escola");
$table->setLabel('pass',"Password");
$table->setLabel('Texto', "Conteúdo/Resumo (Máx. 250 carateres)");
$table->setLabel('Imagem', "Imagem (Máx alt. 250PX, Máx. Peso 500KB)");
$table->setLabel('local_evento', "Local");
$table->setLabel('criador', "Criador");

// ======================================================================
// FORÇAR ATUALIZAÇÃO DA DATA: Garante data/hora automáticas no SAVE
// ======================================================================
$table->setDefaultValue('Data', date("Y-m-d H:i:s"));

$table->setSummernote(FALSE);

//Do what is necessary to maintain the table in an html page.
$table->showHTML();

?>