import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { getExpenses, addExpense, deleteExpense } from "../api/expenseApi";

const useBudgetHandler = (isAuthenticated) => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [showExpenses, setShowExpenses] = useState(true);
  const [filterCategory, setFilterCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date_desc");

  useEffect(() => {
    if (isAuthenticated) {
      const fetchExpenses = async () => {
        try {
          const data = await getExpenses();
          if (data) setExpenses(data);
        } catch (error) {
          console.error("❌ Error fetching expenses:", error);
        }
      };
      fetchExpenses();
    }
  }, [isAuthenticated]);

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = Math.max(budget - totalExpenses, 0);
  const budgetUsed = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  const handleAddExpense = async (expense) => {
    if (remainingBudget < expense.amount) {
      alert("❌ Cannot add expense! Exceeds remaining budget.");
      return;
    }

    try {
      const newExpense = await addExpense(expense);
      if (newExpense) setExpenses([...expenses, newExpense]);
    } catch (error) {
      console.error("❌ Error adding expense:", error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;

    const success = await deleteExpense(expenseId);
    if (success) {
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
    }
  };

  const filteredExpenses = expenses
    .filter((expense) =>
      filterCategory ? expense.category === filterCategory : true
    )
    .filter((expense) =>
      searchQuery ? expense.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "amount_desc":
          return b.amount - a.amount;
        case "amount_asc":
          return a.amount - b.amount;
        case "date_desc":
          return new Date(b.date) - new Date(a.date);
        case "date_asc":
          return new Date(a.date) - new Date(b.date);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  return {
    budget,
    setBudget,
    expenses: filteredExpenses,
    showExpenses,
    setShowExpenses,
    remainingBudget,
    budgetUsed,
    handleAddExpense,
    handleDeleteExpense,
    filterCategory,
    setFilterCategory,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
  };
};

useBudgetHandler.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default useBudgetHandler;
