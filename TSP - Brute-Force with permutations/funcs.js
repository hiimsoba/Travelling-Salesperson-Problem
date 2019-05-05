function nextPermutation(array) {
  var i = array.length - 1;
  while (i > 0 && array[i - 1] >= array[i])
    i--;
  if (i <= 0)
    return false;
  var j = array.length - 1;
  while (array[j] <= array[i - 1])
    j--;
  var temp = array[i - 1];
  array[i - 1] = array[j];
  array[j] = temp;
  j = array.length - 1;
  while (i < j) {
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    i++;
    j--;
  }
  return true;
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

function getDistances() {
  for (let i = 0; i < points.length; i++) {
    distances[i] = [];
    for (let j = 0; j < points.length; j++) {
      distances[i].push(distance(points[order[i]], points[order[j]]));
    }
  }
}
