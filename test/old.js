// let angleOffset = 0; // when added to angle, makes the curve move around the canvas as it is drawn;  rotating effect
let song;
let button;
let zoff = 0; // perlin noise in 3dimensional space
let noiseMax = 5;
let flying = 0;
let scl = 30;
let cols, rows;
let w = 1400;
let h = 800;
let terrain = [];
let foreground;

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
  // createCanvas(800, 800);
  // blendMode(HARD_LIGHT); // song = loadSound("./sebastiAn.mp3");
  button = createButton("Play");
  button.mousePressed(togglePlayer);
  foreground = createGrapics(400, 400);
  foreground.clear();
  createCanvas(w, h, WEBGL);
  cols = w / scl;
  rows = h / scl;
  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {
  background(255, 2);
  noFill();
  strokeWeight(3);
  // translate(-w / 2, -h / 2); // position to center of window
  foreground.twoPi();
  twoPiV2();
  updateTerrain();
  drawTerrain();
  image(extraCanvas, 0, 0);
}

/**
  BLOBS
 */

function twoPi() {
  stroke(255, 83, 73, 100);
  // TWO_PI 6.28318530717958647693
  // twice the ratio of the circumference of a circle to its diameter
  // generate sequence of 628 pairs of x and y cords around the circle w/ perlin noise
  translate(width / 2, height / 2);
  beginShape();
  // noiseMax = 10;
  noiseMax = 5;
  for (let angle = 0; angle < TWO_PI; angle += 0.5) {
    // want pos nums 0 - 1
    let xoff = map(cos(angle), -1, 1, 0, noiseMax);
    let yoff = map(cos(angle), -1, 1, 0, noiseMax);
    let radius = map(noise(xoff, yoff, zoff), 0, 1, 200, 300);
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    curveVertex(x, y);
  }

  // close the shape
  endShape(CLOSE);
  // controlling the movement
  zoff += 0.01;
  // angleOffset = millis() / 500;
}

function twoPiV2() {
  stroke(31, 81, 255, 100);

  beginShape();
  noiseMax = 10;
  for (let angle = 0; angle < TWO_PI; angle += 0.5) {
    let xoff = map(cos(angle), -1, 1, 0, noiseMax);
    let yoff = map(cos(angle), -1, 1, 0, noiseMax);
    let radius = map(noise(xoff, yoff, zoff), 0, 1, 200, 300);
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    curveVertex(x, y);
  }
  endShape(CLOSE);
  zoff += 0.01;
}

/*
  TERRAIN
 */

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
  translate(0, 60);
  rotateX(PI / 3);
  fill(100, 80, 250, 80);
  translate(-w / 2, -h / 2);
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
