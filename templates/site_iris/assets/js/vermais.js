let noticiasGlobais = [];

//########################################### Abrir/Fechar Painel de Pesquisa ############################################
const toggleFiltros = () => {
  const wrapper = document.getElementById("searchWrapper");
  const btn = document.getElementById("btnSearchToggle");
  
  wrapper.classList.toggle("open");
  btn.classList.toggle("active");
  
  if (!wrapper.classList.contains("open")) {
    limparFiltros();
  } else {
    setTimeout(() => { document.getElementById("searchTexto").focus(); }, 200);
  }
}

//################################################## ler Eventos #######################################################################
const readNoticias = async (cat) => {
  const response = await fetch("/public/api/noticia/cat/" + cat)
  noticiasGlobais = await response.json()
  
  if(noticiasGlobais.length > 0) {
     let catNome = noticiasGlobais[0].NomeCategoria;
     
     // Atualiza o Título H2 da Secção
     document.getElementById("Noticias").innerHTML = `
        <h2>${catNome}</h2>
        <p>Fica a conhecer as atividades realizadas pelas escolas EPAS.</p>
     `;

     // Atualiza o title da lupa (Ex: "Pesquisar Eventos")
     const btnLupa = document.getElementById("btnSearchToggle");
     if(btnLupa) {
        btnLupa.setAttribute("title", `Pesquisar ${catNome}`);
     }

     // NOVA LÓGICA: Atualiza dinamicamente o placeholder da caixa de texto (Ex: "Pesquisar por eventos...")
     const inputTexto = document.getElementById("searchTexto");
     if(inputTexto) {
        inputTexto.setAttribute("placeholder", `Pesquisar por ${catNome.toLowerCase()}...`);
     }
  }
  
  renderizarEventos(noticiasGlobais);
}

//################################################## Renderizar HTML dos Cards #########################################################
const renderizarEventos = (eventos) => {
  let strHtml = ``
  
  if (eventos.length === 0) {
    const nomeCategoriaDinamica = (noticiasGlobais.length > 0 && noticiasGlobais[0].NomeCategoria) 
      ? noticiasGlobais[0].NomeCategoria 
      : "artigo";

    const nomeMinusculo = nomeCategoriaDinamica.toLowerCase().trim();
    
    const ePlural = nomeMinusculo.endsWith('s');
    const eFeminino = nomeMinusculo.endsWith('a') || nomeMinusculo.endsWith('as');
    
    let artigoGenero = "nenhum";
    
    if (eFeminino) {
      artigoGenero = ePlural ? "nenhumas" : "nenhuma";
    } else {
      if (ePlural) artigoGenero = "nenhuns";
    }

    document.getElementById("eventosCard").innerHTML = `
      <div class="col-12 text-center my-5" data-aos="fade-up">
        <i class="bi bi-search text-muted" style="font-size: 3rem; opacity: 0.4;"></i>
        <p class="mt-3 text-muted fw-bold">Não encontrámos ${artigoGenero} ${nomeMinusculo} com os critérios selecionados.</p>
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
  GLightbox({ selector: '.glightbox' });
}

//########################################### Filtro Dinâmico Combinado (Texto + Datas) ################################################
const aplicarFiltros = () => {
  const termo = document.getElementById("searchTexto").value.toLowerCase().trim();
  const deStr = document.getElementById("dataInicio").value;
  const ateStr = document.getElementById("dataFim").value;

  const de = deStr ? new Date(deStr).setHours(0,0,0,0) : null;
  const ate = ateStr ? new Date(ateStr).setHours(23,59,59,999) : null;

  const eventosFiltrados = noticiasGlobais.filter(evento => {
    const titulo = (evento.Titulo || "").toLowerCase();
    const school = (evento.nomeEscola || "").toLowerCase();
    const local = (evento.local_evento || "").toLowerCase();
    
    const bateCertoTexto = !termo || titulo.includes(termo) || school.includes(termo) || local.includes(termo);

    let bateCertoData = true;
    if (evento.Data) {
      const dataEvento = new Date(evento.Data).getTime();
      if (de && ate) {
        bateCertoData = dataEvento >= de && dataEvento <= ate;
      } else if (de) {
        bateCertoData = dataEvento >= de;
      } else if (ate) {
        bateCertoData = dataEvento <= ate;
      }
    } else if (de || ate) {
      bateCertoData = false;
    }

    return bateCertoTexto && bateCertoData;
  });

  renderizarEventos(eventosFiltrados);
}

//################################################## Limpar Filtros ####################################################################
const limparFiltros = () => {
  if(document.getElementById("searchTexto")) document.getElementById("searchTexto").value = "";
  if(document.getElementById("dataInicio")) document.getElementById("dataInicio").value = "";
  if(document.getElementById("dataFim")) document.getElementById("dataFim").value = "";
  renderizarEventos(noticiasGlobais);
}

//################################################## ver uma notícia #################################################================#
const readNoticiaModal = async (id) => {
    const response = await fetch("/public/api/noticia/"+id)
    const dataArray = await response.json()
    for (const dataRecord of dataArray) {
      document.getElementById("modal-title").innerHTML = dataRecord.Titulo;
      document.getElementById("modal-texto").innerHTML = dataRecord.Texto;
      document.getElementById("modal-imagem").src = dataRecord.Imagem;
    }
}

//############################################### Povoamento da Página #################################################################
readMenus(1);
// Apenas chama se a variável global estiver definida
if (typeof categoriaId !== 'undefined') {
    readNoticias(categoriaId);
}