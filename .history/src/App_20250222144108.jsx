import { useState, useEffect } from "react";
import BudgetForm from "./components/BudgetForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const increaseBudget = () => {
    setBudget((prevBudget) => prevBudget + 5);
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = Math.max(budget - totalExpenses, 0);
  const budgetUsed = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  // Determine the progress bar color
  let progressBarColor = "bg-green-500";
  if (budgetUsed >= 25) progressBarColor = "bg-orange-500";
  if (budgetUsed >= 50) progressBarColor = "bg-yellow-500";
  if (budgetUsed >= 75) progressBarColor = "bg-red-500";

  // Show warning if budget falls below 10%
  useEffect(() => {
    if (budget > 0 && remainingBudget / budget <= 0.1) {
      console.log("⚠️ Warning: You are very low on your budget!"); // Debugging instead of alert
    }
  }, [remainingBudget, budget]);

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
        <button
          className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          onClick={increaseBudget}
        >
          Increase Budget by $5
        </button>
      </div>

      <BudgetForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />

      {/* Budget Summary */}
      <div className="mt-4 p-4 bg-white rounded shadow-md">
        <p className="text-lg font-medium">Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p className="text-lg font-medium">
          Remaining Budget: ${remainingBudget.toFixed(2)}
        </p>
        {remainingBudget === 0 && (
          <p className="text-red-500 font-bold">Warning: You have exceeded your budget!</p>
        )}
      </div>

      {/* Budget Progress Bar */}
      <div className="mt-4">
        <p className="text-lg font-medium">Budget Usage</p>
        <div className="w-full bg-gray-300 rounded-full h-5 mt-2">
          <div
            className={`h-full rounded-full transition-all duration-300 ${progressBarColor}`}
            style={{ width: `${Math.min(budgetUsed, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 mt-1">{Math.min(budgetUsed, 100).toFixed(2)}% used</p>
      </div>
    </div>
  );
};

export default App;