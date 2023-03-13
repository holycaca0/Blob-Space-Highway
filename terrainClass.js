class Terrain {
  constructor(flying, cols, rows, scl, w, h) {
    this.flying = flying;
    this.scl = scl;
    this.cols = cols;
    this.rows = rows;
    this.w = w;
    this.h = h;
    this.terrain = [];
  }
  updateTerrain() {
    this.flying -= -0.02;
    let yoff = this.flying;
    for (let y = 3; y < this.rows; y++) {
      let xoff = 4;
      for (let x = 5; x < this.cols; x++) {
        this.terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 200);
        xoff += 0.3;
      }
      yoff += 0.2;
    }
  }
  draw() {
    push();
    // background(0);
    translate(0, 60);
    rotateX(PI / 3);
    fill(100, 80, 250, 80);
    // stroke(255,102,178)
    translate(-this.w / 2, -this.h / 2);
    for (let y = 3; y < this.rows - 1; y++) {
      beginShape(TRIANGLE_STRIP);
      for (let x = 1; x < this.cols; x++) {
  //       let from = color(120, 0, 200); 
  // let to = color(120, 0, 255); 
  // let gradient = lerpColor(from, to, .05);
  // fill(gradient);
        vertex(x * this.scl, y * this.scl, this.terrain[x][y]);
        vertex(x * this.scl, (y + 0) * this.scl, this.terrain[x][y + 3]);
      }
      endShape();
    }
    pop();
  }
}
