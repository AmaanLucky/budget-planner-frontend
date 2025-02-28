import { useState } from "react";
import Navbar from "./components/Navbar";
import BudgetInput from "./components/BudgetInput";
import ExpenseList from "./components/ExpenseList";
import BudgetProgress from "./components/BudgetProgress";
import Warning from "./components/Warning";
import BudgetForm from "./components/BudgetForm";
import RemainingBudget from "./components/RemainingBudget";

const App = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = Math.max(budget - totalExpenses, 0);
  const budgetUsed = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  const handleAddExpense = (expense) => {
    if (budget - totalExpenses - expense.amount < 0) return;
    setExpenses([...expenses, expense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}> 
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex">
        {/* Left Sidebar */}
        <aside className={`w-64 h-screen p-5 shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-blue-700 text-white"}`}>
          <ul className="space-y-4">
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Dashboard</li>
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Expenses</li>
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Settings</li>
          </ul>
        </aside>

        {/* Main Section (Budget & Form) */}
        <div className={`flex-1 max-w-2xl mx-auto mt-10 p-6 shadow-lg rounded-lg border 
                        ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"}`}>
          <h2 className="text-3xl font-bold text-center mb-6">Personal Budget Planner</h2>
          <BudgetInput budget={budget} setBudget={setBudget} darkMode={darkMode} />
          <BudgetForm onAddExpense={handleAddExpense} darkMode={darkMode} budget={budget} remainingBudget={remainingBudget} />
          <BudgetProgress budgetUsed={budgetUsed} darkMode={darkMode} />
          <RemainingBudget remainingBudget={remainingBudget} darkMode={darkMode} />
          <Warning remainingBudget={remainingBudget} budget={budget} darkMode={darkMode} />
        </div>

        {/* Right Section (Expense List) */}
        <div className={`w-72 h-screen p-5 overflow-y-auto shadow-md border-l 
                        ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-gray-900 border-gray-300"}`}>
          <h3 className="text-xl font-semibold mb-4">Expense List</h3>
          <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
        </div>
      </div>
    </div>
  );
};

export default App;