
class Blobby {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.noiseMax = 1;
    this.zoff = 0;
    this.radiusMin = 20;
    this.radiusMax = 50;
  }
  update() {
    this.x = random(width);
    this.y = random(height);
  }
  draw() {
    // background(255, 0, 0, 255);
    // noFill();
    push(); // save the current transformation matrix
    translate(0, -100);
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
      let xoff = map(cos(angle), -1, 1, 0, this.noiseMax);
      let yoff = map(sin(angle), -1, 1, 0, this.noiseMax);
      let radius = map(noise(xoff, yoff, this.zoff), 0, 1, this.radiusMin, this.radiusMax);
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      let distance = dist(x, y, 0, 0);
      let gray = map(distance, 0, this.radiusMax, 255, 0);
      stroke(gray);
      curveVertex(x, y);
    }
    endShape(CLOSE);
    pop(); // restore the previous transformation matrix
    this.zoff += 0.01;
  }
}