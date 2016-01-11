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

    // The current game
    controller.currentGame = null;
    // The current player (either X or O, or null if it's not started yet)
    controller.currentPlayer = null;
    // Game status
    controller.tied = false;
    controller.winner = false;

    // Logic that happens when you click the start new game button
    controller.startGame = function() {
      // reset game and game status
      controller.currentGame = angular.copy(templateGame);
      controller.tied = false;
      controller.winner = false;
      if (controller.currentPlayer == null) {
        controller.currentPlayer = oPiece;
      }
    };

    // Logic that happens when you click a cell in the board to mark it with x or o
    controller.markBoard = function(row, column) {
      // only mark the board if there's nothing in that cell and if the game isn't over
      if (controller.currentGame[row][column].value == null && !controller.tied && !controller.winner) {
        controller.currentGame[row][column].value = controller.currentPlayer;

        var winners = checkForWinner(controller.currentGame);
        if (winners.tied) {
          controller.tied = true;
        } else {
          // stop the game if there's a winner, otherwise switch the player
          if (winners.length > 0) {
            controller.winner = true;
          } else {
            controller.switchPlayer();
          }
        }
      }
    };

    // Logic that will switch the player from X to O or O to X, depending on the current player
    controller.switchPlayer = function() {
      if (controller.currentPlayer === oPiece) {
        controller.currentPlayer = xPiece;
      } else {
        controller.currentPlayer = oPiece;
      }
    };

    // Logic that will record a cell as a winning cell
    controller.recordWin = function(player, type, index) {
      // Bonus! Use ng-class on the cell divs to add a class called 'winner' if that cell is a winning cell
      // Hint 1: You don't need to implement the logic for checking the tic tac toe board yourself, just pass in
      // controller.currentGame to a function called checkForWinner() that I've already written for you.
      // Look at tictactoe.js for more details on what it returns
      // Hint 2: Where should the call go?
      // Hint 3: What does the controller need to do so the directive knows if a cell is a winner or not?
    };
  };

  return {
    controller: ticTacToeController,
    controllerAs: "ticTacToeController",
    template: `
      <button ng-click="ticTacToeController.startGame()">Start new Game</button>
      <div ng-if="ticTacToeController.currentGame" class="game-container">
        <div class="player">Current Player: {{ticTacToeController.currentPlayer}}</div>
        <div class="winning-player" ng-if="ticTacToeController.winner">Winner: {{ticTacToeController.currentPlayer}}</div>
        <div class="game">
          <div class="row" ng-repeat="row in ticTacToeController.currentGame">
            <div class="cell" ng-repeat="cell in row" ng-click="ticTacToeController.markBoard($parent.$index, $index)">
              <span ng-if="cell.value">{{cell.value}}</span>
            </div>
          </div>
        </div>
      </div>
    `
  }
})