
console.log("Game starting up");
let dictionary = new dictionaryController();
const player = new controller();
let targetLangBoard = new board("lienzo");
let subjectLangBoard = new board("canvas");
let activeBoard = targetLangBoard;
function render() {
  activeBoard.render();
}

//render is now called after each "event"
//an "event" is similar to the philosophical idea of an event
//events include the game starting, the user interactions, the win conditions being met, etc.
//in other words, there's no point in calling render() every 30 ms when nothing is happening.
//it only needs to be called when something happens - an event.
let wordsOnBoard = [];
let total = 1;
function init() {
  console.log("Game starting");
  checkStartingConditions();
  dictionary.checkStartingConditionsCallback = checkStartingConditions;
}

function checkStartingConditions() {
  const minimumWords = 10;
  const words = dictionary.loadTargetWords();
  const enoughWords = words.length >= minimumWords;
  if (enoughWords) {
    targetLangBoard.init(words);
    targetLangBoard.SetWordToFind(words);
    subjectLangBoard.init(dictionary.loadSubjectWords(words));
    total = words.length;
    render();
  } else {
    activeBoard.renderStartMessage(minimumWords - words.length);
  }
}

function checkWinConditions() {
  const win = activeBoard.checkWinConditions(player.SelectedPieces);
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

  reset();
}

function switchBoards() {
  activeBoard.hide();
  if (activeBoard == targetLangBoard) {
    activeBoard = subjectLangBoard;
    const newWordToFind = dictionary.getWordToFind(player.SelectedPieces);
    activeBoard.SetWordToFind(newWordToFind);
  }
  else {
    activeBoard = targetLangBoard;
    updateProgressBar();
  }
  activeBoard.show();
}

function updateProgressBar() {
  const percentageDone = ((total - activeBoard.getWordsOnBoard().length) / total) * 100;
  document.getElementById("progressBarOverlay").style.width = percentageDone + "%";
  document.getElementById("progressText").innerHTML = percentageDone.toFixed(0) + "%";
}
