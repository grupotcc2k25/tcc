<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <link rel="stylesheet" href="../css/style_index.css">
  <title>Login</title>
</head>
<body>
  <div class="main-login">
    <div class="left-login">
      <h1>Em dúvida sobre quantas horas tem?<br />Faça seu login e fique por dentro de tudo!</h1>

    </div>

    <div class="right-login">
      <div class="card-login">
        <h1>LOGIN</h1>
        <form action="../php/login.php" method="post" class="formLogin">
          <div class="textfield">
            <label for="format">Quem é você?</label>
            <div class="select">
              <div class="block"></div>
              <select name="format" id="format" onchange="trocarLabel()">
                <option value="" disabled selected hidden>Selecione...</option>
                <option value="alunos">Aluno</option>
                <option value="coordenacao">Coordenação</option>
                <option value="empresas">Empresa</option>
              </select>
            </div>

            <label for="inputUsuario" id="labelUsuario">RM:</label>
            <input
              type="text"
              class="usuario"
              name="rm"
              maxlength="5"
              placeholder="Digite seu RM"
              id="inputUsuario"
              disabled
            />
            <p class="rmErro" style="color: red; display: none;">O RM deve conter exatamente 5 dígitos</p>
            <p class="loginErro" style="color: red; display: none;">O login deve conter 8 números</p>
            <p class="cnpjErro" style="color: red; display: none;">Digite somente os números do CNPJ</p>

            <label for="senha">Senha:</label>
            <input
              type="password"
              class="senha"
              name="senha"
              maxlength="20"
              placeholder="Digite sua senha"
              required
            />
            <p class="senhaErro" style="color: red; display: none;">Sua senha deve conter no mínimo 7 caracteres</p>
          </div>

          <button type="submit" class="botaoEntrar" disabled>Entrar</button>
        </form>
      </div>
    </div>
  </div>

  <!-- Script JavaScript -->
  <script>
  function trocarLabel() {
    const select = document.getElementById("format");
    const label = document.getElementById("labelUsuario");
    const input = document.getElementById("inputUsuario");
    const senhaInput = document.querySelector(".senha");

    const rmErro = document.querySelector(".rmErro");
    const loginErro = document.querySelector(".loginErro");
    const cnpjErro = document.querySelector(".cnpjErro");
    const senhaErro = document.querySelector(".senhaErro");

    const tipo = select.value;

    input.disabled = false;
    senhaInput.disabled = false;
    input.value = "";
    senhaInput.value = "";

    rmErro.style.display = "none";
    loginErro.style.display = "none";
    cnpjErro.style.display = "none";
    senhaErro.style.display = "none";

    input.removeEventListener("input", validarRM);
    input.removeEventListener("input", validarTexto);
    input.removeEventListener("input", aplicarMascaraCNPJ);
    input.removeEventListener("keypress", bloquearNaoNumeros);

    if (tipo === "alunos") {
      label.textContent = "RM:";
      input.placeholder = "Digite seu RM";
      input.maxLength = 5;
      input.addEventListener("input", validarRM);
      input.addEventListener("keypress", bloquearNaoNumeros);
    } else if (tipo === "coordenacao") {
      label.textContent = "Login:";
      input.placeholder = "Digite seu login";
      input.maxLength = 8;
      input.addEventListener("input", validarTexto);
      input.addEventListener("keypress", bloquearNaoNumeros);
    } else if (tipo === "empresas") {
      label.textContent = "CNPJ:";
      input.placeholder = "Digite o CNPJ";
      input.maxLength = 18;
      input.addEventListener("input", aplicarMascaraCNPJ);
      input.addEventListener("input", validarTexto);
      input.addEventListener("keypress", bloquearNaoNumeros);
    }

    validarCampos();
  }

  function bloquearNaoNumeros(e) {
    if (!/\d/.test(e.key)) {
      e.preventDefault();
    }
  }

  function validarRM() {
    const rm = document.querySelector(".usuario").value;
    const rmErro = document.querySelector(".rmErro");
    rmErro.style.display = /^\d{5}$/.test(rm) || rm === "" ? "none" : "block";
    validarCampos();
  }

  function validarTexto() {
    const usuario = document.querySelector(".usuario").value;
    const tipo = document.getElementById("format").value;
    const loginErro = document.querySelector(".loginErro");
    const cnpjErro = document.querySelector(".cnpjErro");

    loginErro.style.display = "none";
    cnpjErro.style.display = "none";

    if (tipo === "coordenacao" && usuario !== "" && !/^\d{8}$/.test(usuario)) {
      loginErro.style.display = "block";
    }

    if (tipo === "empresas") {
      const cnpjLimpo = usuario.replace(/\D/g, "");
      if (cnpjLimpo !== "" && !/^\d{14}$/.test(cnpjLimpo)) {
        cnpjErro.style.display = "block";
      }
    }

    validarCampos();
  }

  function validarSenha() {
    const senha = document.querySelector(".senha").value;
    const senhaErro = document.querySelector(".senhaErro");
    senhaErro.style.display = senha.length >= 7 || senha === "" ? "none" : "block";
    validarCampos();
  }

  function validarCampos() {
    const tipo = document.getElementById("format").value;
    const usuario = document.querySelector(".usuario").value;
    const senha = document.querySelector(".senha").value;
    const botao = document.querySelector(".botaoEntrar");

    let usuarioValido = false;

    if (tipo === "alunos") {
      usuarioValido = /^\d{5}$/.test(usuario);
    } else if (tipo === "coordenacao") {
      usuarioValido = /^\d{8}$/.test(usuario);
    } else if (tipo === "empresas") {
      const cnpjLimpo = usuario.replace(/\D/g, "");
      usuarioValido = /^\d{14}$/.test(cnpjLimpo);
    }

    botao.disabled = !(usuarioValido && senha.length >= 7);
  }

  function redirecionar() {
    const tipo = document.getElementById("format").value;
    const usuario = document.querySelector(".usuario").value;
    const senha = document.querySelector(".senha").value;
    const cnpjLimpo = usuario.replace(/\D/g, "");

    if (
      (tipo === "alunos" && /^\d{5}$/.test(usuario)) ||
      (tipo === "coordenacao" && /^\d{8}$/.test(usuario)) ||
      (tipo === "empresas" && /^\d{14}$/.test(cnpjLimpo))
    ) {
      // Aqui você pode enviar o formulário ou continuar o login normalmente
      document.querySelector(".formLogin").submit(); // Se você estiver usando um formulário com essa classe
    }
  }

  function aplicarMascaraCNPJ(e) {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 14) valor = valor.slice(0, 14);

    let formatado = valor;
    if (valor.length > 2) formatado = valor.slice(0, 2) + "." + valor.slice(2);
    if (valor.length > 5) formatado = formatado.slice(0, 6) + "." + formatado.slice(6);
    if (valor.length > 8) formatado = formatado.slice(0, 10) + "/" + formatado.slice(10);
    if (valor.length > 12) formatado = formatado.slice(0, 15) + "-" + formatado.slice(15);

    e.target.value = formatado;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const inputUsuario = document.getElementById("inputUsuario");
    const inputSenha = document.querySelector(".senha");
    const botao = document.querySelector(".botaoEntrar");

    document.querySelector(".usuario").value = "";
    document.querySelector(".senha").value = "";
    document.querySelector(".usuario").addEventListener("input", validarRM);
    document.querySelector(".senha").addEventListener("input", validarSenha);
    document.querySelector(".usuario").addEventListener("keypress", bloquearNaoNumeros);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!botao.disabled) {
          botao.click(); // Simula clique no botão de login
        }
      }

      if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        inputUsuario.focus();
      }

      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        inputSenha.focus();
      }

      if (e.key === "Escape") {
        inputUsuario.value = "";
        inputSenha.value = "";

        document.querySelector(".rmErro").style.display = "none";
        document.querySelector(".loginErro").style.display = "none";
        document.querySelector(".cnpjErro").style.display = "none";
        document.querySelector(".senhaErro").style.display = "none";

        validarCampos();
      }
    });

    document.querySelector(".botaoEntrar").addEventListener("click", redirecionar);

    // Bloqueio de voltar
    history.pushState(null, null, location.href);
    window.addEventListener("popstate", function () {
      history.pushState(null, null, location.href);
    });
  });
</script>


</body>
</html>
