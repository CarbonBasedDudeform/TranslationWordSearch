function board(canvasID) {
  console.log(canvasID);
  this.canvas = document.getElementById(canvasID);
  this.context = this.canvas.getContext("2d");
  this.pieces = [];
  this.getPieces = function() {
    return this.pieces;
  }

  this.render = function() {
    var context = this.context;
    this.pieces.forEach(function(elem) {
      elem.render(context);
    });
  }

  this.wordsOnBoard = [];
  this.getWordsOnBoard = function() {
    return this.wordsOnBoard;
  }
  this.init = function(words) {
    this.pieces = createBoard();
    this.wordsOnBoard = words;
    this.addRealWords(this.wordsOnBoard);
    this.addMess();
  }


  function createBoard() {
    console.log("Creating Board");
    var ctx = canvas.getContext("2d");
    console.log(canvasID);
    var pcs = [];
    for(var i = 0; i < 400; i += 50) {
      for(var j = 0; j < 400; j += 50) {
        pcs.push(new letterPiece("", i, j));
      }
    }
    return pcs;
  }

  this.addRealWords = function(words) {
    console.log("adding real words");
    var pcs = this.pieces;
    words.forEach(function(word, wordIndex) {
      var letters = word.split('');
      letters.forEach(function(letter, index){
        pcs[wordIndex*8 + index].letter = letter;
      });
    });
  }

  //Mess being the non-words, the random gibberish to fill in the gaps
  this.addMess = function() {
    console.log("Adding Mess");
    function randomLetter() {
      var numberOfLettersInAlphabet = 26;
      var ASCIICodeForCapitalA = 97;
      return String.fromCharCode(ASCIICodeForCapitalA + (Math.random() * numberOfLettersInAlphabet) );
    }
    this.pieces.forEach(function(elem){
      if (elem.letter == "") {
        elem.letter = randomLetter();
      }
    });
  }

  //removes winning words from the wordsOnBoard array so that they can't be "won" again
  this.EnsureNoRepeatWins = function(winningWords) {
    var wob = this.wordsOnBoard;
    winningWords.forEach(function(word) {
      wob.forEach(function(boardWord, index) {
        if (word == boardWord) {
          wob.splice(index, 1);
        }
      })
    })
  }

  this.PaintBoardWinner = function() {
    this.pieces.forEach(function(elem) {
      if (elem.IsSelected) {
        elem.IsAWinner = true;
      }
    });
  }

  this.wordsToFind = [];
  this.SetWordToFind = function(word) {
    this.wordsToFind = word;
  }

  this.checkWinConditions = function(selectedWord) {
    var winningWords = [];
    var self = this;
    this.wordsToFind.forEach(function(word){
      console.log(word);
      if(CheckWordIsAWin(word, selectedWord)) {
        winningWords.push(word);
        self.PaintBoardWinner();
      }
    })

    this.EnsureNoRepeatWins(winningWords);
    return winningWords.length > 0;
  }

  //currently, only exact matches will be recognised, subsets aren't considered valid
  //ie. user selection is "hola" then it will not match with "ola", only "hola"
  function CheckWordIsAWin(word, selectedWord) {

    function wordsMatch(subject, target) {
      var matches = true;
      for(var i = 0; i < target.length && matches; ++i) {
        matches = target[i] == subject[i];
      }
      return matches;
    }

    var lettersOfWord = word.split('');

    var selectedIsSameLength = lettersOfWord.length == selectedWord.length;
    return selectedIsSameLength && wordsMatch(lettersOfWord, selectedWord);
  }

  this.clear = function() {
    this.pieces.forEach(function(elem){
      elem.IsSelected = false;
    });
  }

  this.hide = function() {
    //should probably switch to proper css
    this.canvas.style.display = "none";
  }

  this.show = function() {
    this.canvas.style.display = "";
  }
}
