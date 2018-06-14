
//this variable will update to the ID of the individual square that is clicked
var currentID = "";

//Get all the number square elements
var numberSquares = document.querySelectorAll(".number-square");

//This will add an event listener to each number-square element
for(var i = 0; i < numberSquares.length; i++){
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
function addEventListenersToNumberChooser(){;
  for (var i = 0; i < numberChoosers.length; i++) {
    numberChoosers[i].addEventListener('click', changeContent);
  }
}

//changes the content of a number sqaure to the number clicked on in the nct
function changeContent(e){
  var IDString = "#" + currentID;
  var square = document.querySelector(IDString);
  var newContent = event.target.innerHTML;
  square.innerHTML = newContent;

}
