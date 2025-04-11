// index.js (login)
const loginForm = document.getElementById("login-form");
const mensagemErro = document.getElementById("mensagem-erro");

const loginCorreto = {
  email: "admin@acoditools.com",
  senha: "123456",
};

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const emailDigitado = document.getElementById("email").value;
  const senhaDigitada = document.getElementById("senha").value;

  if (emailDigitado === loginCorreto.email && senhaDigitada === loginCorreto.senha) {
    sessionStorage.setItem("isLoggedIn", "true");
    window.location.href = "../Auditor/dashboard.html";
  } else {
    mensagemErro.style.display = "block";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
  }
});