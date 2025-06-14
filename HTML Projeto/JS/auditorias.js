
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/auditorias")
        .then(res => res.json())
        .then(auditorias => {
            const tabela = document.getElementById("tabelaAuditorias");
            auditorias.forEach(a => {
                const linha = `
                    <tr>
                        <td>${a.id}</td>
                        <td>${a.titulo}</td>
                        <td>${a.categoria}</td>
                        <td>${a.data}</td>
                        <td>${a.status}</td>
                        <td>${a.usuario_id}</td>
                    </tr>`;
                tabela.innerHTML += linha;
            });
        })
        .catch(err => console.error("Erro ao carregar auditorias:", err));
});
