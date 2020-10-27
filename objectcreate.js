// WALLS
const walls = [
  Bodies.rectangle(-255, sizeH / 2, 500, sizeH * 2, {
    isStatic: true,
  }),
  Bodies.rectangle(sizeW + 250, sizeH / 2, 500, sizeH * 2, {
    isStatic: true,
  }),
];
World.add(world, walls);

// PLAYER: Create new player and add to environment
const playerBody = Bodies.circle(sizeW / 2, sizeH - 80, sizeW / 60);
playerBody.frictionAir = 0;
playerBody.friction = 0;
World.add(world, playerBody);

// CREATE ENEMIES
const enemies = [];
for (let i = 0; i < numEnemies; i++) {
  oddEvenCounter++;
  enemies.push(Bodies.circle(playArea(), 0, sizeW / 30));
}

// ADD ENEMIES TO WORLD AND LAUNCH ATTACK
enemies.forEach((enemy, index) => {
  enemy.frictionAir = 0;
  setTimeout(() => {
    World.add(world, enemy);
    Body.applyForce(
      enemy,
      { x: enemy.position.x, y: enemy.position.y },
      { x: 0, y: (sizeW / 100) * enemiesForce }
    );
  }, index * interval);
});
