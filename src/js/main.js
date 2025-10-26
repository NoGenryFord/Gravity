import { addObject, getMass, updatePhysics } from "./object.js";
import "/src/scss/style.scss";

const app = document.querySelector(".app");

// FPS Counter
const fpsCounter = () => {
  let lastTime = performance.now();
  let frameCount = 0;
  const fpsDisplay = document.querySelector(".fps");

  const updateFPS = () => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;

    frameCount++;
    if (deltaTime > 1000) {
      fpsDisplay.textContent = frameCount;
      frameCount = 0;
      lastTime = currentTime;
    }

    requestAnimationFrame(updateFPS);
  };

  requestAnimationFrame(updateFPS);
};

const counterObjects = () => {
  const count = document.querySelector(".count");
  const objects = document.querySelectorAll(".object");
  count.textContent = objects.length;
  requestAnimationFrame(counterObjects);
};

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

setInterval(() => {
  updatePhysics();
}, 1000 / 60); // 60 FPS

counterObjects();
fpsCounter();
