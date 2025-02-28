import { useState } from "react";
import BudgetForm from "./components/BudgetForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Personal Budget Planner</h1>
      <BudgetForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default App;