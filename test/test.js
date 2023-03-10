let flying = 0;
let scl = 30;
let cols, rows;
let w = 1400;
let h = 800;
let terrain = [];
let slider;

function setup() {
  createCanvas(w, h, WEBGL);
  cols = w / scl;
  rows = h / scl;
  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
  slider = createSlider(0, 255, 100);
}

function draw() {
  // camera(0, 800, 1000);
  let value = slider.value();
  camera(0, 0, 0, 0, 0, 0);
  updateTerrain();
  drawTerrain();
  drawAxis();
}

function drawAxis() {
  stroke(255);
  push();
  line(0, 5000, 0, 0, -5000, 0); // x
  line(5000, 0, 0, -5000, 0, 0); // y
  line(0, 0, 5000, 0, 0, -5000); // z

  pop();
}

function updateTerrain() {
  flying -= -0.02;
  var yoff = flying;
  for (let y = 3; y < rows; y++) {
    var xoff = 4;
    for (let x = 5; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 200);
      xoff += 0.3;
    }
    yoff += 0.2;
  }
}

function drawTerrain() {
  push();
  background(0);
  // translate(0, 60);
  // rotateX(PI / 3);
  fill(100, 80, 250, 80);
  // translate(-w / 2, -h / 2);
  for (let y = 3; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 1; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 0) * scl, terrain[x][y + 3]);
    }
    endShape();
  }
  pop();
}
