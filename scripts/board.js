function board(canvasID) {
  var BOARD_SIZE = 750;
  var PIECE_SIZE = 50;
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
    for(var i = 0; i < BOARD_SIZE; i += PIECE_SIZE) {
      for(var j = 0; j < BOARD_SIZE; j += PIECE_SIZE) {
        pcs.push(new letterPiece("", i, j));
      }
    }
    return pcs;
  }

  this.scatter = function(letters) {
    function DecideOrientation(root) {
      var VERTICAL = 1;
      var HORIZONTAL = BOARD_SIZE/PIECE_SIZE;
      var randomNum = Math.floor((Math.random()*100));
      if (randomNum % 2 == 0) {
        return HORIZONTAL;
      } else {
        return VERTICAL;
      }
    }

    var perimeter = (BOARD_SIZE/PIECE_SIZE);
    function DecideRoot(word) {
      var boardArea =  perimeter*perimeter;
      var root = Math.floor((Math.random() * boardArea));
      if (((root%perimeter) + word.length) >= perimeter)
      {
        root -= word.length;
      }
      return root;
    }

    function ValidateRoot(root, word, pieces, orientation) {
      if (root < 0) {
        return false;
      }

      var noClashes = true;
      word.forEach(function(letter, index){
        if (typeof pieces[root+index*orientation] == "undefined") {
          //invalid due to location being out of bounds
          noClashes = false;
        } else if (pieces[root+index*orientation].letter != "") {
          //invalid due to location already in use
          noClashes = false;
        }
      });

      return noClashes;
    }

    function GetValidRoot(letters, orientation) {
      var root = DecideRoot(letters);
      while (ValidateRoot(root, letters, pcs, orientation) == false) {
        root = DecideRoot(letters);
      }
      return root;
    }

    var pcs = this.pieces;
    var offset = DecideOrientation(root);
    var root = GetValidRoot(letters, offset);

    letters.forEach(function(letter, index){
      pcs[root + index * offset].letter = letter;
    });
  }

  this.addRealWords = function(words) {
    console.log("adding real words");
    var self = this;
    words.forEach(function(word, wordIndex) {
      var letters = word.split('');
      self.scatter(letters);
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
