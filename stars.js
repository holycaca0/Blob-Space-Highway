class Stars {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(50, 100);
  }
  draw() {
    ellipse(this.x, this.y, this.size, this.size);
  }
}
