import { useState } from "react";
import BudgetForm from "./components/BudgetForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const increaseBudget = () =>{
    setBudget((prevBudget)=>prevBudget+5)
  }

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const isOverBudget = totalExpenses > budget;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded">
      <h1 className="text-2xl font-bold text-center mb-4">Personal Budget Planner</h1>
      
      {/* Budget Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Set Monthly Budget ($)</label>
        <input
          type="number"
          value={budget.toString().replace(/^0+/, "")} // Remove leading zeros
          onChange={(e) => setBudget(Number(e.target.value) || 0)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter your budget"
          />
        <button className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition" onClick={increaseBudget}>
            Increase Budget by 5
          </button>
      </div>

      <BudgetForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />

      {/* Budget Summary */}
      <div className="mt-4 p-4 bg-white rounded shadow-md">
        <p className="text-lg font-medium">Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p className="text-lg font-medium">Remaining Budget: ${Math.max(budget - totalExpenses, 0).toFixed(2)}</p>
        {isOverBudget && (
          <p className="text-red-500 font-bold">Warning: You have exceeded your budget!</p>
        )}
      </div>

      {/* Expense Categories */}
      <div className="mt-4 p-4 bg-white rounded shadow-md">
        <h2 className="text-lg font-bold">Expenses by Category</h2>
        {expenses.length > 0 ? (
          <ul className="list-disc list-inside">
            {Array.from(new Set(expenses.map(e => e.category))).map(category => (
              <li key={category} className="font-medium">
                {category}: ${expenses.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No expenses recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default App;
