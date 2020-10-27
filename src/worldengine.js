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
    width: 1000,
    height: 500,
    wireframes: false,
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
  Bodies.rectangle(-250, sizeH / 2, 500, sizeH * 2, {
    isStatic: true,
  }),
  Bodies.rectangle(sizeW + 250, sizeH / 2, 500, sizeH * 2, {
    isStatic: true,
  }),
];
World.add(world, walls);
