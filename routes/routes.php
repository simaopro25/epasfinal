<?php
use src\Route as Route;
use classes\authentication\Authentication;

//Zona sem autenticação
Route::get('/', function(){require _CAMINHO_TEMPLATE. "index.html";});
Route::get('/old', function(){require _CAMINHO_TEMPLATE_OLD. "index.html";});
Route::get('/formulario', function(){require _CAMINHO_TEMPLATE. "formulario.html";});
Route::get('/workshop', function(){require _CAMINHO_TEMPLATE. "workshop.html";});
Route::get('/autores', function(){require _CAMINHO_TEMPLATE. "autores.html";});
Route::get('/formulario_aceite', function(){require _CAMINHO_TEMPLATE. "formulario_aceite.html";});
Route::get('/rede-epas', function(){require _CAMINHO_TEMPLATE. "redeEpas.html";});
Route::get('/eventos', function(){require _CAMINHO_TEMPLATE. "eventos.html";});
Route::get('/onepage', function(){require "../templates/onepage/index.html";});
Route::get('/login', function(){require _CAMINHO_TEMPLATE. "login.html";});
Route::get('/registar', function(){require _CAMINHO_TEMPLATE. "registar.html";});
Route::get('/perfil/{id}', function($id){require "../templates/site_iris/perfil2.html";});
Route::get('/falta', function(){require "../templates/site/em_falta.html";});
Route::get('/noticias', function(){require "../templates/site_iris/noticias.html";});
//Route::get('/todas_noticias/{cat}', function($cat){require "../templates/site_iris/verMais_noticias.php";});
Route::get('/todas_noticias/{cat}', function($cat){require "../templates/site_iris/verMais.php";});
Route::get('/recursos', function(){require "../templates/site_iris/recursos.html";});
//Route::get('/todos_eventos/{cat}', function($cat){require "../templates/site_iris/verMais_eventos.php";});
Route::get('/todos_eventos/{cat}', function($cat){require "../templates/site_iris/verMais.php";});
//Route::get('/todos_recursos/{cat}', function($cat){require "../templates/site_iris/verMais_recursos.php";});
Route::get('/todos_recursos/{cat}', function($cat){require "../templates/site_iris/verMais.php";});
Route::get('/escola/{cat}', function($cat){require "../templates/site_iris/escola.php";});
Route::get('/settings', function(){require "../templates/site/detalhes_escola.html";});
Route::get('/euroscola', function(){require "../templates/site_iris/euroscola.html";});
Route::get('/rede-unidos', function(){require "../templates/site_iris/redeUnidos.html";});
//Route::get('/todos_redes-unidos/{cat}', function($cat){require "../templates/site_iris/verMais_redeUnidos.php";});
Route::get('/todos_redes-unidos/{cat}', function($cat){require "../templates/site_iris/verMais.php";});
//Route::get('/todos_redes-unidos/{cat}', function($cat){require "../templates/site_iris/verMais_redeUnidos.php";});
Route::get('/recuperacao', function(){require "../templates/site_iris/recup_pass.html";});
Route::get('/enviar', function(){require "../templates/base/email-tester.php";});
//Route::get('/recuperacao_pass', function(){require "../templates/site_iris/recup_pass_pass_nova.html";});
//Route::get('/recuperar-password', function(){require _CAMINHO_TEMPLATE_ADMIN. "password-recover.html";});
Route::get('/contacto/coordenacao', function(){require "../templates/site_iris/contactar-coordenacao.html";});
Route::get('/contacto/sucesso', function(){require "../templates/site_iris/contacto-sucesso.html";});
Route::get('/contacto/responder/{id}', function($id){require "../templates/site_iris/responder-coordenacao.php";});
Route::get('/rede-unidos/VerMais', function(){require "../templates/site_iris/redeUnidos_verMais.html";});
Route::get('/teste', function(){require "../templates/site_iris/testemapas.html";});



//site de administração
Route::get('/admin', function(){require _CAMINHO_TEMPLATE_ADMIN. "index.html";}); 


//Route::get('/admin/escolas', function(){  require _CAMINHO_ADM. "escolasManager.php";});          //mostra todos os users
//Route::post('/admin/escolas', function(){  require _CAMINHO_ADM. "escolasManager.php";});
Route::get('/admin/escolas/ver', function(){  require _CAMINHO_ADM. "escolasVer.php";});          //mostra todos os users
Route::post('/admin/escolas/ver', function(){  require _CAMINHO_ADM. "escolasVer.php";});
Route::get('/admin/escolas/editar', function(){  require _CAMINHO_ADM. "escolasEditar.php";});          //mostra todos os users
Route::post('/admin/escolas/editar', function(){  require _CAMINHO_ADM. "escolasEditar.php";});
//Route::get('/admin/carrossel/link/{cat}', function($cat){  require _CAMINHO_ADM. "carrossel_linkManager.php";});          //mostra todos os users
//Route::post('/admin/carrossel/link/{cat}', function($cat){  require _CAMINHO_ADM. "carrossel_linkManager.php";});
//Route::get('/admin/carrossel/imagem/{cat}', function($cat){  require _CAMINHO_ADM. "carrossel_imagemManager.php";});          //mostra todos os users
//Route::post('/admin/carrossel/imagem/{cat}', function($cat){  require _CAMINHO_ADM. "carrossel_imagemManager.php";});
Route::put('/admin/carrossel/imagem/{cat}', function($cat){  require _CAMINHO_ADM. "carrossel_imagemManager.php";});
Route::put('/admin/escolas', function(){  require _CAMINHO_ADM. "escolasManager.php";});
//Route::get('/admin/tipo-escolas', function(){  require _CAMINHO_ADM. "TipoEscolasManager.php";});          
//Route::post('/admin/tipo-escolas', function(){  require _CAMINHO_ADM. "TipoEscolasManager.php";});
//Route::get('/admin/categorias', function(){  require _CAMINHO_ADM. "categoriasManager.php";});          
//Route::post('/admin/categorias', function(){  require _CAMINHO_ADM. "categoriasManager.php";});
Route::get('/admin/categorias/publicas', function(){  require _CAMINHO_ADM. "categoriasPublicasManager.php";});
Route::post('/admin/categorias/publicas', function(){  require _CAMINHO_ADM. "categoriasPublicasManager.php";});
//Route::get('/admin/menu', function(){  require _CAMINHO_ADM. "menuManager.php";});          
//Route::post('/admin/menu', function(){  require _CAMINHO_ADM. "menuManager.php";});

Route::get('/admin/noticias', function(){  require _CAMINHO_ADM. "noticiasManager.php";});          
Route::post('/admin/noticias', function(){  require _CAMINHO_ADM. "noticiasManager.php";});
Route::put('/admin/noticias', function(){  require _CAMINHO_ADM. "noticiasManager.php";});

Route::get('/admin/noticias/{cat}', function($cat){  require _CAMINHO_ADM. "noticiasManager.php";});          
Route::post('/admin/noticias/{cat}', function($cat){  require _CAMINHO_ADM. "noticiasManager.php";});
Route::put('/admin/noticias/{cat}', function($cat){  require _CAMINHO_ADM. "noticiasManager.php";});

Route::get('/admin/eventos', function(){  require _CAMINHO_ADM. "eventosManager.php";});          
Route::post('/admin/eventos', function(){  require _CAMINHO_ADM. "eventosManager.php";});
Route::put('/admin/eventos', function(){  require _CAMINHO_ADM. "eventosManager.php";});

Route::get('/admin/euroscola', function(){  require _CAMINHO_ADM. "euroscolaManager.php";});          
Route::post('/admin/euroscola', function(){  require _CAMINHO_ADM. "euroscolaManager.php";});
Route::put('/admin/euroscola', function(){  require _CAMINHO_ADM. "euroscolaManager.php";});

//Route::get('/admin/escolas-nao-confirmadas', function(){  require _CAMINHO_ADM. "escolasNaoConfirmadasManager.php";});          
//Route::post('/admin/escolas-nao-confirmadas', function(){  require _CAMINHO_ADM. "escolasNaoConfirmadasManager.php";});

Route::get('/admin/embaixadores', function(){ require _CAMINHO_ADM. "embaixadoresManager.php"; });
Route::post('/admin/embaixadores', function(){ require _CAMINHO_ADM. "embaixadoresManager.php"; });

//Route::get('/admin/contactos', function(){ require _CAMINHO_ADM. "contactoManager.php"; });
//Route::post('/admin/contactos', function(){ require _CAMINHO_ADM. "contactoManager.php"; });

Route::get('/admin/recursos/ficheiros/{id}', function($id){ require _CAMINHO_ADM. "FicheirosManager.php"; });
Route::post('/admin/recursos/ficheiros/{id}', function($id){ require _CAMINHO_ADM. "FicheirosManager.php"; });
Route::put('/admin/recursos/ficheiros/{id}', function($id){ require _CAMINHO_ADM. "FicheirosManager.php"; });

Route::get('/admin/recursos/{cat}', function($cat){ require _CAMINHO_ADM. "recursoManager.php"; });
Route::post('/admin/recursos/{cat}', function($cat){ require _CAMINHO_ADM. "recursoManager.php"; });
Route::put('/admin/recursos/{cat}', function($cat){ require _CAMINHO_ADM. "recursoManager.php"; });



//Autenticação

Route::get(['set' => '/autenticacao/getAutentication', 'as' => 'LoginSimples.getAutentication'], 'ControllerLoginSimples@getAutentication');
Route::get(['set' => '/autenticacao/logout', 'as' => 'LoginSimples.logout'], 'ControllerLoginSimples@logout');
Route::get(['set' => '/autenticacao/validacaoLogin', 'as' => 'LoginSimples.logout'], 'ControllerLoginSimples@validaLogin');
Route::post(['set' => '/autenticacao/validacaoLogin', 'as' => 'LoginSimples.logout'], 'ControllerLoginSimples@validaLogin');

Route::get(['set' => '/admin/recoverLoginSimple', 'as' => 'LoginSimples.recoverLogin'], 'ControllerLoginSimples@recoverLogin');
Route::post(['set' => '/admin/recoverLoginSimple', 'as' => 'LoginSimples.recoverLogin'], 'ControllerLoginSimples@recoverLogin');
Route::get(['set' => '/admin/recoverLoginSimple-s2', 'as' => 'LoginSimples.recoverLoginS2'], 'ControllerLoginSimples@recoverLoginS2');
Route::post(['set' => '/admin/recoverLoginSimple-s2', 'as' => 'LoginSimples.recoverLoginS2'], 'ControllerLoginSimples@recoverLoginS2');

//tabelas
//Route::get('/tabelas', function(){require _CAMINHO_TEMPLATE_ADMIN. "tables.html";});
//Route::get('/tabelasOLD', function(){require _CAMINHO_TEMPLATE_ADMIN. "tablesOLD.html";});
//Route::get('/tabelasteste', function(){require _CAMINHO_TEMPLATE_ADMIN. "tablesteste.html";});





//Route::get(['set' => '/base/index', 'as' => 'base.index'], 'Controller@index'); 
//Route::get(['set' => '/base/show/{id}', 'as' => 'base.show'], 'Controller@show'); 




//api menu
Route::get(['set' => '/api/menu/', 'as' => 'menu.getAll'], 'ControllerMenu@getAll');
Route::get(['set' => '/api/menu/matriz', 'as' => 'menu.getMenus'], 'ControllerMenu@getMenus');
Route::get(['set' => '/api/menu/contar', 'as' => 'contarMenus'], 'ControllerMenu@contarMenus');
Route::get(['set' => '/api/menu/{pai}', 'as' => 'menu.getByPai'], 'ControllerMenu@getByPai');



//api noticias
Route::get(['set' => '/api/noticia', 'as' => 'noticias.getAll'], 'ControllerNoticias@getAll');
Route::get(['set' => '/api/noticia/cat/{cat}', 'as' => 'noticias.getByCat'], 'ControllerNoticias@getByCat');
Route::get(['set' => '/api/noticia/cat/{cat}/{lim}', 'as' => 'noticias.getByCatLim'], 'ControllerNoticias@getByCatLim');
Route::get(['set' => '/api/noticia/{id}', 'as' => 'noticias.getById'], 'ControllerNoticias@getById');
Route::get(['set' => '/api/noticias', 'as' => 'contarNoticias'], 'ControllerNoticias@contarNoticias');
Route::get(['set' => '/api/noticias/contar', 'as' => 'contarNoticias.contarArtigos'], 'ControllerNoticias@contarArtigos');
Route::get(['set' => '/api/noticias/escola/{id}', 'as' => 'noticias.getByEscola'], 'ControllerNoticias@getByEscola');


//api escolas
Route::get(['set' => '/api/escolas', 'as' => 'contarEscolas.getAll'], 'ControllerEscolas@getAll');
Route::get(['set' => '/api/escolas/numero', 'as' => 'contarEscolas'], 'ControllerEscolas@contarEscolas');
Route::get(['set' => '/api/tipoescolas', 'as' => 'contarTipoEscolas'], 'ControllerEscolas@contarTipoEscolas');
Route::post(['set' => '/api/escolas', 'as' => 'contarcreate'], 'ControllerEscolas@create');
Route::get(['set' => '/api/localizacoes', 'as' => 'contarEscolas.getAllLocalizacoes'], 'ControllerEscolas@getAllLocalizacoes');
Route::get(['set' => '/api/escolas/paises', 'as' => 'escolas.porPais'], 'ControllerEscolas@getByPais');
Route::get(['set' => '/api/escolas/{id}', 'as' => 'escolas.getById'], 'ControllerEscolas@getByIdEscola');

Route::put(['set' => '/api/utilizadores/new-password', 'as' => 'loginSimple.updatePass'], 'ControllerLoginSimples@updatePass');



//api embaixadores
Route::get(['set' => '/api/embaixadores/seniores', 'as' => 'embaixadores.seniores'], 'ControllerEmbaixadores@contarSeniores');
Route::get(['set' => '/api/embaixadores/juniores', 'as' => 'embaixadores.juniores'], 'ControllerEmbaixadores@contarJuniores');
Route::get(['set' => '/api/embaixadores/contar', 'as' => 'embaixadores.contar'], 'ControllerEscolas@contarEmbaixadores');

//api contactos

Route::get(['set' => '/api/contactos', 'as' => 'contactos.getAll'], 'ControllerContacto@getAll');
Route::get(['set' => '/api/contactos/{id}', 'as' => 'contactos.getById'], 'ControllerContacto@getById');
Route::post(['set' => '/api/contactos', 'as' => 'contactos.create'], 'ControllerContacto@create');
Route::put(['set' => '/api/contactos', 'as' => 'contactos.update'], 'ControllerContacto@update');


//api ficheiros

Route::get(['set' => '/api/recursos/ficheiros', 'as' => 'recursos.getAll'], 'ControllerFicheiros@getAll');
Route::get(['set' => '/api/recursos/ficheiros/{id}', 'as' => 'recursos.getByRec'], 'ControllerFicheiros@getByRec');




//api categorias
Route::get(['set' => '/api/categorias', 'as' => 'contarCategorias'], 'ControllerCategorias@contarCategorias');



//api logs login
Route::get(['set' => '/api/loginsPorMes', 'as' => 'acessos.porMes'], 'ControllerLog@acessosPorMes');



//api general
/* Route::get(['set' => '/api/{table}', 'as' => 'tables.getAll'], 'ControllerTables@getAll');
Route::get(['set' => '/api/{table}/{id}', 'as' => 'tables.getById'], 'ControllerTables@getById');
Route::post(['set' => '/api/{table}', 'as' => 'tables.create'], 'ControllerTables@create');
Route::put(['set' => '/api/{table}', 'as' => 'tables.update'], 'ControllerTables@update');
Route::delete(['set' => '/api/{table}/{id}', 'as' => 'tables.delete'], 'ControllerTables@delete'); */

//Artigos
Route::get(['set' => '/artigos/numeros', 'as' => 'artigos.contarArtigos'], 'ControllerArtigos@contarArtigos');
Route::get(['set' => '/artigo/{id}/ver', 'as' => 'artigos.ArtigoVer'], 'ControllerArtigos@ArtigoVer');                      //web service
Route::get('/artigo/ver/{id}', function(){  require _CAMINHO_TEMPLATE1. "artigo.php";});          //ver artigo
Route::get('/artigo/ver/', function(){  require _CAMINHO_TEMPLATE1. "artigo.php";});          //ver artigo

//Users
Route::get(['set' => '/users/contar', 'as' => 'users.contarUsers'], 'ControllerUser@contarUsers'); 
Route::get(['set' => '/users/lista', 'as' => 'users.listOfUsers'], 'ControllerUser@listOfUsers');

//Autenticação
$aut=new Authentication();
if ($aut->isLoged()){
  //Zona com autenticação
  //Users
  //echo "<br><br><br> AQUI ".$aut->getLevel();

  if ($aut->getLevel()=="administrador"){
    Route::get('/admin/carrossel/link/{cat}', function($cat){  require _CAMINHO_ADM. "carrossel_linkManager.php";});          //mostra todos os users
    Route::post('/admin/carrossel/link/{cat}', function($cat){  require _CAMINHO_ADM. "carrossel_linkManager.php";});
    Route::get('/admin/carrossel/imagem/{cat}', function($cat){  require _CAMINHO_ADM. "carrossel_imagemManager.php";});          //mostra todos os users
    Route::post('/admin/carrossel/imagem/{cat}', function($cat){  require _CAMINHO_ADM. "carrossel_imagemManager.php";});
    Route::get('/admin/escolas', function(){  require _CAMINHO_ADM. "escolasManager.php";});          //mostra todos os users
    Route::post('/admin/escolas', function(){  require _CAMINHO_ADM. "escolasManager.php";});
    Route::get('/admin/tipo-escolas', function(){  require _CAMINHO_ADM. "TipoEscolasManager.php";});          
    Route::post('/admin/tipo-escolas', function(){  require _CAMINHO_ADM. "TipoEscolasManager.php";});
    Route::get('/admin/categorias', function(){  require _CAMINHO_ADM. "categoriasManager.php";});          
    Route::post('/admin/categorias', function(){  require _CAMINHO_ADM. "categoriasManager.php";});
    Route::get('/admin/menu', function(){  require _CAMINHO_ADM. "menuManager.php";});          
    Route::post('/admin/menu', function(){  require _CAMINHO_ADM. "menuManager.php";});
    Route::get('/admin/escolas-nao-confirmadas', function(){  require _CAMINHO_ADM. "escolasNaoConfirmadasManager.php";});          
    Route::post('/admin/escolas-nao-confirmadas', function(){  require _CAMINHO_ADM. "escolasNaoConfirmadasManager.php";});
    Route::get('/admin/contactos', function(){ require _CAMINHO_ADM. "contactoManager.php"; });
    Route::post('/admin/contactos', function(){ require _CAMINHO_ADM. "contactoManager.php"; });
  }else{
    Route::get('/admin/carrossel/link/{cat}', function(){  require _CAMINHO_ERROS. "erro401.php";});
    Route::get('/admin/carrossel/imagem/{cat}', function(){  require _CAMINHO_ERROS. "erro401.php";});
    Route::get('/admin/escolas', function(){  require _CAMINHO_ERROS. "erro401.php";});
    Route::get('/admin/tipo-escolas', function(){  require _CAMINHO_ERROS. "erro401.php";});
    Route::get('/admin/categorias', function(){  require _CAMINHO_ERROS. "erro401.php";});
    Route::get('/admin/menu', function(){  require _CAMINHO_ERROS. "erro401.php";});
    Route::get('/admin/escolas-nao-confirmadas', function(){  require _CAMINHO_ERROS. "erro401.php";});
    Route::get('/admin/contactos', function(){  require _CAMINHO_ERROS. "erro401.php";});
  }
  

  Route::get('/users', function(){  require _CAMINHO_ADMIN. "utilizadoresGere.php";});          //mostra todos os users
  Route::post('/users', function(){  require _CAMINHO_ADMIN. "utilizadoresGere.php";}); 
  
  //Artigos
  Route::get('/artigos', function(){  require _CAMINHO_ADMIN. "artigosGerir.php";});                //mostra os últimos artigos
  Route::post('/artigos', function(){  require _CAMINHO_ADMIN. "artigosGerir.php";});
  Route::post(['set' => '/artigo/add', 'as' => 'artigos.addArtigo'], 'ControllerArtigos@addArtigo'); 
  Route::get(['set' => '/artigo/add', 'as' => 'artigos.addArtigo'], 'ControllerArtigos@addArtigo'); 
}else{
  //echo "Não tem acesso";
  //header('Location: https://www.esmonserrate.org/public/semAcesso');
  //exit;
  Route::get('/{any}', function(){  require _CAMINHO_ERROS. "erro401.php";});
  Route::get('/{any}/{any}', function(){  require _CAMINHO_ERROS. "erro401.php";});
  Route::get('/{any}/{any}/{any}', function(){  require _CAMINHO_ERROS. "erro401.php";});
  Route::get('/{any}/{any}/{any}/{any}', function(){  require _CAMINHO_ERROS. "erro401.php";});
}

Route::get('/{any}', function(){  require _CAMINHO_ERROS. "erro404.php";});
Route::get('/{any}/{any}', function(){  require _CAMINHO_ERROS. "erro404.php";});
Route::get('/{any}/{any}/{any}', function(){  require _CAMINHO_ERROS. "erro404.php";});

?>
