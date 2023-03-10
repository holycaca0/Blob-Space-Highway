let song;
let button;

function preload() {
  song = loadSound("./sebastiAn.mp3");
}

function setup() {
  // song = loadSound("./sebastiAn.mp3");
  button = createButton("Play");
  button.mousePressed(togglePlayer);
}

function togglePlayer() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(1);
  } else {
    song.pause();
  }
}
