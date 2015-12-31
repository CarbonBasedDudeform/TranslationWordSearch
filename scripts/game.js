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

function init() {
  console.log("Game starting");
  context.font = "2em helvetica";
  context.textAlign = "center";
  //this is wasteful but easy
  window.setInterval(gameLoop, fps);
}

function gameLoop() {
  checkWinConditions();
  render();
}

function render() {
  pieces.forEach(function(elem){
    elem.render();
  });
}

function checkWinConditions() {

}
