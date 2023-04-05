let blobby, terrain, sound, jump, button, fft, img, asteroid, lsp, catimg;
// let myShader;
let scl = 30;
let w = 1400;
let h = 800;
let angle = 0;
let catX = 0;
let catY = 0;
let lspX = 0;
let lspY = 0;
let speed = 0.5;
let rotateAngle = 0;

function preload() {
  sound = loadSound("fluffy.mp3");
  catimg = loadImage("nyancat.jpg");
  // sound = loadSound("./assets/the_midnight.mp3");
  // myShader = loadShader("./assets/shader.vert", "./assets/shader.frag");
  // img = loadImage("./assets/pexels_anni_roenkae_2832432.jpg");
  img = loadImage("./assets/asteroid.png");
  lsp = loadImage("./assets/lsp.png");
}

function togglePlayer() {
  if (!sound.isPlaying()) {
    sound.play();
    // sound.setVolume(1);
  } else {
    sound.pause();
  }
}

function toggleJump() {
  let length = sound.duration();
  let timestamp = random(length);
  sound.jump(timestamp);
}

function setup() {
  // song = loadSound("./fluffy.mp3", loaded);
  fft = new p5.FFT();
  fft.setInput(sound);
  play = createButton("Play");
  play.mousePressed(togglePlayer);
  jump = createButton("Jump");
  jump.mousePressed(toggleJump);

  createCanvas(windowWidth, windowHeight, WEBGL);
  // blobby = new Blobby(200, 200);
  blobby = new Blobby(200, 200, 100);
  terrain = new Terrain(0, w / scl, h / scl, scl, w, h);
  for (let x = 0; x < terrain.cols; x++) {
    terrain.terrain[x] = [];
    for (let y = 0; y < terrain.rows; y++) {
      terrain.terrain[x][y] = 0;
    }
  }
  fft = new p5.FFT(0, 256);
  // textureMode(NORMAL);
  // asteroid = createGraphics(1000, 1000);
  imageMode(CENTER);
}

function draw() {
  let catX = map(mouseX, 0, width, -width / 2, width / 2);
  let catY = height / 2 + sin(frameCount * 0.1) * 50;
  // shader(myShader);
  // myShader.setUniform("uFrameCount", frameCount);
  // console.log(img);
  // texture(img);
  // beginShape();
  // vertex(0, 0, 0, 0, 0);
  // vertex(img.width, 0, 0, 1, 0);
  // vertex(img.width, img.height, 0, 1, 1);
  // vertex(0, img.height, 0, 0, 1);
  // endShape(CLOSE);
  background(0);
  let spectrum = fft.analyze();
  // console.log(spectrum);
  camera(width / 2, height / 2, 600, width / 2, height / 2, 0, 0, 1, 0); //600
  blendMode(ADD);
  // blendMode(SOFT_LIGHT);
  texture(catimg);
  push();
  let stars = {
    x: random(width),
    y: random(height / 3),
    size: random(5, 7),
    opacity: random(50, 200),
  };
  fill(255, 255, 255, stars.opacity);
  ellipse(stars.x, stars.y, stars.size, stars.size);
  pop();

  translate(width / 2, height / 2);
  terrain.draw();
  terrain.updateTerrain();
  blobby.draw(spectrum, sound);
  // blobby.draw(spectrum, sound);
  // shader(myShader);
  texture(catimg); // use the global variable img here instead of this.img
  // let spectrum = fft.analyze(freqBins);
  // console.log(spectrum);
  beginShape();
  let size = map(spectrum[0], 0, 255, 50, 200); // map size to lowest frequency bin
  if (size > 354) {
    blobby.update(500, 430, 100);
  }
  translate(-width / 4 + 1, -height / 4);
  push();
  texture(catimg);
  rotateY(angle);
  sphere(30, 30, 10);
  pop();

  angle += 0.01;
  endShape();
  // asteroid.fill(255);
  // asteroid.circle(200, 200, 200);
  // img.mask(asteroid);
  // image(img, -500, -300, 300, 300);

  // push();

  // pop();
  if (lspX >= 710 && lspY >= 90) {
    speed = -0.5;
  } else if (lspX <= 700 && lspY <= 100) {
    speed = 0.5;
  }
  lspX = lspX + speed;
  lspY = lspY + speed;
  image(lsp, lspX, lspY, 100, 100);

  // for (let a = 0; a < radians(360); a += radians(30)) {
  //   push();
  //   translate(width / 2, height / 2);
  //   rotate(a);
  //   // translate(0, 200);
  //   // rotate(-angle);
  //   image(lsp, lspX, lspY, 100, 100);

  //   pop();
  // }
  // for (let i = 1; i <= 4; i++) {
  // Save the current state (translation/rotation/etc)
  // push();
  // Translate to the origin of the shape
  // draw image at 0,0 , then rotate
  push();
  // translate(width / 2, height / 2);
  // Rotate around the origin
  rotate(millis() / 1000 / 2);
  // // Because we've translated to the origin, we draw the square at 0, 0
  image(lsp, lspX, lspY, 100, 100);
  // // Restore the state saved with push();
  pop();
  // }
}
