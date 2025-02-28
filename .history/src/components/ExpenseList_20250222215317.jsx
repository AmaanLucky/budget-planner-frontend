import PropTypes from "prop-types";

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  // Group expenses by category
  const groupedExpenses = expenses.reduce((acc, expense) => {
    acc[expense.category] = acc[expense.category] || [];
    acc[expense.category].push(expense);
    return acc;
  }, {});

  return (
    <div className="mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold text-gray-700">Expense List</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center mt-2">No expenses added yet.</p>
      ) : (
        Object.keys(groupedExpenses).map((category) => (
          <div key={category} className="mt-4">
            <h3 className="text-md font-semibold text-blue-600 border-b pb-1">{category}</h3>
            <ul className="mt-2 space-y-2">
              {groupedExpenses[category].map((expense) => (
                <li key={expense.id} className="flex justify-between items-center border-b py-2">
                  <span className="font-medium text-gray-700">${expense.amount.toFixed(2)}</span>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
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