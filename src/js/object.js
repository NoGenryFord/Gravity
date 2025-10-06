const app = document.querySelector(".app");

const addObject = (x, y, velocityX = 0, velocityY = 0) => {
  const object = document.createElement("div");
  object.classList.add("object");
  object.style.left = `${x}px`;
  object.style.top = `${y}px`;

  // Add physics properties
  object.velocityX = velocityX;
  object.velocityY = velocityY;

  app.appendChild(object);
};

const getMass = (object) => {
  return parseFloat(getComputedStyle(object).width);
};

const updatePhysics = () => {
  const objects = document.querySelectorAll(".object");
  const G = 1; // Gravitational constant
  const restitution = 0.9; // Coefficient of restitution for collisions
  const damping = 0.999; // Velocity damping to simulate friction

  const processedCollisions = new Set();

  objects.forEach((obj1, index1) => {
    const rect1 = obj1.getBoundingClientRect();
    const mass1 = getMass(obj1);
    const radius1 = rect1.width / 2;

    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;

    let forceX = 0;
    let forceY = 0;

    // Calculate gravitational force from other objects
    objects.forEach((obj2, index2) => {
      if (obj1 === obj2) return;

      const rect2 = obj2.getBoundingClientRect();
      const mass2 = getMass(obj2);
      const radius2 = rect2.width / 2;

      const x2 = rect2.left + rect2.width / 2;
      const y2 = rect2.top + rect2.height / 2;

      // Distance between objects
      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Collision detection between objects
      if (distance < radius1 + radius2) {
        const collisionKey = index1 < index2 ? `${index1}-${index2}` : `${index2}-${index1}`;

        if (!processedCollisions.has(collisionKey)) {
          processedCollisions.add(collisionKey);
          // Elastic collision
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          // Rotate velocities
          const vx1 = obj1.velocityX * cos + obj1.velocityY * sin;
          const vy1 = obj1.velocityY * cos - obj1.velocityX * sin;
          const vx2 = obj2.velocityX * cos + obj2.velocityY * sin;
          const vy2 = obj2.velocityY * cos - obj2.velocityX * sin;

          // Apply collision physics (conservation of momentum)
          const finalVx1 = ((mass1 - mass2) * vx1 + 2 * mass2 * vx2) / (mass1 + mass2);
          const finalVx2 = ((mass2 - mass1) * vx2 + 2 * mass1 * vx1) / (mass1 + mass2);

          // Rotate back
          obj1.velocityX = (finalVx1 * cos - vy1 * sin) * restitution;
          obj1.velocityY = (vy1 * cos + finalVx1 * sin) * restitution;
          obj2.velocityX = (finalVx2 * cos - vy2 * sin) * restitution;
          obj2.velocityY = (vy2 * cos + finalVx2 * sin) * restitution;

          // Separate objects to prevent overlap
          const overlap = radius1 + radius2 - distance;
          const moveX = (overlap * dx) / distance / 2;
          const moveY = (overlap * dy) / distance / 2;

          obj1.style.left = `${parseFloat(obj1.style.left) - moveX}px`;
          obj1.style.top = `${parseFloat(obj1.style.top) - moveY}px`;
          obj2.style.left = `${parseFloat(obj2.style.left) + moveX}px`;
          obj2.style.top = `${parseFloat(obj2.style.top) + moveY}px`;
        }
        return;
      }

      if (distance < 1) return; // Prevent extreme forces at very close distances

      // Gravitational force magnitude
      const force = (G * mass1 * mass2) / (distance * distance);

      // Directional components of the force
      forceX += (force * dx) / distance;
      forceY += (force * dy) / distance;
    });

    // Update velocities based on force
    obj1.velocityX += forceX / mass1;
    obj1.velocityY += forceY / mass1;

    // Apply damping for stability
    obj1.velocityX *= damping;
    obj1.velocityY *= damping;

    // Update positions based on velocity
    const currentLeft = parseFloat(obj1.style.left);
    const currentTop = parseFloat(obj1.style.top);

    // New proposed position
    let newLeft = currentLeft + obj1.velocityX;
    let newTop = currentTop + obj1.velocityY;

    // Collision with walls
    const appRect = app.getBoundingClientRect();
    const objWidth = rect1.width;
    const objHeight = rect1.height;

    // Left and right walls
    if (newLeft <= 0) {
      newLeft = 0;
      obj1.velocityX = -obj1.velocityX * restitution;
    } else if (newLeft + objWidth >= appRect.width) {
      newLeft = appRect.width - objWidth;
      obj1.velocityX = -obj1.velocityX * restitution;
    }

    // Top and bottom walls
    if (newTop <= 0) {
      newTop = 0;
      obj1.velocityY = -obj1.velocityY * restitution;
    } else if (newTop + objHeight >= appRect.height) {
      newTop = appRect.height - objHeight;
      obj1.velocityY = -obj1.velocityY * restitution;
    }

    // Apply new position
    obj1.style.left = `${newLeft}px`;
    obj1.style.top = `${newTop}px`;
  });
};

export { addObject, getMass, updatePhysics };
