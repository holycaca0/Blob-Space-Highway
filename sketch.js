let blob, terrain;
let scl = 30;
let w = 1400;
let h = 800;

function setup() {
  // blob.setup();
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  blob = new Blob(400, 400);
  terrain = new Terrain(0, w / scl, h / scl, scl, w, h);
  for (let x = 0; x < terrain.cols; x++) {
    terrain.terrain[x] = [];
    for (let y = 0; y < terrain.rows; y++) {
      terrain.terrain[x][y] = 0;
    }
  }
}

function draw() {
  camera(width / 2, height / 2, 500, width / 2, height / 2, 0, 0, 1, 0);
  translate(width / 2, height / 2);
  terrain.draw();
  terrain.updateTerrain();
  blob.draw();
}
