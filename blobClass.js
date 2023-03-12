class Blobby {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.noiseMax = 1;
    this.zoff = 0;
    this.radiusMin = 20;
    this.radiusMax = 50;
    this.textureImg = "asteroid.jpg";
  }

  update() {
    this.x = random(width);
    this.y = random(height);
  }

  draw() {
    push();
    translate(0, -100);
    beginShape();
    
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
      let xoff = map(cos(angle), -1, 1, 0, this.noiseMax);
      let yoff = map(sin(angle), -1, 1, 0, this.noiseMax);
      let radius = map(noise(xoff, yoff, this.zoff), 0, 1, this.radiusMin, this.radiusMax);
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      
      curveVertex(x, y);
    }
    endShape(CLOSE);
    pop();
    this.zoff += 0.01;
  }
}