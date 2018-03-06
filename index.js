console.log('hello world');

let grid;
let score = 0;


function isGameOver() {
   for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
         if (grid[i][j] === 0) {
            return false;
         }
         if (j !==3 && grid[i][j] === grid[i][j + 1]) {
            return false;
         }
         if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
            return false;
         }
      }
   }
   return true;
}
function blankGrid() {
   return [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
   ];
}
function setup(){
   createCanvas(400,400);
   noLoop();
   grid = blankGrid();
   addNumber();
   addNumber();

      updateCanvas();
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

   if(opts.length > 0){
   let spot = random(opts);
   grid[spot.x][spot.y] = random(1) > 0.5 ? 2 : 4;
   }
}

function copyGrid(grid) {
   let extra = blankGrid();

   for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
         extra[i][j] = grid[i][j]
      }
   }
   return extra;
}
function compare(a,b) {
      for (var i = 0; i < 4; i++) {
         for (var j = 0; j < 4; j++) {
            if (a[i][j] != b[i][j]) {
               return true;
            }
         }
      }

      return false;
}

function flipGrid(grid) {
   for (var i = 0; i < 4; i++) {
      grid[i].reverse();
   }
   return grid;
}
function rotateGrid(grid) {
   let newGrid = blankGrid();
   for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
      newGrid[i][j] = grid[j][i];
      }
   }
   return newGrid;
}

function keyPressed() {
      let rotated = false;
      let flipped = false;
      let played = true;
   switch (keyCode) {
      case DOWN_ARROW:
            // nothing
            break;
      case UP_ARROW :
            grid = flipGrid(grid);
            flipped = true;
            break;
      case RIGHT_ARROW:
            grid = rotateGrid(grid);
            rotated = true;
            break;
      case LEFT_ARROW:
            grid = rotateGrid(grid);
            grid = flipGrid(grid)
            rotated = true;
            flipped = true;
            break;
      default:
            console.log('sss');
            played = false;
            break;

   }
   if (played = true) {

         let past = copyGrid(grid);
         for(let i = 0; i < 4; i++){
         grid[i] = operate(grid[i]);
         }
         let changed = compare(past, grid);
         if(flipped){
            grid = flipGrid(grid);
         }
         if(rotated){
            grid = rotateGrid(grid);
            grid = rotateGrid(grid);
            grid = rotateGrid(grid);
         }
         if (changed === true) {
            addNumber();
         }
         updateCanvas();
         let gameOver = isGameOver();
         if (gameOver) {
            select('#gameover').html('<span>NO MORE MOVES LEFT !</span> <br>GAME OVER');

         }
   }
}

function operate(row) {
   row = slide(row);
   row = combine(row);
   row = slide(row);

   return row;
}

function updateCanvas() {
   background(255);
   drawGrid();
   select('#score').html(score);
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
         score += row[i];
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
