class Blobby {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.noiseMax = 5;
    this.zoff = 0;
  }
  draw() {
    // background(255, 0, 0, 255);
    // noFill();
    translate(0, -100);
    beginShape();
    // stroke(255, 83, 73, 255);
    stroke(0, 80);
    for (let angle = 0; angle < TWO_PI; angle += 0.5) {
      let xoff = map(cos(angle), -1, 1, 0, this.noiseMax);
      let yoff = map(cos(angle), -1, 1, 0, this.noiseMax);
      let radius = map(noise(xoff, yoff, this.zoff), 0, 1, 100, 200);
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      curveVertex(x, y);
    }
    endShape(CLOSE);
    this.zoff += 0.01;
  }
}
