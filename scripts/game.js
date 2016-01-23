console.log("Game starting up");
var fps = 30;

var dictionary = new dictionaryController();
var player = new controller();
var targetLangBoard = new board("lienzo");
var subjectLangBoard = new board("canvas");
var activeBoard = targetLangBoard;

function render() {
  activeBoard.render();
}

//render is now called after each "event"
//an "event" is similar to the philosophical idea of an event
//events include the game starting, the user interactions, the win conditions being met, etc.
//in other words, there's no point in calling render() every 30 ms when nothing is happening.
//it only needs to be called when something happens - an event.
var wordsOnBoard = [];
function init() {
  console.log("Game starting");
  var words = dictionary.loadTargetWords();
  targetLangBoard.init(words);
  subjectLangBoard.init(dictionary.loadSubjectWords(words));
  render();
}

function checkWinConditions() {
  var win = activeBoard.checkWinConditions(player.SelectedPieces);

  reset();
  render();
  return win;
}

function reset() {
  player.Clear();
  activeBoard.clear();
  render();
}

function onMouseDown(mouseEvent) {
  player.StartDrag();
  render();
}

function onMouseMove(mouseEvent) {
  if (player.IsDragging) {
    activeBoard.getPieces().forEach(function(elem){
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
  if(checkWinConditions()) {
    switchBoards();
  }
}

function switchBoards() {
  activeBoard.hide();
  if (activeBoard == targetLangBoard) {
    activeBoard = subjectLangBoard;
  }
  else {
    activeBoard = targetLangBoard;
  }
  activeBoard.show();
}
