// Sets up the environment
const { Engine, Render, Runner, World, Bodies, Body } = Matter;
const engine = Engine.create();
engine.world.gravity.y = 0;
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

// Left/Right Walls
const walls = [
  Bodies.rectangle(
    0,
    render.options.height / 2,
    50,
    render.options.height * 2,
    {
      isStatic: true,
    }
  ),
  Bodies.rectangle(
    render.options.width,
    render.options.height / 2,
    50,
    render.options.height * 2,
    {
      isStatic: true,
    }
  ),
];
World.add(world, walls);

// create new player and add to environment
const playerBody = Bodies.rectangle(
  render.options.width / 2,
  render.options.height,
  50,
  200,
  {
    isStatic: false,
  }
);
playerBody.friction = 0;
playerBody.frictionAir = 0;
World.add(world, playerBody);
console.log(playerBody);

// Player movement and firing
let ammo = [];
document.addEventListener("keydown", (event) => {
  const { x, y } = playerBody.velocity;
  if (event.code === "ArrowLeft") {
    Body.setVelocity(playerBody, { x: x - 12, y: 0 });
  } else if (event.code === "ArrowRight") {
    Body.setVelocity(playerBody, { x: x + 12, y: 0 });
  } else if (event.code === "Space") {
    ammo.unshift(
      Bodies.circle(playerBody.position.x, playerBody.position.y - 110, 4, {
        isStatic: false,
      })
    );
    Body.setVelocity(ammo[0], { x: 0, y: -15 });
    ammo[0].frictionAir = 0;
    ammo[0].density = 1;
    World.add(world, ammo[0]);
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
    Body.setVelocity(playerBody, { x: 0, y: 0 });
    Body.setAngle(playerBody, 0);
    Body.setAngularVelocity(playerBody, 0);
  }
});

// create new enemies
let interval = 1500;
const enemies = [];
for (let i = 0; i < 100; i++) {
  enemies.push(
    Bodies.circle(
      Math.floor(Math.random() * render.options.width),
      0,
      render.options.width / 40,
      {
        isStatic: false,
      }
    )
  );
}
// append enemies to world and launch from above
enemies.forEach((enemy, index) => {
  enemy.frictionAir = 0;
  setTimeout(() => {
    World.add(world, enemy);
    Body.applyForce(
      enemy,
      { x: enemy.position.x, y: enemy.position.y },
      { x: 0, y: 0.025 }
    );
  }, index * interval);
});

// Player cannon
