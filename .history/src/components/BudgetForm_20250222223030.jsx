import { useState } from "react";
import PropTypes from "prop-types";

const BudgetForm = ({ onAddExpense, darkMode }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const categories = ["Food", "Transport", "Shopping", "Bills", "Donation", "Other"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || (!category && !customCategory)) return;

    const finalCategory = category === "Other" ? customCategory : category;
    onAddExpense({ id: Date.now(), amount: Number(amount), category: finalCategory });

    setAmount("");
    setCategory("");
    setCustomCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* Amount Input */}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Expense Amount"
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
          darkMode
            ? "bg-gray-700 border-gray-500 text-white focus:ring-blue-300"
            : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
        }`}
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
          required
        />
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`mt-2 w-full py-2 rounded transition-all ${
          darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        Add Expense
      </button>
    </form>
  );
};

BudgetForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired, // Added darkMode as a required prop
};

export default BudgetForm;