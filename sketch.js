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
let img;
let catimg;

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
  blobby = new Blobby(10, 10, img); // pass the image to the blobby object
  terrain = new Terrain(0, w / scl, h / scl, scl, w, h);
  for (let x = 0; x < terrain.cols; x++) {
    terrain.terrain[x] = [];
    for (let y = 0; y < terrain.rows; y++) {
      terrain.terrain[x][y] = 0;
    }
  }
}


function preload() {
  song = loadSound("./fluffy.mp3");
  catimg = loadImage("nyancat.jpg")
  img = loadImage('asteroid2.jpg'); // assign the image to the global variable img
  blobby = new Blobby(200, 200, img); // create a new blobby object and pass the image to it
}

function draw() {
  camera(width / 2, height / 2, 500, width / 2, height / 2, 0, 0, 1, 0);
  translate(width / 2, height / 2);
  terrain.draw();
  terrain.updateTerrain();
  blobby.draw();
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
 
