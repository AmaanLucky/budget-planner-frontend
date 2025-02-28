import PropTypes from "prop-types";
// import { useState } from "react";
import { FaUtensils, FaBus, FaShoppingCart, FaMoneyBillWave, FaTag, FaQuestion } from "react-icons/fa";

const categoryIcons = {
  Food: <FaUtensils className="text-green-400 dark:text-green-300" />, 
  Transport: <FaBus className="text-blue-400 dark:text-blue-300" />, 
  Shopping: <FaShoppingCart className="text-purple-400 dark:text-purple-300" />, 
  Bills: <FaMoneyBillWave className="text-yellow-400 dark:text-yellow-300" />, 
  Other: <FaTag className="text-gray-400 dark:text-gray-300" />,
};

const getExpenseIcon = (expense) => {
  if (expense.category && categoryIcons[expense.category]) {
    return categoryIcons[expense.category]; 
  }
  return <FaQuestion className="text-gray-400 dark:text-gray-300" />;
};

const ExpenseList = ({ expenses = [], onDeleteExpense, darkMode, searchQuery, setSearchQuery, sortOption, setSortOption, filterCategory, setFilterCategory }) => {
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const category = expense.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(expense);
    return acc;
  }, {});

  return (
    <div className={`mt-6 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
        darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-800 border-gray-200"
      }`}>
      <h2 className="text-lg font-bold mb-4">Expense List</h2>
      
      {/* Search, Filter & Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 w-full sm:w-auto"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 w-full sm:w-auto"
        >
          <option value="date_desc">Date: Newest</option>
          <option value="date_asc">Date: Oldest</option>
          <option value="amount_desc">Amount: High to Low</option>
          <option value="amount_asc">Amount: Low to High</option>
          <option value="category">Category: A-Z</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 w-full sm:w-auto"
        >
          <option value="">All Categories</option>
          {Object.keys(categoryIcons).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {Object.keys(groupedExpenses).length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300 text-center mt-2">
          No expenses found.
        </p>
      ) : (
        <ul className="mt-2 space-y-5">
          {Object.entries(groupedExpenses).map(([category, categoryExpenses]) => (
            <li key={category} className="border-b pb-2 border-gray-300 dark:border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                {categoryIcons[category] || <FaQuestion className="text-gray-400 dark:text-gray-300" />}
                <span className="font-medium text-lg">{category}</span>
              </div>
              <ul className="pl-6 space-y-1">
                {categoryExpenses.map((expense) => (
                  <li key={expense._id} className="flex justify-between items-center py-1">
                    <div className="flex items-center space-x-2">
                      {getExpenseIcon(expense)}
                      <span className="font-medium">{expense.title}</span>
                    </div>
                    <span className={`font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      ${expense.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onDeleteExpense(expense._id)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                        ❌
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  setSortOption: PropTypes.func.isRequired,
  filterCategory: PropTypes.string.isRequired,
  setFilterCategory: PropTypes.func.isRequired,
};

export default ExpenseList;
