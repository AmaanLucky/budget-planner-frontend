import { useState } from "react";
import BudgetForm from "./components/BudgetForm";
import ExpenseList from "./components/ExpenseList";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded">
          <h1 className="text-2xl font-bold text-center mb-4">Personal Budget Planner</h1>
          <BudgetForm onAddExpense={handleAddExpense} />
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default App;