import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";

const BudgetInput = ({ darkMode }) => {
  // ✅ Get budget from localStorage or default to `null`
  const [budget, setBudget] = useState(() => {
    const storedBudget = localStorage.getItem("budget");
    return storedBudget ? Number(storedBudget) : null;
  });

  // ✅ Save budget to localStorage when it changes
  useEffect(() => {
    if (budget !== null) {
      localStorage.setItem("budget", budget);
    }
  }, [budget]);

  // ✅ Ensure `setBudget` updates correctly & prevents negatives
  const handleSetBudget = (value) => {
    if (value < 0) return; // Prevent negative values
    setBudget(value || null); // If empty, set to `null` (placeholder appears)
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-6 p-4 rounded-lg shadow-md flex flex-col gap-3 transition-all 
                  ${darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <label className="block font-semibold text-lg">Set Your Monthly Budget ($)</label>

      <div className="flex gap-3 items-center">
        {/* Decrement Button */}
        <button
          onClick={() => handleSetBudget((budget || 0) - 5)}
          className={`px-3 py-2 rounded-md flex items-center gap-1 text-sm font-semibold transition-all 
                      ${darkMode ? "bg-red-600 text-white hover:bg-red-500" : "bg-red-500 text-white hover:bg-red-600"}`}
        >
          <FaMinus /> -5
        </button>

        <input
          type="number"
          value={budget !== null ? budget : ""}
          onChange={(e) => handleSetBudget(e.target.value ? Number(e.target.value) : null)}
          placeholder="Enter your budget"
          className={`w-full px-4 py-2 border rounded-md text-center focus:outline-none focus:ring-2 transition-all 
                      ${darkMode ? "bg-gray-600 border-gray-500 text-white focus:ring-blue-300" : "border-gray-300 focus:ring-blue-400"}`}
        />

        {/* Increment Button */}
        <button
          onClick={() => handleSetBudget((budget || 0) + 5)}
          className={`px-3 py-2 rounded-md flex items-center gap-1 text-sm font-semibold transition-all 
                      ${darkMode ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          <FaPlus /> +5
        </button>
      </div>
    </motion.div>
  );
};

BudgetInput.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default BudgetInput;
