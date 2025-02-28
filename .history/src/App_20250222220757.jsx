import { useState, useEffect } from "react";
import BudgetForm from "./components/BudgetForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleAddExpense = (expense) => {
    if (budget - totalExpenses - expense.amount < 0) return;
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const increaseBudget = () => {
    setBudget((prevBudget) => prevBudget + 5);
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = Math.max(budget - totalExpenses, 0);
  const budgetUsed = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  let progressBarColor = "bg-green-500";
  if (budgetUsed >= 25) progressBarColor = "bg-orange-500";
  if (budgetUsed >= 50) progressBarColor = "bg-yellow-500";
  if (budgetUsed >= 75) progressBarColor = "bg-red-500";

  useEffect(() => {
    if (budget > 0 && remainingBudget / budget <= 0.1) {
      console.warn("⚠️ Warning: You are very low on your budget!");
    }
  }, [remainingBudget, budget]);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}> 
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-lg bg-blue-600 text-white">
        <h1 className="text-xl font-bold">Budget Planner</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-800 rounded-full">
          {darkMode ? "🌙" : "☀️"}
        </button>
      </nav>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 h-screen bg-blue-700 text-white p-5 shadow-md">
          <ul className="space-y-4">
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Dashboard</li>
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Expenses</li>
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Settings</li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 max-w-2xl mx-auto mt-10 p-6 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-center mb-6">Personal Budget Planner</h2>

          <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <label className="block text-gray-700 font-semibold mb-2">Set Monthly Budget ($)</label>
            <input
              type="number"
              value={budget.toString().replace(/^0+/, "")}
              onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : 0)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your budget"
            />
            <button
              className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all"
              onClick={increaseBudget}
            >
              Increase Budget by $5
            </button>
          </div>

          <BudgetForm onAddExpense={handleAddExpense} />
          <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />

          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <p className="text-lg font-medium">Total Expenses: <span className="font-bold text-red-500">${totalExpenses.toFixed(2)}</span></p>
            <p className="text-lg font-medium">
              Remaining Budget: <span className="font-bold text-green-600">${remainingBudget.toFixed(2)}</span>
            </p>
            { budget>0 && remainingBudget === 0 && (
              <p className="text-red-500 font-bold mt-2">Warning: You have exceeded your budget!</p>
            )}
          </div>

          <div className="mt-6">
            <p className="text-lg font-medium">Budget Usage</p>
            <div className="w-full bg-gray-300 rounded-full h-6 mt-3 shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-500 ${progressBarColor}`}
                style={{ width: `${Math.min(budgetUsed, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{Math.min(budgetUsed, 100).toFixed(2)}% used</p>
          </div>

          {remainingBudget / budget <= 0.1 && budget > 0 && (
            <div className="bg-yellow-100 p-3 rounded-lg mt-5 text-center text-yellow-800 font-semibold shadow-sm">
              ⚠️ Warning: You are very low on your budget!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
