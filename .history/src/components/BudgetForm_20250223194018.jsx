import { useState } from "react";
import PropTypes from "prop-types";

const BudgetForm = ({ onAddExpense, darkMode, budget, remainingBudget }) => {
  const [title, setTitle] = useState(""); // 🔹 Added title field
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const categories = ["Food", "Transport", "Shopping", "Bills", "Donation", "Other"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || (!category && !customCategory) || remainingBudget === 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    const finalCategory = category === "Other" ? customCategory : category;
    onAddExpense({ title, amount: Number(amount), category: finalCategory });

    setTitle("");  // 🔹 Reset title field
    setAmount("");
    setCategory("");
    setCustomCategory("");
  };

  // Disable form when budget is over
  const isDisabled = budget === 0 || remainingBudget === 0;

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* Warning Message */}
      {isDisabled && (
        <p className="text-red-500 font-semibold text-center mb-2">
          ⚠️ {budget === 0 ? "Set a budget first!" : "You have reached your budget limit!"}
        </p>
      )}

      {/* Expense Title Input 🔹 */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Expense Title"
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
          darkMode
            ? "bg-gray-700 border-gray-500 text-white focus:ring-blue-300"
            : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
        }`}
        disabled={isDisabled} 
        required
      />

      {/* Amount Input */}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Expense Amount"
        className={`w-full px-3 py-2 border rounded mt-2 focus:outline-none focus:ring-2 ${
          darkMode
            ? "bg-gray-700 border-gray-500 text-white focus:ring-blue-300"
            : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
        }`}
        disabled={isDisabled} 
        required
      />

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`w-full px-3 py-2 border rounded mt-2 focus:outline-none focus:ring-2 ${
          darkMode
            ? "bg-gray-700 border-gray-500 text-white focus:ring-blue-300"
            : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
        }`}
        disabled={isDisabled}
        required
      >
        <option value="" disabled>Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Custom Category Input (only if "Other" is selected) */}
      {category === "Other" && (
        <input
          type="text"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          placeholder="Enter Custom Category"
          className={`w-full px-3 py-2 border rounded mt-2 focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-700 border-gray-500 text-white focus:ring-blue-300"
              : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
          }`}
          disabled={isDisabled}
          required
        />
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`mt-2 w-full py-2 rounded transition-all ${
          darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        disabled={isDisabled}
      >
        Add Expense
      </button>
    </form>
  );
};

BudgetForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  budget: PropTypes.number.isRequired,
  remainingBudget: PropTypes.number.isRequired,
};

export default BudgetForm;
