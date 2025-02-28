import PropTypes from "prop-types";

const ExpenseList = ({ expenses, onDeleteExpense, darkMode }) => {
  return (
    <div className={`mt-6 p-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} rounded-lg shadow-md`}>
      <h2 className="text-xl font-semibold mb-3">Expense List</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <ul className="space-y-2">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className={`flex justify-between items-center p-3 rounded-md shadow-sm ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <span>{expense.category}: ${expense.amount}</span>
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.array.isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default ExpenseList;