<?php
ini_set("error_reporting", E_ALL);
 
use classes\db\TableBD;
 
$table = new TableBD();
 
$table->setTemplate(_CAMINHO_TEMPLATE_ADMIN . "tables.html");
 
$table->setTitle("Embaixadores");
 
$table->prepareTable("Embaixadores");
 
$table->setFieldsAtive("id, nome, escola_id, tipo, ano, ativo", 'list');
$table->setFieldsAtive("nome, escola_id, tipo, ano, ativo", 'new');
$table->setFieldsAtive("nome, escola_id, tipo, ano, ativo", 'edit');
$table->setFieldsAtive("nome, escola_id, tipo, ano, ativo", 'csv');
 
$table->setFieldList("escola_id", 1, "SELECT `id`, `nome` FROM `Escolas` WHERE `confirmada`=1 ORDER BY `nome`");
$table->setFieldList("tipo", 2, "Senior=>Sénior,Junior=>Júnior");
$table->setFieldList("ativo", 2, "1=>Ativo,0=>Inativo");
 
$table->setLabel('nome', "Nome do Embaixador");
$table->setLabel('escola_id', "Escola");
$table->setLabel('tipo', "Tipo");
$table->setLabel('ano', "Ano");
$table->setLabel('ativo', "Estado");
 
$table->showHTML();
?>