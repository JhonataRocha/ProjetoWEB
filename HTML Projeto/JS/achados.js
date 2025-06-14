
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/achados")
        .then(res => res.json())
        .then(achados => {
            const tabela = document.getElementById("tabelaAchados");
            achados.forEach(a => {
                const linha = `
                    <tr>
                        <td>${a.id}</td>
                        <td>${a.descricao}</td>
                        <td>${a.auditoria_id}</td>
                        <td>${a.status}</td>
                        <td>${a.data}</td>
                    </tr>`;
                tabela.innerHTML += linha;
            });
        })
        .catch(err => console.error("Erro ao carregar achados:", err));
});
