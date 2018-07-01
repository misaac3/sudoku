/*
Board indices visulized
|--------------------------|
| 0| 1| 2| 3| 4| 5| 6| 7| 8|
|--------------------------|
| 9|10|11|12|13|14|15|16|17|
|--------------------------|
|18|19|20|21|22|23|24|25|26|
|--------------------------|
|27|28|29|30|31|32|33|34|35|
|--------------------------|
|36|37|38|39|40|41|42|43|44|
|--------------------------|
|45|46|47|48|49|50|51|52|53|
|--------------------------|
|54|55|56|57|58|59|60|61|62|
|--------------------------|
|63|64|65|66|67|68|69|70|71|
|--------------------------|
|72|73|74|75|76|77|78|79|80|
|--------------------------|

var str = "|--------------------------|\n|";
for (var i = 0; i < 9; i++) {
for (var j = 0; j < 9; j++) {
if((i *9) + j < 10){
str += " " + ((i *9) + j).toString() + "|";
}
else {
str += ((i *9) + j).toString() + "|";
}
}
str += "\n|--------------------------|\n|";
}
console.log(str);
*/

//var board = new Array(81);
var buttonSolve = document.querySelector("#consoleSolve");
var buttonPrint = document.querySelector("#printBoard2D");
buttonSolve.addEventListener("click", solveWithBacktrackingDriver);
buttonPrint.addEventListener("click", printBoard2D);

function solveWithBacktrackingDriver(){
  var h1 = document.querySelector("#message");
  h1.innerHTML = "Solving...";
  if(solveWithBacktracking(board2D)){
    console.log("successful");
    console.log("After completion: ");
    printBoard2D();
    updateHTML();
    h1.innerHTML = "Success"
  }
  else{
    console.log("FAIL");
    h1.innerHTML = "No Solution found";
  }
}
//First test
// board =
// [8, 0, 0, 0, 0, 0, 3, 0, 0,
//   4, 0, 0, 8, 0, 0, 2, 6, 7,
//   0, 6, 0, 0, 5, 2, 0, 0, 1,
//   0, 0, 0, 0, 1, 9, 0, 0, 8,
//   0, 3, 1, 4, 0, 8, 5, 2, 0,
//   9, 0, 0, 2, 3, 0, 0, 0, 0,
//   5, 0, 0, 9, 7, 0, 0, 1, 0,
//   6, 7, 4, 0, 0, 1, 0, 0, 2,
//   0, 0, 3, 0, 0, 0, 0, 0, 4];

// updateHTML();
var BOARD2D;
var board2D =[
  [8, 0, 0, 0, 0, 0, 3, 0, 0],
  [4, 0, 0, 8, 0, 0, 2, 6, 7],
  [0, 6, 0, 0, 5, 2, 0, 0, 1],
  [0, 0, 0, 0, 1, 9, 0, 0, 8],
  [0, 3, 1, 4, 0, 8, 5, 2, 0],
  [9, 0, 0, 2, 3, 0, 0, 0, 0],
  [5, 0, 0, 9, 7, 0, 0, 1, 0],
  [6, 7, 4, 0, 0, 1, 0, 0, 2],
  [0, 0, 3, 0, 0, 0, 0, 0, 4]
];

// board2D =[
//   [1, 0, 0, 0, 0, 0, 3, 0, 0],
//   [0, 0, 0, 8, 0, 0, 2, 6, 7],
//   [0, 6, 0, 0, 5, 2, 0, 0, 1],
//   [0, 0, 0, 0, 1, 9, 0, 0, 8],
//   [0, 3, 1, 4, 0, 8, 5, 2, 0],
//   [9, 0, 0, 2, 3, 0, 0, 0, 0],
//   [5, 0, 0, 9, 7, 0, 0, 1, 0],
//   [6, 7, 4, 0, 0, 1, 0, 0, 2],
//   [0, 0, 3, 0, 0, 0, 0, 0, 4]
// ];

var board2D =[
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];


//printBoard2D();
function printBoard2D(){
  var str = "___________________\n";
  for (var i = 0; i < board2D.length; i++) {
    str += "|";
    for (var j = 0; j < board2D[i].length; j++) {
      if(board2D[i][j] == 0){
        str += " |"
      }
      else{
        str += board2D[i][j].toString() + "|";
      }
    }

    if(i % 3 == 2){
      str += "\n|_____|_____|_____|\n"
    }
    // if (i == board2D.length - 1) {
    //   str += "___________________";
    // }
    else{
      str += "\n|-----|-----|-----|\n"
    }
  }
  console.log(str);
}


function printBoard(){
  var stringBuilder = "|-----------------|\n";
  var charCount = 0;
  for (var i = 0; i < board.length; i++) {
    stringBuilder += "|" + board[i].toString();
    charCount++;
    if(charCount >= 9){
      stringBuilder += "|\n|-----------------|\n";
      charCount = 0;
    }
  }
  console.log(stringBuilder);
}

//TODO
/*

backtracking explaination from Jeff Erickson's Textbook
(http://jeffe.cs.illinois.edu/teaching/algorithms/notes/03-backtracking.pdf)
Find a small choice whose correct answer would reduce the problem
size. For each possible answer, temporarily adopt that choice and
recurse. (Don’t try to be clever about which choices to try; just try
them all.) The recursive subproblem is often more general than the
original target problem;  in each recursive subproblem, we must
consider only solutions that are consistent with the choices we have
already made
*/
function solveWithBacktracking(board2D){
  BOARD2D = board2D;
  printBoard2D();
  updateHTML();
  //find open square (if none, solution is found!)
  //if one is found assign the row and column to variables
  var obj = {row: undefined, col: undefined};

  if(!findNextOpenSquare(board2D, obj)){
    return true;
  }

  //try 1 through 9 in the open square
  for (var tryValue = 1; tryValue <= 9; tryValue++) {

    //if it is a valid move, insert the value into the board
    //and rescursively call this function with the new board
    if(isValidInsert(obj.row, obj.col, tryValue)){

      board2D[obj.row][obj.col] = tryValue;
    //  doUpdateHTML(obj.row, obj.col, tryValue);

      //if that call is successful return true
      if(solveWithBacktracking(board2D)){
        return true;
      }
      //if not undo the insertion made earlier
      else{
        board2D[obj.row][obj.col] = 0;
      }
    }
  }

  //return false at the end of the function to trigger backtracking

  return false
}

function findNextOpenSquare(_board, coords){//, row, col){

  for (var i = 0; i < _board.length; i++) {
    for (var j = 0; j < _board[i].length; j++) {
      if(_board[i][j] == 0){
        coords.row = i;
        coords.col = j;
        return true;
      }
    }
  }
  return false;
}



function isValidInsert(col, row, value) {
  for (var i = 0; i < 9; i++) {

    if (board2D[col][i] == value || board2D[i][row] == value) {
      return false;
      console.log("fail");
    }

  }

  var boxCol = Math.floor(col / 3) * 3;
  var boxRow = Math.floor(row / 3) * 3;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board2D[boxCol + i][boxRow + j] == value) {
        return false;
      }
    }
  }
  return true;
}



function updateHTML(){
  for(var row = 0; row < 9; row++){
    for(var col = 0; col < 9; col++){
      var value = board2D[row][col];
      if(value == 0) value = " "
      var IDString = "#b" +  row.toString() + col.toString();
      var square = document.querySelector(IDString);
      var valStr = value.toString();
      square.innerHTML = valStr;
    }
  }

}
updateHTML();
