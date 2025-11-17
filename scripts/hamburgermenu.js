import { waitForElement } from "./common.js"

waitForElement("nav-toggle-button", (navToggle) => {
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
});
