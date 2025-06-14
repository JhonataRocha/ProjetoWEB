
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/dashboard")
    .then(res => res.json())
    .then(data => {
      document.getElementById("kpiTotal").textContent =
        data.conforme + data.naoConforme + data.pendente;
      document.getElementById("kpiConformes").textContent = data.conforme;
      document.getElementById("kpiNaoConformes").textContent = data.naoConforme;
      document.getElementById("kpiPendentes").textContent = data.pendente;

      const ctx = document.getElementById("graficoConformidade");
      if (ctx) {
        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Conformes", "Não Conformes", "Pendentes"],
            datasets: [{
              data: [data.conforme, data.naoConforme, data.pendente],
              backgroundColor: ["#27ae60", "#e74c3c", "#f1c40f"]
            }]
          },
          options: {
            responsive: false,
            plugins: { legend: { position: "bottom" } }
          }
        });
      }
    })
    .catch(err => console.error("Erro ao carregar dashboard:", err));
});
