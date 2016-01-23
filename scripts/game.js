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
var wordsOnBoard = [];
function init() {
  console.log("Game starting");
  pieces = createBoard();
  wordsOnBoard = dictionary.loadWords();
  addRealWords(wordsOnBoard);
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

//currently, only exact matches will be recognised, subsets aren't considered valid
//ie. user selection is "hola" then it will not match with "ola", only "hola"
function CheckWordIsAWin(word) {

  function wordsMatch(subject, target) {
    var matches = true;
    for(var i = 0; i < target.length && matches; ++i) {
      matches = target[i] == subject[i];
    }
    return matches;
  }

  var lettersOfWord = word.split('');
  var selectedIsSameLength = lettersOfWord.length == player.SelectedPieces.length;
  return selectedIsSameLength && wordsMatch(lettersOfWord, player.SelectedPieces);
}

//removes winning words from the wordsOnBoard array so that they can't be "won" again
function EnsureNoRepeatWins(winningWords) {
  winningWords.forEach(function(word) {
    wordsOnBoard.forEach(function(boardWord, index) {
      if (word == boardWord) {
        wordsOnBoard.splice(index, 1);
      }
    })
  })
}

function PaintBoardWinner() {
  pieces.forEach(function(elem) {
    if (elem.IsSelected) {
      elem.IsAWinner = true;
    }
  });
}

function checkWinConditions() {
  console.log(wordsOnBoard);
  console.log(player.SelectedPieces);
  var winningWords = [];
  wordsOnBoard.forEach(function(word){
    if(CheckWordIsAWin(word)) {
      winningWords.push(word);
      PaintBoardWinner();
    }
  })

  EnsureNoRepeatWins(winningWords);
  console.log(wordsOnBoard);
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
