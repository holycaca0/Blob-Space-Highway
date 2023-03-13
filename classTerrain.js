class TerrainGenerator {
  constructor(flying, scl, cols, rows, w, h, terrain) {
    this.flying = flying;
    this.scl = 30;
    this.cols = 0;
    this.rows = 0;
    this.w = 1400;
    this.h = 800;
    this.terrain = [];
    // this.slider = null;
  }

  // setup() {
  //   createCanvas(this.w, this.h, WEBGL);
  //   this.cols = this.w / this.scl;
  //   this.rows = this.h / this.scl;
  //   for (let x = 0; x < this.cols; x++) {
  //     this.terrain[x] = [];
  //     for (let y = 0; y < this.rows; y++) {
  //       this.terrain[x][y] = 0;
  //     }
  //   }
  //   // this.slider = createSlider(0, 255, 100);
  // }

  draw() {
    // let value = this.slider.value();
    camera(0, 0, 0, 0, 0, 0);
    this.updateTerrain();
    this.drawTerrain();
    // this.drawAxis();
  }

  // drawAxis() {
  //   stroke(255);
  //   push();
  //   line(0, 5000, 0, 0, -5000, 0); // x
  //   line(5000, 0, 0, -5000, 0, 0); // y
  //   line(0, 0, 5000, 0, 0, -5000); // z

  //   pop();
  // }

  updateTerrain() {
    this.flying -= -0.02;
    var yoff = this.flying;
    for (let y = 3; y < this.rows; y++) {
      let xoff = 4;
      for (let x = 5; x < this.cols; x++) {
        this.terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 200);
        xoff += 0.3;
      }
      yoff += 0.2;
    }
  }

  drawTerrain() {
    push();
    background(0);
    fill(100, 80, 250, 80);
    translate(-width / 2, -height / 2);
    translate(0, 60);
    //60 degree rotation
    rotateX(PI / 3);
    for (let y = 3; y < this.rows - 1; y++) {
      beginShape(TRIANGLE_STRIP);
      for (let x = 1; x < this.cols; x++) {
        vertex(x * this.scl, y * this.scl, this.terrain[x][y]);
        vertex(x * this.scl, (y + 0) * this.scl, this.terrain[x][y + 3]);
      }
      endShape();
    }
    pop();
  }
}
