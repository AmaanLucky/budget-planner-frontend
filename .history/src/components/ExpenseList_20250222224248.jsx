import PropTypes from "prop-types";
import { FaUtensils, FaBus, FaShoppingCart, FaMoneyBillWave, FaTag, FaQuestion } from "react-icons/fa";

const categoryIcons = {
  Food: <FaUtensils className="text-green-500" />,
  Transport: <FaBus className="text-blue-500" />,
  Shopping: <FaShoppingCart className="text-purple-500" />,
  Bills: <FaMoneyBillWave className="text-yellow-500" />,
  Other: <FaTag className="text-gray-500" />,
};

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold text-gray-700">Expense List</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center mt-2">No expenses added yet.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex items-center space-x-2">
                {categoryIcons[expense.category] || <FaQuestion className="text-gray-400" />}
                <span className="font-medium text-gray-700">{expense.category || "Untitled Expense"}</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 font-semibold mr-4">${expense.amount.toFixed(2)}</span>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="text-red-500 hover:text-red-700"
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