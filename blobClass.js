// class Blobby {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.noiseMax = 5;
//     this.zoff = 0;
//   }
//   draw(spectrum) {
//     translate(0, -100);

//     beginShape();
//     for (let angle = 0; angle < TWO_PI; angle += 0.2) {
//       let xoff = map(cos(angle), -1, 1, 0, this.noiseMax);
//       let yoff = map(cos(angle), -1, 1, 0, this.noiseMax);
//       let radius = map(noise(xoff, yoff, this.zoff), 0, 1, 100, 200);
//       let x = radius * cos(angle);
//       let y = radius * sin(angle);
//       vertex(x, y);
//     }
//     endShape(CLOSE);
//     this.zoff += 0.01;
//   }
// }

class Blobby {
  constructor(xoff, yoff, radius) {
    this.xoff = xoff;
    this.yoff = yoff;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = radius * 2;
  }
  draw(spectrum) {
    // push();
    // stroke(255);
    // for (let i = 0; i < spectrum.length; i++) {
    //   let amp = spectrum[i];
    //   let y = map(amp, 0, 256, height / 4, 0);
    //   line(i, height / 4, i, y);
    //   if (amp > 100) {
    //     this.radius += 0.01; // 2D perlin noise..changing over time...increasing speeds up pulse effect
    //   } else {
    //     this.radius -= 0.01;
    //   }
    // }
    // // console.log(spectrum);
    // pop();

    push();
    beginShape();
    translate(0, -200);
    for (let i = 0; i < TWO_PI; i += 0.1) {
      // let offset = map(noise(this.xoff, this.yoff), 0, 1, -25, 25);
      // let offset = map(sin(i * 5 + frameCount * 0.05), -1, 1, -25, 25); // star?? if radius is 200, 200, 10
      // let offset = map(sin(i * 0.001 + frameCount * 0.1), -1, 1, -25, 25); // changes the size of the blob??
      // let offset = map(sin(i + frameCount * 0.1), -1, 1, -25, 25); // rotates the blob??
      // let change = this.radius + random(-5, 5);
      // let offset = map(noise(this.xoff, this.yoff), 0, 1, -50, 50); // sine wave is undulating but the perlin noise values are rotating around curve
      let distort = noise(this.xoff + cos(i) * 0.5, this.yoff + sin(i) * 0.5);
      let offset = map(distort, 0, 1, -50, 50);
      let change = this.radius + offset;
      let x = change * cos(i);
      let y = change * sin(i);
      vertex(x, y);
      // ellipse(x, y, 4, 4);
    }
    endShape();
    pop();
    let amp = 0;
    // looping from 0 to 256
    for (let i = 0; i < spectrum.length; i++) {
      amp += spectrum[i];
      // console.log("AMP", amp);
    }
    // console.log(spectrum.length);
    let pulse = amp / spectrum.length;
    // console.log("PULSE", pulse);
    this.radius = map(pulse, 0, 256, this.minRadius, this.maxRadius); // adjust the radius based on the pulse amount (amplitude of the audio spectrum / 256)
    // console.log("RADIUS", this.radius);
    // keep the radius within the minimum and maximum bounds
    this.radius = constrain(this.radius, this.minRadius, this.maxRadius);
    this.xoff += 0.01; // changing this to 0.01 makes it pulse?
    this.yoff += 0.01; // 2D perlin noise..changing over time...increasing speeds up pulse effect
  }
}
