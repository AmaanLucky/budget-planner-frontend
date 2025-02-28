import PropTypes from "prop-types";

const BudgetProgress = ({ budgetUsed, remainingBudget, budget, darkMode }) => {
  // Determine progress bar color based on budget usage percentage
  let progressBarColor = "bg-green-500";
  if (budgetUsed >= 25) progressBarColor = "bg-orange-500";
  if (budgetUsed >= 50) progressBarColor = "bg-yellow-500";
  if (budgetUsed >= 75) progressBarColor = "bg-red-500";

  return (
    <div className="mt-6">
      <p className="text-lg font-medium">Budget Usage</p>
      
      {/* Budget Progress Bar */}
      <div className="relative w-full bg-gray-300 rounded-full h-6 mt-3 shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-in-out ${progressBarColor}`}
          style={{ width: `${Math.min(budgetUsed, 100)}%` }}
        ></div>
      </div>

      {/* Budget Details */}
      <p className={`text-sm mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {Math.min(budgetUsed, 100).toFixed(2)}% used (${budget - remainingBudget} spent)
      </p>
      <p className={`text-sm font-semibold ${darkMode ? "text-green-300" : "text-green-600"}`}>
        Remaining Budget: ${remainingBudget}
      </p>
    </div>
  );
};

// Prop Validation
BudgetProgress.propTypes = {
  budgetUsed: PropTypes.number.isRequired,
  remainingBudget: PropTypes.number.isRequired,
  budget: PropTypes.number.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default BudgetProgress;