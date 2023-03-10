let blobby, terrain;
let scl = 30;
let w = 1400;
let h = 800;
let song;
let button;

function preload() {
  song = loadSound("./sebastiAn.mp3");
}

function togglePlayer() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(1);
  } else {
    song.pause();
  }
}

function setup() {
  // blob.setup();
  createCanvas(windowWidth, windowHeight, WEBGL);
  button = createButton("Play");
  button.mousePressed(togglePlayer);
  background(0);
  blobby = new Blobby(200, 200);
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
  blobby.draw();
}
