function evalPop(p) {
  // we wanna get the fitness for each individual
  // the fitness will be 1 / the total distance of the tour
  let fitnesses = [];

  let total_fitness = 0;

  for (let i = 0; i < POP_SIZE; i++) {
    let individual_fitness = 1 / calcDistance(population[i]);
    fitnesses.push([individual_fitness, i, 1 / individual_fitness]);
    total_fitness += individual_fitness;
  }

  for (let i = 0; i < POP_SIZE; i++) {
    fitnesses[i].push(fitnesses[i][0] / total_fitness);
  }

  // sort the fitnesses in descending order
  fitnesses.sort((a, b) => {
    return a[0] - b[0];
  });

  // new population, intially it only has the best individual in the current population
  let newPop = [];

  newPop.push(p[fitnesses[fitnesses.length - 1][1]]);

  // add POP_SIZE - 1 more individuals
  for (let i = newPop.length; i < POP_SIZE; i++) {
    let orderA = p[pick(fitnesses)].slice();
    let orderB = p[pick(fitnesses)].slice();
    let order = crossOver(orderA, orderB);
    newPop.push(mutate(order, mutationRate));
  }

  return newPop;
}

function mutate(o, rate) {
  // o is an order
  // go through the order
  for (let i = 0; i < o.length; i++) {
    // get a random number
    let r = random(1);
    // if it's less than our rate, swap two elements in the order
    if (r < rate) {
      let m = floor(random(o.length));
      let n = floor(random(o.length));
      let aux = o[m];
      o[m] = o[n];
      o[n] = aux;
    }
  }
  return o;
}

function pick(list) {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r -= list[index][3];
    index++;
  }
  index--;
  return list[index][1];
}

function crossOver(orderA, orderB) {
  let start = floor(random(orderA.length));
  let end = floor(random(start + 1, orderA.length));
  let neworder = orderA.slice(start, end);
  for (let i = 0; i < orderB.length; i++) {
    let city = orderB[i];
    if (!neworder.includes(city)) {
      neworder.push(city);
    }
  }
  return neworder;
}

function distance(a, b) {
  return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

function calcDistance(order) {
  let dist = 0;
  for (let i = 0; i < order.length - 1; i++) {
    dist += distances[order[i]][order[i + 1]];
  }
  return dist;
}

let distances = [];

function getDistances(order) {
  for (let i = 0; i < points.length; i++) {
    distances[i] = [];
    for (let j = 0; j < points.length; j++) {
      distances[i].push(distance(points[order[i]], points[order[j]]));
    }
  }
}
