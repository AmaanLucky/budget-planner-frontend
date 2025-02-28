import PropTypes from "prop-types";

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold text-gray-700">Expense List</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center mt-2">No expenses added yet.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {expenses.map((expense, index) => (
            <li key={index} className="flex justify-between items-center border-b py-2">
              <span className="font-medium text-gray-700">{expense.title}</span>
              <div className="flex items-center">
                <span className="text-blue-600 font-semibold mr-4">${expense.amount.toFixed(2)}</span>
                <button
                  onClick={() => onDeleteExpense(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {expenses.length > 0 && (
        <div className="mt-4 text-lg font-semibold text-gray-800">
          Total: <span className="text-blue-600">${totalAmount.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.array.isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
};

export default ExpenseList;