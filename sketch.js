let blobby, terrain, sound, jump, button, fft;
// let myShader;
let scl = 30;
let w = 1400;
let h = 800;

function preload() {
  sound = loadSound("./assets/sebastiAn.mp3");
  // sound = loadSound("./assets/the_midnight.mp3");
  // myShader = loadShader("./assets/shader.vert", "./assets/shader.frag");
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
  fft.setInput(song);
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
}

function draw() {
  // shader(myShader);
  // myShader.setUniform("uFrameCount", frameCount);
  background(0);
  let spectrum = fft.analyze();
  // console.log(spectrum);
  camera(width / 2, height / 2, 600, width / 2, height / 2, 0, 0, 1, 0);

  push();
  let stars = {
    x: random(width),
    y: random(height / 3),
    size: random(3, 5),
  };
  ellipse(stars.x, stars.y, stars.size, stars.size);
  pop();

  translate(width / 2, height / 2);
  terrain.draw();
  terrain.updateTerrain();
  blobby.draw(spectrum);
  // shader(myShader);
  texture(catimg); // use the global variable img here instead of this.img
  let spectrum = fft.analyze(freqBins);
  console.log(spectrum)
  beginShape()
  let size = map(spectrum[0], 0, 255, 50, 200); // map size to lowest frequency bin
  if(size > 354){
    blobby.update(500, 430, 100);
 
  }
  translate((-width/4 +1), -height/4,)
  push();
  texture(catimg);
  rotateY(angle);
  sphere(30, 30, 10);
  pop();
  
  angle += 0.1;
  endShape()
}
 
