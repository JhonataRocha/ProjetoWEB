
// login.js

function handleLogin(email, senha) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !senha) {
        showToast('Por favor, preencha o email e a senha.');
        return;
    }
    if (!emailRegex.test(email)) {
        showToast('Por favor, insira um email válido.');
        return;
    }

    const endpoint = 'http://localhost:3000/login';

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha })
    })
    .then(response => {
        if (response.ok) {
            return response.json().then(data => {
                localStorage.setItem('userId', data.user.id);
                window.location.href = '../Auditor/conteudodash.html';
            });
        } else {
            return response.json().then(data => {
                showToast(data.error || 'Falha no login.');
            });
        }
    })
    .catch(() => {
        showToast('Erro de conexão com o servidor.');
    });
}

function showToast(message) {
    alert(message); // Simples para fins acadêmicos
}
