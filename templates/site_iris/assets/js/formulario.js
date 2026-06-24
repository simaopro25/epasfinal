//FORMULÁRIO

// Função para verificar o tempo de espera (Cooldown) no navegador
const verificarCooldown = () => {
    const ultimaSubmissao = localStorage.getItem('ultimaSubmissao');
    const tempoEspera = 60 * 1000; // 60 segundos (1 minutos) em milissegundos
    
    if (ultimaSubmissao) {
        const tempoDecorrido = Date.now() - parseInt(ultimaSubmissao);
        if (tempoDecorrido < tempoEspera) {
            const minutosRestantes = Math.ceil((tempoEspera - tempoDecorrido) / 60000);
            
            // Registo no Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'tentativa_spam_formulario', {
                    'event_category': 'Segurança',
                    'event_label': 'Submissão rápida bloqueada pelo utilizador'
                });
            }

            alert(`Aguarde ${minutosRestantes} minuto(s) para enviar uma nova candidatura.`);
            return false;
        }
    }
    return true;
};

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

// Função para validar campos obrigatórios
const validarFormulario = () => {
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
        
        if (campo.id === "tipoEscola") {
            if (valor === "" || valor === "Escolha o seu Distrito") {
                alert(`Por favor, selecione um ${campo.nome}.`);
                elemento.focus();
                return false;
            }
        } 
        else if (valor === "") {
            alert(`Por favor, preencha o campo: ${campo.nome}`);
            elemento.focus();
            return false;
        }
    }
    return true;
};

// Função para validar e criar escola
const criarEscola = async (token) => {
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

    for (const campo of campos) {
        const elemento = document.getElementById(campo.id);
        let valor = elemento ? elemento.value.trim() : "";
        if (campo.id === "tipoEscola") {
            if (valor === "" || valor === "Escolha o seu distrito") {
                alert(`Por favor, selecione um ${campo.nome}.`);
                elemento.focus();
                return;
            }
        } 
        else if (valor === "") {
            alert(`Por favor, preencha o campo: ${campo.nome}`);
            elemento.focus();
            return;
        }
    }

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
               "&motivacao=" + encodeURIComponent(document.getElementById("motivacao").value) +
               "&g-recaptcha-response=" + encodeURIComponent(token);

        const response = await fetch("https://epas.alunos.esmonserrate.org/public/api/escolas", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: str,
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        // Sucesso: regista a submissão e envia evento ao GA
        localStorage.setItem('ultimaSubmissao', Date.now());
        if (typeof gtag === 'function') {
            gtag('event', 'conversao_formulario_escola', { 'event_category': 'Formulario' });
        }
        
        window.location.href = "https://epas.alunos.esmonserrate.org/public/formulario_aceite";
    } catch (erro) {
        console.error("Error updating data:", erro);
        alert("Erro ao enviar candidatura: " + erro.message);
    }
};

// Submeter formulário com reCAPTCHA v3
const formulario = document.querySelector('.php-email-form');
if (formulario) {
    formulario.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Verificação de Cooldown (navegador)
        if (!verificarCooldown()) return;

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        grecaptcha.ready(function() {
            grecaptcha.execute('6LdjYRktAAAAALdvp4rscHecZ7t52x-6UeyHmwZ8', {action: 'submit'}).then(async function(token) {
                await criarEscola(token);
            });
        });
    });
}

// Aguardar o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    readMenus(1);
    lerLocalizacao();
});

// Geocodificação
document.addEventListener("DOMContentLoaded", () => {
    const inputMorada = document.getElementById("localizacao");
    const inputLat = document.getElementById("latitude");
    const inputLong = document.getElementById("longitude");

    inputMorada.addEventListener("blur", async () => {
        const morada = inputMorada.value;
        if (morada.length > 5) {
            try {
                const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(morada)}&apiKey=e86d1fb782424584b0fcac6353898a4e`;
                const resposta = await fetch(url);
                const data = await resposta.json();
                if (data.features && data.features.length > 0) {
                    const [long, lat] = data.features[0].geometry.coordinates;
                    inputLat.value = lat;
                    inputLong.value = long;
                }
            } catch (error) {
                console.error("Erro na geocodificação:", error);
            }
        }
    });
});