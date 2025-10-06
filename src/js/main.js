import { addObject, getMass, updatePhysics } from "./object.js";

const app = document.querySelector(".app");

// Add object on click
app.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  addObject(x, y);
});

// Add object with random velocity on right-click
app.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // Prevent context menu

  const x = e.clientX;
  const y = e.clientY;

  // Random velocity for orbiting
  const speed = Math.random() * 5 + 2; // From 2 to 7
  const angle = Math.random() * Math.PI * 2; // Random direction

  const velocityX = Math.cos(angle) * speed;
  const velocityY = Math.sin(angle) * speed;

  addObject(x, y, velocityX, velocityY);
});

setInterval(updatePhysics, 1000 / 60); // 60 FPS
