<?php
//@session_start();
ini_set("error_reporting", E_ALL);

//require __DIR__ . '/../config.php';
//require __DIR__ . '/../autoload.php';
//require __DIR__ . '/../bootstrap.php';
//use classes\authentication\Authentication;
//use classes\db\Database;
use classes\db\TableBD;


//Create an object 
$table= new TableBD();

//Set the path for the html template
//$table->setTemplate(_CAMINHO_CLASSES . "/db/TableBD.html");
$table->setTemplate(_CAMINHO_TEMPLATE_ADMIN . "tables.html");


//Set title of the list
$table->setTitle("Contactos");

//select the table in the datebase
$table->prepareTable("contactos");
//SELECT `id`, `nome`, `email`, `telefone`, `assunto`, `mensagem`, `resposta_texto`, `estado`, `data_criacao`, `data_resposta` FROM `contactos` WHERE 1
//list of fields for list, new, edit and import records
$table->setFieldsAtive("id, nome, telefone, email, assunto, estado, data_criacao",'list');
$table->setFieldsAtive("nome, telefone, email, assunto, mensagem, resposta_texto, estado", 'new');
$table->setFieldsAtive("nome, telefone, email, assunto, mensagem, resposta_texto, estado", 'edit');
$table->setFieldsAtive("nome, telefone, email, assunto, mensagem, resposta_texto, estado", 'csv');

//define field name passw as a password, hidding the file 
//$table->setFieldPass("passw",0, "md5");

//define lists of values to supplay to a field
//$table->setFieldList("TipoEscola",1," SELECT `Id`, `Tipo` FROM `TipoEscolas` order by `Tipo`");
$table->setFieldList("estado",2,"2=>Resolvido,1=>A ser tratado,0=>Por tratar");

//the fiekd to be present as an image
//$table->setImageField("foto","../imagens/escolas/",30);
//$table->setFieldUpload("foto","/home/epas/public_html/imagens/escolas/",60,"PUT");

//Link each record on the listo to external page passing the key value
$table->setLinkPage("/public/contacto/responder",2);

//Labels for fields
//$table->setLabel('TipoEscola',"Distrito");
$table->setLabel('nome',"Nome");
//$table->setLabel('passw',"Password");
//$table->setLabel('localizacao',"Morada");
//$table->setLabel('pais',"País");
//$table->setLabel('foto',"Foto");
$table->setLabel('telefone',"Telefone");
$table->setLabel('email',"Email");
$table->setLabel('assunto',"Assunto");
$table->setLabel('estado',"Estado");
$table->setLabel('mensagem',"Mensagem");
$table->setLabel('resposta_texto',"Resposta");
$table->setLabel('data_criacao',"Data");
$table->setLabel('id',"ID");

//defines a criterion for the viewing action, where criterion is an sql (where) criterion that equals fields with values
//$table->setCriterio("type='Admin'");

//Allow multiple delections
//$table->setMultiple(true);

//Set a default value to a field
//$table->setDefaultValue('fielName',$value);

//Active debug mode
//$table->setDebugShow(true);

$table->setAutentication("v");

//Do what is necessary to maintain the table in an html page. Lists the data and allows you to insert new ones, edit and delete records. Use a 'do' parameter to make decisions
$table->showHTML();


?>
