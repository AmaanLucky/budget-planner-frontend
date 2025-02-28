import { useState } from "react";
import BudgetForm from "./components/BudgetForm";
import ExpenseList from "./components/ExpenseList";

const BudgetForm = ({ onAddExpense }) => {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!amount || !category) return;
      
      onAddExpense({ amount: Number(amount), category });
      setAmount("");
      setCategory("");
    };
  
    return (
      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Expense Amount"
          className="w-full px-3 py-2 border rounded"
        />
        <input 
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full px-3 py-2 border rounded mt-2"
        />
        <button type="submit" className="mt-2 w-full bg-blue-500 text-white py-2 rounded">
          Add Expense
        </button>
      </form>
    );
  };
  
  export default BudgetForm