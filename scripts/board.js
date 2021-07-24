function board(canvasID) {
  const BOARD_SIZE = 750;
  const PIECE_SIZE = 50;
  console.log(canvasID);
  this.canvas = document.getElementById(canvasID);
  this.context = this.canvas.getContext("2d");
  this.pieces = [];
  this.getPieces = function() {
    return this.pieces;
  }

  this.render = function() {
    let context = this.context;
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
    let ctx = canvas.getContext("2d");
    console.log(canvasID);
    let pcs = [];
    for(let i = 0; i < BOARD_SIZE; i += PIECE_SIZE) {
      for(let j = 0; j < BOARD_SIZE; j += PIECE_SIZE) {
        pcs.push(new letterPiece("", i, j));
      }
    }
    return pcs;
  }

  this.scatter = function(letters) {
    function DecideOrientation() {
      const VERTICAL = 1;
      const HORIZONTAL = BOARD_SIZE/PIECE_SIZE;
      const randomNum = Math.floor((Math.random()*100));
      const randomIsEven = randomNum % 2 == 0;
      if (randomIsEven) {
        return HORIZONTAL;
      } else {
        return VERTICAL;
      }
    }

    const perimeter = (BOARD_SIZE/PIECE_SIZE);
    function DecideRoot(word) {
      const boardArea =  perimeter*perimeter;
      let root = Math.floor((Math.random() * boardArea));
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

      let noClashes = true;
      word.forEach(function(letter, index){
        console.log(pieces[root+index*orientation]);
        const outOfBounds = typeof pieces[root+index*orientation] == "undefined";
        const locationAlreadyInUse = !outOfBounds && pieces[root+index*orientation].letter != "";
        noClashes = !locationAlreadyInUse;
        console.log(noClashes);
      });

      return noClashes;
    }

    function GetValidRoot(letters, orientation, pcs) {
      let root = DecideRoot(letters);
      while (ValidateRoot(root, letters, pcs, orientation) == false) {
        root = DecideRoot(letters);
      }
      return root;
    }

    let pcs = this.pieces;
    const offset = DecideOrientation();
    const root = GetValidRoot(letters, offset, pcs);

    letters.forEach(function(letter, index){
      pcs[root + index * offset].letter = letter;
    });
  }

  this.addRealWords = function(words) {
    console.log("adding real words");
    let self = this;
    words.forEach(function(word, wordIndex) {
      const letters = word.split('');
      self.scatter(letters);
    });
  }

  //Mess being the non-words, the random gibberish to fill in the gaps
  this.addMess = function() {
    console.log("Adding Mess");
    function randomLetter() {
      const numberOfLettersInAlphabet = 26;
      const ASCIICodeForCapitalA = 97;
      const randomLetter = String.fromCharCode(ASCIICodeForCapitalA + (Math.random() * numberOfLettersInAlphabet) );
      return randomLetter;
    }
    this.pieces.forEach(function(elem){
      const emptyLocation = elem.letter == "";
      if (emptyLocation) {
        elem.letter = randomLetter();
      }
    });
  }

  //removes winning words from the wordsOnBoard array so that they can't be "won" again
  this.EnsureNoRepeatWins = function(winningWords) {
    let wordsOnBoard = this.wordsOnBoard;
    winningWords.forEach(function(word) {
      wordsOnBoard.forEach(function(boardWord, index) {
        if (word == boardWord) {
          wordsOnBoard.splice(index, 1);
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
    let winningWords = [];
    let self = this;
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
      let matches = true;
      for(let i = 0; i < target.length && matches; ++i) {
        matches = target[i] == subject[i];
      }
      return matches;
    }

    let lettersOfWord = word.split('');

    let selectedIsSameLength = lettersOfWord.length == selectedWord.length;
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
