//RECUP_PASS.HTML


     // Variáveis globais
     let currentStep = 1;
     let userEmail = localStorage.getItem("recoverEmail") || "";
     let verificationCode = "";

     // Função para atualizar o stepper visual
     function updateStepper(step) {
       // Reset classes
       document.querySelectorAll(".step-item").forEach((item, index) => {
         const stepNum = index + 1;
         const circle = document.getElementById(`step${stepNum}Circle`);
         if (stepNum < step) {
           item.classList.add("completed");
           item.classList.remove("active");
           if (circle) circle.classList.add("completed");
         } else if (stepNum === step) {
           item.classList.add("active");
           item.classList.remove("completed");
           if (circle) circle.classList.remove("completed");
         } else {
           item.classList.remove("active", "completed");
           if (circle) circle.classList.remove("completed");
         }
       });

       // Atualizar header
       const headerDiv = document.getElementById("headerContent");
       if (step === 1) {
         headerDiv.innerHTML = `
                   <h2><i class="bi bi-envelope"></i> Recuperar Password</h2>
                   <p>Digite o seu email para receber um código de verificação</p>
               `;
       } else if (step === 2) {
         headerDiv.innerHTML = `
                   <h2><i class="bi bi-key"></i> Verificar Código</h2>
                   <p>Digite o código que enviamos para o seu email</p>
               `;
       } else {
         headerDiv.innerHTML = `
                   <h2><i class="bi bi-lock"></i> Nova Password</h2>
                   <p>Crie uma nova password segura</p>
               `;
       }

       // Mostrar/esconder steps
       document.getElementById("step1").classList.remove("active");
       document.getElementById("step2").classList.remove("active");
       document.getElementById("step3").classList.remove("active");
       document.getElementById(`step${step}`).classList.add("active");
     }

     // Função para navegar entre passos
     function navigateToStep(step) {
       if (step === 2 && !userEmail) {
         showAlert("Por favor, insira o seu email primeiro.", "danger");
         return;
       }

       if (step === 3) {
         // Preencher o campo oculto com o email guardado
         const emailHidden = document.getElementById("userEmail");
         if (emailHidden && userEmail) {
           emailHidden.value = userEmail;
         }
       }

       currentStep = step;
       updateStepper(step);
       updateURL("p" + step, "step");
     }

     // Event Listeners

     // Passo 1: Enviar email
     document.getElementById("step1Form").addEventListener("submit", async (e) => {
       e.preventDefault();

       const email = document.getElementById("email").value;
       const btn = document.getElementById("btnStep1");
       const spinner = document.getElementById("spinnerStep1");

       if (!email) {
         showAlert("Por favor, insira um email válido.", "danger");
         return;
       }

       btn.disabled = true;
       spinner.style.display = "inline-block";

       console.log(JSON.stringify({ email: email }));
       try {
         const response = await fetch("/public/admin/recoverLoginSimple", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ email: email }),
         });

         //console.log("depois disto")
         const data = await response.json();
         console.log(data);
         //console.log("antes disto")
         console.log(response);
         if (response.ok && data.status == 200) {
           userEmail = email;
           localStorage.setItem("recoverEmail", email);
           showAlert("Código enviado com sucesso! Verifique o seu email.", "success");
           navigateToStep(2);

           document.getElementById("emailInfo").innerHTML = `
                       <i class="bi bi-info-circle"></i>
                       Digite o código de 6 dígitos que foi enviado para <strong>${email}</strong>
                   `;
         } else {
           showAlert(data.message || "Erro ao enviar código. Tente novamente.", "danger");
         }
       } catch (error) {
         console.error("Erro:", error);
         showAlert("Erro de conexão. Tente novamente.", "danger");
       } finally {
         btn.disabled = false;
         spinner.style.display = "none";
       }
     });

     // Passo 2: Verificar código
     document.getElementById("step2Form").addEventListener("submit", async (e) => {
       e.preventDefault();

       const code = document.getElementById("code").value;
       const btn = document.getElementById("btnStep2");
       const spinner = document.getElementById("spinnerStep2");

       if (!code || code.length !== 6) {
         showAlert("Por favor, insira o código de 6 dígitos.", "danger");
         return;
       }

       btn.disabled = true;
       spinner.style.display = "inline-block";

       console.log(JSON.stringify({ email: userEmail, code: code }));
       try {
         const response = await fetch("/public/admin/recoverLoginSimple-s2", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             email: userEmail,
             code: code,
           }),
         });

         const data = await response.json();

         console.log(data);
         console.log(response);

         if (response.ok && data.status == 200) {
           showAlert("Código verificado com sucesso!", "success");
           navigateToStep(3);
         } else {
           showAlert(data.message || "Código inválido. Tente novamente.", "danger");
         }
       } catch (error) {
         console.error("Erro:", error);
         showAlert("Erro de conexão. Tente novamente.", "danger");
       } finally {
         btn.disabled = false;
         spinner.style.display = "none";
       }
     });

     // Reenviar código
     document.getElementById("btnResendCode").addEventListener("click", async () => {
       if (!userEmail) {
         showAlert("Email não encontrado. Volte ao passo 1.", "danger");
         navigateToStep(1);
         return;
       }

       const btn = document.getElementById("btnResendCode");
       btn.disabled = true;

       try {
         await sendVerificationCode(userEmail);
         showAlert("Novo código enviado! Verifique o seu email.", "success");
       } catch (error) {
         showAlert("Erro ao reenviar código.", "danger");
       } finally {
         btn.disabled = false;
       }
     });

     // Passo 3: Validação de força da password
     const passwordInput = document.getElementById("password");
     const strengthBar = document.getElementById("passwordStrengthBar");
     const strengthText = document.getElementById("strengthText");

     passwordInput.addEventListener("input", function () {
       const password = this.value;
       let strength = 0;

       if (password.length >= 8) strength += 25;
       if (password.match(/[a-z]+/)) strength += 25;
       if (password.match(/[A-Z]+/)) strength += 25;
       if (password.match(/[0-9]+/)) strength += 25;
       if (password.match(/[$@#&!]+/)) strength += 25;

       strength = Math.min(strength, 100);
       strengthBar.style.width = strength + "%";

       if (strength < 30) {
         strengthBar.style.background = "#dc3545";
         strengthText.textContent = "Fraca";
         strengthText.style.color = "#dc3545";
       } else if (strength < 60) {
         strengthBar.style.background = "#ffc107";
         strengthText.textContent = "Média";
         strengthText.style.color = "#ffc107";
       } else if (strength < 80) {
         strengthBar.style.background = "#17a2b8";
         strengthText.textContent = "Boa";
         strengthText.style.color = "#17a2b8";
       } else {
         strengthBar.style.background = "#28a745";
         strengthText.textContent = "Excelente";
         strengthText.style.color = "#28a745";
       }
     });

     // Validar confirmação de password
     document.getElementById("confirmPassword").addEventListener("input", function () {
       const password = document.getElementById("password").value;
       const confirm = this.value;

       if (confirm === "") {
         this.classList.remove("is-valid", "is-invalid");
       } else if (password === confirm) {
         this.classList.add("is-valid");
         this.classList.remove("is-invalid");
       } else {
         this.classList.add("is-invalid");
         this.classList.remove("is-valid");
       }
     });

     function loadStep3Data() {
       const emailFromStorage = localStorage.getItem("recoverEmail");
       if (emailFromStorage) {
         userEmail = emailFromStorage;
         const emailHidden = document.getElementById("userEmail");
         if (emailHidden) {
           emailHidden.value = userEmail;
         }
       }
     }

     // Submissão do passo 3
     document.getElementById("step3Form").addEventListener("submit", async (e) => {
       e.preventDefault();

       const password = document.getElementById("password").value;
       const confirmPassword = document.getElementById("confirmPassword").value;
       const btn = document.getElementById("btnStep3");
       const spinner = document.getElementById("spinnerStep3");

       if (password !== confirmPassword) {
         showAlert("As passwords não coincidem", "danger");
         return;
       }

       btn.disabled = true;
       spinner.style.display = "inline-block";

       try {
         const response = await fetch("/public/api/utilizadores/new-password", {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             Passw: password,
             email: userEmail,
           }),
         });

         const data = await response.json();

         if (response.ok && data.status == 200) {
           showAlert("Password alterada com sucesso! A redirecionar para o login...", "success");
           localStorage.removeItem("recoverEmail");
           setTimeout(() => {
             window.location.href = "/public/login";
           }, 2000);
         } else {
           showAlert(data.message || "Erro ao alterar password. Tente novamente.", "danger");
         }
       } catch (error) {
         console.error("Erro:", error);
         showAlert("Erro de conexão. Tente novamente.", "danger");
       } finally {
         btn.disabled = false;
         spinner.style.display = "none";
       }
     });

     // Inicialização
     function init() {
       const urlStep = getURLParam("step");
       let initialStep = 1;

       if (urlStep === "p2") initialStep = 2;
       else if (urlStep === "p3") initialStep = 3;

       if (userEmail && initialStep === 1) {
         initialStep = 2;
       }

       currentStep = initialStep;
       updateStepper(currentStep);
       updateURL("p" + currentStep, "step");

       if (userEmail) {
         document.getElementById("emailInfo").innerHTML = `
                   <i class="bi bi-info-circle"></i>
                   Digite o código de 6 dígitos que foi enviado para <strong>${userEmail}</strong>
               `;
       }
     }

     window.addEventListener("popstate", (event) => {
       const urlStep = getURLParam("step");
       let step = 1;
       if (urlStep === "p2") step = 2;
       else if (urlStep === "p3") step = 3;

       currentStep = step;
       updateStepper(step);
     });

     init();