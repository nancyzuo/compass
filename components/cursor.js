// cursor.js

// Unicode star character to use
const starChar = "✦";

// Function to create and animate a star at given coordinates
function createStar(x, y) {
  const star = document.createElement("div");
  star.className = "star";
  star.textContent = starChar;
  star.style.left = x + "px";
  star.style.top = y + "px";
  document.body.appendChild(star);

  // Animate opacity fade and removal
  star.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 1000,
    easing: "ease-out",
  });

  setTimeout(() => {
    star.remove();
  }, 1000);
}

// Listen for mousemove events to create stars following the cursor
window.addEventListener("mousemove", (e) => {
  createStar(e.clientX, e.clientY);
});
