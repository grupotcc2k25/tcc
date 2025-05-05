// Impede acesso à páginaslide sem estar logado
if (sessionStorage.getItem('logado') !== 'true') {
  window.location.replace('../html/index.html');
}

// Swiper
new Swiper(".wrapper", {
  loop: true,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

// Toggle dropdown
function toggleProfileMenu() {
  const dropdown = document.getElementById('profileDropdown');
  dropdown.classList.toggle('active');
}

// Fecha o dropdown clicando fora
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('profileDropdown');
  const userCard = document.querySelector('.user-profile'); // <-- corrigido

  if (!dropdown.contains(event.target) && !userCard.contains(event.target)) {
    dropdown.classList.remove('active');
  }
});

// Logout
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logout-button");

  logoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    const confirmLogout = confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
      alert("Você saiu com sucesso.");
      sessionStorage.removeItem("logado");
      window.location.href = "../html/index.html";
    }
  });
});
