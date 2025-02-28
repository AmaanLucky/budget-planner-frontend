import { useState, useEffect } from "react";
import BudgetForm from "./components/BudgetForm";
import ExpenseList from "./components/ExpenseList";
import Navbar from "./components/Navbar";
import { RadialBarChart, RadialBar, Legend } from "recharts";

const App = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedBudget = localStorage.getItem("budget");
    const savedExpenses = localStorage.getItem("expenses");
    const savedDarkMode = localStorage.getItem("darkMode");
    
    if (savedBudget) setBudget(Number(savedBudget));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses) || []);
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

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

  const increaseBudget = () => {
    setBudget((prevBudget) => prevBudget + 5);
  };

  const budgetData = [
    { name: "Used", value: Math.min(budgetUsed, 100), fill: "#FF6B6B" },
    { name: "Remaining", value: Math.max(100 - budgetUsed, 0), fill: "#4CAF50" },
  ];

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
          <div className="mt-6 flex justify-center">
            <RadialBarChart
              width={300}
              height={300}
              cx={150}
              cy={150}
              innerRadius={50}
              outerRadius={120}
              barSize={20}
              data={budgetData}
            >
              <RadialBar minAngle={15} clockWise dataKey="value" />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
            </RadialBarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;