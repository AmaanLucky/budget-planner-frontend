import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlusCircle } from "react-icons/fa";

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
    <form onSubmit={handleSubmit} className={`p-5 rounded-lg shadow-md transition-all duration-300 border 
                                             ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"}`}>
      {/* Amount Input */}
      <label className="block font-semibold">Expense Amount ($)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-lg mt-2 
                   transition-all duration-300 ${darkMode ? "bg-gray-700 border-gray-500 text-white focus:ring-blue-400" : "border-gray-300 focus:ring-blue-500"}`}
        placeholder="Enter amount"
        required
      />

      {/* Category Dropdown */}
      <label className="block font-semibold mt-4">Select Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`w-full px-4 py-3 border rounded-md mt-2 focus:outline-none focus:ring-2 text-lg transition-all duration-300 
                   ${darkMode ? "bg-gray-700 border-gray-500 text-white focus:ring-blue-400" : "border-gray-300 focus:ring-blue-500"}`}
        required
      >
        <option value="" disabled>Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Custom Category Input */}
      {category === "Other" && (
        <input
          type="text"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-lg mt-2 
                     transition-all duration-300 ${darkMode ? "bg-gray-700 border-gray-500 text-white focus:ring-blue-400" : "border-gray-300 focus:ring-blue-500"}`}
          placeholder="Enter Custom Category"
          required
        />
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 
                    ${darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
      >
        <FaPlusCircle /> Add Expense
      </button>
    </form>
  );
};

BudgetForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default BudgetForm;