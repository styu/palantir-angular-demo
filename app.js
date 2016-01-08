// global variables
var xPiece = "X";
var oPiece = "O";

// empty template game for when we start a new game
var templateGame = [
  [ { value: null }, { value: null }, { value: null }],
  [ { value: null }, { value: null }, { value: null }],
  [ { value: null }, { value: null }, { value: null }]
];

// creates the angular application
var app = angular.module('ticTacToeApp', []);

// creates the angular directive
// notice that the directive name is ticTacToe, but in HTML you will reference the tag as <tic-tac-toe></tic-tac-toe>
app.directive("ticTacToe", function() {
  // controller for the directive
  var ticTacToeController = function($window, $scope) {
    // to avoid conflicts with 'this' in callback functions
    var controller = this;

    this.currentGame = null;
    this.currentPlayer = null;
    this.winningPlayer = null;
    this.tied = false;

    // marks the board with the piece of the current player
    controller.markBoard = function(row, column) {
      // check that the game isn't over and that the cell isn't already marked
      if (controller.currentGame[row][column].value == null && controller.winningPlayer == null && !controller.tied) {
        controller.currentGame[row][column].value = controller.currentPlayer;
        controller.switchPlayer();

        // check for winner
        var winningMoves = checkForWinner(controller.currentGame);
        if (winningMoves.tied) {
          controller.tied = true;
        } else {
          // we need to mark each cell as a winning cell so we can color it green
          winningMoves.forEach(function(winningMove) {
            controller.recordWin(winningMove.player, winningMove.type, winningMove.index);
          });
        }
      }
    }

    // marks the cells as a winning cell based on the row/column
    controller.recordWin = function(winner, type, index) {
      switch(type) {
        case "row":
          for (var col = 0; col < 3; col++) {
            controller.currentGame[index][col].winner = true;
          }
          break;
        case "column":
          for (var row = 0; row < 3; row++) {
            controller.currentGame[row][index].winner = true;
          }
          break;
        case "diagonal":
          if (index === 0) {
            for (var i = 0; i < 3; i++) {
              controller.currentGame[i][i].winner = true;
            }
          } else {
            for (var i = 2; i >= 0; i--) {
              controller.currentGame[i][2 - i].winner = true;
            }
          }
          break;
      }
      controller.winningPlayer = winner;
    }

    // starts a new game
    controller.startNewGame = function() {
      // makes a deep copy of the template game
      controller.currentGame = angular.copy(templateGame);
      // resets the winner
      controller.winningPlayer = null;
      // reset tied
      controller.tied = false;
      // only sets the player if we haven't already been playing
      if (controller.currentPlayer == null) {
        controller.currentPlayer = oPiece;
      }
    }

    // toggles the player between X and O, depending on what the current player is
    controller.switchPlayer = function() {
      if (controller.currentPlayer === xPiece) {
        controller.currentPlayer = oPiece;
      } else {
        controller.currentPlayer = xPiece;
      }
    }
  };

  return {
    controller: ticTacToeController,
    controllerAs: "controller", // this is how the controller will be referenced in the directive
    scope: true,
    // Using ` allows us to have a string that spans multiple lines!
    template: `<button ng-click="controller.startNewGame()">Start New Game</button>
      <div ng-if="controller.currentGame" class='game-container'>
        <div class="player">Current Player: {{controller.currentPlayer}}</div>
        <div class="winning-player" ng-if="controller.winningPlayer">Winner: {{controller.winningPlayer}}</div>
        <div class="tied" ng-if="controller.tied">Tied!</div>
        <div class="game">
          <div class="row" ng-repeat="row in controller.currentGame">
            <div class="cell" ng-class="{ winner: cell.winner }" ng-repeat="cell in row" ng-click="controller.markBoard($parent.$index, $index)">
              <span ng-if="cell.value">{{cell.value}}</span>
            </div>
          </div>
        </div>
      </div>`
  };
});