// Given a tic tac toe game (in the form of a 2D array), it checks for
// winners
// if there is a winner (could have multiple winning rows), it returns an array of all the winning rows and the player that one
// if there is not a winner, it sends back an empty array
// if there is a tie, it sends back { tied: true }
// { player: "X" | "O", type: "row" | "column", index: Number }
function checkForWinner(game) {
  var xPiece = "X";
  var oPiece = "O";

  var winningMoves = [];
  for (var row = 0; row < game.length; row++) {
    var isX = game[row].every(function(val) {
      return val.value === xPiece;
    });

    if (isX) {
      winningMoves.push({
        player: xPiece,
        type: "row",
        index: row
      });
    };

    var isO = game[row].every(function(val) {
      return val.value === oPiece;
    });
    if (isO) {
      winningMoves.push({
        player: oPiece,
        type: "row",
        index: row
      });
    };
  }

  // check columns
  for (var col = 0; col < game.length; col++) {
    var isX = game.every(function(row) {
      return row[col].value === xPiece;
    });

    if (isX) {
      winningMoves.push({
        player: xPiece,
        type: "column",
        index: col
      });
    }

    var isO = game.every(function(row) {
      return row[col].value === oPiece;
    });

    if (isO) {
      winningMoves.push({
        player: oPiece,
        type: "column",
        index: col
      });
    }
  }

  // check diagonals
  var game = game;
  if (game[0][0].value != null && game[0][0].value === game[1][1].value && game[1][1].value === game[2][2].value) {
    winningMoves.push({
      player: game[1][1].value,
      type: "diagonal",
      index: 0
    });
  } else if (game[2][0].value != null && game[2][0].value === game[1][1].value && game[1][1].value === game[0][2].value) {
    winningMoves.push({
      player: game[1][1].value,
      type: "diagonal",
      index: 1
    });
  }

  var tied = game.every(function(row) {
    return row.every(function(cell) {
      return cell.value != null;
    });
  })

  if (tied) {
    return { tied: true };
  } else {
    return winningMoves;
  }
}