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

function init() {
  console.log("Game starting");
  //this is wasteful but easy
  window.setInterval(gameLoop, fps);
}

function gameLoop() {
  render();
}

function render() {
  pieces.forEach(function(elem) {
    elem.render();
  });
}

function checkWinConditions() {
  console.log(player.SelectedPieces);
  reset();
}

function reset() {
  player.Clear();
  pieces.forEach(function(elem){
    elem.IsSelected = false;
  });
}

function onMouseDown(mouseEvent) {
  player.StartDrag();
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
}

function onMouseUp(mouseEvent) {
  player.StopDrag();
  checkWinConditions();
}
