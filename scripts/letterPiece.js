//contains information on a letter on the board
//mostly, the letter displayed, the rest is for rendering.
function letterPiece(letterVal, x, y) {
  this.letter = letterVal;
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
  this.IsSelected = false;

  this.render = function() {
    context.save();
    this.renderBackground();
    this.renderForeground();
    this.renderLetter();
    context.restore();
  }

  this.renderBackground = function() {
    context.fillStyle = "beige";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  this.renderLetter = function() {
    context.font = "2em helvetica";
    var measure = context.measureText(this.letter);
    context.fillStyle = "red";
    context.fillText(this.letter, this.x +this.width/2 - measure.width/2, this.y + this.height/2 + measure.width/2);
  }

  this.renderForeground = function() {
    if (this.IsSelected) {
      var opacity = 0;
      opacity = 0.2;
      context.fillStyle = "rgba(100, 100, 100, "+opacity+")";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
