//################################################## ler Menus #######################################################################
const readMenus = async (pai) => {
    let strHtml = `<ul>`
    const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/menu/" + pai)
    const dataArray = await response.json()
    for (const dataRecord of dataArray) {
      strHtml += `
        <li><a href="${dataRecord.link}">${dataRecord.Opcao}</a></li>
      `
    }
    strHtml += `</ul><i class="mobile-nav-toggle d-xl-none bi bi-list"></i>`
    document.getElementById("navmenu").innerHTML = strHtml;
  
    // Re-inicializar o toggle do menu mobile
    const toggle = document.querySelector('.mobile-nav-toggle');
    toggle.addEventListener('click', function() {
      document.querySelector('#navmenu').classList.toggle('navmenu-active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }
  //################################################## ler Menus #######################################################################  
  
  //############################################### Povoamento da Página #################################################################################
  readMenus(1);
  readNoticias(29,5);
  readTitulos(35);