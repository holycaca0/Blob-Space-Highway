let terrain;

function setup() {
  terrain = new TerrainGenerator();
  createCanvas(1400, 800, WEBGL);
  terrain.cols = Math.round(1400 / 30);
  terrain.rows = new Array(terrain.cols);
  for (let x = 5; x < terrain.cols; x++) {
    terrain.cols[x] = Number([]);
    terrain.rows[x] = new Array(800/40); // create a new array for each column
    console.log(terrain.cols)
    for (let y = 0; y < terrain.rows[x].length; y++) {
      terrain.rows[x][y] = 0;
      console.log(terrain.rows)
    }
  }
}

function draw() {
  terrain.draw();
  terrain.updateTerrain();
}
