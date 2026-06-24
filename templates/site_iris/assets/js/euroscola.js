/**
 * Ficheiro de Gestão de Conteúdos (Notícias e Menus)
 * Versão otimizada sem dependências (Vanilla JS)
 */

(function() {
  "use strict";

  // 1. NAMESPACE GLOBAL
  window.App = window.App || {};

  // 2. FUNÇÃO DO MODAL (Global)
  window.readNoticiaModal = async (id) => {
      const modalElement = document.getElementById('myModal');
      if (!modalElement) return;

      // Tenta usar Bootstrap se disponível, caso contrário apenas mostra
      if (typeof bootstrap !== 'undefined') {
          let myModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
          myModal.show();
      } else {
          modalElement.style.display = 'block';
          modalElement.classList.add('show');
      }

      document.getElementById("modal-title").innerText = "A carregar...";
      document.getElementById("modal-texto").innerText = "Por favor, aguarde...";
      
      try {
          const response = await fetch("/public/api/noticia/" + id);
          const data = await response.json();
          const dataRecord = Array.isArray(data) ? data[0] : data;
          
          if (dataRecord) {
              document.getElementById("modal-title").innerText = dataRecord.Titulo || "Sem título";
              document.getElementById("modal-texto").innerHTML = dataRecord.Texto || "Sem descrição.";
              document.getElementById("modal-imagem").src = dataRecord.Imagem || "/templates/site_iris/assets/img/padrao/noticia.png";
          }
      } catch (e) {
          document.getElementById("modal-title").innerText = "Erro";
          document.getElementById("modal-texto").innerText = "Não foi possível carregar a notícia.";
      }
  };

  // 3. FUNÇÕES DE RENDERIZAÇÃO
  App.readNoticias = async (cat, lim) => {
      const el = document.getElementById("euroscola");
      if (!el) return;

      try {
          const response = await fetch(`/public/api/noticia/cat/${cat}/${lim}`);
          const dataArray = await response.json();
          let strHtml = ``;

          for (const dataRecord of dataArray) {
              const link = dataRecord.local_evento || "#";
              const titulo = dataRecord.Titulo || "Sem título";
              const imagem = dataRecord.Imagem || "/templates/site_iris/assets/img/padrao/euroscola.png";
              const datacurta = dataRecord.datacurta || "--/--";
              const resumo = (dataRecord.Texto && dataRecord.Texto.length > 450) ? dataRecord.Texto.substring(0, 450) + "..." : (dataRecord.Texto || "Sem descrição disponível.");

              strHtml += `
              <div class="col-12 mb-4">
                  <div class="row align-items-center">
                      <div class="col-lg-4 col-md-5">
                          <div class="portfolio-item">
                              <img src="${imagem}" class="img-fluid" alt="${titulo}">
                              <div class="event-date">${datacurta}</div>
                          </div>
                      </div>
                      <div class="col-lg-8 col-md-7">
                          <div class="event-text">
                              <h4 style="cursor:pointer; color: #0d6efd;" onclick="window.readNoticiaModal(${dataRecord.ID})">${titulo}</h4>
                              <p>${resumo}</p>
                              <a href="${link}" target="_blank" class="btn btn-primary">Ver mais</a>
                          </div>
                      </div>
                  </div>
              </div>`;
          }
          el.innerHTML = strHtml;
      } catch (error) { console.error("Erro em App.readNoticias:", error); }
  };

  App.readMenus = async (pai) => {
      const el = document.getElementById("navmenu");
      if (!el) return;
      try {
          const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/menu/" + pai);
          const dataArray = await response.json();
          let strHtml = `<ul>`;
          for (const dataRecord of dataArray) {
              strHtml += `<li><a href="${dataRecord.link}">${dataRecord.Opcao}</a></li>`;
          }
          strHtml += `</ul>`;
          el.innerHTML = strHtml;
      } catch (error) { console.error("Erro em App.readMenus:", error); }
  };

  App.readTitulos = async (cat) => {
      const el = document.getElementById("Eventos");
      if (!el) return;
      try {
          const response = await fetch("/public/api/noticia/cat/" + cat);
          const dataArray = await response.json();
          let strHtml = ``;
          for (const dataRecord of dataArray) {
              strHtml += `<h2>${dataRecord.Titulo}</h2><p>${dataRecord.Texto}</p>`;
          }
          el.innerHTML = strHtml;
      } catch (error) { console.error("Erro em App.readTitulos:", error); }
  };

  // 4. INICIALIZAÇÃO SEGURA (Substitui o document.ready)
  const init = () => {
      if (!document.getElementById("myModal")) {
          document.body.insertAdjacentHTML('beforeend', `
          <div class="modal fade" id="myModal" tabindex="-1"><div class="modal-dialog modal-xl"><div class="modal-content">
              <div class="modal-header"><h4 class="modal-title" id="modal-title">A carregar...</h4><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
              <div class="modal-body"><img id="modal-imagem" src="" class="img-fluid mb-3"><p id="modal-texto"></p></div>
          </div></div></div>`);
      }
      App.readMenus(1);
      App.readNoticias(36, 2000);
      App.readTitulos(39);
  };

  if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
  } else {
      init();
  }
})();