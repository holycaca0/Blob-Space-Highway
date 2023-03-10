/*
In the given code block, t is a variable that is used as a time parameter for generating random noise. Specifically, it is being passed to the noise() function as an input, which returns a random value between 0 and 1 based on the value of t. The map() function is then used to convert this random value into a radius value within the range of 100 to 200.

As the for loop iterates through each angle value, t is incremented by 0.01 in each iteration, causing the noise() function to return a different random value for each angle. This generates a smoothly varying pattern of radii that are used to draw the shape.

Overall, t serves as a way to generate a time-varying noise pattern that is used to create the shape, with the value of t determining the exact pattern of radii for each angle.
*/

let phase = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  noFill();
  // offset thru 1D perlin noise space
  // let t = 0;
  // let rotate = 0;
  beginShape();
  // for angle+=1 want to think about angle that divides perfectly into 2pi or radians equivalent to 360deg
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    // let radius = 100;
    // let radius = random(50, 100);
    // noise of t times 100 makes new circle b/c generates new set of perlin noise values
    // let radius = noise(t) * 100;
    // want to use xoff, yoff instead of t to "walk" back to the same staring point to create smooth "circle"
    // let radius = map(noise(t), 0, 1, 100, 200);
    // let xoff = 0;
    // let yoff = 0;
    // V below these 2 xoff and yoff still produce a pretty jagged circle
    // let xoff = cos(angle) + 1;
    // let yoff = sin(angle) + 1;
    let noiseMax = 0.3;
    // *** smaller the noiseMax is, the smoother the circle
    let xoff = map(cos(angle + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(angle + phase), -1, 1, 0, noiseMax);
    let radius = map(noise(xoff, yoff), 0, 1, 100, 200);
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    vertex(x, y);
    // t += 0.1;
    phase += 0.03;
    // shimmery color dance floor
    // endShape(CLOSE); // having this line here makes the circle have a shell design
  }
  endShape(CLOSE);
}
