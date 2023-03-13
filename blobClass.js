class Blobby {
  constructor(xoff, yoff, radius) {
    this.xoff = xoff;
    this.yoff = yoff;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = radius * 2;
  }
  draw(spectrum, sound) {
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
    // TODO: blobby explodes with music
    translate(0, -200);
    for (let i = 0; i < TWO_PI; i += 0.1) {
      // let offset = map(noise(this.xoff, this.yoff), 0, 1, -25, 25);
      // let offset = map(sin(i * 5 + frameCount * 0.05), -1, 1, -25, 25); // star?? if radius is 200, 200, 10
      // let offset = map(sin(i * 0.001 + frameCount * 0.1), -1, 1, -25, 25); // changes the size of the blob??
      // let offset = map(sin(i + frameCount * 0.1), -1, 1, -25, 25); // rotates the blob??
      // let change = this.radius + random(-5, 5);
      // let offset = map(noise(this.xoff, this.yoff), 0, 1, -50, 50); // sine wave is undulating but the perlin noise values are rotating around curve
      /*
      #E63F1A #D90D43 #A60D54
      let from = color(200, 100, 40);
      let to = color(200, 100, 40); //
      to.setAlpha(255);
      let gradient = lerpColor(from, to, 1);
      fill(gradient);
      fill(255, 100, 40);
      */
      // let mid = color(217, 13, 67);
      // let from = color(230, 63, 26);
      // let to = color(166, 13, 84);
      // let gradientPosition = map(i, 0, TWO_PI, 0, 1);
      // let midPosition = map(i, 0, TWO_PI, 0, 0.5);
      // let firstBlend = lerpColor(from, mid, midPosition);
      // let secondBlend = lerpColor(mid, to, gradientPosition - midPosition);
      // let filled = lerpColor(firstBlend, secondBlend, 1);
      // fill(filled);
      // let from = color(215, 70, 0);
      // let to = color(160, 70, 180);

      let from = color(230, 63, 26);
      let to = color(217, 13, 67);
      let gradientPosition = map(i, 0, TWO_PI, 0, 1);
      if (sound.isPlaying()) {
        from = color(91, 181, 217);
        to = color(62, 102, 249);
        // to = color(140, 175, 184);
      }
      let filled = lerpColor(from, to, gradientPosition);
      fill(filled);

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
