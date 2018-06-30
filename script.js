
var boardArray = new Array(9);
for (var i = 0; i < boardArray.length; i++) {
  boardArray[i] = new Array(9);
}


var board = new Array(9);
for (var i = 0; i < board.length; i++) {
  board[i] = new Array(9);
}

//console.log(boardArray);

var isBoardGenerated = false;
var generateBoardBtn = document.querySelector("#generateBoardBtn");

// generateBoardBtn.addEventListener('click', generateBoardWithBacktracking1);
generateBoardBtn.addEventListener('click', generateBoard);

function listOfValidValues(col, row){
  var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (var i = 0; i < board.length; i++) {
    if(board[col][i] != undefined && array.includes(board[col][i])){
      var index = array.indexOf(boardArray[col][i]);
      array.splice(index, 1);
    }
  }

    for (var i = 0; i < board[i].length; i++) {
      if(board[i][row] != undefined && array.includes(board[i][row])){
        var index = array.indexOf(board[i][row]);
        array.splice(index, 1);
      }
    }

    var newCol = 0;
    if(col <= 2){
      newCol = 0;
    }
    else if (col <= 5) {
        newCol = 3;
    }
    else if (col <= 8) {
        newCol = 6;
    }

    var newRow = 0;
    if(row <= 2){
      newRow = 0;
    }
    else if (row <= 5) {
        newRow = 3;
    }
    else if (row <= 8) {
        newRow = 6;
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if(board[col + i][row + j] != undefined && array.includes(board[col + i][row + j])){
          var index = array.indexOf(board[col + i][row + j]);
          array.splice(index, 1);
        }
      }
    }

    return array;

}
function listOfValidValues(col, row, listOfInvalidValues){
  var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (var i = 0; i < listOfInvalidValues.length; i++) {
    var index = array.indexOf(listOfInvalidValues[i]);
    array.splice(index, 1);
  }

  for (var i = 0; i < board.length; i++) {
    if(board[col][i] != undefined && array.includes(board[col][i])){
      var index = array.indexOf(boardArray[col][i]);
      array.splice(index, 1);
    }
  }

    for (var i = 0; i < board[i].length; i++) {
      if(board[i][row] != undefined && array.includes(board[i][row])){
        var index = array.indexOf(board[i][row]);
        array.splice(index, 1);
      }
    }

    var newCol = 0;
    if(col <= 2){
      newCol = 0;
    }
    else if (col <= 5) {
        newCol = 3;
    }
    else if (col <= 8) {
        newCol = 6;
    }

    var newRow = 0;
    if(row <= 2){
      newRow = 0;
    }
    else if (row <= 5) {
        newRow = 3;
    }
    else if (row <= 8) {
        newRow = 6;
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if(board[col + i][row + j] != undefined && array.includes(board[col + i][row + j])){
          var index = array.indexOf(board[col + i][row + j]);
          array.splice(index, 1);
        }
      }
    }

    return array;

}

function isValidInsert(col, row, value) {
//  console.log("(inside validInsert) col: " + col + " row: " + row + " value: " + value );
  for (var i = 0; i < 9; i++) {
    //console.log("boardArray[col][i] == value" + boardArray[col][i] == value + "||");
    //console.log("boardArray[i][row] == value" + boardArray[i][row] == value);
    if (board[col][i] == value || board[i][row] == value) {

      return false;
    }

  }

  var boxCol = Math.floor(col / 3) * 3;
  var boxRow = Math.floor(row / 3) * 3;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[boxCol + i][boxRow + j] == value) {
        return false;
      }
    }
  }
  return true;
}

function doFillInValue(col, row, value) {
  board[col][row] = value;
  dpUpdateHTML(col, row, value);
}

function doUpdateHTML(col, row, value) {
//  console.log("(inside updateHTML) col: " + col + " row: " + row + " value: " + value );
  var IDString = "#b" + col.toString() + row.toString();
//  console.log("(inside updateHTML) IDString: "  + IDString);
  var square = document.querySelector(IDString);
//  console.log("tempCount: " + tempCount);
//  console.log("value: " + value);
  var valStr = value.toString();
  square.innerHTML = valStr;
//  console.log("square.innerHTML: " + square.innerHTML);

}

function generateBoard() {
  for (var i = 0; i < boardArray.length; i++) {
    for (var j = 0; j < boardArray[i].length; j++) {

      var validNums = listOfValidValues(i, j);

      if(validNums.length == 0){

        // if(j==0){
        //   j = boardArray[i].length - 1 - 1;
        //   i--;
        // }
        // else {
        //   j--;
        // }
        //
        // continue;
      }

      var newIndex = Math.floor(Math.random() * validNums.length);
      var newValue = validNums[newIndex];

      if (isValidInsert(i, j, newValue)) {
        doFillInValue(i, j, newValue)
      }
      else{

      }


    }
  }

}



//this variable will update to the ID of the individual square that is clicked
var currentID = "";

//Get all the number square elements
var numberSquares = document.querySelectorAll(".number-square");

//This will add an event listener to each number-square element
for (var i = 0; i < numberSquares.length; i++) {
  var id = numberSquares[i].id;
  numberSquares[i].addEventListener('click', promptNumberChooser);
}

//prompts the number chooser div when a number square is clicked
function promptNumberChooser(event) {
  var nct = document.querySelector("#numberChooserTable");
  nct.style.display = "block";
  var id = event.target.id;
  currentID = id;
  addEventListenersToNumberChooser();
}

//add event listeners to number prompt
var numberChoosers = document.querySelectorAll(".number-chooser-data");

function addEventListenersToNumberChooser() {;
  for (var i = 0; i < numberChoosers.length; i++) {
    numberChoosers[i].addEventListener('click', changeContent);
  }
}

//changes the content of a number sqaure to the number clicked on in the nct
function changeContent(e) {
  var split = currentID.split("");
  var col = split[1];
  var row = split[2];
  var IDString = "#" + currentID;
  var square = document.querySelector(IDString);
  var newContent = event.target.innerHTML;
  if (validInsert(col, row, newContent)) {
    square.innerHTML = newContent;
  } else {
    console.log("NO! BAD MOVE!");
  }
}

// var board = new Array(9);
// for (var i = 0; i < board.length; i++) {
//   board[i] = new Array(9);
// }

var possValBoard = new Array(9);
for (var i = 0; i < possValBoard.length; i++) {
  possValBoard[i] = new Array(9);
  for (var j = 0; j < possValBoard[i].length; j++) {
    possValBoard[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

}

// console.log(possValBoard);
// possValBoard.splice(0,1);
// console.log(possValBoard);
// possValBoard[0].splice(0,1);
// console.log(possValBoard);
// possValBoard[0][0].splice(0,1);
//
// console.log(possValBoard);
// possValBoard = possValBoard[0][0].splice(0,1);
// console.log(possValBoard);

var insertsStack = new Array();

var missedCoords = new Array(81);


var count = 0;

var tempCount = 0;

/*
each cell will have a possible value array/list (PVA)

1.)start at first cell (0, 0)
2.)choose a value from the cell's PVA
3.)add it to the board and remove from PVA
4.)update the rest of the tables PVAs
5.)check if any remaining PVAs have length of 1 (ie that cell can only be 1 #)
5a.)if yes, go to 3.) and repeat until no
6.)repeat until the board is complete

*/

function generateBoardWithBacktracking1() {
  for (var i = 0; i < boardArray.length; i++) {
    for (var j = 0; j < boardArray[i].length; j++) {
      console.log("i: " + i + " j: " + j);
      console.log(possValBoard);

      var currPossValArray = possValBoard[i][j];

      if(currPossValArray.length == 0){
          console.log("currPossValArray.length == 0");
        //  if(i)


      }

      //2.)
      var newIndex = Math.floor(Math.random() * currPossValArray.length);
      var newValue = currPossValArray[newIndex];

      //
      // while(newValue == undefined ){
      //   newIndex = Math.floor(Math.random() * currPossValArray.length);
      //   newValue = currPossValArray[newIndex];
      //   console.log("i am in the while loop");
      // }

      console.log("newIndex: " + newIndex);
      console.log("newValue: " + newValue);
      console.log("Step 2 executed");

      //3.)
      if (validInsert(i, j, newValue)) {
        fillInValue(i, j, newValue)
        console.log("Step 3 executed");
      }
      console.log("After validInsert() & fillInValue() -> Poss Val Array of [0][8]: " + possValBoard[0][8]);

      //4.)
      updatePossValArray(i, j, newValue);
      console.log("Step 4 executed");
      console.log("After updatePossValArray() -> Poss Val Array of [0][8]: " + possValBoard[0][8]);

      //5.)
    checkForSingularities();
      console.log("Step 5 executed");

      console.log("After checkForSingularities() -> Poss Val Array of [0][8]: " + possValBoard[0][8]);


      console.log("----------------------------");




    }
  }


}

// function generateBoardWithBacktracking() {
//   for (var i = 0; i < boardArray.length; i++) {
//     for (var j = 0; j < boardArray[i].length; j++) {
//       if (!(boardArray[i][j] == undefined)) {
//         count++;
//
//         console.log("i: " + i + " j: " + j);
//         console.log(possValBoard);
//
//         var currPossValArray = possValBoard[i][j];
//         //  var randValue = Math.floor(Math.random() * 9) + 1;
//         var valIndex = Math.floor(Math.random() * currPossValArray.length);
//         var randValue = currPossValArray[valIndex];
//
//
//         if (validInsert(i, j, randValue)) {
//           fillInValue(i, j, randValue);
//           currPossValArray.splice(valIndex, 1);
//           updatePossValArray(i, j, randValue);
//           checkForSingularities();
//
//         } else {
//           missedCoords.push([i, j]);
//
//         }
//
//
//
//         ///  if(count > 500) break;
//
//       }
//     }
//   }
// }


function validInsert(col, row, value) {
  console.log("(inside validInsert) col: " + col + " row: " + row + " value: " + value );
  for (var i = 0; i < 9; i++) {
    //console.log("boardArray[col][i] == value" + boardArray[col][i] == value + "||");
    //console.log("boardArray[i][row] == value" + boardArray[i][row] == value);
    if (boardArray[col][i] == value || boardArray[i][row] == value) {

      return false;
    }

  }

  var boxCol = Math.floor(col / 3) * 3;
  var boxRow = Math.floor(row / 3) * 3;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (boardArray[boxCol + i][boxRow + j] == value) {
        return false;
      }
    }
  }
  return true;
}

function fillInValue(col, row, value) {
  tempCount++;
  console.log("(inside fillInValue) col: " + col + " row: " + row + " value: " + value );

  var obj = {col: col, row: row, value: value, boardArray: boardArray, possValBoard: possValBoard};
  var deepCopy = JSON.parse(JSON.stringify(obj));


  insertsStack.push(deepCopy);

  console.log("insertsStack: " + JSON.stringify(insertsStack[insertsStack.length - 1]));
  boardArray[col][row] = value;
  updateHTML(col, row, value);
}

function updateHTML(col, row, value) {
  console.log("(inside updateHTML) col: " + col + " row: " + row + " value: " + value );
  var IDString = "#b" + col.toString() + row.toString();
  console.log("(inside updateHTML) IDString: "  + IDString);
  var square = document.querySelector(IDString);
  console.log("tempCount: " + tempCount);
  console.log("value: " + value);
  var valStr = value.toString();
  square.innerHTML = valStr;
  console.log("square.innerHTML: " + square.innerHTML);

}

function checkForSingularities() {
  var singularityExists = false;
  do {
  singularityExists = false;
    for (var i = 0; i <  possValBoard.length; i++) {
      for (var j = 0; j < possValBoard[i].length; j++) {
//console.log("Inside checkForSingularities: ");
  //      console.log("i: " + i + " j: " + j);
if(i === 8 && j === 0){
        console.log(possValBoard[i][j]);
      }
        if (possValBoard[i][j].length === 1 && boardArray[i][j] == undefined) {
          console.log("here");
          fillInValue(i, j, possValBoard[i][j][0]);
          updatePossValArray(i, j, possValBoard[i][j][0]);
          possValBoard[i][j].splice(0, 1);
        //  singularityExists = true;
        }
      }
    }
  } while (singularityExists);
  return singularityExists;
}

function updatePossValArray(col, row, val) {
  for (var i = 0; i < 9; i++) {
    if (possValBoard[col][i].includes(val)) {
      var ind = possValBoard[col][i].indexOf(val);
      console.log("(in updatePossValArray())Removing this value: " + possValBoard[col][i][ind]);
      possValBoard[col][i].splice(ind, 1);
    }
    if (possValBoard[i][row].includes(val)) {
      var ind = possValBoard[i][row].indexOf(val);
      possValBoard[i][row].splice(ind, 1);
    }
  }

  var boxCol = Math.floor(col / 3) * 3;
  var boxRow = Math.floor(row / 3) * 3;

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (possValBoard[boxCol + i][boxRow + j].includes(val)) {
        var ind = possValBoard[boxCol + i][boxRow + j].indexOf(val);
        possValBoard[boxCol + i][boxRow + j].splice(ind, 1);
      }
    }
  }

  return possValBoard;
}
