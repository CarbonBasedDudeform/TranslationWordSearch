console.log("Game starting up");
var canvas = document.getElementById("lienzo");
var context = canvas.getContext("2d");

var fps = 30;
var pieces = [new letterPiece("F", 0, 0),
              new letterPiece("O", 50, 0),
              new letterPiece("O", 100, 0),
              new letterPiece("B", 150, 0),
              new letterPiece("A", 200, 0),
              new letterPiece("R", 250, 0)];

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
  render();
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
