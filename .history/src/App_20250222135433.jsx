import { useState, useEffect } from "react";
import BudgetForm from "./components/BudgetForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(500); // Default budget
  const [totalSpent, setTotalSpent] = useState(0);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
    calculateTotal(storedExpenses);
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    calculateTotal(expenses);
  }, [expenses]);

  const handleAddExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
  };

  const calculateTotal = (expenseList) => {
    const total = expenseList.reduce((sum, item) => sum + item.amount, 0);
    setTotalSpent(total);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded">
      <h1 className="text-2xl font-bold text-center mb-4">Personal Budget Planner</h1>
      <p className="text-center text-gray-700 font-semibold">Monthly Budget: ${budget}</p>
      <p className={`text-center ${totalSpent > budget ? "text-red-500" : "text-green-500"}`}>
        Total Spent: ${totalSpent}
      </p>
      {totalSpent > budget && <p className="text-red-600 font-bold text-center">Warning: Over Budget!</p>}
      <BudgetForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default App;