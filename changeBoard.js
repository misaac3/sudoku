window.addEventListener('keydown', moveFocus);
window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

window.addEventListener('keydown', changeSquareThroughKeys);


function changeSquareThroughKeys(e){
  if(currentID != ""){
    var split = currentID.split("");
    var row = split[1];
    var col = split[2];

    switch (e.code) {
      case "Digit0":
      changeContentThroughType(0);
      break;
      case "Digit1":
      if(isValidInsert(row, col, 1)){
        changeContentThroughType(1);
      }
      break;

      case "Digit2":
      if(isValidInsert(row, col, 2)){
        changeContentThroughType(2);
      }
      break;

      case "Digit3":
      if(isValidInsert(row, col, 3)){
        changeContentThroughType(3);
      }
      break;

      case "Digit4":
      if(isValidInsert(row, col, 4)){
        changeContentThroughType(4);
      }
      break;

      case "Digit5":
      if(isValidInsert(row, col, 5)){
        changeContentThroughType(5);
      }
      break;

      case "Digit6":
      if(isValidInsert(row, col, 6)){
        changeContentThroughType(6);
      }
      break;

      case "Digit7":
      if(isValidInsert(row, col, 7)){
        changeContentThroughType(7);
      }
      break;

      case "Digit8":
      if(isValidInsert(row, col, 8)){
        changeContentThroughType(8);
      }
      break;

      case "Digit9":
      if(isValidInsert(row, col, 9)){
        changeContentThroughType(9);
      }
      break;

      default:
    }
  }
}

function moveFocus(e){
  /*
  left -  ArrowLeft 37
  up -    ArrowUp  38
  right - ArrowRight  39
  down -  ArrowDown 40
  */
  console.log(e.code);

  if(currentID == ""){
    return;
  }
  var split = currentID.split("");
  var row = split[1];
  var col = split[2];
  console.log("col: " + col + " row: " + row);

  switch (e.code) {
    case "ArrowUp":
    if(row != 0){
      prevID = currentID;
      row--;
      currentID = "b" + (row).toString() + col.toString();
      highlightCurrentSquare();
    }
    break;

    case "ArrowDown":
    if(row != 8){
      prevID = currentID;
      row++;
      currentID = "b" + (row).toString() + col.toString();
      highlightCurrentSquare();
    }
    break;

    case "ArrowLeft":
    if (col != 0) {
      prevID = currentID;
      col--;
      currentID = "b" + (row).toString() + col.toString();
      highlightCurrentSquare();
    }
    break;

    case "ArrowRight":
    if (col != 8) {
      prevID = currentID;
      col++;
      currentID = "b" + (row).toString() + col.toString();
      highlightCurrentSquare();
    }
    break;
    default:

  }
}


//this variable will update to the ID of the individual square that is clicked
var currentID = "";

var prevID = "";

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
  if(currentID != ""){
    prevID = currentID;
  }
  currentID = id;
  console.log("prevID: " + prevID + " currentID: " + currentID );
  highlightCurrentSquare();
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
  var row = split[1];
  var col = split[2];
  var IDString = "#" + currentID;
  var square = document.querySelector(IDString);
  var newContent = e.target.innerHTML;
  console.log(newContent);
  if (isValidInsert(row, col, newContent)) {
    updateBoard2D(row, col, newContent);
    square.innerHTML = newContent;
  } else {
    console.log("NO! BAD MOVE!");
    alert("Invalid Move");
  }
}
function changeContentThroughType(num) {

  var split = currentID.split("");
  var row = split[1];
  var col = split[2];
  var IDString = "#" + currentID;
  var square = document.querySelector(IDString);
  //var newContent = e.target.innerHTML;
  var newContent = num;
  console.log(newContent);
  if (num == 0 || isValidInsert(row, col, newContent)) {
    updateBoard2D(row, col, newContent);
    if(num == 0){
      newContent = "";
    }
    square.innerHTML = newContent;
  } else {
    console.log("NO! BAD MOVE!");
  }
}

function updateBoard2D(row, col, value){
  board2D[row][col] = value;
}

function highlightCurrentSquare(){
  if(prevID != ""){
    var prevSquare = document.querySelector("#" + prevID);
    prevSquare.classList.remove("highlight-square");
  }
  var square = document.querySelector("#" + currentID);
  square.classList.add("highlight-square");
}
