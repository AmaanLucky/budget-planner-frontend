import PropTypes from "prop-types";
import { FaUtensils, FaBus, FaShoppingCart, FaMoneyBillWave, FaTag, FaQuestion } from "react-icons/fa";

const categoryIcons = {
  Food: <FaUtensils className="text-green-400 dark:text-green-300" />,
  Transport: <FaBus className="text-blue-400 dark:text-blue-300" />,
  Shopping: <FaShoppingCart className="text-purple-400 dark:text-purple-300" />,
  Bills: <FaMoneyBillWave className="text-yellow-400 dark:text-yellow-300" />,
  Other: <FaTag className="text-gray-400 dark:text-gray-300" />,
};

const ExpenseList = ({ expenses, onDeleteExpense, darkMode }) => {
  // ✅ Group expenses by category
  const groupedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    acc[expense.category].push(expense);
    return acc;
  }, {});

  return (
    <div
      className={`mt-6 p-4 rounded shadow-md transition-all ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-lg font-bold">Expense List</h2>
      {Object.keys(groupedExpenses).length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300 text-center mt-2">
          No expenses added yet.
        </p>
      ) : (
        <ul className="mt-2 space-y-4">
          {Object.entries(groupedExpenses).map(([category, categoryExpenses]) => (
            <li key={category} className="border-b pb-2 border-gray-300 dark:border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                {categoryIcons[category] || <FaQuestion className="text-gray-400 dark:text-gray-300" />}
                <span className="font-medium">{category}</span>
              </div>
              <ul className="pl-6 space-y-1">
                {categoryExpenses.map((expense) => (
                  <li key={expense._id} className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">${expense.amount.toFixed(2)}</span>
                    <button
                      onClick={() => onDeleteExpense(expense._id)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ✅ Prop Types
ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // MongoDB ID is a string
      amount: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default ExpenseList;