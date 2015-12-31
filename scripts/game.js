console.log("Game starting up");
var canvas = document.getElementById("lienzo");
var context = canvas.getContext("2d");

var fps = 30;
function init() {
  console.log("Game starting");
  window.setInterval(gameLoop, fps);
}

function gameLoop() {
  checkWinConditions();
  render();
}

function render() {
}

function checkWinConditions() {

}
