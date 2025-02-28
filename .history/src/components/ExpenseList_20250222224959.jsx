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
  // Group expenses by category
  const groupedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    acc[expense.category].push(expense);
    return acc;
  }, {});

  return (
    <div className="mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold text-gray-700">Expense List</h2>
      {Object.keys(groupedExpenses).length === 0 ? (
        <p className="text-gray-500 text-center mt-2">No expenses added yet.</p>
      ) : (
        <ul className="mt-2 space-y-4">
          {Object.entries(groupedExpenses).map(([category, categoryExpenses]) => (
            <li key={category} className="border-b pb-2">
              <div className="flex items-center space-x-2 mb-2">
                {categoryIcons[category] || <FaQuestion className="text-gray-400" />}
                <span className="font-medium text-gray-700">{category}</span>
              </div>
              <ul className="pl-6 space-y-1">
                {categoryExpenses.map((expense) => (
                  <li key={expense.id} className="flex justify-between">
                    <span>${expense.amount.toFixed(2)}</span>
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="text-red-500 hover:text-red-700"
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