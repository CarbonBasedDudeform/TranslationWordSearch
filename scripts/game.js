console.log("Game starting up");
var canvas = document.getElementById("lienzo");
var context = canvas.getContext("2d");

var fps = 30;
var pieces = [];

var dictionary = new dictionaryController();
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
  pieces = createBoard();
  addRealWords(dictionary.loadWords());
  addMess();
  render();
}

function createBoard() {
  console.log("Creating Board");
  var pieces = [];
  for(var i = 0; i < 400; i += 50) {
    for(var j = 0; j < 400; j += 50) {
      pieces.push(new letterPiece("", i, j));
    }
  }

  return pieces;
}

function addRealWords(words) {
  console.log("adding real words");
  console.log(words);
  words.forEach(function(word, wordIndex) {
    var letters = word.split('');
    letters.forEach(function(letter, index){
      pieces[wordIndex*8 + index].letter = letter;
    });
  });
}

//Mess being the non-words, the random gibberish to fill in the gaps
function addMess() {
  console.log("Adding Mess");
  function randomLetter() {
    var numberOfLettersInAlphabet = 26;
    var ASCIICodeForCapitalA = 97;
    return String.fromCharCode(ASCIICodeForCapitalA + (Math.random() * numberOfLettersInAlphabet) );
  }
  pieces.forEach(function(elem){
    if (elem.letter == "") {
      elem.letter = randomLetter();
    }
  });
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
