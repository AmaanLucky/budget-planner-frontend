import PropTypes from "prop-types";
import { FaUtensils, FaBus, FaShoppingCart, FaMoneyBillWave, FaTag, FaQuestion } from "react-icons/fa";

const categoryIcons = {
  Food: <FaUtensils className="text-green-500 text-xl" />,
  Transport: <FaBus className="text-blue-500 text-xl" />,
  Shopping: <FaShoppingCart className="text-purple-500 text-xl" />,
  Bills: <FaMoneyBillWave className="text-yellow-500 text-xl" />,
  Other: <FaTag className="text-gray-500 text-xl" />,
};

const getExpenseColor = (amount) => {
  if (amount > 100) return "text-red-600 font-bold"; // High expense
  if (amount > 50) return "text-orange-500 font-medium"; // Medium expense
  return "text-green-600"; // Small expense
};

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="mt-6 bg-white p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Expense List</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center mt-3">No expenses added yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center border rounded-lg px-4 py-3 bg-gray-50 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                {categoryIcons[expense.category] || <FaQuestion className="text-gray-400 text-xl" />}
                <span className="font-semibold text-gray-700">{expense.category || "Unknown"}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`${getExpenseColor(expense.amount)} text-lg`}>
                  ${expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
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

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
};

export default ExpenseList;