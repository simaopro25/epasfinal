<?php
//@session_start();
ini_set("error_reporting", E_ALL);

//require __DIR__ . '/../config.php';
//require __DIR__ . '/../autoload.php';
//require __DIR__ . '/../bootstrap.php';
//use classes\authentication\Authentication;
//use classes\db\Database;
use classes\db\TableBD;
use classes\authentication\Authentication;


//Create an object 
$table= new TableBD();

//Set the path for the html template
//$table->setTemplate(_CAMINHO_CLASSES . "/db/TableBD.html");
$table->setTemplate(_CAMINHO_TEMPLATE_ADMIN . "tables.html");


//Set title of the list
$table->setTitle("Escolas");

//select the table in the datebase
$table->prepareTable("Escolas");
//SELECT `id`, `nome`, `localizacao`, `foto`, `telefone`, `email`, `TipoEscola`, `PaginaWeb`, `utilizador`, `pass`, `confirmada`, `latitude`, `longitude` FROM `Escolas` WHERE 1
//list of fields for list, new, edit and import records
$table->setFieldsAtive("id, nome, telefone, email, TipoEscola, PaginaWeb",'list');
$table->setFieldsAtive("nome, localizacao, pais, foto, telefone, email,  PaginaWeb, utilizador,  latitude, longitude", 'new');
$table->setFieldsAtive("nome, localizacao, pais, foto, telefone, email,  PaginaWeb, utilizador,  latitude, longitude", 'edit');
$table->setFieldsAtive("nome, localizacao, foto, telefone, email,  PaginaWeb, utilizador,  latitude, longitude", 'csv');

//define field name passw as a password, hidding the file 
$table->setFieldPass("passw",0, "md5");

//define lists of values to supplay to a field
$table->setFieldList("TipoEscola",1," SELECT `Id`, `Tipo` FROM `TipoEscolas` order by `Tipo`");
$table->setFieldList("confirmada",2,"1=>Confirmada,0=>Por Confirmar");

//the fiekd to be present as an image
//$table->setImageField("foto","../imagens/escolas/",30);
$table->setFieldUpload("foto","/home/epas/public_html/imagens/escolas/","10%","PUT");

//Link each record on the listo to external page passing the key value
$table->setLinkPage("/public/perfil",2);

//Labels for fields
$table->setLabel('TipoEscola',"Distrito");
$table->setLabel('nome',"Nome da Escola");
$table->setLabel('passw',"Password");
$table->setLabel('localizacao',"Morada");
$table->setLabel('pais',"País");
$table->setLabel('foto',"Foto");
$table->setLabel('telefone',"Telefone");
$table->setLabel('email',"Email");
$table->setLabel('utilizador',"Utilizador");
$table->setLabel('confirmada',"Confirmação");
$table->setLabel('latitude',"Latitude");
$table->setLabel('longitude',"Longitude");

$aut=new Authentication();
$a=$aut->getAuthentication();

$user=$a[0]['id'];
//print_r($a);


//defines a criterion for the viewing action, where criterion is an sql (where) criterion that equals fields with values
$table->setCriterio("id=".$user);

//Allow multiple delections
//$table->setMultiple(true);

//Set a default value to a field
//$table->setDefaultValue('fielName',$value);

//Active debug mode
//$table->setDebugShow(true);

$table->setAutentication("e");

//Do what is necessary to maintain the table in an html page. Lists the data and allows you to insert new ones, edit and delete records. Use a 'do' parameter to make decisions
$table->showHTML();


?>
