const ExpenseList = ({ expenses, onDeleteExpense }) => {
    return (
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-lg font-bold mb-4">Expenses</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses added yet.</p>
        ) : (
          <ul>
            {expenses.map((expense, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{expense.name}</span>
                <span className="font-bold">₹{expense.amount}</span>
                <button
                  onClick={() => onDeleteExpense(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
  
  // ✅ Add PropTypes validation
  ExpenseList.propTypes = {
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ).isRequired,
    onDeleteExpense: PropTypes.func.isRequired,
  };
  
  export default ExpenseList;
  