var btn = document.querySelector("#generateBoardBtn");
btn.addEventListener('click', generateBoard);


function generateBoard(){
  console.log("in generateBoard");
  var num = 20;
  for (var i = 0; i < num; i++) {
    console.log("i: " + i);
    var randRow = Math.floor(Math.random() * 9);
    var randCol = Math.floor(Math.random() * 9);

    if(board2D[randRow][randCol] == 0){
      var possNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      console.log(possNums);
      while(possNums.length > 0){

        var randIndex = Math.floor(Math.random() * possNums.length);
        if(isValidInsert(randRow, randCol, possNums[randIndex])){

          board2D[randRow][randCol] = possNums[randIndex];
          continue;
        }
        else{
          possNums.splice(randIndex, 1);
        }
      }
    }
    else{
      i--;
    }
    printBoard2D();
    updateHTML();
  }

  solveWithBacktracking(board2D);
  removeElements(board2D, 40);
  updateHTML();
  possValsInitialized = false;

}

function removeElements(board2D, numToRemove){
  while(numToRemove > 0){
    var randRow = Math.floor(Math.random() * 9);
    var randCol = Math.floor(Math.random() * 9);
    if(board2D[randRow][randCol] != 0){
      board2D[randRow][randCol] = 0;
      numToRemove--;
    }

  }
}
