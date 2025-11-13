/**
 * login.js - Lógica da página de login do administrador
 */

// Credenciais fixas para o administrador
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: '1234'
};

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se já está logado
    if (isLoggedIn()) {
        window.location.href = 'admin.html';
        return;
    }

    // Event listener para o formulário de login
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
});

/**
 * Processa o login
 */
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Valida as credenciais
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Salva o estado de login no localStorage
        localStorage.setItem('inhire_admin_logged', 'true');
        localStorage.setItem('inhire_admin_login_time', new Date().getTime().toString());

        // Redireciona para a página de administração
        window.location.href = 'admin.html';
    } else {
        showError('Usuário ou senha incorretos!');
    }
}

/**
 * Exibe mensagem de erro
 */
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.display = 'block';

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}

/**
 * Verifica se o usuário está logado
 */
function isLoggedIn() {
    const isLogged = localStorage.getItem('inhire_admin_logged') === 'true';
    const loginTime = parseInt(localStorage.getItem('inhire_admin_login_time') || '0');
    const currentTime = new Date().getTime();
    
    // Sessão expira após 24 horas (86400000 ms)
    const SESSION_DURATION = 24 * 60 * 60 * 1000;
    
    if (isLogged && (currentTime - loginTime) < SESSION_DURATION) {
        return true;
    }

    // Limpa o estado de login se a sessão expirou
    logout();
    return false;
}

/**
 * Remove o estado de login
 */
function logout() {
    localStorage.removeItem('inhire_admin_logged');
    localStorage.removeItem('inhire_admin_login_time');
}
