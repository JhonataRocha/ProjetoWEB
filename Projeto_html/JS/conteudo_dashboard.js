// dashboard.js
// Função auxiliar para formatar a data no padrão brasileiro
function formatarDataBrasileira(data) {
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Função para filtrar linhas da tabela
function filtrarTabela(termo, linhas) {
  termo = termo.toLowerCase();
  linhas.forEach((linha) => {
    const descricao = linha.children[1]?.textContent.toLowerCase() || "";
    const categoria = linha.children[2]?.textContent.toLowerCase() || "";
    linha.style.display = descricao.includes(termo) || categoria.includes(termo) ? "" : "none";
  });
}

// Dados fictícios para o gráfico
const dadosGrafico = {
  conformes: 6,
  naoConformes: 2,
  pendentes: 2,
  cores: ["#27ae60", "#e74c3c", "#f1c40f"],
  labels: ["Conformes", "Não Conformes", "Pendentes"],
};

// Verifica autenticação e inicializa o dashboard
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const dashboardContainer = document.querySelector(".dashboard-container");
  const contentContainer = document.querySelector(".content-container");

  // Se não estiver logado, redireciona para o login
  if (!isLoggedIn) {
    window.location.href = "../inicial/index.html";
    return;
  }

  // Remove a classe hidden para mostrar o conteúdo
  if (dashboardContainer) {
    dashboardContainer.classList.remove("hidden");
  }
  if (contentContainer) {
    contentContainer.classList.remove("hidden");
  }

  // --- Parte 1: Exibir data atual ---
  const dataSistema = document.getElementById("dataSistema");
  if (dataSistema) {
    const hoje = new Date();
    dataSistema.textContent = `Visão geral do sistema em ${formatarDataBrasileira(hoje)}`;
  }

  // --- Parte 2: Filtro de pesquisa ---
  const searchInput = document.getElementById("searchInput");
  const rows = document.querySelectorAll(".audit-table tbody tr");

  if (searchInput && rows.length > 0) {
    searchInput.addEventListener("input", () => {
      filtrarTabela(searchInput.value, rows);
    });
  }

  // --- Parte 3: Gráfico de conformidade ---
  const ctx = document.getElementById("graficoConformidade");
  if (ctx && typeof Chart !== "undefined") {
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: dadosGrafico.labels,
        datasets: [
          {
            data: [
              dadosGrafico.conformes,
              dadosGrafico.naoConformes,
              dadosGrafico.pendentes,
            ],
            backgroundColor: dadosGrafico.cores,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = context.raw || 0;
                const total =
                  dadosGrafico.conformes +
                  dadosGrafico.naoConformes +
                  dadosGrafico.pendentes;
                const percentual = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentual}%)`;
              },
            },
          },
        },
      },
    });
  }

  // --- Parte 4: Logout ---
  const logoutButton = document.querySelector(".btn-logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      sessionStorage.removeItem("isLoggedIn");
      window.location.href = "../inicial/index.html";
    });
  }
});