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
$table->setTitle("Ficheiros dos Recursos");

//select the table in the datebase
$table->prepareTable("Ficheiros");
//SELECT `id`, `ficheiro`, `idNoticia` FROM `Ficheiros` WHERE 1
//list of fields for list, new, edit and import records
$table->setFieldsAtive("id, titulo, ficheiro, idNoticia",'list');
$table->setFieldsAtive("titulo,ficheiro, idNoticia", 'new');
$table->setFieldsAtive(" titulo,ficheiro, idNoticia", 'edit');
$table->setFieldsAtive("titulo,ficheiro, idNoticia", 'csv');

//define field name passw as a password, hidding the file 
//$table->setFieldPass("passw",0, "md5");

//define lists of values to supplay to a field
$table->setFieldList("idNoticia",1,"SELECT `ID`,`Titulo` FROM `Noticias`  WHERE CodigoCategoria=32 order by `Titulo`");
//$table->setFieldList("confirmada",2,"1=>Confirmada,0=>Por Confirmar");

//the fiekd to be present as an image
//$table->setImageField("foto","../imagens/escolas/",30);
$table->setFieldUpload("ficheiro","/home/epas/public_html/ficheiros/",60,"PUT");

//Link each record on the listo to external page passing the key value
//$table->setLinkPage("/public/perfil",2);

//Labels for fields
$table->setLabel('idNoticia',"Recurso");
$table->setLabel('ficheiro',"Ficheiro");
/* $table->setLabel('passw',"Password");
$table->setLabel('localizacao',"Morada");
$table->setLabel('pais',"País");
$table->setLabel('foto',"Foto");
$table->setLabel('telefone',"Telefone");
$table->setLabel('email',"Email");
$table->setLabel('utilizador',"Utilizador");
$table->setLabel('confirmada',"Confirmação");
$table->setLabel('latitude',"Latitude");    
$table->setLabel('longitude',"Longitude"); */


//defines a criterion for the viewing action, where criterion is an sql (where) criterion that equals fields with values
$table->setCriterio("idNoticia=$id");

//Allow multiple delections
//$table->setMultiple(true);

//Set a default value to a field
$table->setDefaultValue('idNoticia',$id);

//Active debug mode
//$table->setDebugShow(true);

//$table->setAutentication("v");

//Do what is necessary to maintain the table in an html page. Lists the data and allows you to insert new ones, edit and delete records. Use a 'do' parameter to make decisions
$table->showHTML();


?>
