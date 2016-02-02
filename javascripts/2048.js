var Game = function() {
  // Game logic and initialization here
  this.board =[[0,0,0,0],
               [0,0,0,0],
               [0,0,0,0],
               [0,0,0,0]];
};

//generate random tile
Game.prototype.addRandomTile = function(){
  //find a 0, replace with a 2, sometimes a 4 (1 out of 5?)
  // Math.floor(Math.random()* self.board.length)

  //find all the 0s in board, put their positions in separate array
  // using the length of this array, choose a random one() and insert a 2 or 4
  //into that position on the board
}

Game.prototype.getPositions = function(){
  var tileRows = $(".tile").map(function(){
    return $(this).data("row");
  }).get();
  var tileColumns = $(".tile").map(function(){
    return $(this).data("col");
  }).get();
}

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  var tileLength = tile.length;
  switch(direction) {
    case 38: //up  // subtract from data-row, TODO: if cell is empty (?)
      for (var i = 0; i < $(".tile").length; i++){
        var dataRow = $(".tile").attr("data-row").slice(1);
            var dataInt = parseInt(dataRow, 10);
            if(dataInt > 0){
              dataInt = 0;
            }
            $(".tile")[i].setAttribute("data-row", ("r" + dataInt));
        }
      break;
    case 40: //down
      for (var i = 0; i < $(".tile").length; i++){
        var dataRow = $(".tile").attr("data-row").slice(1);
            var dataInt = parseInt(dataRow, 10);
            if(dataInt < 3){
              dataInt += 1;
            }
            $(".tile")[i].setAttribute("data-row", ("r" + dataInt));
        }
      break;
    case 37: //left
      for (var i = 0; i < $(".tile").length; i++){
        var dataColumn = $(".tile").attr("data-col").slice(1);
            var dataInt = parseInt(dataColumn, 10);
            if(dataInt > 0){
              dataInt -= 1;
            }
            $(".tile")[i].setAttribute("data-col", ("c" + dataInt));
      }
      break;
    case 39: //right
      for (var i = 0; i < $(".tile").length; i++){
        var dataColumn = $(".tile").attr("data-col").slice(1);
            var dataInt = parseInt(dataColumn, 10);
            if(dataInt < 3){
              dataInt += 1;
            }
            $(".tile")[i].setAttribute("data-col", ("c" + dataInt));
        }
      break;
  }
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      game.moveTile(tile, event.which);
    }
  });
});
