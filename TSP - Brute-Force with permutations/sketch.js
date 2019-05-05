let points = [];
let order = [];

let bestDistance;
let bestOrder;

let inc = 200000;

let startTime, finishTime;

function setup() {
  createCanvas(1920, 1080);
  for (let i = 0; i < 11; i++) {
    points.push(new point(random(width), random(height)));
    order.push(points.length - 1);
  }
  order.push(0);
  getDistances();
  bestOrder = order;
  bestDistance = calcDistance(bestOrder);
  startTime = millis();
}

function draw() {
  background(0);
  noFill();
  strokeWeight(6);
  beginShape();
  stroke(0, 255, 0);
  for (let ord of bestOrder) {
    vertex(points[ord].x, points[ord].y);
  }
  endShape();
  stroke(255);
  strokeWeight(1);
  beginShape();
  for (let ord of order) {
    vertex(points[ord].x, points[ord].y);
  }
  endShape();
  for (let pt of points) {
    pt.show();
  }
  for (let i = 0; i < inc; i++) {
    let currDist = calcDistance(order);
    if (currDist < bestDistance) {
      bestDistance = currDist;
      bestOrder = order.slice();
    }
    if (!nextPermutation(order)) {
      noLoop();
      console.log("FINISHED!");
      console.log("Best distance : " + bestDistance);
      console.log("Best order : ");
      console.log(bestOrder);
      finishTime = millis();
      console.log((finishTime - startTime) / 1000);
      break;
    }
  }
}
