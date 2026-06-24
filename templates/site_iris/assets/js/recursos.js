//################################################## Ler Recursos #######################################################################
const readRecursos = async (cat, lim) => {
    let strHtml = ``;
    try {
        const response = await fetch("/public/api/noticia/cat/" + cat + "/" + lim);
        const dataArray = await response.json();
        
        // Forçar o limite de 5 itens
        const dataLimitada = dataArray.slice(0, 5);
      
        for (const dataRecord of dataLimitada) {
            const local = dataRecord.local_evento ? dataRecord.local_evento : "Local a definir";
            const textoCompleto = dataRecord.Texto || "Sem descrição disponível.";
            const resumo = textoCompleto.length > 450 ? textoCompleto.substring(0, 450) + "..." : textoCompleto;
            
            let nomeOriginal = dataRecord.nomeEscola || "Escola EPAS";
            const nomeAbreviado = nomeOriginal
                .replace("Agrupamento de Escolas", "A.E.")
                .replace("Escola Secundária", "E.S.")
                .replace("Escola Profissional", "E.P.");
            
            const fotoEscola = dataRecord.fotoEscola ? dataRecord.fotoEscola : "/templates/site_iris/assets/img/favicon.png";
      
            strHtml += `
                <div class="col-12">
                  <div class="row align-items-center">
                    <div class="col-lg-4 col-md-5">
                      <div class="portfolio-item">
                        <a href="${dataRecord.Imagem}" class="glightbox" data-gallery="recursos-gallery">
                          <img src="${dataRecord.Imagem}" alt="Imagem" class="img-fluid">
                        </a>
                        <div class="event-date">${dataRecord.datacurta}</div>
                        <div class="portfolio-info">
                          <h4>${dataRecord.Titulo}</h4>
                          <span class="event-school"><i class="bi bi-geo-alt-fill"></i> ${local}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-8 col-md-7">
                      <div class="event-text">
                        <h4>${dataRecord.Titulo}</h4>
                        <p>${resumo}</p>
                        <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                          <div id="recursos${dataRecord.ID}">
                            <button type="button" class="btn-getstarted" style="padding: 8px 20px; font-size: 14px;" onclick="descarregarRecurso(${dataRecord.ID})">Descarregar</button>
                          </div>
                          <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="${fotoEscola}" alt="Logo" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <span style="color: #007bff; font-weight: bold; font-size: 0.9rem;">${nomeAbreviado}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            `;
        }
        
        document.getElementById("recursosCard").innerHTML = strHtml;

        // Inicialização necessária para o botão de fechar (X) do GLightbox aparecer
        if (typeof GLightbox !== 'undefined') {
            GLightbox({ selector: '.glightbox' });
        }

        // Carregar ficheiros associados
        for (const dataRecord of dataLimitada) {
            readFicheiros(dataRecord.ID);
        }

    } catch (error) {
        console.error("Erro ao carregar recursos:", error);
    }
}
 
// Função para descarregar o recurso completo como PDF
const descarregarRecurso = async (id) => {
    try {
        const response = await fetch("/public/api/noticia/" + id);
        const data = await response.json();
        const item = data[0];

        if (!window.jspdf) {
            alert("Erro: Biblioteca PDF não carregada.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(item.Titulo || "Sem Título", 10, 20);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        const splitTexto = doc.splitTextToSize(item.Texto || "Sem descrição.", 180);
        doc.text(splitTexto, 10, 40);

        if (item.Imagem) {
            try {
                doc.addImage(item.Imagem, 'JPEG', 10, 100, 180, 100);
            } catch (e) { console.warn("Imagem não disponível para PDF."); }
        }

        doc.save(`${(item.Titulo || "Recurso").replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
        console.error("Erro ao gerar PDF:", e);
        alert("Erro ao criar o documento.");
    }
}
 
// Ler Títulos
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
 
// Ler Menus
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
    } catch (error) { console.error("Erro menu:", error); }
}

// Ler Títulos
const readFicheiros = async (recurso) => {
    let strHtml = ``
    const response = await fetch("/public/api/recursos/ficheiros/"+recurso)
    const dataArray= await response.json()
    if (dataArray[0].numElements>0){
        for (const dataRecord of dataArray) {
        strHtml += `
            <button type="button" class="btn-getstarted" style="padding: 8px 20px; font-size: 14px;" onclick="window.open('${dataRecord.ficheiro}')">${dataRecord.titulo}</button>
        `
    }

    }
        document.getElementById("recursos"+recurso).innerHTML = strHtml;
}
 
// Inicialização
readMenus(1);
readRecursos(32, 5);
readTitulos(34);