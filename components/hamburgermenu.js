const navToggle = document.getElementById("nav-toggle-button");
const overlay = document.getElementById("mobile-menu-overlay");

navToggle.addEventListener("click", () => {
  const isActive = overlay.classList.toggle("active");
  navToggle.textContent = isActive ? "×" : "☰";
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    // only if clicking background overlay closes menu
    overlay.classList.remove("active");
    navToggle.textContent = "☰";
  }
});
