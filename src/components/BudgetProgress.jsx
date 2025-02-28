import PropTypes from "prop-types";
import { FaWallet } from "react-icons/fa";

const BudgetProgress = ({ budgetUsed, darkMode }) => {
  const progressBarGradient = `bg-gradient-to-r from-green-400 to-red-500`;

  return (
    <div className="mt-6 p-5 rounded-lg shadow-lg border transition-all duration-300 ease-in-out 
                    ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}">
      <p className="text-xl font-semibold flex items-center gap-2">
        <FaWallet className="text-blue-500" /> Budget Usage
      </p>

      {/* Budget Progress Bar */}
      <div className="relative w-full bg-gray-300 rounded-full h-6 mt-3 shadow-inner overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-in-out ${progressBarGradient}`}
          style={{ width: `${Math.min(budgetUsed, 100)}%` }}
        ></div>
      </div>

      {/* Budget Usage Details */}
      <p className={`text-sm mt-2 font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {Math.min(budgetUsed, 100).toFixed(2)}% used
      </p>
    </div>
  );
};

// Prop Validation
BudgetProgress.propTypes = {
  budgetUsed: PropTypes.number.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default BudgetProgress;