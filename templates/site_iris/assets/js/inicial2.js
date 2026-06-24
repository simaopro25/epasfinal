//apresenta uma noticia dado o seu id

const readNoticia = async (id, seccao) => {
    let strHtml = ``
    const response = await fetch("/public/api/noticia/"+id)
    const dataArray= await response.json()
    for (const dataRecord of dataArray) {
      strHtml += `
      <h2>${dataRecord.Titulo}</h2>
      <p>${dataRecord.Texto}</p>
                 `
    }
    //console.log(seccao)
    document.getElementById(seccao).innerHTML = strHtml;
}

const readCategoria = async (cat) => {
    let strHtml = ``
    const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/noticia/cat/"+cat)
    const dataArray= await response.json()
    for (const dataRecord of dataArray) {
      strHtml += `
      <div class="col-md-4" data-aos="zoom-out" data-aos-delay="100">
        <div class="icon-box">
          <h4>${dataRecord.Titulo}</h4>
          <p>
            ${dataRecord.Texto}
          </p>
        </div>
      </div>

                 `
    }
    document.getElementById("caixas").innerHTML = strHtml;
}

const readNoticiaslixo = async (cat) => {
    let strHtml = ``
    const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/noticia/cat/"+cat)
    const dataArray= await response.json()
    for (const dataRecord of dataArray) {
      strHtml += `
      <div class="row align-items-center mb-5" >
  
        <div class="col-lg-6 text-center" data-aos="zoom-in">
          <img 
            src="${dataRecord.Imagem}"
            class="img-fluid"
            alt="${dataRecord.Titulo}"
          >
        </div>
  
        <div class="col-lg-6" data-aos="fade-left">
          <h3>${dataRecord.Titulo}</h3>
          <p>
           ${dataRecord.Texto}
          </p>
        </div>
  
      </div>
                 `
    }
    document.getElementById("noticiasLista").innerHTML = strHtml;
}


//################################################## ler os testemunhos #######################################################################
const readTestemunhos = async (cat) => {
    let strHtml = ``
    const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/noticia/cat/"+cat)
    const dataArray= await response.json()
    for (const dataRecord of dataArray) {
      strHtml += `
      <div class="swiper-slide">
            <div class="testimonial-item" >
          <p>
            <i class=" bi bi-quote quote-icon-left"></i>
              <span>${dataRecord.Texto}</span>
              <i class="bi bi-quote quote-icon-right"></i>
              </p>
              <img src="${dataRecord.Imagem}" class="testimonial-img" alt="">
              <h3>${dataRecord.Titulo}</h3>
            </div>
          </div>

                 `
    }
    document.getElementById("Testemunhos").innerHTML = strHtml;
}
//################################################## ler os testemunhos #######################################################################



//################################################## ler Perguntas #######################################################################
const readPerguntas = async (cat) => {
let strHtml = '';
let active = "";
const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/noticia/cat/" + cat);
const dataArray = await response.json();

for (const dataRecord of dataArray) {
  strHtml += `
    <div class="faq-item${active}">
      <h3>${dataRecord.Titulo}</h3>
      <div class="faq-content">
        <p>${dataRecord.Texto}</p>
      </div>
      <i class="faq-toggle bi bi-chevron-right"></i>
    </div>
  `;
  active = "";
}

document.getElementById("Perguntas").innerHTML = strHtml;

// Re-inicializar os toggles do FAQ depois de inserir no DOM
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('faq-active');
  });
});
};



//################################################## ler Eventos #######################################################################
const readEventos = async (cat, lim) => {
  let strHtml = ``
  const response = await fetch("/public/api/noticia/cat/" + cat + "/" + lim)
  const dataArray = await response.json()
  let local = ""
  for (const dataRecord of dataArray) {
    //console.log(dataRecord.local_evento)
    local = ""
    if(dataRecord.local_evento !=null){
      local = '<i class="bi bi-geo-alt-fill"></i>' + dataRecord.local_evento;
    }
    
    const titulo = dataRecord.Titulo || "Sem título";
    const texto = dataRecord.Texto || "Sem descrição";
    const imagem = dataRecord.Imagem || "";
    const datacurta = dataRecord.datacurta || "--/--";
    
    resumo=texto.substring(0,450)+"..."
    
    // Lógica de abreviação
    let nomeOriginal = dataRecord.nomeEscola || "Escola EPAS";
    const nomeAbreviado = nomeOriginal
      .replace("Agrupamento de Escolas", "A.E.")
      .replace("Escola Secundária", "E.S.")
      .replace("Escola Profissional", "E.P.");

    // Foto da escola
    const fotoEscola = dataRecord.fotoEscola ? dataRecord.fotoEscola : "/public/assets/img/favicon.png";
    //txtReduzido = texto.substr(0,250) + (texto.length> 250?"...":"")
    strHtml += `
      <div class="col-12">
        <div class="row align-items-center">
          <div class="col-lg-4 col-md-5">
            <div class="portfolio-item">
              <a href="${imagem}" class="glightbox" data-gallery="eventos-gallery">
                <img src="${imagem}" class="img-fluid" alt="${titulo}">
              </a>
              <div class="event-date">${datacurta}</div>
              <div class="portfolio-info">
                <h4>${titulo}</h4>
                <span class="event-school">
                   ${local}
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-7">
            <div class="event-text">
              <h4 style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#myModal" onclick="readNoticiaModal(${dataRecord.ID})">${titulo}</h4>
              
              <p>${resumo}</p>

              <div style="margin-top: 20px; display: flex; align-items: center; justify-content: flex-end; gap: 12px;">
                <img src="${fotoEscola}" 
                     alt="Logo ${nomeAbreviado}" 
                     style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <span style="color: #007bff; font-weight: bold; font-size: 0.9rem;">${nomeAbreviado}</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    `
  }
  document.getElementById("eventosCard").innerHTML = strHtml;
}


//############################################### Video EPAS #################################################################################

const readVideo = async (cat, id_elemento) => {
const container = document.getElementById(id_elemento);
if (!container) return;

try {
const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/noticia/cat/" + cat);
const dataArray = await response.json();

if (dataArray && dataArray.length > 0) {
  // Pega os dados (com fallback para minúsculas ou texto padrão)

  // Injeta com as tags que o CSS "section-title" espera
  container.innerHTML = `
    <h2>${titulo}</h2>
    <p>${texto}</p>
  `;
}
} catch (error) {
console.error("Erro ao carregar os dados:", error);
}
}


        // function call
        //readAPI ();

        //############################################### Povoamento da Página #################################################################################

/* numEscolas();
numNoticias();
numSeniores();
numJuniores();
readNoticia(2,"primeira");
readNoticia(31,"redeEpas");
readNoticia(71,"epas_numeros");
readNoticia(68,"testemunhos");
readNoticia(4,"Eventos");
readNoticia(72,"PerguntasFreq"); 
readNoticia(73,"Contactos");
readNoticia(74,"EpasPortugal");
//readNoticia(75,"UsefulLinks");
readNoticia(76,"ourServices");
readNoticia(80,"morada"); 
readNoticia(83,"programa"); 
readNoticia(84,"embaixadora");
readNoticia(185,"contactenos");
//readVideo(46, "video_epas");
readCategoria(17);  
//TESTE
//readNoticia(32,"titulounidos");
readEventos(24,5);  
readTestemunhos(25);
readPerguntas(26);

 */




//ESCOLA.PHP

//################################################## ler Eventos #######################################################################
const readNoticias = async (cat, lim) => {
      let strHtml = ``
      const response = await fetch("/public/api/noticia/cat/"+cat+"/"+lim)
      const dataArray= await response.json()
      for (const dataRecord of dataArray) {
        strHtml += `
                  <div class="col-12">
            <div class="row align-items-center">
              <div class="col-lg-4 col-md-5">
                <div class="portfolio-item">
                  <a href="${dataRecord.Imagem}"
                     data-gallery="eventos-gallery">
                    <img src="${dataRecord.Imagem}"
                         alt="Workshop">
                  </a>
                  <div class="event-date">${dataRecord.datacurta}</div>
                  <div class="portfolio-info">
                    <h4>${dataRecord.Titulo}</h4>
                    <span class="event-school">Escola Secundária de Perre</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-7">
                <div class="event-text">
                  <h4>${dataRecord.Titulo}</h4>
                  <p>
                    ${dataRecord.Texto}
                  </p>
                </div>
              </div>
            </div>
          </div>
                   `
      }
      document.getElementById("eventosCard").innerHTML = strHtml;
}
//################################################## ler Eventos #######################################################################

const readTitulos = async (cat) => {
      let strHtml = ``
      const response = await fetch("/public/api/noticia/cat/"+cat)
      const dataArray= await response.json()
      for (const dataRecord of dataArray) {
        strHtml += `
                  <div class="container section-title" data-aos="fade-up" id="Eventos">
        <h2>${dataRecord.Titulo}</h2>
        <p>${dataRecord.Texto}</p>
      </div>
                   `
      }
      document.getElementById("Eventos").innerHTML = strHtml;
}



  const renderizarModal = () => {
  const modalHtml = `
    <div class="modal fade" id="myModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="modal-title">Modal Titulo</h4>
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
  `;

  // Cria um container temporário ou injeta diretamente no final do body
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Chamas a função no fim do teu script para ele aparecer na página:
renderizarModal();



