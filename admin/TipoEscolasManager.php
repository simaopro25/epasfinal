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
$table->setTitle("Distritos");

//select the table in the datebase
$table->prepareTable("TipoEscolas");
//SELECT `id`, `nome`, `localizacao`, `foto`, `telefone`, `email`, `TipoEscola`, `PaginaWeb`, `utilizador`, `password` FROM `Escolas` WHERE 1
//list of fields for list, new, edit and import records
$table->setFieldsAtive("id, Tipo",'list');
$table->setFieldsAtive("Tipo", 'new');
$table->setFieldsAtive("Tipo", 'edit');
$table->setFieldsAtive("Tipo", 'csv');

//define field name passw as a password, hidding the file 
//$table->setFieldPass("pass",0, "md5");

//define lists of values to supplay to a field
//$table->setFieldList("TipoEscola",1," SELECT `Id`, `Tipo` FROM `TipoEscolas` order by `Tipo`");
//$table->setFieldList("active",2,"1=>Active,0=>Inactive");

//the fiekd to be present as an image
//$table->setImageField("photo","../fotos/thumbs/",30);

//Link each record on the listo to external page passing the key value
//$table->setLinkPage("/public/perfil.php");

//Labels for fields
$table->setLabel('Tipo',"Distritos");
//$table->setLabel('nome',"Nome da Escola");
//$table->setLabel('pass',"Password");

//defines a criterion for the viewing action, where criterion is an sql (where) criterion that equals fields with values
//$table->setCriterio("type='Admin'");

//Allow multiple delections
//$table->setMultiple(true);

//Set a default value to a field
//$table->setDefaultValue('fielName',$value);

//Active debug mode
//$table->setDebugShow(true);

//Do what is necessary to maintain the table in an html page. Lists the data and allows you to insert new ones, edit and delete records. Use a 'do' parameter to make decisions
$table->showHTML();


?>
