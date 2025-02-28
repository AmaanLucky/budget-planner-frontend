
import PropTypes from "prop-types"; // Import PropTypes
import { useState } from "react";

const BudgetForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || amount <= 0) {
      alert("Please enter a valid title and amount.");
      return;
    }
    
    onAddExpense({ title, amount: parseFloat(amount) });
    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md space-y-4">
      <div>
        <label className="block text-gray-700 font-medium">Expense Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter expense title"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Amount ($)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter amount"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Add Expense
      </button>
    </form>
  );
};
BudgetForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
};

export default BudgetForm;