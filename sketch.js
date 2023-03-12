let blobby, terrain;
let scl = 30;
let w = 1400;
let h = 800;
let song;
let button;
let amp;
let fft;
let freqBins = 64;
let angle = 0;

function preload() {
  song = loadSound("./fluffy.mp3");
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
  // song = loadSound("./fluffy.mp3", loaded);
  fft = new p5.FFT();
  fft.setInput(song);
  // blob.setup();
  createCanvas(windowWidth, windowHeight, WEBGL);

  amp = new p5.Amplitude();
  button = createButton("Play");
  button.mousePressed(togglePlayer);
  background(0);
  blobby = new Blobby(10, 10);
  terrain = new Terrain(0, w / scl, h / scl, scl, w, h);
  for (let x = 0; x < terrain.cols; x++) {
    terrain.terrain[x] = [];
    for (let y = 0; y < terrain.rows; y++) {
      terrain.terrain[x][y] = 0;
    }
  }
}

function draw() {
  camera(width / 2, height / 2, 500, width / 2, height / 2, 0, 0, 1, 0);
  translate(width / 2, height / 2);
  terrain.draw();
  terrain.updateTerrain();
  blobby.draw();

  let spectrum = fft.analyze(freqBins);
  console.log(spectrum)
  beginShape()
  let size = map(spectrum[0], 0, 255, 50, 200); // map size to lowest frequency bin
  if(size > 354){
  // let x = map(spectrum[10], 0, 255, 0, width); 
  // let y = map(spectrum[20], 0, 255, 0, height); 
  blobby.update(500, 430, 100);
  }
}