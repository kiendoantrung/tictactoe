import React from "react";
import { motion } from "framer-motion";
import Square from "./Square";

const Board = ({ squares, onClick, isDarkMode }) => {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isDarkMode={isDarkMode}
      />
    );
  };

  const boardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={boardVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3 gap-2"
    >
      {[...Array(9)].map((_, i) => renderSquare(i))}
    </motion.div>
  );
};

export default Board;
