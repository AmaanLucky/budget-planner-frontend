import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BudgetInput from "./components/BudgetInput";
import ExpenseList from "./components/ExpenseList";
import BudgetProgress from "./components/BudgetProgress";
import Warning from "./components/Warning";

const App = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = Math.max(budget - totalExpenses, 0);
  const budgetUsed = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  const handleAddExpense = (expense) => {
    if (budget - totalExpenses - expense.amount < 0) return;
    const updatedExpenses = [...expenses, { ...expense, id: Date.now() }];
    setExpenses(updatedExpenses);
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}> 
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex">
        <aside className={`w-64 h-screen p-5 shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-blue-700 text-white"}`}>
          <ul className="space-y-4">
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Dashboard</li>
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Expenses</li>
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Settings</li>
          </ul>
        </aside>
        <div className={`flex-1 max-w-2xl mx-auto mt-10 p-6 shadow-lg rounded-lg border ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"}`}>
          <h2 className="text-3xl font-bold text-center mb-6">Personal Budget Planner</h2>
          <BudgetInput budget={budget} setBudget={setBudget} darkMode={darkMode} />
          <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
          <BudgetProgress budgetUsed={budgetUsed} darkMode={darkMode} />
          <Warning remainingBudget={remainingBudget} budget={budget} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default App;