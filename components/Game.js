import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import Board from "./Board";
import AIPlayer from "./AIPlayer";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAITurn, setIsAITurn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isAITurn) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAITurn]);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.slice();
    if (AIPlayer.checkWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(newHistory.concat([squares]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
    setIsAITurn(true);
  };

  const makeAIMove = () => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.slice();
    if (AIPlayer.checkWinner(squares) || !squares.includes(null)) {
      return;
    }
    const aiMove = AIPlayer.getBestMove(squares, "O");
    squares[aiMove] = "O";
    setHistory(newHistory.concat([squares]));
    setStepNumber(newHistory.length);
    setXIsNext(true);
    setIsAITurn(false);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
    setIsAITurn(false);
  };

  const current = history[stepNumber];
  const winner = AIPlayer.checkWinner(current);

  let status;
  if (winner) {
    if (winner === "tie") {
      status = "It's a draw!";
    } else if (winner === "X") {
      status = "You win!";
    } else {
      status = "AI wins!";
    }
  } else {
    status = `${xIsNext ? "Your" : "AI's"} turn`;
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8"
      >
        Tic-Tac-Toe
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`p-8 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="mb-4 text-2xl font-semibold text-center">{status}</div>
        <Board
          squares={current}
          onClick={handleClick}
          isDarkMode={isDarkMode}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-6 px-6 py-2 w-full rounded-full font-semibold transition-colors duration-300 ${
            isDarkMode
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          onClick={resetGame}
        >
          New Game
        </motion.button>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-8 p-2 rounded-full"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>
    </div>
  );
};

export default Game;
