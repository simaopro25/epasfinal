// apresenta uma noticia dado o seu id

const readNoticia = async (id, seccao) => {
    let strHtml = ``;
    const response = await fetch("/public/api/noticia/" + id);
    const dataArray = await response.json();
    for (const dataRecord of dataArray) {
      strHtml += `
      <h2>${dataRecord.Titulo}</h2>
      <p>${dataRecord.Texto}</p>
                 `;
    }
    //console.log(seccao)
    const elem = document.getElementById(seccao);
    if (elem) elem.innerHTML = strHtml;
};

const readCategoria = async (cat) => {
    let strHtml = ``;
    const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/noticia/cat/" + cat);
    const dataArray = await response.json();
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

                 `;
    }
    const elem = document.getElementById("caixas");
    if (elem) elem.innerHTML = strHtml;
};

const readNoticiaslixo = async (cat) => {
    let strHtml = ``;
    const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/noticia/cat/" + cat);
    const dataArray = await response.json();
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
                 `;
    }
    const elem = document.getElementById("noticiasLista");
    if (elem) elem.innerHTML = strHtml;
};


//################################################## ler os testemunhos #######################################################################
const readTestemunhos = async (cat) => {
  let strHtml = ``;
  const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/noticia/cat/" + cat);
  const dataArray = await response.json();
  
  for (const dataRecord of dataArray) {
      // Verifica se o texto existe antes de tentar limitar para evitar erros
      const textoCompleto = dataRecord.Texto || "";
      const textoExibido = textoCompleto.length > 300 
          ? textoCompleto.substring(0, 300) + '...' 
          : textoCompleto;

      strHtml += `
        <div class="swiper-slide">
          <div class="testimonial-item" >
            <p>
              <i class=" bi bi-quote quote-icon-left"></i>
              <span>${textoExibido}</span>
              <i class="bi bi-quote quote-icon-right"></i>
            </p>
            <img src="${dataRecord.Imagem}" class="testimonial-img" alt="">
            <h3>${dataRecord.Titulo}</h3>
          </div>
        </div>
      `;
  }
  
  const elem = document.getElementById("Testemunhos");
  if (elem) elem.innerHTML = strHtml;
};
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

  const elem = document.getElementById("Perguntas");
  if (elem) elem.innerHTML = strHtml;

  // Re-inicializar os toggles do FAQ depois de inserir no DOM
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('faq-active');
    });
  });
};



//################################################## ler Eventos #######################################################################
//NOTICIAS

// Inicialização segura da variável global para evitar erros de validação
window.noticiasGlobais = window.noticiasGlobais || [];

const renderizarEventos = (eventos) => {
  let strHtml = ``;
  
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

    const elemCard = document.getElementById("eventosCard");
    if (elemCard) {
      elemCard.innerHTML = `
        <div class="col-12 text-center my-5" data-aos="fade-up">
          <i class="bi bi-search text-muted" style="font-size: 3rem; opacity: 0.4;"></i>
          <p class="mt-3 text-muted fw-bold">Não encontrámos ${artigogenero} ${nomeMinusculo} com os critérios selecionados.</p>
        </div>`;
    }
    return;
  }

  for (const dataRecord of eventos) {
    // Lógica do segundo bloco para tratamento do Local
    let local = "";
    if (dataRecord.local_evento != null && dataRecord.local_evento !== "") {
      local = '<i class="bi bi-geo-alt-fill"></i> ' + dataRecord.local_evento;
    } else {
      local = "Local a definir";
    }
    
    const titulo = dataRecord.Titulo || "Sem título";
    const texto = dataRecord.Texto || "Sem descrição";
    const imagem = dataRecord.Imagem || "";
    const datacurta = dataRecord.datacurta || "--/--";
    
    // Lógica de resumo corrigida (Adicionado 'const' para evitar erro de escopo)
    const resumo = texto.length > 450 ? texto.substring(0, 450) + "..." : texto;
    
    // Lógica de abreviação da escola
    let nomeOriginal = dataRecord.nomeEscola || "Escola EPAS";
    const nomeAbreviado = nomeOriginal
      .replace("Agrupamento de Escolas", "A.E.")
      .replace("Escola Secundária", "E.S.")
      .replace("Escola Profissional", "E.P.");

    // Foto da escola
    const fotoEscola = dataRecord.fotoEscola ? dataRecord.fotoEscola : "/public/assets/img/favicon.png";

    strHtml += `
      <div class="col-12" data-aos="fade-up">
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
              <p class="text-justify">${resumo}</p>

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
    `;
  }
  
  const elemCardFinal = document.getElementById("eventosCard");
  if (elemCardFinal) elemCardFinal.innerHTML = strHtml;
  
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
};

// FUNÇÃO PARA IR BUSCAR OS DADOS DA NOTÍCIA CLICADA AO BANCO DE DADOS
const readNoticiaModal = async (id) => {
    document.getElementById("modal-title").innerHTML = "A carregar...";
    document.getElementById("modal-texto").innerHTML = "Por favor, aguarde...";
    
    const response = await fetch("/public/api/noticia/" + id);
    const data = await response.json();
    
    const dataRecord = Array.isArray(data) ? data[0] : data;
    
    if (dataRecord) {
      document.getElementById("modal-title").innerHTML = dataRecord.Titulo || "Sem título";
      document.getElementById("modal-texto").innerHTML = dataRecord.Texto || "Sem descrição disponível.";
      document.getElementById("modal-imagem").src = dataRecord.Imagem || "/templates/site_iris/assets/img/padrao/noticia.png";
    }
};

// FUNÇÃO ATUALIZADA: Suporta chamadas com limite de forma limpa e flexível
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
};

// ALVO DO POVOAMENTO INICIAL: Atalho para que readEventos invoque a lógica correta sem falhar
const readEventos = async (cat, lim) => {
  await readEventosEfetivo(cat, lim);
};
  
const readTitulos = async (cat) => {
    let strHtml = ``;
    const response = await fetch("/public/api/noticia/cat/" + cat);
    const dataArray = await response.json();
    for (const dataRecord of dataArray) {
      strHtml += `
        <h2>${dataRecord.Titulo}</h2>
        <p>${dataRecord.Texto}</p>
      `;
    }
    const elem = document.getElementById("Noticias") || document.getElementById("Eventos");
    if (elem) elem.innerHTML = strHtml;
};
  
/* const readMenus = async (pai) => {
  try {
    const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/menu/" + pai);
    const dataArray = await response.json();
    
    let strHtml = `<ul>`;
    for (const dataRecord of dataArray) {
      strHtml += `<li><a href="${dataRecord.link}">${dataRecord.Opcao}</a></li>`;
    }
    strHtml += `</ul><i class="mobile-nav-toggle d-xl-none bi bi-list"></i>`;
    
    const navMenu = document.getElementById("navmenu");
    if (navMenu) {
      navMenu.innerHTML = strHtml;
      const toggle = navMenu.querySelector('.mobile-nav-toggle');
      if (toggle) {
        toggle.addEventListener('click', function() {
          navMenu.classList.toggle('navmenu-active');
          document.body.classList.toggle('mobile-nav-active');
          this.classList.toggle('bi-list');
          this.classList.toggle('bi-x');
        });
      }

      navMenu.querySelectorAll('ul a').forEach(link => {
        link.addEventListener('click', () => {
          if (navMenu.classList.contains('navmenu-active') && toggle) {
            toggle.click();
          }
        });
      });
    }

  } catch (error) {
    console.error("Erro ao carregar o menu:", error);
  }
}; */

//############################################### Povoamento Inicial #################################################################################
//readMenus(1);
readEventosEfetivo(29, 5); // Consome a API filtrando o limite de 5 diretamente
readTitulos(35);


  //################################################## ler noticias #######################################################################  
  const numNoticias = async () => {
    const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/noticias");
    const dataArray = await response.json();
    const elem = document.getElementById("numNoticias");
    if (elem && dataArray[0]) elem.setAttribute("data-purecounter-end", dataArray[0].numNoticias);
};

//############################################### Contar Escolas #################################################################################

const numEscolas = async () => {
  const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/escolas/numero");
  const dataArray = await response.json();
  const elem = document.getElementById("numEscolas");
  if (elem && dataArray[0]) elem.setAttribute("data-purecounter-end", dataArray[0].numEscolas);
};

//############################################### Contar embaixadores seniores #################################################################统计

const numSeniores = async () => {
  const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/embaixadores/seniores");
  const dataArray = await response.json();
  const elem = document.getElementById("numSeniores");
  if (elem && dataArray[0]) elem.setAttribute("data-purecounter-end", dataArray[0].total);
};

//############################################### Contar embaixadores juniores #################################################################################

const numJuniores = async () => {
  const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/embaixadores/juniores");
  const dataArray = await response.json();
  const elem = document.getElementById("numJuniores");
  if (elem && dataArray[0]) elem.setAttribute("data-purecounter-end", dataArray[0].total);
};

//############################################### Video EPAS #################################################################################

const readVideo = async (cat, id_elemento) => {
  const container = document.getElementById(id_elemento);
  if (!container) return;

  try {
    const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/noticia/cat/" + cat);
    const dataArray = await response.json();

    if (dataArray && dataArray.length > 0) {
      // CORREÇÃO: Extração correta das variáveis vindas da API para evitar crash de 'not defined'
      const titulo = dataArray[0].Titulo || "Sem título";
      const texto = dataArray[0].Texto || "Sem descrição";

      container.innerHTML = `
        <h2>${titulo}</h2>
        <p>${texto}</p>
      `;
    }
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
};


        // function call
        //readAPI ();

 
//ESCOLA.PHP

//################################################## ler Eventos #######################################################################
const readNoticias = async (cat, lim) => {
      let strHtml = ``;
      const response = await fetch("/public/api/noticia/cat/" + cat + "/" + lim);
      const dataArray = await response.json();
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
                   `;
      }
      const elem = document.getElementById("eventosCard");
      if (elem) elem.innerHTML = strHtml;
};


//################################################## ler Carrossel #######################################################################
const readCarrossel = async (cat) => {
  let strHtml = ``;
  let ativo="active"
  const response = await fetch("/public/api/noticia/cat/" + cat);
  const dataArray = await response.json();
  for (const dataRecord of dataArray) {
    strHtml += `
        <div class="carousel-item ${ativo}">
          <img src="${dataRecord.Imagem}" class="d-block w-100">
        </div>
               `;
    ativo=""
  }
  const elem = document.getElementById("carrosselFotos");
  if (elem) elem.innerHTML = strHtml;
};
//################################################## ler Eventos #######################################################################

const readTitulosEscola = async (cat) => {
      let strHtml = ``;
      const response = await fetch("/public/api/noticia/cat/" + cat);
      const dataArray = await response.json();
      for (const dataRecord of dataArray) {
        strHtml += `
              <div class="container section-title" data-aos="fade-up" id="Eventos">
        <h2>${dataRecord.Titulo}</h2>
        <p>${dataRecord.Texto}</p>
      </div>
                   `;
      }
      const elem = document.getElementById("Eventos");
      if (elem) elem.innerHTML = strHtml;
};

 // --- MAPA PORTUGAL ---

    const inicializarMapas = async () => {
        // 1. Mapa Portugal
        try {
            const respPT = await fetch("https://epas.alunos.esmonserrate.org/public/api/escolas");
            const dataPT = await respPT.json();
            
            const mapPT = L.map('mapPortugal', {
                maxBounds: L.latLngBounds([30.0, -32.0], [43.0, -6.0]),
                maxBoundsViscosity: 1.0
            });
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapPT);
            mapPT.fitBounds(L.latLngBounds([32.3, -31.3], [42.2, -6.1]));
            
            dataPT.forEach(e => {
                L.marker([e.latitude, e.longitude]).addTo(mapPT).bindPopup(e.nome);
            });
        } catch (e) { console.error("Erro mapa PT:", e); }

        // 2. Mapa UE+UK (Categoria 47)
        try {
            const respUE = await fetch("https://epas.alunos.esmonserrate.org/public/api/noticia/cat/47");
            const dataUE = await respUE.json();
            
            const mapUE = L.map('mapUE');
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapUE);
            
            // Verifica se a API devolveu algo
            if (dataUE && dataUE.length > 0 && dataUE[0].Texto) {
                // Limpeza: Remove quebras de linha e converte aspas simples em duplas para JSON válido
                let raw = dataUE[0].Texto.replace(/\n/g, "").replace(/'/g, '"');
                const escolasUE = JSON.parse(raw);
                
                escolasUE.forEach(e => {
                    L.marker([e.lat, e.lon]).addTo(mapUE).bindPopup(e.nome);
                });
                
                // Ajusta o zoom para os pins
                const bounds = L.latLngBounds(escolasUE.map(e => [e.lat, e.lon]));
                mapUE.fitBounds(bounds);
            } else {
                mapUE.setView([54, 15], 4);
            }
        } catch (e) { 
            console.error("Erro mapa UE (cat 47):", e);
            document.getElementById('mapUE').innerHTML = '<p class="text-danger p-3">Erro ao carregar dados. Verifica o formato no painel de admin.</p>';
        }
    };

    window.onload = inicializarMapas;




/*  const isMobile = window.innerWidth <= 768;
 const mapPortugal = L.map('mapPortugal', {
   dragging: !isMobile, zoomControl: false, scrollWheelZoom: !isMobile,
   doubleClickZoom: false, boxZoom: false, keyboard: false, touchZoom: false
 }).setView([39.5, -8.0], 6);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapPortugal);

fetch("https://epas.alunos.esmonserrate.org/public/api/escolas")
 .then(r => r.json())
 .then(escolas => {
   escolas.forEach(e => {
     if (e.latitude && e.longitude) {
       L.marker([e.latitude, e.longitude])
         .addTo(mapPortugal)
         .bindPopup(`
           <b>${e.nome}</b><br>
           📍 ${e.localizacao}<br>
           <a href="/public/perfil/${e.id}" style="color: #003399; text-decoration: none;">Ver mais</a>
         `);
     }
   });
 });

 // --- MAPA UNIÃO EUROPEIA ---
 
 let mapUE;

 const readMapaUE = async () => {
   mapUE = L.map('mapUE', {
     dragging: !isMobile, zoomControl: false, scrollWheelZoom: !isMobile,
     doubleClickZoom: false, boxZoom: false, keyboard: false, touchZoom: false
   }).setView([54, 15], 4);
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapUE);

   const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/escolas/paises");
   const dataArray = await response.json();

   const coordenadas = {
     "Portugal":      { lat: 39.5,  lon: -8.0  },
     "Espanha":       { lat: 40.0,  lon: -4.0  },
     "França":        { lat: 46.5,  lon: 2.0   },
     "Alemanha":      { lat: 51.0,  lon: 10.0  },
     "Itália":        { lat: 42.8,  lon: 12.8  },
     "Bélgica":       { lat: 50.8,  lon: 4.0   },
     "Países Baixos": { lat: 52.2,  lon: 5.3   },
     "Luxemburgo":    { lat: 49.8,  lon: 6.1   },
     "Irlanda":       { lat: 53.0,  lon: -8.0  },
     "Dinamarca":     { lat: 56.0,  lon: 10.0  },
     "Suécia":        { lat: 60.0,  lon: 15.0  },
     "Finlândia":     { lat: 64.0,  lon: 26.0  },
     "Áustria":       { lat: 47.5,  lon: 14.5  },
     "Polónia":       { lat: 52.0,  lon: 19.0  },
     "Chéquia":       { lat: 49.8,  lon: 15.5  },
     "Eslováquia":    { lat: 48.7,  lon: 19.3  },
     "Hungria":       { lat: 47.0,  lon: 19.0  },
     "Roménia":       { lat: 46.0,  lon: 25.0  },
     "Bulgária":      { lat: 42.7,  lon: 25.5  },
     "Grécia":        { lat: 39.0,  lon: 22.0  },
     "Croácia":       { lat: 45.1,  lon: 15.2  },
     "Eslovénia":     { lat: 46.1,  lon: 14.8  },
     "Letónia":       { lat: 57.0,  lon: 25.0  },
     "Lituânia":      { lat: 55.0,  lon: 24.0  },
     "Estónia":       { lat: 59.0,  lon: 26.0  },
     "Chipre":        { lat: 35.0,  lon: 33.0  },
     "Malta":         { lat: 35.9,  lon: 14.5  },
     "Reino Unido":   { lat: 54.0,  lon: -2.0  }
   };

   const paises = dataArray.filter(e => e.pais);
   paises.forEach(e => {
     const coord = coordenadas[e.pais];
     if (coord) {
       L.marker([coord.lat, coord.lon])
         .addTo(mapUE)
         .bindPopup(`<b>${e.pais}</b><br>${e.numEscolas} escola(s)`);
     }
   });
 }; // ← fechar a função readMapaUE

 // --- REDIMENSIONAMENTO ---
 function resizeMaps() {
   if (mapPortugal) mapPortugal.invalidateSize();
   if (mapUE) mapUE.invalidateSize();
 }
 window.addEventListener('resize', resizeMaps);

 readMapaUE(); // ← chamar a função aqui fora */

 

       //############################################### Povoamento da Página #################################################################################

       numEscolas();
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
       //readVideo(46, "video_epas");
       readCategoria(17);  
       //TESTE
       //readNoticia(32,"titulounidos");
       readEventos(24,5);  
       readTestemunhos(25);
       readPerguntas(26);
       readCarrossel(37)
       