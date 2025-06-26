<?php
session_start();
if (!isset($_SESSION['rm'])) {
    header("Location: ../html/index.php");
    exit();
}


$nome = $_SESSION['nome'];
$rm = $_SESSION['rm'];
?>
<!DOCTYPE html>
<html lang="pt-br" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>Notícias</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Ícones do Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>

    <!-- Estilo da biblioteca Swiper -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

    <!-- Estilo personalizado -->
    <link rel="stylesheet" href="../css/style_slide.css" />
  </head>

  <body>
    <!-- INÍCIO DA NAVBAR -->
    <nav>
      <!-- Ícone do menu hambúrguer (mobile) -->
      <div class="menu-icon">
        <span class="fas fa-bars"></span>
      </div>

      <!-- Container do perfil com imagem e dropdown -->
      <div class="profile-container">
        <img src="../img/relogio.png" alt="Perfil" class="profile-icon" id="profileBtn" />
        <div class="dropdown-menu" id="dropdownMenu">
          <div class="profile-info">
            <img src="../img/relogio.png" alt="Perfil" />
            <h3><?php echo htmlspecialchars($nome); ?></h3>
            <p>RM: <?php echo htmlspecialchars($rm); ?></p>
          </div>
          <a href="#">🧑‍💼 Suporte</a>
          <a href="#" onclick="confirmarLogout()">🚪 Sair</a>
        </div>
      </div>

      <!-- Logo -->
      <div class="logo">
        <a href="paginaslide.php">SRA</a>
      </div>

      <!-- Itens da navbar -->
      <div class="nav-items">
        <li><a href="../html/horas.html">Horas</a></li>
        <li><a href="../html/relatorio.html">Relatórios</a></li>
        <li><a href="../html/certificados.html">Certificados</a></li>
        <li><a href="../html/palestras.html">Palestras</a></li>
      </div>

      <!-- Ícone para fechar menu mobile -->
      <div class="cancel-icon">
        <span class="fas fa-times"></span>
      </div>
    </nav>
    <!-- FIM DA NAVBAR -->

    <!-- Espaçadores do conteúdo principal -->
    <div class="content">
      <header class="space"></header>
      <div class="space text"></div>
    </div>

    <!-- CONTAINER DO SLIDER (Swiper.js) -->
    <div class="container swiper">
      <div class="wrapper">
        <div class="card-list swiper-wrapper">

          <!-- CARD DE NOTÍCIA (modelo replicado 5 vezes) -->
          <!-- CARD 1 -->
          <div class="card swiper-slide">
            <div class="card-image">
              <img src="../img/gamerscom-fatec-taquaritinga.jpg" />
            </div>
            <div class="card-content">
              <h3 class="card-title">CPS levará estudantes e professores para ‘Gamescom Latam 2025’</h3>
              <p class="card-text">Etecs e Fatecs contarão com 1,5 mil ingressos gratuitos...</p>
              <div class="card-footer">
                <a href="https://www.cps.sp.gov.br/cps-levara-estudantes-e-professores-para-gamescom-latam-2025/" target="_blank" class="card-button">Saiba Mais</a>
              </div>
            </div>
          </div>

          <!-- CARD 2 -->
          <div class="card swiper-slide">
            <div class="card-image">
              <img src="../img/feirasdeinstitutos.jpg" />
            </div>
            <div class="card-content">
              <h3 class="card-title">CPS recebe sexta edição da Feira de Institutos Politécnicos Portugueses</h3>
              <p class="card-text">Evento contou com a participação de representantes...</p>
              <div class="card-footer">
                <a href="https://www.cps.sp.gov.br/cps-recebe-sexta-edicao-da-feira-de-institutos-politecnicos-portugueses" target="_blank" class="card-button">Saiba Mais</a>
              </div>
            </div>
          </div>

          <!-- CARD 3 -->
          <div class="card swiper-slide">
            <div class="card-image">
              <img src="../img/cpsayrton.jpeg" />
            </div>
            <div class="card-content">
              <h3 class="card-title">Gestores do Centro Paula Souza visitam sede do Instituto Ayrton Senna</h3>
              <p class="card-text">ONG mantém parceria com CPS voltada ao desenvolvimento socioemocional...</p>
              <div class="card-footer">
                <a href="https://www.cps.sp.gov.br/gestores-do-centro-paula-souza-visitam-sede-do-instituto-ayrton-senna/" target="_blank" class="card-button">Saiba Mais</a>
              </div>
            </div>
          </div>

          <!-- CARD 4 -->
          <div class="card swiper-slide">
            <div class="card-image">
              <img src="../img/inscriçoes.jpg" />
            </div>
            <div class="card-content">
              <h3 class="card-title">Centro Paula Souza prorroga inscrições para 20ª Escola de Inovadores</h3>
              <p class="card-text">Curso online gratuito ensina pessoas com espírito empreendedor...</p>
              <div class="card-footer">
                <a href="https://www.cps.sp.gov.br/cps-prorroga-inscricoes-para-20a-escola-de-inovadores/" target="_blank" class="card-button">Saiba Mais</a>
              </div>
            </div>
          </div>

          <!-- CARD 5 -->
          <div class="card swiper-slide">
            <div class="card-image">
              <img src="../img/etec.jpg" />
            </div>
            <div class="card-content">
              <h3 class="card-title">Etecs e Fatecs oferecem consultoria gratuita para declaração do IRPF</h3>
              <p class="card-text">Prazo para prestar contas à Receita Federal segue até 30 de maio...</p>
              <div class="card-footer">
                <a href="https://www.cps.sp.gov.br/etecs-e-fatecs-oferecem-consultoria-para-declaracao-do-irpf-2/" target="_blank" class="card-button">Saiba Mais</a>
              </div>
            </div>
          </div>

        </div>

        <!-- Botões de navegação do Swiper -->
        <div class="swiper-slide-button swiper-button-prev"></div>
        <div class="swiper-slide-button swiper-button-next"></div>
      </div>
    </div>

    <!-- SCRIPTS -->
    <!-- Biblioteca Swiper -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <!-- Script personalizado -->
    <script src="../js/pagina_slide.js"></script>

    <script>
  // --- Bloqueio do botão Voltar ---
  function bloquearVoltar() {
    history.pushState(null, null, location.href);
  }

  // --- Logout ---
  function confirmarLogout() {
    const confirmar = confirm("Tem certeza que deseja sair?");
    if (confirmar) {
      sessionStorage.clear();
      window.removeEventListener("popstate", bloquearVoltar);
      window.location.replace("logout.php"); // Correção aqui!
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Referências
    const menuBtn = document.querySelector(".menu-icon span");
    const cancelBtn = document.querySelector(".cancel-icon");
    const navItems = document.querySelector(".nav-items");
    const profileBtn = document.getElementById("profileBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");

    // --- Menu Mobile ---
    if (menuBtn && cancelBtn && navItems) {
      menuBtn.addEventListener("click", () => {
        navItems.classList.add("active");
        menuBtn.classList.add("hide");
        cancelBtn.classList.add("show");
      });

      cancelBtn.addEventListener("click", () => {
        navItems.classList.remove("active");
        menuBtn.classList.remove("hide");
        cancelBtn.classList.remove("show");
        cancelBtn.style.color = "#ff3d00";
      });
    }

    // Ativa o bloqueio do botão voltar
    history.pushState(null, null, location.href);
    window.addEventListener("popstate", bloquearVoltar);

    // --- Dropdown do perfil ---
    if (profileBtn && dropdownMenu) {
      profileBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("show");
      });

      window.addEventListener("click", (e) => {
        if (!profileBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownMenu.classList.remove("show");
        }
      });
    }

    // --- Exibir nome e RM no topo ---
    const nomeUsuario = sessionStorage.getItem("nome");
    const rmUsuario = sessionStorage.getItem("rm");

    if (nomeUsuario && rmUsuario) {
      const nomeEl = document.getElementById("nomeUsuario");
      const rmEl = document.getElementById("rmUsuario");

      if (nomeEl) nomeEl.textContent = nomeUsuario;
      if (rmEl) rmEl.textContent = "RM: " + rmUsuario;
    }
  });
</script>


  </body>
</html>
