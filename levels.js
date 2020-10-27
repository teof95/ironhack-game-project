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
