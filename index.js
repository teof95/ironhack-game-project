// ENVIRONMENT
const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Body,
  Detector,
  Events,
} = Matter;
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
let oddEvenCounter = 0;
let playArea = () => {
  let rand = Math.random();
  return oddEvenCounter % 2 === 0
    ? sizeW / 10 + rand * (sizeW / 2)
    : sizeW / 2 + rand * (sizeW / 2) - sizeW / 10;
};

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

// SCORE COUNT
let scoreCount = 0;

// PLAYER: Create new player and add to environment
const playerBody = Bodies.circle(sizeW / 2, sizeH - 80, sizeW / 60);
playerBody.frictionAir = 0;
playerBody.friction = 0;
World.add(world, playerBody);
console.log(world.bodies);

// PLAYER MOVEMENT
let xMove = sizeW / 60;
document.addEventListener("keydown", (event) => {
  const { x, y } = playerBody.velocity;
  if (event.code === "ArrowLeft") {
    Body.setVelocity(playerBody, { x: x - xMove, y: 0 });
  } else if (event.code === "ArrowRight") {
    Body.setVelocity(playerBody, { x: x + xMove, y: 0 });
  } else if (event.code === "Space") {
    let ammo = Bodies.circle(
      playerBody.position.x,
      playerBody.position.y - 110,
      sizeW / 120
    );
    ammo.frictionAir = 0;
    Body.setVelocity(ammo, { x: 0, y: -(sizeH / 40) });
    World.add(world, ammo);
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
    Body.setVelocity(playerBody, { x: 0, y: 0 });
  }
});

// DIFFICULTY LEVEL
// DIFFICULTY LEVEL 1
let numLives = 3;
let interval = 1500;
let difficulty = 1;
let numEnemies = 75;
let enemiesForce = 0.001;
// HIGHER DIFFICULTIES
if (difficulty === 2) {
  interval = 1000;
  numEnemies = 125;
  enemiesForce = 0.0015;
} else if (difficulty === 3) {
  interval = 750;
  numEnemies = 200;
  enemiesForce = 0.002;
}

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

// OFF-SCREEN DETECTION & DELETION
const isOffScreen = function () {
  let offScreenCheck = setInterval(() => {
    if (world.bodies.length === 3) {
      clearInterval(offScreenCheck);
    }
    for (i = 3; i < world.bodies.length; i++) {
      if (world.bodies[i].position.y > sizeH) {
        World.remove(world, world.bodies[i]);
        scoreCount -= 5;
      } else if (world.bodies[i].position.y < -200) {
        World.remove(world, world.bodies[i]);
      }
    }
  }, 1000);
};
isOffScreen();

// COLLISION DETECTION
Events.on(engine, "collisionEnd", ({ pairs }) => {
  pairs.forEach(({ bodyA, bodyB }) => {
    if ((bodyA.id === 3 && bodyB.id > 3) || (bodyA.id > 3 && bodyB.id === 3)) {
      numLives--;
      World.remove(world, bodyB);
      Body.setPosition(playerBody, { x: sizeW / 2, y: sizeH - 80 });
      Body.setVelocity(playerBody, { x: 0, y: 0 });
      console.log(`numLives is ${numLives}`);
      console.log(`scoreCount is ${scoreCount}`);
    } else if (bodyA.id > 3 || bodyB.id > 3) {
      World.remove(world, bodyA);
      World.remove(world, bodyB);
      scoreCount += 5;
      console.log(`scoreCount is ${scoreCount}`);
    }
  });
});
