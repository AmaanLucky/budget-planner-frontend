import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const BudgetForm = ({ onAddExpense }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const expense = { 
      name: name.trim(), 
      amount: Number(amount) || 0 
    };
    onAddExpense(expense);

    setName("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-lg font-bold mb-4">Add Expense</h2>

      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded w-full py-2 px-3 mb-3"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded w-full py-2 px-3 mb-3"
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Expense
      </button>
    </form>
  );
};

// ✅ Add PropTypes validation
BudgetForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired, // Ensures it's a function
};

export default BudgetForm;
