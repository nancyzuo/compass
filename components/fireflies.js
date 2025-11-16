const fireflyCount = 30; // number of fireflies
const body = document.body;

for (let i = 0; i < fireflyCount; i++) {
  const firefly = document.createElement("div");
  firefly.classList.add("firefly");

  // Random initial position
  firefly.style.top = Math.random() * window.innerHeight + "px";
  firefly.style.left = Math.random() * window.innerWidth + "px";

  // Random animation delay and duration for natural effect
  firefly.style.animationDelay = Math.random() * 3 + "s";
  firefly.style.animationDuration = 2 + Math.random() * 3 + "s";

  body.appendChild(firefly);
}
