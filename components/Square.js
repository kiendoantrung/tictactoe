import React from "react";
import { motion } from "framer-motion";

const Square = ({ value, onClick, isDarkMode }) => {
  const squareVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  let color = value === "X" ? "text-red-500" : "text-blue-500";
  if (isDarkMode) {
    color = value === "X" ? "text-red-400" : "text-blue-400";
  }

  return (
    <motion.button
      variants={squareVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`square ${color} w-20 h-20 text-4xl flex items-center justify-center ${
        isDarkMode ? "bg-gray-700" : "bg-gray-200"
      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
      onClick={onClick}
    >
      {value}
    </motion.button>
  );
};

export default Square;
