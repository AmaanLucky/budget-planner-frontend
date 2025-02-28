import { useState, useEffect } from "react";
import BudgetForm from "./components/BudgetForm";
import ExpenseList from "./components/ExpenseList";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded">
          <BudgetForm onAddExpense={handleAddExpense} />
          <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
        </div>
      </div>
    </div>
  );
};

export default App;