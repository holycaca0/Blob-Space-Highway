// let angleOffset = 0; // when added to angle, makes the curve move around the canvas as it is drawn;  rotating effect
let zoff = 0; // perlin noise in 3dimensional space
let noiseMax = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blendMode(HARD_LIGHT);
  // blendMode(DODGE);
}

function draw() {
  background(255, 2);
  noFill();
  strokeWeight(3);
  translate(width / 2, height / 2); // position to center of window
  twoPi();
  twoPiV2();
}

function twoPi() {
  stroke(255, 83, 73, 100);
  // TWO_PI 6.28318530717958647693
  // twice the ratio of the circumference of a circle to its diameter
  // generate sequence of 628 pairs of x and y cords around the circle w/ perlin noise

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
