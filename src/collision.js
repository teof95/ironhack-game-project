// OFF-SCREEN DETECTION & DELETION
const isOffScreen = function () {
  let offScreenCheck = setInterval(() => {
    if (world.bodies.length === 3) {
      clearInterval(offScreenCheck);
    }
    for (i = 3; i < world.bodies.length; i++) {
      if (world.bodies[i].position.y > sizeH) {
        World.remove(world, world.bodies[i]);
        if (scoreCount >= 0) {
          scoreCount -= 5;
        }
      } else if (world.bodies[i].position.y < -200) {
        World.remove(world, world.bodies[i]);
      }
    }
  }, 1000);
};
isOffScreen();

// COLLISION DETECTION
Events.on(engine, "collisionStart", ({ pairs }) => {
  pairs.forEach(({ bodyA, bodyB }) => {
    if (bodyA.id === 3 && bodyB.id > 3) {
      playerBody.isStatic = true;
      World.remove(world, bodyB);
    } else if (bodyA.id > 3 && bodyB.id > 3) {
      World.remove(world, bodyA);
      World.remove(world, bodyB);
      scoreCount += 5;
      return scoreCount;
    }
  });
});
Events.on(engine, "collisionEnd", ({ pairs }) => {
  pairs.forEach(({ bodyA, bodyB }) => {
    if (bodyA.id === 3 && bodyB.id > 3) {
      Body.setPosition(playerBody, { x: sizeW / 2, y: sizeH - 80 });
      Body.setVelocity(playerBody, { x: 0, y: 0 });
      playerBody.isStatic = false;
      numLives--;
    }
  });
});
