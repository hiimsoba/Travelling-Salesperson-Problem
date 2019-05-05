let points = [];

let prev_bestDistance;
let bestDistance;
let bestOrder;
let inc = 300;

const NUM_POINTS = 50;

let mutationRate = 0.2;

let population = [];
const POP_SIZE = 150;

function setup() {
  createCanvas(1920, 1080);
  // initial order
  let order = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    points.push(new point(random(width), random(height)));
    order.push(points.length - 1);
  }

  getDistances(order);

  // create a population of random solutions
  for (let i = 0; i < POP_SIZE; i++) {
    population.push(shuffle(order, false));
  }

  bestOrder = population[0];

  bestDistance = calcDistance(bestOrder);
  startTime = millis();
}

function draw() {
  background(0);

  noFill();
  strokeWeight(4);
  beginShape();
  stroke(0, 255, 0);

  for (let ord of bestOrder) {
    vertex(points[ord].x, points[ord].y);
  }
  endShape();

  for (let pt of points) {
    pt.show();
  }

  for (let i = 0; i < inc; i++) {
    // evaluate and get a new population
    population = evalPop(population);
    for (let p of population) {
      let curr_dist = calcDistance(p);
      if (curr_dist < bestDistance) {
        bestOrder = p.slice();
        bestDistance = curr_dist;
      }
    }
  }
  if (bestDistance != prev_bestDistance) {
    console.log(bestDistance);
  }
  prev_bestDistance = bestDistance;
}
