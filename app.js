// global variables
var xPiece = "X";
var oPiece = "O";

// empty template game for when we start a new game
var templateGame = [
  [ { value: null }, { value: null }, { value: null }],
  [ { value: null }, { value: null }, { value: null }],
  [ { value: null }, { value: null }, { value: null }]
];

// application creation
var app = angular.module("ticTacToeApp", []);

// Creates the angular directive (the view)
app.directive("ticTacToe", function() {
  var ticTacToeController = function() {
    var controller = this;

    // Logic that happens when you click the start new game button
    controller.startGame = function() {

    };

    // Logic that happens when you click a cell in the board to mark it with x or o
    controller.markBoard = function(row, column) {

    };

    // Logic that will switch the player from X to O or O to X, depending on the current player
    controller.switchPlayer = function() {

    };

    // Logic that will record a cell as a winning cell
    controller.recordWin = function() {

    };
  };

  return {
    template: `
      <button>Start new Game</button>
    `
  }
})