console.log("Game starting up");
var fps = 30;

var dictionary = new dictionaryController();
var player = new controller();
var targetLangBoard = new board("lienzo");
var subjectLangBoard = new board("canvas");

function render() {
  targetLangBoard.render();
  subjectLangBoard.render();
}

//render is now called after each "event"
//an "event" is similar to the philosophical idea of an event
//events include the game starting, the user interactions, the win conditions being met, etc.
//in other words, there's no point in calling render() every 30 ms when nothing is happening.
//it only needs to be called when something happens - an event.
var wordsOnBoard = [];
function init() {
  console.log("Game starting");
  targetLangBoard.init(dictionary.loadWords());
  subjectLangBoard.init(["null"]);
  render();
}

function checkWinConditions() {
  console.log(wordsOnBoard);
  console.log(player.SelectedPieces);
  targetLangBoard.checkWinConditions(player.SelectedPieces);
  subjectLangBoard.checkWinConditions(player.SelectedPieces);

  reset();
  render();
}

function reset() {
  player.Clear();
  targetLangBoard.clear();
  subjectLangBoard.clear();
  render();
}

function onMouseDown(mouseEvent) {
  player.StartDrag();
  render();
}

function onMouseMove(mouseEvent) {
  console.log(player.IsDragging);
  if (player.IsDragging) {
    subjectLangBoard.getPieces().forEach(function(elem){
      if (player.CheckSelect(elem, mouseEvent)) {
        elem.IsSelected = true;
        player.SelectedPieces.push(elem.letter);
      }
    });

    targetLangBoard.getPieces().forEach(function(elem){
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
