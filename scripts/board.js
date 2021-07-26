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

  this.renderStartMessage = function(wordsRequired) {
    this.context.fillStyle = "grey";
    this.context.fillRect(0,0, BOARD_SIZE, BOARD_SIZE);
    this.context.font = "2em helvetica";
    const messsage = `Please add ${wordsRequired} to play.`;
    const measure = this.context.measureText(messsage);
    this.context.fillStyle = "black";
    this.context.fillText(messsage, (BOARD_SIZE - measure.width)/2, BOARD_SIZE/2);
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

      let rootIsValid = true;
      word.forEach(function(letter, index){
        const inBound = root+index*orientation < pieces.length;//typeof pieces[root+index*orientation] != "undefined";
        const locationAlreadyInUse = inBound && pieces[root+index*orientation].letter != "";

        if (!inBound) {
          rootIsValid = false;
        }

        if (locationAlreadyInUse) {
          rootIsValid = false;
        }
      });

      return rootIsValid;
    }

    function GetValidRoot(letters, orientation, pieces) {
      let root = DecideRoot(letters);
      while (ValidateRoot(root, letters, pieces, orientation) == false) {
        root = DecideRoot(letters);
      }
      return root;
    }

    let pieces = this.pieces;
    const orientation = DecideOrientation();
    const root = GetValidRoot(letters, orientation, pieces);

    letters.forEach(function(letter, index){
      pieces[root + index * orientation].letter = letter;
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
