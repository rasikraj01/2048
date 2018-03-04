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
   addNumber();
   addNumber();
}
function addNumber() {
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

function keyPressed() {
   if(key == ' '){
      for(let i = 0; i < 4; i++){
      grid[i] = operate(grid[i]);
      }
   }
   addNumber();
}

function operate(row) {
   row = slide(row);
   row = combine(row);
   row = slide(row);

   return row;
}

function draw() {
   background(255);
   drawGrid();
}


function slide(row) {
   let arr = row.filter(x => x);
   let missing = 4 - arr.length;
   let zeros = Array(missing).fill(0);
   arr = zeros.concat(arr);
   return arr;
}

// on same arr
function combine(row) {
   for (var i = 3; i >= 0 ; i--) {
      let a = row[i];
      let b = row[i - 1];
      if(a == b){
         row[i] = a + b;
         row[i - 1] = 0;
      }
   }
   return row;
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
               text(val, i*w + w/2,j*w + w/2);
            }
   }}
}
