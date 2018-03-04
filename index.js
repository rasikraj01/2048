console.log('hello world');

let grid;

function setup(){
   createCanvas(400,400);
   grid = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
   ];
   console.table(grid);
   startNumber();
   startNumber();
   console.table(grid);

}
function startNumber() {
   let opts = [];
   for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
         if (grid[i][j] === 0) {
            opts.push({
               x: i,
               y: j
            });
         }
      }
   }

   if(opts.length > 0);
   let spot = random(opts);
   grid[spot.x][spot.y] = random(1) > 0.5 ? 2 : 4;
}


function drawGrid() {
   let w= 100;
   for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
            noFill();
            strokeWeight(2);
            stroke(0);
            rect(i*w, j*w, w,w );
            let val = grid[i][j];
            if (grid[i][j] !== 0) {
               textAlign(CENTER, CENTER);
               textSize(64);
               fill(0);
               noStroke();
               text(val, i*w - w/2,j*w + w/2);
            }
   }}
}


function draw() {
   background(255);
   drawGrid();
}
