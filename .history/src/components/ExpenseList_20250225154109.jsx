import PropTypes from "prop-types";
import { FaUtensils, FaBus, FaShoppingCart, FaMoneyBillWave, FaTag, FaQuestion } from "react-icons/fa";

// ✅ Define category icons
const categoryIcons = {
  Food: <FaUtensils className="text-green-400 dark:text-green-300" />,
  Transport: <FaBus className="text-blue-400 dark:text-blue-300" />,
  Shopping: <FaShoppingCart className="text-purple-400 dark:text-purple-300" />,
  Bills: <FaMoneyBillWave className="text-yellow-400 dark:text-yellow-300" />,
  Other: <FaTag className="text-gray-400 dark:text-gray-300" />,
};

// 🔹 Function to get an icon based on expense title if category is missing
const getExpenseIcon = (expense) => {
  if (expense.category && categoryIcons[expense.category]) {
    return categoryIcons[expense.category]; // ✅ Use category-based icon
  }

  const title = expense.title?.toLowerCase() || "";
  if (title.includes("food") || title.includes("restaurant") || title.includes("dinner")) return categoryIcons["Food"];
  if (title.includes("bus") || title.includes("train") || title.includes("taxi")) return categoryIcons["Transport"];
  if (title.includes("shopping") || title.includes("clothes")) return categoryIcons["Shopping"];
  if (title.includes("bill") || title.includes("rent") || title.includes("electricity")) return categoryIcons["Bills"];

  return <FaQuestion className="text-gray-400 dark:text-gray-300" />; // 🔹 Default unknown category icon
};

const ExpenseList = ({ expenses = [], onDeleteExpense, darkMode }) => {
  // ✅ Group expenses by category
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const category = expense.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(expense);
    return acc;
  }, {});

  return (
    <div className={`mt-6 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
        darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-800 border-gray-200"
      }`}>
      <h2 className="text-lg font-bold mb-4">Expense List</h2>

      {Object.keys(groupedExpenses).length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300 text-center mt-2">
          No expenses added yet.
        </p>
      ) : (
        <ul className="mt-2 space-y-5">
          {Object.entries(groupedExpenses).map(([category, categoryExpenses]) => (
            <li key={category} className="border-b pb-2 border-gray-300 dark:border-gray-600">
              {/* ✅ Category Header with Icon */}
              <div className="flex items-center space-x-2 mb-2">
                {categoryIcons[category] || <FaQuestion className="text-gray-400 dark:text-gray-300" />}
                <span className="font-medium text-lg">{category}</span>
              </div>

              {/* ✅ Expenses inside the category */}
              <ul className="pl-6 space-y-1">
                {categoryExpenses.map((expense) => (
                  <li key={expense._id} className="flex justify-between items-center py-1">
                    <div className="flex items-center space-x-2">
                      {getExpenseIcon(expense)}
                      <div>
                        <span className="font-medium">{expense.title}</span>
                      </div>
                    </div>
                    {/* 🔹 **Fixed: Amount text is always visible** */}
                    <span className={`font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      ${expense.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onDeleteExpense(expense._id)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
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
