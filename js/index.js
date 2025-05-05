document.addEventListener('DOMContentLoaded', function() {
    // Selecionar elementos do DOM
    const loginForm = document.querySelector('.login-form');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    const profileOptions = document.querySelectorAll('.profile-option input');
    const emailInput = document.getElementById('inputEmailLogin');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = loginForm.querySelector('button[type="submit"]');

    // Definir limite máximo da senha
    passwordInput.setAttribute('maxlength', '20');

    // ===== 1. Seleção padrão de perfil (Aluno) =====
    function setDefaultProfileSelection() {
        const alunoOption = document.querySelector('input[value="aluno"]');
        if (alunoOption) {
            alunoOption.checked = true;
            alunoOption.closest('.profile-option').classList.add('selected');
            configurarCampoParaAluno();
        }
    }

    // ===== 2. Alternar visibilidade da senha (mostrar/ocultar) =====
    function setupPasswordToggle() {
        togglePasswordIcons.forEach(icon => {
            icon.setAttribute('title', 'Mostrar/ocultar senha'); // Acessibilidade
            icon.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
                this.style.color = type === 'text' ? '#764ba2' : '#888';
            });
        });
    }

    // ===== 3. Estilo visual ao selecionar o perfil =====
    function setupProfileSelection() {
        profileOptions.forEach(option => {
            option.addEventListener('change', function() {
                document.querySelectorAll('.profile-option').forEach(opt => opt.classList.remove('selected'));
                if (this.checked) {
                    this.closest('.profile-option').classList.add('selected');
                }
            });
        });
    }

    // ===== 4. Validação para RM (aluno) =====
    function validarRM(e) {
        let value = e.target.value.replace(/\D/g, "").slice(0, 5);
        e.target.value = value;
        e.target.style.borderColor = value.length === 5 ? '#4CAF50' : '#f44336';
    }

    // ===== 5. Validação para Login (coordenação) =====
    function validarLogin(e) {
        let value = e.target.value.replace(/\D/g, "").slice(0, 8);
        e.target.value = value;
        e.target.style.borderColor = value.length === 8 ? '#4CAF50' : '#f44336';
    }

    // ===== 6. Aplicar máscara no CNPJ (empresa) =====
    function aplicarMascaraCNPJ(e) {
        let value = e.target.value.replace(/\D/g, "").slice(0, 14);
        value = value
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");
        e.target.value = value;
    }

    // ===== 7. Configurar campo de entrada de acordo com o perfil selecionado =====
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

    // === Funções auxiliares para configurar o campo ===
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

    // ===== 8. Validação final do formulário antes de enviar =====
    function setupFormValidation() {
        loginForm.addEventListener('submit', function(event) {
            const inputValue = emailInput.value.replace(/\D/g, "");
            const senha = passwordInput.value;
            const perfil = document.querySelector('input[name="profile"]:checked').value;

            if (perfil === 'coordenacao' && inputValue.length !== 8) {
                alert('O login da Coordenação deve conter exatamente 8 números.');
                event.preventDefault();
                return;
            }

            if (perfil === 'aluno' && inputValue.length !== 5) {
                alert('O RM do Aluno deve conter exatamente 5 números.');
                event.preventDefault();
                return;
            }

            if (perfil === 'empresa' && inputValue.length !== 14) {
                alert('Por favor, insira um CNPJ válido com 14 dígitos.');
                event.preventDefault();
                return;
            }

            if (senha.length < 7) {
                alert('A senha deve ter no mínimo 7 caracteres.');
                event.preventDefault();
                return;
            }

            if (senha.length > 20) {
                alert('A senha não pode ultrapassar 20 caracteres.');
                event.preventDefault();
                return;
            }

            // Prevenção de múltiplos envios
            submitButton.innerText = 'Entrando...';
            submitButton.disabled = true;
        });

        // Bloquear envio com Enter se botão estiver desativado
        loginForm.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && submitButton.disabled) {
                e.preventDefault();
            }
        });
    }

    // ===== Inicializar funcionalidades =====
    setDefaultProfileSelection();
    setupPasswordToggle();
    setupProfileSelection();
    configurarCampoIdentificacao();
    setupFormValidation();
});
