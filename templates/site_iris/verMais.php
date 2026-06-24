<!DOCTYPE html>
<html lang="pt">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>EPAS PT</title>
  <meta name="description" content="O Programa Escola Embaixadora do Parlamento Europeu (EPAS) é uma iniciativa educativa da União Europeia que visa sensibilizar alunos do ensino secundário e profissional para a democracia, os valores europeus e o funcionamento das instituições da UE. Através de atividades práticas, o programa incentiva a participação activa e a cidadania europeia.">
  <meta name="keywords" content="Programa Escola Embaixadora do Parlamento Europeu EPAS cidadania europeia">

  <link href="/templates/site_iris/assets/img/favicon.png" rel="icon">
  <link href="/templates/site_iris/assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <link href="/templates/site_iris/assets/css/fontes.css" rel="stylesheet">

  <link href="/templates/site_iris/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="/templates/site_iris/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="/templates/site_iris/assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="/templates/site_iris/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="/templates/site_iris/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <link href="/templates/site_iris/assets/css/main.css" rel="stylesheet">
  <link href="/templates/site_iris/assets/css/inicio.css" rel="stylesheet">
  <link href="/templates/site_iris/assets/css/vermais.css" rel="stylesheet">
</head>

<body class="index-page" id="home">

  <header id="header" class="header d-flex align-items-center sticky-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center">
        <video class="logo-video" autoplay muted loop playsinline>
          <source src="/templates/site_iris/assets/videos/Video_logo_parlamento_branco.mp4" type="video/mp4">
        </video>
        <span class="sitename">EPAS PT</span>
      </a>

      <nav id="navmenu" class="navmenu">
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
    </div>
  </header>

  <main class="main">

    <section id="eventos" class="portfolio section"> 

      <div class="container section-title" data-aos="fade-up" id="Noticias">
        <h2>Eventos</h2>
        <p>Fica a conhecer as atividades realizadas pelas escolas EPAS.</p>
      </div>

      <div class="container">
        
        <div class="d-flex justify-content-end mb-2" data-aos="fade-up">
          <button onclick="toggleFiltros()" class="btn-lupa-discreta" id="btnSearchToggle" title="Pesquisar">
            <i class="bi bi-search"></i>
          </button>
        </div>

        <div class="search-wrapper mb-4" id="searchWrapper">
          <div class="search-filter-bar shadow-sm">
            <div class="row g-2 align-items-center">
              
              <div class="col-lg-5 col-md-12">
                <div class="input-group">
                  <span class="input-group-text bg-transparent border-end-0 text-muted">
                    <i class="bi bi-search azul-evento"></i>
                  </span>
                  <input type="text" id="searchTexto" class="form-control border-start-0 ps-0" placeholder="Pesquisar..." onkeyup="aplicarFiltros()">
                </div>
              </div>

              <div class="col-lg-3 col-md-5 col-sm-6">
                <div class="input-group">
                  <span class="input-group-text bg-transparent border-end-0 text-muted small-label">De:</span>
                  <input type="date" id="dataInicio" class="form-control border-start-0 ps-1" onchange="aplicarFiltros()">
                </div>
              </div>

              <div class="col-lg-3 col-md-5 col-sm-6">
                <div class="input-group">
                  <span class="input-group-text bg-transparent border-end-0 text-muted small-label">Até:</span>
                  <input type="date" id="dataFim" class="form-control border-start-0 ps-1" onchange="aplicarFiltros()">
                </div>
              </div>

              <div class="col-lg-1 col-md-2 col-12 text-end">
                <button onclick="limparFiltros()" class="btn btn-outline-secondary w-100 h-100 d-flex align-items-center justify-content-center btn-limpar" title="Limpar Filtros">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>

            </div>
          </div>
        </div>

        <div class="row gy-5" id="eventosCard">
          </div>
      </div>
    
    </section>

  </main>

<style>


</style>
  
  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <div id="preloader"></div>

  <script src="/templates/site_iris/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="/templates/site_iris/assets/vendor/aos/aos.js"></script>
  <script src="/templates/site_iris/assets/vendor/purecounter/purecounter_vanilla.js"></script>
  <script src="/templates/site_iris/assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="/templates/site_iris/assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="/templates/site_iris/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
  <script src="/templates/site_iris/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>

  <script src="/templates/site_iris/assets/js/main.js"></script>
  <script src="/templates/site_iris/assets/js/menus.js"></script>
  <script src="/templates/site_iris/assets/js/vermais.js"></script>

  <script>
    // Passa o valor do PHP para o JavaScript antes de carregar o script principal
    const categoriaId = <?php echo $cat; ?>; 
</script>
<script>
    // Agora chama a função usando a variável global
    readNoticias(categoriaId);
</script>

  <div class="modal fade" id="myModal">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Modal Titulo</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
       <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <img id="modal-imagem" src="/templates/site_iris/assets/img/padrao/noticia.png" class="rounded img-fluid" style="width:100%; max-height:450px; object-fit:cover;">
          </div>
          <div class="col-md-12">
            <br>
            <p id="modal-texto" class="text-justify">...</p>
          </div>
        </div>
       </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>

</body>
</html>