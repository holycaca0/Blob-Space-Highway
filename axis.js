const CANVAS_SIZE = 400;

// let cameraSliders = { x: null, y: null, z: null };

class Axis {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL);
  for (const axis in cameraSliders) {
    const slider = createSlider(-CANVAS_SIZE, CANVAS_SIZE, 0);
    const element = slider.elt;
    const label = document.createElement("label");
    label.textContent = axis;
    element.insertAdjacentElement("beforebegin", label);
    cameraSliders[axis] = slider;
  }
}

function draw() {
  background(0);
  camera(
    cameraSliders.x.value(),
    cameraSliders.y.value(),
    cameraSliders.z.value()
  );
  drawAxes();
}

function drawAxes() {
  push();
  stroke(255);
  line(-CANVAS_SIZE, 0, 0, CANVAS_SIZE, 0, 0); // X
  line(0, -CANVAS_SIZE, 0, 0, CANVAS_SIZE, 0); // Y
  line(0, 0, -CANVAS_SIZE, 0, 0, CANVAS_SIZE); // Z
  pop();
}
