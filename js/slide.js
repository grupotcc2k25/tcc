new Swiper(".wrapper", {
  loop: true, // Permite voltar ao início ao final dos slides
  spaceBetween: 30, // Espaço entre os cards (em pixels)

  autoplay: {
    delay: 5000, // Troca de slide a cada 5 segundos
    disableOnInteraction: false, // Continua mesmo após interação
    pauseOnMouseEnter: true // Pausa ao passar o mouse
  },

  pagination: {
    el: ".swiper-pagination", // Classe dos bullets
    clickable: true, // Permite clicar para navegar
    dynamicBullets: true // Bullets adaptam ao slide visível
  },

  navigation: {
    nextEl: ".swiper-button-next", // Botão de próximo
    prevEl: ".swiper-button-prev"  // Botão de anterior
  },

  breakpoints: {
    0: { slidesPerView: 1 },      // Celular
    768: { slidesPerView: 2 },    // Tablet
    1024: { slidesPerView: 3 },   // Desktop
  }
});
