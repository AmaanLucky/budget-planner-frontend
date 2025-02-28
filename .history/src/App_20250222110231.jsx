import { useState } from "react";
import Navbar from "./components/Navbar";
import BudgetForm from "./components/BudgetForm";

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-4">Budget Planner</h1>
        <BudgetForm onAddExpense={addExpense} />
      </div>
    </div>
  );
}

export default App;
