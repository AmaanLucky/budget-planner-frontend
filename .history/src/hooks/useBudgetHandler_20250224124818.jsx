import { useState, useEffect } from "react";
import { getExpenses, addExpense, deleteExpense } from "../api/expenseApi";

const useBudgetHandler = (isAuthenticated) => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [showExpenses, setShowExpenses] = useState(true);

  // ✅ Fetch Expenses when the user logs in
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

  // ✅ Calculate Budget Details
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = Math.max(budget - totalExpenses, 0);
  const budgetUsed = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  // ✅ Add Expense (Now linked to user)
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

  // ✅ Delete Expense (Ensures only user’s expenses are deleted)
  const handleDeleteExpense = async (expenseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;

    const success = await deleteExpense(expenseId);
    if (success) {
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
    }
  };

  return {
    budget,
    setBudget,
    expenses,
    showExpenses,
    setShowExpenses,
    remainingBudget,
    budgetUsed,
    handleAddExpense,
    handleDeleteExpense,
  };
};

export default useBudgetHandler;
