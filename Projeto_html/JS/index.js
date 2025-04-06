const loginForm = document.getElementById("login-form");
const mensagemErro = document.getElementById("mensagem-erro");

const loginCorreto = {
    email: "admin@acoditools.com",
    senha: "123456"
};

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailDigitado = document.getElementById("email").value;
    const senhaDigitada = document.getElementById("senha").value;

    if (emailDigitado === loginCorreto.email && senhaDigitada === loginCorreto.senha) {
        window.location.href = "../Auditor/inicio_dashboard.html";
    } else {
        mensagemErro.style.display = "block";
    }
});