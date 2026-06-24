const readMenus = async () => {
      try {
        const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/menu/1");
        const dataArray = await response.json();
        const navMenu = document.getElementById("navmenu");
        let html = `<ul>`;
        dataArray.forEach(item => { html += `<li><a href="${item.link}">${item.Opcao}</a></li>`; });
        html += `</ul><i class="mobile-nav-toggle d-xl-none bi bi-list"></i>`;
        navMenu.innerHTML = html;
        navMenu.querySelector('.mobile-nav-toggle').addEventListener('click', function() {
          document.body.classList.toggle('mobile-nav-active');
          this.classList.toggle('bi-list'); this.classList.toggle('bi-x');
        });
      } catch (e) { console.error("Erro menu:", e); }
    }

    const readTitulos = async (cat) => {
    let strHtml = ``
    const response = await fetch("/public/api/noticia/cat/" + cat)
    const dataArray = await response.json()
    for (const dataRecord of dataArray) {
      strHtml += `
      <section id="workshops" class="section">
      <div class="container">
        <div class="section-title">
          <h2>${dataRecord.Titulo}</h2>
          <p>${dataRecord.Texto}</p>
        </div>
        <div class="row gy-4">
          <div class="col-md-6"><div class="icon-box"><h4>Recuperar a Password</h4><video width="100%" height="250" controls><source src="/video/recup_pass.mp4" type="video/mp4"></video></div></div>
          <div class="col-md-6"><div class="icon-box"><h4>Editar Perfil</h4><video width="100%" height="250" controls><source src="/video/edit_Perfil.mp4" type="video/mp4"></video></div></div>
          <div class="col-md-6"><div class="icon-box"><h4>Lançar Eventos</h4><video width="100%" height="250" controls><source src="/video/eventos.mp4" type="video/mp4"></video></div></div>
          <div class="col-md-6"><div class="icon-box"><h4>Lançar Notícias</h4><video width="100%" height="250" controls><source src="/video/video_noticias.mp4" type="video/mp4"></video></div></div>
        </div>
      </div>
    </section>
      `
    }
    const elem = document.getElementById("workshops") || document.getElementById("workshops");
    if (elem) elem.innerHTML = strHtml;
}

readMenus();
readTitulos(49);