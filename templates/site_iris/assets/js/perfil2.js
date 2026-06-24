//PERFIL2.HTML



// ============================================================
    // CONFIGURAÇÕES
    // ============================================================
    const CAT_INICIO = 30;
    const CAT_EVENTOS = 7;
    const CATS_PARA_EXCLUIR = [11, 17, 26, 3, 23, 1, 25, 28];

    // URL base do site
    const SITE_URL = 'https://epas.alunos.esmonserrate.org';

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    function getIdDaUrl() {
      const partes = window.location.pathname.split('/');
      return partes[partes.length - 1];
    }

    function formatarData(str) {
      if (!str) return '';
      return new Date(str).toLocaleDateString('pt-PT', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    }

    function formatarDataCurta(str) {
      if (!str) return '';
      const data = new Date(str);
      return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}`;
    }

    function iniciais(nome) {
      if (!nome) return 'EP';
      return nome.split(' ')
        .filter(w => w.length > 2)
        .slice(0, 2)
        .map(w => w[0].toUpperCase())
        .join('');
    }

    function truncar(texto, max) {
      if (!texto) return '';
      const semHtml = texto.replace(/<[^>]*>/g, '');
      return semHtml.length > max ? semHtml.substring(0, max) + '…' : semHtml;
    }

    // ============================================================
    // FUNÇÃO PARA CORRIGIR URL DO WEBSITE
    // ============================================================
    function corrigirUrlWebsite(url) {
      if (!url) return null;
      url = url.trim();
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      if (url.startsWith('www.')) {
        return 'https://' + url;
      }
      return 'https://www.' + url;
    }

    // ============================================================
    // AGRUPAR POR CATEGORIA
    // ============================================================
    function agruparPorCategoria(publicacoes) {
      const mapa = new Map();
      
      publicacoes.forEach(pub => {
        if (!pub.nomeCategoria) return;
        if (CATS_PARA_EXCLUIR.includes(Number(pub.idCategoria))) return;
        if (Number(pub.idCategoria) === CAT_INICIO) return;
        if (Number(pub.idCategoria) === CAT_EVENTOS) return;
        
        if (!mapa.has(pub.nomeCategoria)) {
          mapa.set(pub.nomeCategoria, []);
        }
        mapa.get(pub.nomeCategoria).push(pub);
      });
      
      const categorias = Array.from(mapa.entries())
        .sort((a, b) => a[0].localeCompare(b[0]));
      
      categorias.forEach(([_, items]) => {
        items.sort((a, b) => new Date(b.Data) - new Date(a.Data));
      });
      
      return categorias;
    }

    // ============================================================
    // RENDER CARD DE PUBLICAÇÃO
    // ============================================================
    function renderPublicationCard(pub) {
      const imagem = pub.Imagem && pub.Imagem !== '/public/assets/img/favicon.png' 
        ? pub.Imagem 
        : null;
      
      const nomeEscola = pub.nomeEscola || "";
      const fotoEscola = pub.fotoEscola || null;

      return `
        <div class="col-md-6 col-lg-4">
          <div class="publication-card">
            ${imagem ? `
              <div class="publication-image">
                <img src="${imagem}" alt="${pub.Titulo || 'Publicação'}">
              </div>
            ` : ''}
            <div class="publication-content">
              <div class="publication-meta">
                <span class="publication-category-tag">
                  <i class="bi bi-tag me-1"></i>${pub.nomeCategoria || 'Publicação'}
                </span>
                <span class="publication-date">
                  <i class="bi bi-calendar3 me-1"></i>${formatarData(pub.Data)}
                </span>
              </div>
              <h5 class="publication-title">${pub.Titulo || "Sem título"}</h5>
              <p class="publication-excerpt">${truncar(pub.Texto, 450)+"..."}</p>
              ${nomeEscola ? `
                <div class="publication-author">
                  ${fotoEscola ? `<img src="${fotoEscola}" class="author-avatar" alt="${nomeEscola}">` : '<i class="bi bi-building"></i>'}
                  <span class="author-name">${nomeEscola}</span>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }

    // ============================================================
    // RENDER EVENTOS
    // ============================================================
    function renderEventos(eventos) {
      if (!eventos.length) return '';

      return eventos.map((evento, index) => {
        const titulo = evento.Titulo || "Sem título";
        const texto = evento.Texto || "Sem descrição";
        resumo=texto.substring(0,450)+"..."
        const imagem = evento.Imagem && evento.Imagem !== '/public/assets/img/favicon.png' 
          ? evento.Imagem 
          : "/templates/site_iris/assets/img/masonry-portfolio/masonry-portfolio-1.jpg";
        const datacurta = evento.datacurta || formatarDataCurta(evento.Data) || "--/--";
        const local = evento.local_evento || '';
        
        let nomeEscola = evento.nomeEscola || "Escola EPAS";
        const nomeAbreviado = nomeEscola
          .replace("Agrupamento de Escolas", "A.E.")
          .replace("Escola Secundária", "E.S.")
          .replace("Escola Profissional", "E.P.");
        
        const fotoEscola = evento.fotoEscola || "/templates/site_iris/assets/img/favicon.png";

        return `
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
                    <span class="event-school">${nomeAbreviado}</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-7">
                <div class="event-text">
                  <h4>${titulo}</h4>
                  <p>${truncar(pub.Texto, 450)+"..."}</p>
                  ${local ? `<div class="event-location"><i class="bi bi-geo-alt"></i> ${local}</div>` : ''}
                  <div style="margin-top: 20px; display: flex; align-items: center; justify-content: flex-end; gap: 12px;">
                    <img src="${fotoEscola}" alt="Logo ${nomeAbreviado}" 
                         style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid #ddd;">
                    <span style="color: #007bff; font-weight: bold; font-size: 0.9rem;">${nomeAbreviado}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // ============================================================
    // ATUALIZAR NAVBAR COM LINKS DINÂMICOS
    // ============================================================
    let secoesDisponiveis = [
  { id: 'hero', nome: 'Início' },
  { id: 'about', nome: 'Sobre' },
  { id: 'events', nome: 'Eventos' },
  { id: 'contact', nome: 'Contactos' }
];

function atualizarNavbarDinamica() {
  const menuList = document.getElementById('menu-list');
  if (!menuList) return;

  menuList.innerHTML = ''; // Limpa o menu

  // 1. Criar os links das secções
  secoesDisponiveis.forEach(secao => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${secao.id}`;
    a.innerHTML = secao.nome;
    a.className = 'nav-link-item';

    // Scroll Suave e Fecho do Menu Mobile
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(secao.id);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // Compensar altura do header
          behavior: 'smooth'
        });
      }
      
      // FECHAR MENU MOBILE APÓS CLIQUE (Essencial para responsividade)
      document.body.classList.remove('mobile-nav-active');
      const toggle = document.querySelector('.mobile-nav-toggle');
      if (toggle) {
        toggle.classList.add('bi-list');
        toggle.classList.remove('bi-x');
      }
    });

    li.appendChild(a);
    menuList.appendChild(li);
  });

  // 2. Adicionar Botão Voltar (se necessário)
  const voltarLi = document.createElement('li');
  voltarLi.innerHTML = `<a href="/" class="voltar-link">← Voltar</a>`;
  menuList.appendChild(voltarLi);
}

// --- LÓGICA DE SCROLL (ACTIVE LINK) ---
window.addEventListener('scroll', () => {
  let current = '';
  secoesDisponiveis.forEach(secao => {
    const element = document.getElementById(secao.id);
    if (element) {
      const rect = element.getBoundingClientRect();
      // Se o topo da secção estiver perto do topo do ecrã
      if (rect.top <= 150) {
        current = secao.id;
      }
    }
  });

  document.querySelectorAll('.nav-link-item').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Inicializar
atualizarNavbarDinamica();

    // ============================================================
    // RENDER SEÇÕES E COLETAR PARA NAVEGAÇÃO
    // ============================================================
    function renderDestaques(destaques) {
      if (!destaques.length) return '';
      
      secoesDisponiveis.push({
        id: 'secao-destaques',
        nome: 'Destaques'
      });
      
      return `
        <section id="secao-destaques" class="section">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>⭐ Destaques</h2>
              <p>Atividades e novidades em destaque da escola.</p>
            </div>
            <div class="row">
              ${destaques.map(pub => renderPublicationCard(pub)).join('')}
            </div>
          </div>
        </section>
      `;
    }

    function renderSecaoEventos(eventos) {
      if (!eventos.length) return '';
      
      secoesDisponiveis.push({
        id: 'secao-eventos',
        nome: 'Eventos'
      });
      
      return `
        <section id="secao-eventos" class="portfolio section">
          <div class="container section-title" data-aos="fade-up">
            <h2>📅 Eventos</h2>
            <p>Fica a conhecer as atividades realizadas por esta escola EPAS.</p>
          </div>
          <div class="container">
            <div class="row gy-5">
              ${renderEventos(eventos)}
            </div>
          </div>
        </section>
      `;
    }

    function renderSecoesPorCategoria(categorias) {
      if (!categorias.length) return '';
      
      return categorias.map(([nomeCategoria, items]) => {
        const secaoId = `secao-${nomeCategoria.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        
        secoesDisponiveis.push({
          id: secaoId,
          nome: nomeCategoria
        });
        
        return `
          <section id="${secaoId}" class="category-section">
            <div class="container">
              <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap">
                <h2 class="category-title">
                  ${nomeCategoria}
                  <span class="category-badge">${items.length}</span>
                </h2>
              </div>
              <div class="row">
                ${items.map(item => renderPublicationCard(item)).join('')}
              </div>
            </div>
          </section>
        `;
      }).join('');
    }

    function renderContactos(escola) {
      secoesDisponiveis.push({
        id: 'secao-contactos',
        nome: 'Contactos'
      });
      
      return `
        <section id="secao-contactos" class="contact section">
          <div class="container section-title" data-aos="fade-up">
            <h2>Contactos</h2>
            <p>${escola.nome}</p>
          </div>
          <div class="container" data-aos="fade-up" data-aos-delay="100">
            <div class="mb-4" data-aos="fade-up" data-aos-delay="200">
              <iframe style="border:0; width: 100%; height: 270px;" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.89851576943!2d-9.147014400000002!3d38.720138899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1933ca9ffab56d%3A0x1132e8fe8fbb0407!2sGabinete%20do%20Parlamento%20Europeu%20em%20Portugal!5e0!3m2!1spt-PT!2spt!4v1776932713198!5m2!1spt-PT!2spt">
              </iframe>
            </div>
            <div class="row gy-4">
              <div class="col-lg-4">
                <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                  <div>
                    <i class="bi bi-geo-alt flex-shrink-0"></i>
                    <h3>Morada</h3>
                    <p>${escola.morada || escola.TipoEscola || escola.localizacao || 'Não disponível'}</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                  <i class="bi bi-telephone flex-shrink-0"></i>
                  <div>
                    <h3>Telefone</h3>
                    <p>${escola.telefone || 'Não disponível'}</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
                  <i class="bi bi-envelope flex-shrink-0"></i>
                  <div>
                    <h3>Email</h3>
                    <p><a href="mailto:${escola.email}">${escola.email || 'Não disponível'}</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    // ============================================================
    // RENDER PÁGINA COMPLETA
    // ============================================================
    function renderPagina(escola, todasPublicacoes) {
      document.title = `${escola.nome} — EPAS PT`;
      secoesDisponiveis = []; // Reset

      console.log('Dados da escola:', escola);

      // Corrigir o URL do website
      const websiteCorrigido = corrigirUrlWebsite(escola.PaginaWeb);
      const websiteDisplay = escola.PaginaWeb ? escola.PaginaWeb.replace(/^https?:\/\/(www\.)?/, '') : null;

      // Separar por tipo
      const destaques = todasPublicacoes.filter(p => Number(p.idCategoria) === CAT_INICIO);
      const eventos = todasPublicacoes.filter(p => Number(p.idCategoria) === CAT_EVENTOS);
      const outrasPublicacoes = todasPublicacoes.filter(p => 
        !CATS_PARA_EXCLUIR.includes(Number(p.idCategoria)) && 
        Number(p.idCategoria) !== CAT_INICIO && 
        Number(p.idCategoria) !== CAT_EVENTOS
      );
      
      const categoriasAgrupadas = agruparPorCategoria(outrasPublicacoes);

      // Logo/iniciais
      const logoHtml = escola.foto && escola.foto !== '/public/assets/img/favicon.png'
        ? `<img src="${escola.foto}?t=${new Date().getTime()}" alt="${escola.nome}">`
        : `<div class="initials">${iniciais(escola.nome)}</div>`;

      // Usar TipoEscola (distrito)
      const distritoEscola = escola.TipoEscola || escola.localizacao || 'Não disponível';

      // Gerar HTML completo
      const html = `
        <!-- BANNER DA ESCOLA -->
        <div id="secao-topo" class="school-banner">
          <div class="container text-center">
            <div class="school-logo-large mx-auto">
              ${logoHtml}
            </div>
            <div class="epas-badge">
              <i class="bi bi-star-fill me-1"></i> Escola Embaixadora do Parlamento Europeu
            </div>
            <h1 class="display-4 fw-bold">${escola.nome}</h1>
            <p class="lead"><i class="bi bi-geo-alt me-2"></i> ${distritoEscola}</p>
          </div>
        </div>

        <!-- SEÇÃO SOBRE (cards de informação) -->
        <section id="secao-sobre" class="section">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>Sobre a Escola</h2>
              <p>Informações gerais da escola embaixadora.</p>
            </div>
            <div class="row gy-4 mt-3">
              <div class="col-md-4" data-aos="zoom-out" data-aos-delay="100">
                <div class="icon-box">
                  <i class="bi bi-geo-alt fs-1"></i>
                  <h4>Distrito</h4>
                  <p>${distritoEscola}</p>
                </div>
              </div>
              <div class="col-md-4" data-aos="zoom-out" data-aos-delay="200">
                <div class="icon-box">
                  <i class="bi bi-envelope fs-1"></i>
                  <h4>Contacto</h4>
                  <p><strong>Email:</strong> ${escola.email || 'Não disponível'}<br>
                  <strong>Telefone:</strong> ${escola.telefone || 'Não disponível'}</p>
                </div>
              </div>
              <div class="col-md-4" data-aos="zoom-out" data-aos-delay="300">
                <div class="icon-box">
                  <i class="bi bi-globe2 fs-1"></i>
                  <h4>Website</h4>
                  ${websiteCorrigido ? `<p><a href="${websiteCorrigido}" target="_blank" rel="noopener noreferrer">${websiteDisplay}</a></p>` : '<p>Não disponível</p>'}
                </div>
              </div>
            </div>
          </div>
        </section>

        ${renderDestaques(destaques)}
        ${renderSecoesPorCategoria(categoriasAgrupadas)}
        ${renderSecaoEventos(eventos)}
        ${renderContactos(escola)}
      `;

      document.getElementById('school-dynamic-content').innerHTML = html;
      
      // Adicionar secções estáticas à navegação
      secoesDisponiveis.unshift({
        id: 'secao-sobre',
        nome: 'Sobre'
      });
      
      secoesDisponiveis.unshift({
        id: 'secao-topo',
        nome: 'Início'
      });
      
      // Atualizar a navbar
      atualizarNavbarDinamica();

      // Re-inicializar AOS
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }

      // Re-inicializar GLightbox
      if (typeof GLightbox !== 'undefined') {
        GLightbox({
          selector: '.glightbox',
          touchNavigation: true,
          loop: false
        });
      }
    }

    // ============================================================
    // RENDER ERRO
    // ============================================================
    function renderErro(mensagem) {
      document.getElementById('school-dynamic-content').innerHTML = `
        <div class="container py-5">
          <div class="text-center py-5">
            <i class="bi bi-building fs-1 text-muted"></i>
            <h2 class="mt-3">Escola não encontrada</h2>
            <p class="text-muted">${mensagem}</p>
            <a href="${SITE_URL}/public/escolas" class="btn btn-primary mt-3">← Ver todas as escolas</a>
          </div>
        </div>
      `;
    }

    // ============================================================
    // CARREGAMENTO DOS DADOS
    // ============================================================
    (async () => {
      const id = getIdDaUrl();

      if (!id || isNaN(id)) {
        renderErro('ID de escola inválido.');
        return;
      }

      try {
        const timestamp = new Date().getTime();
        
        const [resEscola, resPublicacoes, resTipos] = await Promise.all([
          fetch(`/public/api/escolas/${id}?_=${timestamp}`),
          fetch(`/public/api/noticias/escola/${id}?_=${timestamp}`),
          fetch(`/public/api/localizacoes?_=${timestamp}`).catch(() => null)
        ]);

        if (!resEscola.ok) {
          renderErro('Esta escola não existe ou ainda não foi confirmada.');
          return;
        }

        const escola = await resEscola.json();

        // Mapear TipoEscola
        if (resTipos && resTipos.ok) {
          const tipos = await resTipos.json();
          const tipoEncontrado = tipos.find(t => String(t.Id) === String(escola.TipoEscola));
          if (tipoEncontrado) {
            escola.TipoEscola = tipoEncontrado.Tipo;
          } else if (!escola.TipoEscola && escola.localizacao) {
            escola.TipoEscola = escola.localizacao;
          }
        }

        let todasPublicacoes = [];
        if (resPublicacoes.ok) {
          const dados = await resPublicacoes.json();
          todasPublicacoes = Array.isArray(dados) ? dados : [];
          todasPublicacoes.sort((a, b) => new Date(b.Data) - new Date(a.Data));
        }

        renderPagina(escola, todasPublicacoes);

      } catch (erro) {
        console.error('Erro no carregamento:', erro);
        renderErro('Erro ao carregar os dados. Tenta novamente mais tarde.');
      }
    })();
