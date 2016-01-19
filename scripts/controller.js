//handles the user interaction side of things
//mostly, how the user selects letters and storing what letters have been selected(*)
function controller() {
  this.IsDragging = false;

  this.StartDrag = function() {
    this.IsDragging = true;
  }

  this.StopDrag = function() {
    this.IsDragging = false;
  }

  //CheckSelect:: LetterPiece -> MouseEvent -> Boolean
  //checks whether a letter piece should be selected, if the mouse is over the letter piece.
  this.CheckSelect = function(LetterPiece, MouseEvent) {
    function Intersection(X, MouseX, Width) {
      var bufferZone = 5; //makes it easier to select diagonally.
      return MouseX > X+bufferZone && MouseX < (X+Width)-bufferZone;
    }

    return LetterPiece.IsSelected == false
        && Intersection(LetterPiece.x, MouseEvent.offsetX, LetterPiece.width)
        && Intersection(LetterPiece.y, MouseEvent.offsetY, LetterPiece.height);
  }

  this.SelectedPieces = [];

  this.Clear = function() {
    this.SelectedPieces = [];
  }
}

//* mixing model and controller as this is a small project
