
// Enquanto não tem banco de dados:
document.addEventListener("DOMContentLoaded", () => {
  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString("pt-BR");
  document.getElementById("dataSistema").textContent =
    `Visão geral do sistema em ${dataFormatada}`;
});
// dashboard.js - Filtro + Gráfico de conformidade + Análise de risco dinâmica

document.addEventListener("DOMContentLoaded", () => {
  // Filtro por descrição ou categoria
  const searchInput = document.getElementById("searchInput");
  const rows = document.querySelectorAll(".audit-table tbody tr");

  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      const termo = searchInput.value.toLowerCase();
      rows.forEach(row => {
        const descricao = row.children[1].textContent.toLowerCase();
        const categoria = row.children[2].textContent.toLowerCase();
        row.style.display = (descricao.includes(termo) || categoria.includes(termo)) ? "" : "none";
      });
    });
  }

  // Dados simulados
  const conformes = 6;
  const naoConformes = 2;
  const pendentes = 2;
  const total = conformes + naoConformes + pendentes;

  // Gráfico de conformidade animado
  const ctx = document.getElementById("graficoConformidade");
  if (ctx) {
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Conformes", "Não Conformes", "Pendentes"],
        datasets: [{
          data: [conformes, naoConformes, pendentes],
          backgroundColor: ["#27ae60", "#e74c3c", "#f1c40f"],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    });
  } 
}); // ← Fim do DOMContentLoaded