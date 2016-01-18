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
      return MouseX > X && MouseX < (X+Width);
    }

    return Intersection(LetterPiece.x, MouseEvent.offsetX, LetterPiece.width)
        && Intersection(LetterPiece.y, MouseEvent.offsetY, LetterPiece.height);
  }
}

//* mixing model and controller as this is a small project
