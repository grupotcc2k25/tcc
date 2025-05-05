// Se o usuário já acessou a páginaslide, bloqueia retorno ao login
if (sessionStorage.getItem('logado') === 'true') {
    window.location.replace('../html/paginaslide.html');
}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    const profileOptions = document.querySelectorAll('.profile-option input');
    const emailInput = document.getElementById('inputEmailLogin');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = loginForm.querySelector('button[type="submit"]');

    passwordInput.setAttribute('maxlength', '20');

    function setDefaultProfileSelection() {
        const alunoOption = document.querySelector('input[value="aluno"]');
        if (alunoOption) {
            alunoOption.checked = true;
            alunoOption.closest('.profile-option').classList.add('selected');
            configurarCampoParaAluno();
        }
    }

    function setupPasswordToggle() {
        togglePasswordIcons.forEach(icon => {
            icon.setAttribute('title', 'Mostrar/ocultar senha');
            icon.addEventListener('click', function () {
                const input = this.previousElementSibling;
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
                this.style.color = type === 'text' ? '#764ba2' : '#888';
            });
        });
    }

    function setupProfileSelection() {
        profileOptions.forEach(option => {
            option.addEventListener('change', function () {
                document.querySelectorAll('.profile-option').forEach(opt => opt.classList.remove('selected'));
                if (this.checked) {
                    this.closest('.profile-option').classList.add('selected');
                }
            });
        });
    }

    function validarRM(e) {
        let value = e.target.value.replace(/\D/g, "").slice(0, 5);
        e.target.value = value;
        e.target.style.borderColor = value.length === 5 ? '#4CAF50' : '#f44336';
    }

    function validarLogin(e) {
        let value = e.target.value.replace(/\D/g, "").slice(0, 8);
        e.target.value = value;
        e.target.style.borderColor = value.length === 8 ? '#4CAF50' : '#f44336';
    }

    function aplicarMascaraCNPJ(e) {
        let value = e.target.value.replace(/\D/g, "").slice(0, 14);
        value = value
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");
        e.target.value = value;
    }

    function configurarCampoIdentificacao() {
        const perfilRadios = document.querySelectorAll('input[name="profile"]');
        perfilRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                emailInput.value = '';
                passwordInput.value = '';
                emailInput.removeEventListener('input', validarRM);
                emailInput.removeEventListener('input', validarLogin);
                emailInput.removeEventListener('input', aplicarMascaraCNPJ);
                emailInput.style.borderColor = '';

                if (radio.value === 'coordenacao') {
                    configurarCampoParaCoordenacao();
                } else if (radio.value === 'empresa') {
                    configurarCampoParaEmpresa();
                } else {
                    configurarCampoParaAluno();
                }
            });
        });
    }

    function configurarCampoParaAluno() {
        emailInput.setAttribute('type', 'text');
        emailInput.setAttribute('inputmode', 'numeric');
        emailInput.setAttribute('placeholder', 'RM (5 dígitos)');
        emailInput.setAttribute('maxlength', '5');
        emailInput.addEventListener('input', validarRM);
    }

    function configurarCampoParaCoordenacao() {
        emailInput.setAttribute('type', 'text');
        emailInput.setAttribute('inputmode', 'numeric');
        emailInput.setAttribute('placeholder', 'Login (8 dígitos)');
        emailInput.setAttribute('maxlength', '8');
        emailInput.addEventListener('input', validarLogin);
    }

    function configurarCampoParaEmpresa() {
        emailInput.setAttribute('type', 'text');
        emailInput.setAttribute('inputmode', 'numeric');
        emailInput.setAttribute('placeholder', 'CNPJ');
        emailInput.removeAttribute('maxlength');
        emailInput.addEventListener('input', aplicarMascaraCNPJ);
    }

    function setupFormValidation() {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const inputValue = emailInput.value.replace(/\D/g, "");
            const senha = passwordInput.value;
            const perfil = document.querySelector('input[name="profile"]:checked').value;

            if (perfil === 'coordenacao' && inputValue.length !== 8) {
                alert('O login da Coordenação deve conter exatamente 8 números.');
                return;
            }

            if (perfil === 'aluno' && inputValue.length !== 5) {
                alert('O RM do Aluno deve conter exatamente 5 números.');
                return;
            }

            if (perfil === 'empresa' && inputValue.length !== 14) {
                alert('Por favor, insira um CNPJ válido com 14 dígitos.');
                return;
            }

            if (senha.length < 7) {
                alert('A senha deve ter no mínimo 7 caracteres.');
                return;
            }

            if (senha.length > 20) {
                alert('A senha não pode ultrapassar 20 caracteres.');
                return;
            }

            submitButton.innerText = 'Entrando...';
            submitButton.disabled = true;

            // Salva o estado de login
            sessionStorage.setItem("logado", "true");
            window.location.replace("../html/paginaslide.html");
        });
    }

    setDefaultProfileSelection();
    setupPasswordToggle();
    setupProfileSelection();
    configurarCampoIdentificacao();
    setupFormValidation();
});

// Impede o botão "voltar" no navegador enquanto estiver no login
window.history.pushState(null, '', window.location.href);
window.addEventListener('popstate', function () {
    window.history.pushState(null, '', window.location.href);
});
