
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formAchado");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const descricao = document.getElementById("descricao").value.trim();
        const auditoria_id = parseInt(document.getElementById("auditoria_id").value);
        const status = document.getElementById("status").value;
        const data = document.getElementById("data").value;

        if (!descricao || !auditoria_id || !status || !data) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        fetch("http://localhost:3000/achados", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ descricao, auditoria_id, status, data })
        })
        .then(res => {
            if (res.ok) {
                alert("Achado registrado com sucesso!");
                form.reset();
            } else {
                res.json().then(data => alert(data.error || "Erro ao registrar achado."));
            }
        })
        .catch(err => {
            console.error("Erro:", err);
            alert("Erro de conexão com o servidor.");
        });
    });
});
