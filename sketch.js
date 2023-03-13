let blobby, terrain, sound, jump, button, fft, img, asteroid, lsp;
// let myShader;
let scl = 30;
let w = 1400;
let h = 800;

function preload() {
  sound = loadSound("./assets/sebastiAn.mp3");
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
  asteroid = createGraphics(1000, 1000);
}

function draw() {
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
  camera(width / 2, height / 2, 600, width / 2, height / 2, 0, 0, 1, 0);

  push();
  let stars = {
    x: random(width),
    y: random(height / 3),
    size: random(5, 7),
  };
  ellipse(stars.x, stars.y, stars.size, stars.size);
  pop();

  translate(width / 2, height / 2);
  terrain.draw();
  terrain.updateTerrain();
  blobby.draw(spectrum, sound);
  // shader(myShader);
  asteroid.fill(255);
  asteroid.circle(200, 200, 200);
  img.mask(asteroid);
  image(img, -500, -300, 300, 300);
  image(lsp, 100, 100, 100, 100);
}
