var possVals = new Array(9);
var possValsInitialized = false;

for (var i = 0; i < possVals.length; i++) {
  possVals[i] = new Array(9);
  for (var j = 0; j < possVals[i].length; j++) {
    possVals[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
}

var tablesShowing = false;
var togglePossValsBtn = document.querySelector('#togglePossVals');
togglePossValsBtn.addEventListener('click', function(){
  if(!possValsInitialized){
    initAllPossValTables();

  }
  if(tablesShowing){
    var tables = document.querySelectorAll(".test-table");
  for (var i = 0; i < tables.length; i++) {
      var table = tables[i];
      table.style.display = "none";
    }
    tablesShowing = !tablesShowing;
  }
  else {

      var tables = document.querySelectorAll(".test-table");
      for (var i = 0; i < tables.length; i++) {
        var table = tables[i];
        table.style.display = "";
      }
      tablesShowing = !tablesShowing;
    }

})



var str = "";

updateAllPossVals();




function updateAllPossValTables(){
  for (var i = 0; i < possVals.length; i++) {
    for (var j = 0; j < possVals[i].length; j++) {
      if(board2D[i][j] == 0){
        console.log(i + ", " + j);
        updatePossValTables(i, j);
      }
    }
  }
}

function updatePossValTables(row, col){
  //"b01InnerTable4"
  var tableID = '#b'+ row.toString() + col.toString() + 'InnerTable';
  var tableInSquare = document.querySelector(tableID);
try{

  for (var i = 1; i <= 9; i++) {
    var currInnerTdId = tableID + i.toString();
    console.log(currInnerTdId);
    console.log(board2D);
    var currTD = document.querySelector(currInnerTdId);
    console.log(currTD);
    if(possVals[row][col].includes(i)){
      currTD.innerHTML = i.toString();
    }
    else{
      currTD.innerHTML = "<del class='del'>" + i.toString() + "</del></td>";

    }


  }
}catch(e){
  initPossValTables(row, col);
}



}

function initAllPossValTables(){
  for (var i = 0; i < possVals.length; i++) {
    for (var j = 0; j < possVals[i].length; j++) {
      if(board2D[i][j] == 0){
        initPossValTables(i, j);
      }
    }
  }
  possValsInitialized = true;
}

function initPossValTables(row, col){
  var square = document.querySelector("#b" + row.toString() + col.toString() );
  var newTable = document.createElement("table");

  newTable.id = "b" +  row.toString() + col.toString() +"InnerTable";

  var innerHTMLString = "";
  var value = 0;
  for (var i = 1; i <= 3; i++) {
    innerHTMLString += '<tr>';
    for (var j = 1; j <= 3; j++) {
      value++;
      if(possVals[row][col].includes(value)){
        innerHTMLString += "<td id='" + newTable.id + (((i - 1) * 3) + j).toString() + "'>" + value.toString() + "</td>";
      }
      else{
        innerHTMLString += "<td id='" + newTable.id + (((i - 1) * 3) + j).toString() + "'><del class='del'>" + value.toString() + "</del></td>";
      }

    }
    innerHTMLString += "</tr>";
  }


  newTable.innerHTML = innerHTMLString;
  newTable.classList.add("test-table");
  //newTable.classList.add("table-in-square");

  square.appendChild(newTable);
  console.log(newTable.id);
}

function printPossVals() {
  for (var i = 0; i < possVals.length; i++) {
    for (var j = 0; j < possVals[i].length; j++) {
      console.log("Possible values at [" + i + "]" + "[" + j + "] :" + possVals[i][j]);
    }
  }
}


function updatePossVals(row, col) {
  if (board2D[row][col] != 0) {
    var currVal = board2D[row][col];
    var newPossValArray = new Array();
    newPossValArray.push(currVal);
    possVals[row][col] = newPossValArray;
    return;
  }

  var localPossValArray = possVals[row][col];

  for (var k = 0; k < 9; k++) {
    var rowVal = board2D[row][k];
    var colVal = board2D[k][col];
    if (localPossValArray.includes(rowVal)) {
      localPossValArray.splice(localPossValArray.indexOf(rowVal), 1);
    }
    if (localPossValArray.includes(colVal)) {
      localPossValArray.splice(localPossValArray.indexOf(colVal), 1);
    }
  }

  var boxCol = Math.floor(col / 3) * 3;
  var boxRow = Math.floor(row / 3) * 3;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var boxVal = board2D[boxRow + j][boxCol + i];
      if (row == 0 && col == 8) {
        str += "board2D[" + (boxCol + i) + "][" + (boxRow + j) + "] = " + boxVal + "\n";
      }

      if (localPossValArray.includes(boxVal)) {
        localPossValArray.splice(localPossValArray.indexOf(boxVal), 1);
      }

    }
  }
}

function updateAllPossVals() {
  for (var i = 0; i < board2D.length; i++) {
    for (var j = 0; j < board2D[i].length; j++) {
      updatePossVals(i, j);
    }
  }
}
