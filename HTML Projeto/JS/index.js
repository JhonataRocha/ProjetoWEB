
// index.js
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("senha").value;
            handleLogin(email, senha);
        });
    }
});
