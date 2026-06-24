//FORMULÁRIO

// Função para carregar o menu dinamicamente
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
    if (toggle) {
        toggle.addEventListener('click', function() {
            document.querySelector('#navmenu').classList.toggle('navmenu-active');
            this.classList.toggle('bi-list');
            this.classList.toggle('bi-x');
        });
    }
}


     // Função para carregar as localizações no select
     const lerLocalizacao = async () => {
        let strHtml = `<option value="">Escolha o seu distrito</option>`
        const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/localizacoes")
        const dataArray = await response.json()
        for (const dataRecord of dataArray) {
            strHtml += `
                <option value="${dataRecord.Id}">${dataRecord.Tipo}</option>
            `
        }
        document.getElementById("tipoEscola").innerHTML = strHtml;
    }



// exemple of fetch using PUT
// Função para validar campos obrigatórios
const validarFormulario = () => {
    // Lista de campos obrigatórios
    const camposObrigatorios = [
        { id: "name", nome: "Nome" },
        { id: "localizacao", nome: "Localização" },
        { id: "email", nome: "Email" },
        { id: "telefone", nome: "Telefone" },
        { id: "PessoaContacto", nome: "Pessoa de contacto" },
        { id: "paginaWeb", nome: "Página Web da Escola" },
        { id: "utilizador", nome: "Utilizador" },
        { id: "passw", nome: "Password" },
        { id: "tipoEscola", nome: "Distrito" },
        { id: "latitude", nome: "Latitude" },
        { id: "longitude", nome: "Longitude" },
        { id: "motivacao", nome: "Motivação" }
    ];

    for (const campo of camposObrigatorios) {
        const elemento = document.getElementById(campo.id);
        let valor = elemento ? elemento.value.trim() : "";
        
        // Para o select, verificar se não é a opção padrão
        if (campo.id === "tipoEscola") {
            if (valor === "" || valor === "Escolha o seu Distrito") {
                alert(`Por favor, selecione um ${campo.nome}.`);
                elemento.focus();
                return false;
            }
        } 
        // Para os outros campos
        else if (valor === "") {
            alert(`Por favor, preencha o campo: ${campo.nome}`);
            elemento.focus();
            return false;
        }
    }
    return true;
};

// Função para validar e criar escola
const criarEscola = async () => {
    // Lista de campos na ordem que aparecem no formulário
    const campos = [
        { id: "name", nome: "Nome" },
        { id: "localizacao", nome: "Localização" },
        { id: "email", nome: "Email" },
        { id: "telefone", nome: "Telefone" },
        { id: "PessoaContacto", nome: "Pessoa de contacto" },
        { id: "paginaWeb", nome: "Página Web da Escola" },
        { id: "utilizador", nome: "Utilizador" },
        { id: "passw", nome: "Password" },
        { id: "tipoEscola", nome: "Distrito" },
        { id: "latitude", nome: "Latitude" },
        { id: "longitude", nome: "Longitude" },
        { id: "motivacao", nome: "Motivação" }
    ];

    // Validar campo por campo (para pelo primeiro erro)
    for (const campo of campos) {
        const elemento = document.getElementById(campo.id);
        let valor = elemento ? elemento.value.trim() : "";
        
        // Para o select
        if (campo.id === "tipoEscola") {
            if (valor === "" || valor === "Escolha o seu distrito") {
                alert(`Por favor, selecione um ${campo.nome}.`);
                elemento.focus();
                return;
            }
        } 
        // Para os outros campos
        else if (valor === "") {
            alert(`Por favor, preencha o campo: ${campo.nome}`);
            elemento.focus();
            return;
        }
    }

    // Se passou todas as validações, envia o formulário
    try {
        let str = "name=" + encodeURIComponent(document.getElementById("name").value) + 
                  "&localizacao=" + encodeURIComponent(document.getElementById("localizacao").value) + 
                  "&telefone=" + encodeURIComponent(document.getElementById("telefone").value);
        str += "&email=" + encodeURIComponent(document.getElementById("email").value) + 
               "&tipoEscola=" + encodeURIComponent(document.getElementById("tipoEscola").value) + 
               "&paginaWeb=" + encodeURIComponent(document.getElementById("paginaWeb").value);
        str += "&utilizador=" + encodeURIComponent(document.getElementById("utilizador").value) + 
               "&passw=" + encodeURIComponent(document.getElementById("passw").value) + 
               "&PessoaContacto=" + encodeURIComponent(document.getElementById("PessoaContacto").value);
        str += "&latitude=" + encodeURIComponent(document.getElementById("latitude").value) + 
               "&longitude=" + encodeURIComponent(document.getElementById("longitude").value) + 
               "&motivacao=" + encodeURIComponent(document.getElementById("motivacao").value);

        const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/escolas", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: str,
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const dadosResposta = await response.json();
        window.location.href = "https://epas.alunos.esmonserrate.org/public/formulario_aceite";
        console.log("Data updated:", dadosResposta);
    } catch (erro) {
        console.error("Error updating data:", erro);
        alert("Erro ao enviar candidatura: " + erro.message);
    }
};


// Submeter formulário com validação nativa HTML5
const formulario = document.querySelector('.php-email-form');
if (formulario) {
    formulario.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }
        await criarEscola();
    });
}

         // Aguardar o DOM carregar antes de executar
    document.addEventListener('DOMContentLoaded', function() {
        readMenus(1);      // Carrega o menu (assumindo que o pai é 1)
        lerLocalizacao();   // Carrega as localizações para o select
    });


    

//readNoticia(2);
//readCategoria(17);  
//readAPI(1);
lerLocalizacao();
//menu();

