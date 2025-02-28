import PropTypes from "prop-types";
import { FaUtensils, FaBus, FaShoppingCart, FaMoneyBillWave, FaTag, FaQuestion } from "react-icons/fa";

const categoryIcons = {
  Food: <FaUtensils className="text-green-400 dark:text-green-300" />,
  Transport: <FaBus className="text-blue-400 dark:text-blue-300" />,
  Shopping: <FaShoppingCart className="text-purple-400 dark:text-purple-300" />,
  Bills: <FaMoneyBillWave className="text-yellow-400 dark:text-yellow-300" />,
  Other: <FaTag className="text-gray-400 dark:text-gray-300" />,
};

// 🔹 Function to determine icon based on title or category
const getExpenseIcon = (expense) => {
  if (expense.category && categoryIcons[expense.category]) {
    return categoryIcons[expense.category]; // ✅ Use category-based icon
  }

  // ✅ Match title keywords if category is not defined
  const title = expense.title?.toLowerCase() || "";
  if (title.includes("food") || title.includes("restaurant") || title.includes("dinner")) return categoryIcons["Food"];
  if (title.includes("bus") || title.includes("train") || title.includes("taxi")) return categoryIcons["Transport"];
  if (title.includes("shopping") || title.includes("clothes")) return categoryIcons["Shopping"];
  if (title.includes("bill") || title.includes("rent") || title.includes("electricity")) return categoryIcons["Bills"];

  return <FaQuestion className="text-gray-400 dark:text-gray-300" />; // 🔹 Default unknown category icon
};

const ExpenseList = ({ expenses = [], onDeleteExpense, darkMode }) => {
  return (
    <div className={`mt-6 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
        darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-800 border-gray-200"
      }`}>
      <h2 className="text-lg font-bold mb-4">Expense List</h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300 text-center mt-2">No expenses added yet.</p>
      ) : (
        <ul className="mt-2 space-y-4">
          {expenses.map((expense) => (
            <li key={expense._id} className="border-b pb-2 border-gray-300 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getExpenseIcon(expense)}
                  <div>
                    <span className="font-medium text-lg">
                      {expense.category || expense.title}
                    </span>
                    {expense.category && expense.title && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{expense.title}</p>
                    )}
                  </div>
                </div>
                <span className="text-gray-700 dark:text-gray-300">${expense.amount?.toFixed(2)}</span>
                <button
                  onClick={() => onDeleteExpense(expense._id)}
                  className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                    ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ✅ **Fix: PropTypes Validation for All Props**
ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      category: PropTypes.string, // ✅ Category is optional
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default ExpenseList;