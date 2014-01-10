// Generated by CoffeeScript 1.6.3

$(document).ready(function() {

  function Game() {
    this.cells = [];
    this.mines = [];
  }

  Game.prototype.chooseMines = function() {
    for (var i = 0; i < 10; i++) {
      this.mines.push(Math.floor((Math.random() * 101)));
    }
  };

  Game.prototype.makeCells = function() {
    for (var i = 0; i < 100; i++) {
      if ($.inArray(i, this.mines) !== -1) {
        this.cells.push(new Cell(true, i));
      } 
      else{
        this.cells.push(new Cell(false, i));
      }
    }
  };

  Game.prototype.checkNeighbors = function() {
    var mines = this.mines;
    var cells = this.cells;
    $.each(mines, function(index, value) {
      $( "td:eq(" + value + ")").addClass( "mine" );
      if (cells[(value - 1 )]) { cells[(value - 1 )].neighborCount += 1;}
      if (cells[(value + 1 )]) {cells[(value + 1 )].neighborCount += 1;}
      if (cells[(value - 9 )]) {cells[(value - 9 )].neighborCount += 1;}
      if (cells[(value - 10 )]) {cells[(value - 10 )].neighborCount += 1;}
      if (cells[(value - 11 )]) {cells[(value - 11 )].neighborCount += 1;}
      if (cells[(value + 9 )]) {cells[(value + 9 )].neighborCount += 1;}
      if (cells[(value + 10)]) {cells[(value + 10 )].neighborCount += 1;}
      if (cells[(value + 11 )]) {cells[(value + 11 )].neighborCount += 1;}
    });
  };

  Game.prototype.addNeighborClass = function() {
    $.each(this.cells, function(index, value) { 
      if ($( "td:eq(" + index + ")").hasClass("mine") === false) {
        $( "td:eq(" + index + ")").addClass( "neighbor_" + value.neighborCount.toString() );
      }
    });
  };

  Game.prototype.click = function() {
    $("td").click(function() {
      $(this).addClass("active");
      if ($(this).hasClass("neighbor_0")) {
        var position = ($(this).parent()[0].rowIndex).toString() + ($(this).prop('cellIndex')).toString();
        exposeNeighbors(position);
      }
      else if ($(this).hasClass("mine")) {
        alert("Game Over!");
      }
    });
  };

  var exposeNeighbors = function(position) {
    // console.log(position);
    game.cells[position - 1].makeActive();
    game.cells[position + 1].makeActive();
    game.cells[position - 9].makeActive();
    game.cells[position - 10].makeActive();
    game.cells[position - 11].makeActive();
    game.cells[position + 9].makeActive();
    game.cells[position + 10].makeActive();
    game.cells[position + 11].makeActive();
    // $("td:eq(" + (parseInt(position) - 1) + ")").addClass('active');
    // $("td:eq(" + (parseInt(position) + 1) + ")").addClass('active');
    // $("td:eq(" + (parseInt(position) - 9) + ")").addClass('active');
    // $("td:eq(" + (parseInt(position) - 10) + ")").addClass('active');
    // $("td:eq(" + (parseInt(position) - 11) + ")").addClass('active');
    // $("td:eq(" + (parseInt(position) + 9) + ")").addClass('active');
    // $("td:eq(" + (parseInt(position) + 10) + ")").addClass('active');
    // $("td:eq(" + (parseInt(position) + 11) + ")").addClass('active');
  };

  function Cell(mine, position) {
    this.mine = mine;
    this.position = position;
    this.neighborCount = 0;
  }

  Cell.prototype.makeActive = function() {
    var square = $("td:eq(" + this.position + ")");
    square.addClass("active");
    if (square.hasClass("neighbor_0") && (square.hasClass("active") === false)) {
      console.log(square);
      exposeNeighbors(this.position);
    }
  };

  var game = new Game();
  game.chooseMines();
  game.makeCells();
  game.checkNeighbors();
  game.addNeighborClass();
  game.click();
});
