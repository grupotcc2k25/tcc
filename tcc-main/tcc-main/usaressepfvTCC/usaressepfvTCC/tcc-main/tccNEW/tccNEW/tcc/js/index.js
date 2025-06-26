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
  
    rmErro.classList.add("oculto");
    loginErro.classList.add("oculto");
    cnpjErro.classList.add("oculto");
    senhaErro.classList.add("oculto");
  
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
  
    if (/^\d{5}$/.test(rm) || rm === "") {
      rmErro.classList.add("oculto");
    } else {
      rmErro.classList.remove("oculto");
    }
  
    validarCampos();
  }
  
  function validarTexto() {
    const usuario = document.querySelector(".usuario").value;
    const tipo = document.getElementById("format").value;
    const loginErro = document.querySelector(".loginErro");
    const cnpjErro = document.querySelector(".cnpjErro");
  
    loginErro.classList.add("oculto");
    cnpjErro.classList.add("oculto");
  
    if (tipo === "coordenacao" && usuario !== "" && !/^\d{8}$/.test(usuario)) {
      loginErro.classList.remove("oculto");
    }
  
    if (tipo === "empresas") {
      const cnpjLimpo = usuario.replace(/\D/g, "");
      if (cnpjLimpo !== "" && !/^\d{14}$/.test(cnpjLimpo)) {
        cnpjErro.classList.remove("oculto");
      }
    }
  
    validarCampos();
  }
  
  function validarSenha() {
    const senha = document.querySelector(".senha").value;
    const senhaErro = document.querySelector(".senhaErro");
  
    if (senha.length >= 7 || senha === "") {
      senhaErro.classList.add("oculto");
    } else {
      senhaErro.classList.remove("oculto");
    }
  
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
      document.querySelector(".formLogin").submit();
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
          botao.click();
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
  
        document.querySelector(".rmErro").classList.add("oculto");
        document.querySelector(".loginErro").classList.add("oculto");
        document.querySelector(".cnpjErro").classList.add("oculto");
        document.querySelector(".senhaErro").classList.add("oculto");
  
        validarCampos();
      }
    });
  
    document.querySelector(".botaoEntrar").addEventListener("click", redirecionar);
  
    history.pushState(null, null, location.href);
    window.addEventListener("popstate", function () {
      history.pushState(null, null, location.href);
    });
  });
  