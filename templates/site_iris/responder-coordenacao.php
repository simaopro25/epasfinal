<!DOCTYPE html>
<html lang="pt">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>Contactar Coordenação - EPAS PT</title>
  <meta name="description" content="Canal de contacto direto com a coordenação nacional do programa EPAS Portugal.">
  <meta name="keywords" content="Programa Escola Embaixadora do Parlamento Europeu EPAS contacto">

  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <link href="/templates/site_iris/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="/templates/site_iris/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="/templates/site_iris/assets/css/main.css" rel="stylesheet">
</head>

<body class="index-page">

  <header id="header" class="header d-flex align-items-center sticky-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center">

      <a href="index.php" class="logo d-flex align-items-center me-auto">
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

    <section id="contact" class="contact section">    
   
      <div class="container section-title" data-aos="fade-up">
        <h2>Resposta ao contacto</h2>
      </div><div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="row gy-4">

          <div class="col-lg-4">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-mensagem-tab" data-bs-toggle="tab" data-bs-target="#nav-mensagem" type="button" role="tab" aria-controls="nav-mensagem" aria-selected="true">Contacto</button>
              </div>
            </nav>
            
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-mensagem" role="tabpanel" aria-labelledby="nav-mensagem-tab">
                
                <form data-aos="fade-up" data-aos-delay="200" class="php-email-form">
                  <div class="row gy-4">

                    <div class="col-md-12">
                      <input type="text" name="nome" id="nome" class="form-control" placeholder="O seu Nome" disabled="">
                    </div>

                    <div class="col-md-12">
                      <input type="email" name="email" id="email" class="form-control" placeholder="O seu Email" disabled="">
                    </div>
                    
                    <div class="col-md-12">
                      <input type="tel" class="form-control" name="telefone" id="telefone" placeholder="O seu Telefone / Telemóvel" disabled="" maxlength="9">
                    </div>

                    <div class="col-md-12">
                      <input type="text" class="form-control" name="assunto" id="assunto" placeholder="Assunto da Mensagem" disabled="">
                    </div>

                    <div class="col-md-12">
                      <textarea class="form-control" name="mensagem" id="mensagem" placeholder="Escreva a sua mensagem aqui..." rows="6" disabled=""></textarea>
                    </div>


                  </div>
                </form>
              </div>

            </div>
            
          </div>
          <div class="col-lg-8">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-mensagem-tab" data-bs-toggle="tab" data-bs-target="#nav-mensagem" type="button" role="tab" aria-controls="nav-mensagem" aria-selected="true">Resposta</button>
              </div>
            </nav>
            
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-mensagem" role="tabpanel" aria-labelledby="nav-mensagem-tab">
                
                <form data-aos="fade-up" data-aos-delay="200" class="php-email-form">
                  <div class="row gy-4">
                      <input type="hidden" name="id" id="id" class="form-control" disabled="">
                      <input type="hidden" name="email_envio" id="email_envio" class="form-control" disabled="">
  
                    <div class="col-md-12">
                      <textarea class="form-control" name="resposta" id="resposta" placeholder="Resposta..." rows="12" required=""></textarea>
                    </div>

                    <div class="col-md-12">
                    <select name="estado" id="estado" class="form-control">
                      <option value="0">Por tratar</option>
                      <option value="1">A ser tratado</option>
                      <option value="2">Resolvido</option>
                    </select>
                    </div>

                    <div class="col-md-12 text-center">
                      <div class="loading">A carregar...</div>
                      <div class="error-message"></div>
                      <div class="sent-message">A sua mensagem foi enviada com sucesso. Obrigado!</div>

                      <button type="button" class="btn-getstarted" onclick="updateData()">Enviar Resposta</button>
                    </div>

                  </div>
                </form>
              </div>
              <div id="resp"></div>

            </div>
          </div>

        </div>

      </div>
   
    </section>

  </main>

  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <div id="preloader"></div>

  <script src="/templates/site_iris/assets/js/main3.js"></script>
  <script src="/templates/site_iris/assets/js/contactar-coordenacao.js"></script>
  <script src="/templates/site_iris/assets/js/responder-coordenacao.js"></script>

  <script>
   readContacto(<?=$id?>); 
  </script>

</body>
</html>