class point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, 20);
  }
}
