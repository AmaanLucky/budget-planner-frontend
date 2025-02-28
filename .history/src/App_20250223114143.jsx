import { useState, useEffect } from "react";
import BudgetForm from "./components/BudgetForm";
import ExpenseList from "./components/ExpenseList";
import Navbar from "./components/Navbar";

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

  // Dynamic Progress Bar Color
  let progressBarColor = "bg-green-500"; // Safe Budget
  if (budgetUsed >= 50) progressBarColor = "bg-yellow-500"; // Medium Usage
  if (budgetUsed >= 75) progressBarColor = "bg-orange-500"; // High Usage
  if (budgetUsed >= 90) progressBarColor = "bg-red-600 animate-pulse"; // Critical Usage

  useEffect(() => {
    if (budget > 0 && remainingBudget / budget <= 0.1) {
      console.warn("⚠️ Warning: You are very low on your budget!");
    }
  }, [remainingBudget, budget]);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}> 
      {/* Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 h-screen p-5 shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-blue-700 text-white"}`}>
          <ul className="space-y-4">
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Dashboard</li>
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Expenses</li>
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Settings</li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className={`flex-1 max-w-2xl mx-auto mt-10 p-6 shadow-lg rounded-lg border ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"}`}>
          <h2 className="text-3xl font-bold text-center mb-6">Personal Budget Planner</h2>

          <div className={`mb-6 p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"}`}>
            <label className="block font-semibold mb-2">Set Monthly Budget ($)</label>
            <input
              type="number"
              value={budget.toString().replace(/^0+/, "")}
              onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : 0)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? "bg-gray-600 border-gray-500 text-white focus:ring-blue-300" : "border-gray-300 focus:ring-blue-400"}`}
              placeholder="Enter your budget"
            />
            <button
              className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all"
              onClick={increaseBudget}
            >
              Increase Budget by $5
            </button>
          </div>

          <BudgetForm onAddExpense={handleAddExpense} darkMode={darkMode} />
          <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />

          {/* Budget Summary */}
          <div className={`mt-6 p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
            <p className="text-lg font-medium">Total Expenses: <span className="font-bold text-red-500">${totalExpenses.toFixed(2)}</span></p>
            <p className="text-lg font-medium">
              Remaining Budget: <span className="font-bold text-green-600">${remainingBudget.toFixed(2)}</span>
            </p>
            { budget > 0 && remainingBudget === 0 && (
              <p className="text-red-500 font-bold mt-2">Warning: You have exceeded your budget!</p>
            )}
          </div>

          {/* Budget Usage Progress Bar */}
          <div className="mt-6">
            <p className="text-lg font-medium">Budget Usage</p>
            <div className="relative w-full bg-gray-300 rounded-full h-6 mt-3 shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-in-out ${progressBarColor}`}
                style={{
                  width: `${Math.min(budgetUsed, 100)}%`,
                  transition: "width 0.6s ease-in-out",
                }}
              ></div>
            </div>
            <p className={`text-sm mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {Math.min(budgetUsed, 100).toFixed(2)}% used
            </p>
          </div>

          {/* Low Budget Warning */}
          {remainingBudget / budget <= 0.1 && budget > 0 && (
            <div className={`p-3 rounded-lg mt-5 text-center font-semibold shadow-sm animate-bounce ${darkMode ? "bg-yellow-800 text-yellow-200" : "bg-yellow-100 text-yellow-800"}`}>
              ⚠️ Warning: You have less than 10% of your budget left!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;