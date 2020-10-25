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

// create new player and add to environment
const playerBody = Bodies.circle(
  render.options.width / 2,
  render.options.height - 200,
  render.options.width / 40,
  {
    isStatic: false,
  }
);
World.add(world, playerBody);

//player movement
document.addEventListener("keydown", (event) => {
  const { x, y } = playerBody.velocity;
  if (event.code === "ArrowLeft") {
    Body.setVelocity(playerBody, { x: x - 12, y: 0 });
  } else if (event.code === "ArrowRight") {
    Body.setVelocity(playerBody, { x: x + 12, y: 0 });
  } else if (event.code === "Space") {
    console.log(`fire!`);
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
    Body.setVelocity(playerBody, { x: 0, y: 0 });
  }
});

// Left/Right Walls
const walls = [
  Bodies.rectangle(0, render.options.height / 2, 20, render.options.height, {
    isStatic: true,
  }),
  Bodies.rectangle(
    render.options.width,
    render.options.height / 2,
    20,
    render.options.height,
    {
      isStatic: true,
    }
  ),
  Bodies.rectangle(
    render.options.width / 2,
    render.options.height,
    render.options.width,
    22,
    {
      isStatic: true,
    }
  ),
];
World.add(world, walls);
