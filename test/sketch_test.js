// etienne rolan

// let radius = 0;
// let angle = 60;
// let radiusOffset = 0;

let radius = 100;
let numPoints = 200;
let noiseScale = 0.5;
let angleOffset = 0;
let radiusOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 8);
  noFill();
  strokeWeight(2);
  beginShape();

  // Generate a set of points around the circle using Perlin noise
  for (let i = 0; i < numPoints; i++) {
    stroke(random(255), random(255), random(255), random(255));
    let angle = map(i, 0, numPoints, 0, TWO_PI);
    let xoff = map(cos(angle + angleOffset), -1, 1, 0, noiseScale);
    let yoff = map(sin(angle + angleOffset), -1, 1, 0, noiseScale);
    let r = radius + noise(xoff, yoff) * radiusOffset;
    let x = cos(angle) * r + width / 2;
    let y = sin(angle) * r + height / 2;
    curveVertex(x, y);
  }

  // Close the shape
  endShape(CLOSE);

  // Update the angle and radius offsets to create movement
  // angleOffset += 0.05;
  // radiusOffset = map(mouseX, 0, width, 0, radius);
  angleOffset = millis() / 1000;
  radiusOffset = sin(millis() / 500) * 50 + 100;
}

// zoff += 0.01;
// radiusOffset = sin(millis() / 500) * 50 + 100;

// let posX = map(mouseX, 0, width, -width/4, width/4);
// let posY = map(mouseY, 0, height, -height/4, height/4);
// translate(width / 2 + posX, height / 2 + posY);
