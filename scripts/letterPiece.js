function letterPiece(letterVal, x, y) {
  this.letter = letterVal;
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;

  this.render = function() {
    context.fillStyle = "beige";
    context.fillRect(this.x, this.y, this.width, this.height);

    var measure = context.measureText(this.letter);
    context.fillStyle = "red";
    context.fillText(this.letter, this.x +this.width/2, this.y + this.height/2 + measure.width/2);
  }
}
