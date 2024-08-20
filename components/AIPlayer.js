const AIPlayer = {
  getBestMove: function (board, player) {
    const opponent = player === "X" ? "O" : "X";
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = player;
        let score = this.minimax(board, 0, false, player, opponent);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  },

  minimax: function (board, depth, isMaximizing, player, opponent) {
    const result = this.checkWinner(board);
    if (result !== null) {
      return result === player
        ? 10 - depth
        : result === opponent
        ? depth - 10
        : 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = player;
          let score = this.minimax(board, depth + 1, false, player, opponent);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = opponent;
          let score = this.minimax(board, depth + 1, true, player, opponent);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  },

  checkWinner: function (board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return board.includes(null) ? null : "tie";
  },
};

export default AIPlayer;
