import PropTypes from "prop-types";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";

const BudgetInput = ({ budget, setBudget, darkMode }) => {
  // ✅ Ensure `setBudget` is a function before calling it
  const handleSetBudget = (value) => {
    if (typeof setBudget === "function") {
      setBudget(value >= 0 ? value : 0); // Prevent negative values
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className={`mb-6 p-4 rounded-lg shadow-md flex flex-col gap-3 transition-all 
                  ${darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <label className="block font-semibold text-lg">Set Monthly Budget ($)</label>
      
      <div className="flex gap-3 items-center">
        {/* Decrement Button */}
        <button 
          onClick={() => handleSetBudget(budget - 5)}
          className={`px-3 py-2 rounded-md flex items-center gap-1 text-sm font-semibold transition-all 
                      ${darkMode ? "bg-red-600 text-white hover:bg-red-500" : "bg-red-500 text-white hover:bg-red-600"}`}
        >
          <FaMinus /> -5
        </button>

        <input
          type="number"
          value={budget.toString().replace(/^0+/, "")}
          onChange={(e) => handleSetBudget(e.target.value ? Number(e.target.value) : 0)}
          className={`w-full px-4 py-2 border rounded-md text-center focus:outline-none focus:ring-2 transition-all 
                      ${darkMode ? "bg-gray-600 border-gray-500 text-white focus:ring-blue-300" : "border-gray-300 focus:ring-blue-400"}`}
          placeholder="Enter budget"
        />

        {/* Increment Button */}
        <button 
          onClick={() => handleSetBudget(budget + 5)}
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
  budget: PropTypes.number.isRequired,
  setBudget: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default BudgetInput;
