// Wacht tot de pagina vollediig geladen is
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("menu-toggle");
  const navMenu = document.querySelector("nav ul");

  
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
});



