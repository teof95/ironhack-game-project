// ENVIRONMENT
const { Engine, Render, Runner, World, Bodies, Body } = Matter;
const engine = Engine.create();
engine.world.gravity.y = 0;
Body.frictionStatic = 0;
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);
let sizeW = render.options.width;
let sizeH = render.options.height;

// WALLS
const walls = [
  Bodies.rectangle(0, sizeH / 2, 50, sizeW * 2, {
    isStatic: true,
  }),
  Bodies.rectangle(sizeW, sizeH / 2, 50, sizeH * 2, {
    isStatic: true,
  }),
];
walls.forEach((wall) => {
  wall.density = 1000;
});
World.add(world, walls);

// PLAYER: Create new player and add to environment
const playerBody = Bodies.circle(sizeW / 2, sizeH - 80, sizeW / 80, {
  isStatic: false,
});
playerBody.frictionAir = 0;
World.add(world, playerBody);
console.log(playerBody);

// PLAYER MOVEMENT
document.addEventListener("keydown", (event) => {
  const { x, y } = playerBody.velocity;
  if (event.code === "ArrowLeft") {
    Body.setVelocity(playerBody, { x: x - 12, y: 0 });
    Body.setPosition(playerBody, { x: playerBody.position.x, y: sizeH - 80 });
  } else if (event.code === "ArrowRight") {
    Body.setVelocity(playerBody, { x: x + 12, y: 0 });
    Body.setPosition(playerBody, { x: playerBody.position.x, y: sizeH - 80 });
  } else if (event.code === "Space") {
    let ammo = Bodies.circle(
      playerBody.position.x,
      playerBody.position.y - 110,
      4,
      {
        isStatic: false,
      }
    );
    ammo.frictionAir = 0;
    Body.setVelocity(ammo, { x: 0, y: -16 });
    World.add(world, ammo);
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
    Body.setVelocity(playerBody, { x: 0, y: 0 });
  }
});

// DIFFICULTY LEVEL
let interval;
let difficulty = 1;
if (difficulty === 1) {
  interval = 1500;
  // change endgame at enemies.length = 75?
}
if (difficulty === 2) {
  interval = 1000;
  // change endgame at enemies.length = 150?
} else if (difficulty === 3) {
  interval = 800;
  // change endgame at enemies.length = 250?
}

// CREATE ENEMIES
const enemies = [];
for (let i = 0; i < 100; i++) {
  enemies.push(
    Bodies.circle(Math.random() * ((sizeW / 10) * 9), 0, sizeW / 40, {
      isStatic: false,
    })
  );
}
// ADD ENEMIES TO WORLD AND LAUNCH ATTACK
enemies.forEach((enemy, index) => {
  enemy.frictionAir = 0;
  setTimeout(() => {
    World.add(world, enemy);
    Body.applyForce(
      enemy,
      { x: enemy.position.x, y: enemy.position.y },
      { x: 0, y: 0.02 }
    );
  }, index * interval);
});
