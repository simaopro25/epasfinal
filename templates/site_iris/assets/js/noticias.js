//NOTICIAS

const renderizarEventos = (eventos) => {
  let strHtml = ``
  
  if (!eventos || eventos.length === 0) {
    const nomeCategoriaDinamica = (typeof noticiasGlobais !== 'undefined' && noticiasGlobais.length > 0 && noticiasGlobais[0].NomeCategoria) 
      ? noticiasGlobais[0].NomeCategoria 
      : "artigo";

    const nomeMinusculo = nomeCategoriaDinamica.toLowerCase().trim();
    
    const ePlural = nomeMinusculo.endsWith('s');
    const eFeminino = nomeMinusculo.endsWith('a') || nomeMinusculo.endsWith('as');
    
    let artigogenero = "nenhum";
    
    if (eFeminino) {
      artigogenero = ePlural ? "nenhumas" : "nenhuma";
    } else {
      if (ePlural) artigogenero = "nenhuns";
    }

    document.getElementById("eventosCard").innerHTML = `
      <div class="col-12 text-center my-5" data-aos="fade-up">
        <i class="bi bi-search text-muted" style="font-size: 3rem; opacity: 0.4;"></i>
        <p class="mt-3 text-muted fw-bold">Não encontrámos ${artigogenero} ${nomeMinusculo} com os critérios selecionados.</p>
      </div>`;
    return;
  }

  for (const dataRecord of eventos) {
    const local = dataRecord.local_evento ? dataRecord.local_evento : "Local a definir";
    
    const resumo = dataRecord.Texto && dataRecord.Texto.length > 450 
      ? dataRecord.Texto.substring(0, 450) + "..." 
      : (dataRecord.Texto || "Sem descrição disponível.");
    
    let nomeOriginal = dataRecord.nomeEscola || "Escola EPAS";
    const nomeAbreviado = nomeOriginal
      .replace("Agrupamento de Escolas", "A.E.")
      .replace("Escola Secundária", "E.S.")
      .replace("Escola Profissional", "E.P.");

    const fotoEscola = dataRecord.fotoEscola ? dataRecord.fotoEscola : "/public/assets/img/favicon.png";

    strHtml += `
      <div class="col-12" data-aos="fade-up">
        <div class="row align-items-center">
          <div class="col-lg-4 col-md-5">
            <div class="portfolio-item">
              <a href="${dataRecord.Imagem}" data-gallery="eventos-gallery" class="glightbox">
                <img src="${dataRecord.Imagem}" alt="Workshop">
              </a>
              <div class="event-date">${dataRecord.datacurta}</div>
              <div class="portfolio-info">
                <h4>${dataRecord.Titulo}</h4>
                <span class="event-school">
                  <i class="bi bi-geo-alt-fill"></i> ${local}
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-7">
            <div class="event-text">
              <h4 style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#myModal" onclick="readNoticiaModal(${dataRecord.ID})">${dataRecord.Titulo}</h4>
              <p class="text-justify">
                ${resumo}
              </p>
              
              <div style="margin-top: 20px; display: flex; align-items: center; justify-content: flex-end; gap: 12px;">
                <img src="${fotoEscola}" 
                     alt="Logo" 
                     style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <span style="color: #1d4ed8; font-weight: bold; font-size: 0.9rem;">${nomeAbreviado}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  document.getElementById("eventosCard").innerHTML = strHtml;
  
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  // GERAR O MODAL DINAMICAMENTE CASO ELE NÃO EXISTA NA PÁGINA
  if (!document.getElementById("myModal")) {
    const modalHtml = `
      <div class="modal fade" id="myModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="modal-title">A carregar...</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    <img id="modal-imagem" src="/templates/site_iris/assets/img/padrao/noticia.png" class="rounded img-fluid" style="width:100%; max-height:450px; object-fit:cover;">
                  </div>
                  <div class="col-md-12">
                    <br>
                    <p id="modal-texto" class="text-justify">Por favor, aguarde...</p>
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
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
}

const readNoticiaModal = async (id) => {
    document.getElementById("modal-title").innerHTML = "A carregar...";
    document.getElementById("modal-texto").innerHTML = "Por favor, aguarde...";
    
    const response = await fetch("/public/api/noticia/" + id)
    const data = await response.json()
    
    const dataRecord = Array.isArray(data) ? data[0] : data;
    
    if (dataRecord) {
      document.getElementById("modal-title").innerHTML = dataRecord.Titulo || "Sem título";
      document.getElementById("modal-texto").innerHTML = dataRecord.Texto || "Sem descrição disponível.";
      document.getElementById("modal-imagem").src = dataRecord.Imagem || "/templates/site_iris/assets/img/padrao/noticia.png";
    }
}

const readEventosEfetivo = async (cat, lim = "") => {
  const url = lim ? `/public/api/noticia/cat/${cat}/${lim}` : `/public/api/noticia/cat/${cat}`;
  try {
    const response = await fetch(url);
    const dataArray = await response.json();
    window.noticiasGlobais = dataArray; 
    renderizarEventos(dataArray);
  } catch (error) {
    console.error("Erro ao carregar os eventos:", error);
  }
}
  
const readTitulos = async (cat) => {
    let strHtml = ``
    const response = await fetch("/public/api/noticia/cat/" + cat)
    const dataArray = await response.json()
    for (const dataRecord of dataArray) {
      strHtml += `
        <h2>${dataRecord.Titulo}</h2>
        <p>${dataRecord.Texto}</p>
      `
    }
    const elem = document.getElementById("Noticias") || document.getElementById("Eventos");
    if (elem) elem.innerHTML = strHtml;
}
  
const readMenus = async (pai) => {
  try {
    const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/menu/" + pai);
    const dataArray = await response.json();
    
    let strHtml = `<ul>`;
    for (const dataRecord of dataArray) {
      strHtml += `<li><a href="${dataRecord.link}">${dataRecord.Opcao}</a></li>`;
    }
    strHtml += `</ul><i class="mobile-nav-toggle d-xl-none bi bi-list"></i>`;
    
    const navMenu = document.getElementById("navmenu");
    navMenu.innerHTML = strHtml;

    const toggle = navMenu.querySelector('.mobile-nav-toggle');
    
    toggle.addEventListener('click', function() {
      navMenu.classList.toggle('navmenu-active');
      document.body.classList.toggle('mobile-nav-active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });

    navMenu.querySelectorAll('ul a').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('navmenu-active')) {
          toggle.click();
        }
      });
    });

  } catch (error) {
    console.error("Erro ao carregar o menu:", error);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var phpCat = "<?php echo (isset($cat) && !empty($cat)) ? intval($cat) : 29; ?>";
  var categoriaId = parseInt(phpCat, 10) || 29;
  
  if (typeof readEventosEfetivo === "function") {
    // CORREÇÃO: Passado o número 5 como limite para a API
    readEventosEfetivo(categoriaId, 5);
  }
});


//############################################### Povoamento Inicial #################################################################################
readMenus(1);
readEventosEfetivo(29, 5); 
readTitulos(35);
// A chamada dinâmica do PHP foi removida daqui para evitar o SyntaxError. Chamá-la diretamente no HTML.