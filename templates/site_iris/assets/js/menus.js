//################################################## ler Menus #######################################################################
const readMenus = async (pai) => {
    try {
      const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/menu/" + pai);
      const dataArray = await response.json();
      
      // Construção do HTML
      let strHtml = `<ul>`;
      for (const dataRecord of dataArray) {
        strHtml += `<li><a href="${dataRecord.link}">${dataRecord.Opcao}</a></li>`;
      }
      strHtml += `</ul><i class="mobile-nav-toggle d-xl-none bi bi-list"></i>`;
      
      const navMenu = document.getElementById("navmenu");
      navMenu.innerHTML = strHtml;
  
      // --- LÓGICA MOBILE ---
      const toggle = navMenu.querySelector('.mobile-nav-toggle');
      
      toggle.addEventListener('click', function() {
        // Toggle no contentor do menu
        navMenu.classList.toggle('navmenu-active');
        
        // Toggle no body para efeitos de CSS (ex: escurecer o fundo)
        document.body.classList.toggle('mobile-nav-active');
        
        // Troca o ícone de 'hambúrguer' para 'X'
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
  
      // Fechar o menu automaticamente ao clicar num link (importante para Single Page Apps)
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

  readMenus(1);
//################################################## ler Menus #######################################################################


//FORMULÁRIO






