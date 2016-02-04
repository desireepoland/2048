var Game = function() {
  // Game logic and initialization here
  this.board =[[0,0,0,0],
               [0,0,0,0],
               [0,0,0,0],
               [0,0,0,0]];
  this.addRandomTile();
  this.addRandomTile();
};

Game.prototype.addRandomTile = function(){
  //find all the 0s in board, put their positions in separate array
  var array = [];
  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 4; c++) {
      if (this.board[r][c] === 0) {
        array.push([r, c]);
      }
    }
  }
  // using the length of this array, choose a random empty (0 containing) position
  var randIndex = array[Math.floor(Math.random()* array.length)];
  // insert a 2 or 4 into that position on the board
  var startNumArray = [2,2,2,2,2,2,4];
  var randTile = startNumArray[Math.floor(Math.random()*startNumArray.length)];
  this.board[randIndex[0]][randIndex[1]] = randTile;
  var $tile = $('<div class="tile"></div>');
  if (randTile === 2) {
    $("#gameboard").append($tile);
    $tile.attr("data-row", ("r" + randIndex[0]));
    $tile.attr("data-col", ("c" + randIndex[1]));
    $tile.attr("data-val", ("2"));
    $tile.html("2");
  }
  if (randTile === 4) {
    $("#gameboard").append($tile);
    $tile.attr("data-row", ("r" + randIndex[0]));
    $tile.attr("data-col", ("c" + randIndex[1]));
    $tile.attr("data-val", ("4"));
    $tile.html("4");
  }
};

Game.prototype.getPositions = function(){
  var tileRows = $(".tile").map(function(){
    return $(this).data("row");
  }).get();
  var tileColumns = $(".tile").map(function(){
    return $(this).data("col");
  }).get();
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  var self = this;
  var tileLength = tile.length;
  switch(direction) {
    case 38: //up  // subtract from data-row, TODO: if cell is empty (?)
      self.moveUp();
      // for (var i = 0; i < $(".tile").length; i++){
      //   var dataRow = $(".tile").attr("data-row").slice(1);
      //       var dataInt = parseInt(dataRow, 10);
      //       if(dataInt > 0){
      //         dataInt = 0;
      //       }
      //       $(".tile")[i].setAttribute("data-row", ("r" + dataInt));
      //   }
      break;
    case 40: //down
      self.moveDown();
      // for (var i = 0; i < $(".tile").length; i++){
      //   var dataRow = $(".tile").attr("data-row").slice(1);
      //       var dataInt = parseInt(dataRow, 10);
      //       if(dataInt < 3){
      //         dataInt += 1;
      //       }
      //       $(".tile")[i].setAttribute("data-row", ("r" + dataInt));
      //   }
      break;
    case 37: //left
      self.moveLeft();
      // for (var i = 0; i < $(".tile").length; i++){
      //   var dataColumn = $(".tile").attr("data-col").slice(1);
      //       var dataInt = parseInt(dataColumn, 10);
      //       if(dataInt > 0){
      //         dataInt -= 1;
      //       }
      //       $(".tile")[i].setAttribute("data-col", ("c" + dataInt));
      // }
      break;
    case 39: //right
      self.moveRight();
      // for (var i = 0; i < $(".tile").length; i++){
      //   var dataColumn = $(".tile").attr("data-col").slice(1);
      //       var dataInt = parseInt(dataColumn, 10);
      //       if(dataInt < 3){
      //         dataInt += 1;
      //       }
      //       $(".tile")[i].setAttribute("data-col", ("c" + dataInt));
      //   }
      break;
  }
};

Game.prototype.moveLeft = function() {
  var self = this;
  var board = this.board;
  // first go through each row top to bottom
  for (var r = 0; r < 4; r++) {
    // go through each column left to right
    var emptyCols = [];
    var filledCols = {};
    for (var c = 0; c < 4; c++) {
      //if c is empty, store c position in an array
      if (board[r][c] === 0) {
        // store in 0s array
        emptyCols.push(c);
      } else  {   // if c not empty
        if(filledCols.hasOwnProperty(board[r][c])){ //if the filledCols contains a key matching content
          // at position of previous matching content, the content doubles
          board[r][filledCols[board[r][c]]] = 2 * (board[r][c]);
          //filledCols old key = new key
          filledCols[board[r][filledCols[board[r][c]]]] = filledCols[board[r][c]];
          // delete filledCols old key
          delete filledCols[board[r][c]];
          //empty col where content was
          board[r][c] = 0;
        } else {
          // put in filledCols
          filledCols[board[r][c]]= c;    // filledCols[content]= [c index]
          if(emptyCols.length){ //shift content to the left as far as possible up to index c0
            // if there are empty spaces before c, shift to the left
            board[r][emptyCols[0]] = board[r][c]; //content moves to leftmost empty col
            filledCols[board[r][c]]= emptyCols[0];
            emptyCols.shift(); //delete that entry in the empty array
            board[r][c] = 0; //empty col where content was
          }
        }
      }
    }
  }
};

Game.prototype.moveRight = function() {
  var self = this;
  var board = this.board;
  // first go through each row top to bottom
  for (var r = 0; r < 4; r++) {
    // go through each column right to left
    var emptyCols = [];
    for (var c = 3; c >= 0; c--) {
      //if c is empty, store c position in an array
      if (board[r][c] === 0) {
        // store in 0s array
        emptyCols.push(c);
      }
      // if c not empty, shift content to the right as far as possible up to index c3
      if (board[r][c] !== 0) {
        if(emptyCols.length){
          // if there are empty spaces before c, shift to the left
          board[r][emptyCols[0]] = board[r][c]; //content moves to rightmost empty col
          emptyCols.shift(); //delete that entry in the empty array
          board[r][c] = 0; //empty col where content was
        }
      }
    }
  }
};

Game.prototype.moveUp = function() {
  var self = this;
  var board = this.board;
  // first go through each column right to left
  for (var c = 3; c >= 0; c--) {
    // go through each row top to bottom
    var emptyRows = [];
    for (var r = 0; r < 4; r++) {
      //if r is empty, store r position in an array
      if (board[r][c] === 0) {
        // store in 0s array
        emptyRows.push(r);
      }
      // if r not empty, shift content up as far as possible up to index r0
      if (board[r][c] !== 0) {
        if(emptyRows.length){
          // if there are empty spaces above tile, shift up
          board[emptyRows[0]][c] = board[r][c]; //content moves to topmost empty row in that col
          emptyRows.shift(); //delete that entry in the empty arrays
          board[r][c] = 0; //empty the tile space where content was
        }
      }
    }
  }
};

Game.prototype.moveDown = function() {
  var self = this;
  var board = this.board;
  // first go through each column right to left
  for (var c = 3; c >= 0; c--) {
    // go through each row bottom to top
    var emptyRows = [];
    for (var r = 3; r >= 0; r--) {
      //if r is empty, store r position in an array
      if (board[r][c] === 0) {
        // store in 0s array
        emptyRows.push(r);
      }
      // if r not empty, shift content down as far as possible down to index r3
      if (board[r][c] !== 0) {
        if(emptyRows.length){
          // if there are empty spaces below tile, shift down
          board[emptyRows[0]][c] = board[r][c]; //content moves to bottommost empty row in that col
          emptyRows.shift(); //delete that entry in the empty arrays
          board[r][c] = 0; //empty the tile space where content was
        }
      }
    }
  }
};

Game.prototype.displayBoard = function() {
  // var self = this;
  // if (self.moveLeft) {
  //   for (var i = 0; i < $(".tile").length; i++){
  //     var dataColumn = $(".tile").attr("data-col").slice(1);
  //         var dataInt = parseInt(dataColumn, 10);
  //         if(dataInt < 3){
  //           dataInt += 1;
  //         }
  //         $(".tile")[i].setAttribute("data-col", ("c" + dataInt));
  //     }
  //   }
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  $('body').keydown(function(event){
    console.log(game.board);
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      game.moveTile(tile, event.which);
      game.addRandomTile();
      game.displayBoard();
    }
  });
});
