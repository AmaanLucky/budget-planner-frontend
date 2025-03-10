import { useState } from "react";
import BudgetForm from "./components/BudgetForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  // Function to Add Expense
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  // Function to Delete Expense
  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Personal Budget Planner</h1>
      
      {/* Budget Form Component */}
      <BudgetForm onAddExpense={addExpense} />

      {/* Expense List Component */}
      <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
    </div>
  );
};

export default App;
