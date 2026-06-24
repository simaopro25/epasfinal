/**
 * Ficheiro: contactar-coordenacao.js
 * Lógica de submissão com Cooldown e Redirecionamento.
 */

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('#contactenos .php-email-form');
    
    if (!formulario) {
        console.warn("Formulário de contacto não encontrado.");
        return;
    }

    formulario.addEventListener('submit', async function(e) {
        e.preventDefault();

        // 1. Verificação de Cooldown
        const ultimaSubmissao = localStorage.getItem('ultimaSubmissaoContacto');
        const tempoEspera = 60000; // 60 segundos
        
        if (ultimaSubmissao && (Date.now() - parseInt(ultimaSubmissao) < tempoEspera)) {
            const segundosRestantes = Math.ceil((tempoEspera - (Date.now() - parseInt(ultimaSubmissao))) / 1000);
            alert(`Aguarde ${segundosRestantes} segundos para enviar uma nova mensagem.`);
            return;
        }

        // 2. Feedback visual (loading)
        const loading = this.querySelector('.loading');
        if (loading) loading.style.display = 'block';

        // 3. Execução reCAPTCHA
        grecaptcha.ready(() => {
            grecaptcha.execute('6LdjYRktAAAAALdvp4rscHecZ7t52x-6UeyHmwZ8', {action: 'submit'}).then(async (token) => {
                
                const formData = new FormData(this);
                formData.append('g-recaptcha-response', token);
                
                try {
                    const response = await fetch(this.action, {
                        method: "POST",
                        body: new URLSearchParams(formData)
                    });

                    if (response.ok) {
                        // Sucesso: Grava o cooldown
                        localStorage.setItem('ultimaSubmissaoContacto', Date.now());
                        
                        // REDIRECIONAMENTO ADICIONADO AQUI
                        window.location.href = "https://epas.alunos.esmonserrate.org/public/contacto/sucesso";
                    } else {
                        throw new Error('Erro ao enviar a mensagem.');
                    }
                } catch (erro) {
                    if (loading) loading.style.display = 'none';
                    const errorMsg = this.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.innerText = erro.message;
                        errorMsg.style.display = 'block';
                    } else {
                        alert("Erro: " + erro.message);
                    }
                }
            });
        });
    });
});