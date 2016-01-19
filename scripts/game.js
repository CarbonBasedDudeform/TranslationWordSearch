console.log("Game starting up");
var canvas = document.getElementById("lienzo");
var context = canvas.getContext("2d");

var fps = 30;
var pieces = [];

var player = new controller();
function render() {
  pieces.forEach(function(elem) {
    elem.render();
  });
}

//render is now called after each "event"
//an "event" is similar to the philosophical idea of an event
//events include the game starting, the user interactions, the win conditions being met, etc.
//in other words, there's no point in calling render() every 30 ms when nothing is happening.
//it only needs to be called when something happens - an event.
function init() {
  console.log("Game starting");
  pieces = createBoard(loadWords());
  render();
}

function loadWords() {
  console.log("Loading words");
  var wordsToUse = [];
  //for now, use basic "grab first 10 words" algorithm.
  //in the future, will want to spice it up a bit.
  var amountToGrab = Math.min(localStorage.length, 10);
  for(var i = 0; i < amountToGrab; i++) {
    wordsToUse.push(localStorage.key(i));
  }

  return wordsToUse;
}

function createBoard(words) {
  console.log("Creating Board");
  console.log(words);
  var pieces = [];
  words.forEach(function(elem, wordIndex) {
    var letters = elem.split('');
    letters.forEach(function(letter, index){
      pieces.push(new letterPiece(letter, 50*index, 50*wordIndex));
    });
  });

  return pieces;
}

function checkWinConditions() {
  console.log(player.SelectedPieces);
  reset();
  render();
}

function reset() {
  player.Clear();
  pieces.forEach(function(elem){
    elem.IsSelected = false;
  });
  render();
}

function onMouseDown(mouseEvent) {
  player.StartDrag();
  render();
}

function onMouseMove(mouseEvent) {
  if (player.IsDragging) {
    pieces.forEach(function(elem){
      if (player.CheckSelect(elem, mouseEvent)) {
        elem.IsSelected = true;
        player.SelectedPieces.push(elem.letter);
      }
    });
  }
  render();
}

function onMouseUp(mouseEvent) {
  player.StopDrag();
  checkWinConditions();
}
