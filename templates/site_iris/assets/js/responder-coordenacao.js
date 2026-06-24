const readContacto = async (id) => {
    try {
        const response = await fetch("/public/api/contactos/" + id);
        if (!response.ok) {
            throw new Error(`Erro ao carregar contacto: ${response.status}`);
        }
        const dataArray = await response.json();
        
        // Assume que a API retorna um array; se retornar apenas um objeto, remove o ciclo 'for'
        for (const dataRecord of dataArray) {
            document.getElementById("nome").value = dataRecord.nome || "";
            document.getElementById("email").value = dataRecord.email || "";
            document.getElementById("email_envio").value = dataRecord.email || "";
            document.getElementById("telefone").value = dataRecord.telefone || "";
            document.getElementById("assunto").value = dataRecord.assunto || "";
            document.getElementById("mensagem").value = dataRecord.mensagem || "";
            document.getElementById("id").value = dataRecord.id || "";
        }
    } catch (error) {
        console.error("Erro no readContacto:", error);
    }
};

const updateData = async () => {
    try {
        const dataSend = {
            id: document.getElementById("id").value,
            resposta: document.getElementById("resposta").value,
            estado: document.getElementById("estado").value,
            email_envio: document.getElementById("email_envio").value,
        };

        const response = await fetch("/public/api/contactos/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer your-token",
            },
            body: JSON.stringify(dataSend),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        document.getElementById("resp").innerHTML = "Resposta enviada por email!";
        const dadosResposta = await response.json();
        console.log("Data updated:", dadosResposta);

    } catch (erro) {
        console.error("Error updating data:", erro);
        document.getElementById("resp").innerHTML = "Erro ao enviar resposta.";
    }
};