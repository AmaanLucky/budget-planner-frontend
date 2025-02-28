import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const BudgetForm = ({ onAddExpense, darkMode, budget, remainingBudget }) => {
  // const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [customCategories, setCustomCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("customCategories")) || [];
  });

  const handleChange = (e) => {
    const value = e.target.value;

    if (value < 0) {
      setError("❌ No negative numbers allowed!");
      setAmount(""); // Reset input field
    } else {
      setError(""); // Clear error when valid
      setAmount(value);
    }
  };
  const predefinedCategories = ["Food", "Transport", "Shopping", "Bills", "Donation", "Other"];
  const allCategories = [...predefinedCategories, ...customCategories];

  useEffect(() => {
    localStorage.setItem("customCategories", JSON.stringify(customCategories));
  }, [customCategories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || remainingBudget === 0) {
      alert("Please enter a valid title and amount.");
      return;
    }

    let finalCategory = category;
    if (category === "Other" && customCategory) {
      finalCategory = customCategory;
      setCustomCategories((prev) => [...new Set([...prev, customCategory])]); // 🔹 Store new category
    }
    if (!category) finalCategory = "Uncategorized"; // 🔹 Default category

    onAddExpense({ title, amount: Number(amount), category: finalCategory });

    setTitle("");
    setAmount("");
    setCategory("");
    setCustomCategory("");
  };

  const isDisabled = budget === 0 || remainingBudget === 0;

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {isDisabled && (
        <p className="text-red-500 font-semibold text-center mb-2">
          ⚠️ {budget === 0 ? "Set a budget first!" : "You have reached your budget limit!"}
        </p>
      )}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Expense Title"
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
          darkMode ? "bg-gray-700 border-gray-500 text-white focus:ring-blue-300" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
        }`}
        disabled={isDisabled}
        required
      />

<input
        type="number"
        value={amount}
        onChange={handleChange}
        placeholder="Expense Amount"
        className={`w-full px-3 py-2 border rounded mt-2 focus:outline-none focus:ring-2 ${
          darkMode
            ? "bg-gray-700 border-gray-500 text-white focus:ring-blue-300"
            : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
        }`}
        disabled={isDisabled}
        required
      />
      {/* 🔹 Show Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}


      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`w-full px-3 py-2 border rounded mt-2 focus:outline-none focus:ring-2 ${
          darkMode ? "bg-gray-700 border-gray-500 text-white focus:ring-blue-300" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
        }`}
        disabled={isDisabled}
      >
        <option value="">Select Category (Optional)</option>
        {allCategories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {category === "Other" && (
        <input
          type="text"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          placeholder="Enter Custom Category"
          className={`w-full px-3 py-2 border rounded mt-2 focus:outline-none focus:ring-2 ${
            darkMode ? "bg-gray-700 border-gray-500 text-white focus:ring-blue-300" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
          }`}
          disabled={isDisabled}
        />
      )}

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
