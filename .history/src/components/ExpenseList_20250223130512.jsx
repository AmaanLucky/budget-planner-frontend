import PropTypes from "prop-types";

const ExpenseList = ({ expenses, onDeleteExpense, darkMode }) => {
  return (
    <div className={`mt-6 p-5 rounded-lg shadow-md transition-all duration-300 ease-in-out 
                     ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"}`}>
      <h3 className="text-xl font-semibold">Expenses</h3>
      {expenses.length === 0 ? (
        <p className="text-gray-400 mt-2">No expenses added yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {expenses.map((expense) => (
            <li key={expense.id} className={`p-3 rounded-lg flex justify-between items-center shadow-sm
                          ${darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}>
              <span>{expense.name} - ${expense.amount}</span>
              <button 
                onClick={() => onDeleteExpense(expense.id)} 
                className="text-red-500 hover:text-red-700 transition-all"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Prop Validation
ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default ExpenseList;
