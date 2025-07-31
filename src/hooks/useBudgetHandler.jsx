import { useState, useEffect } from "react";
import { getExpenses, addExpense, deleteExpense } from "../api/expenseApi";
import PropTypes from "prop-types";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

const useBudgetHandler = (isAuthenticated) => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [showExpenses, setShowExpenses] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchExpenses = async () => {
        try {
          const data = await getExpenses();
          if (data) setExpenses(data);
        } catch (error) {
          console.error("Error fetching expenses:", error);
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
      alert("Cannot add expense! Exceeds remaining budget.");
      return;
    }

    try {
      const newExpense = await addExpense(expense);
      if (newExpense) setExpenses([...expenses, newExpense]);
    } catch (error) {
      console.error("Error adding expense:", error);
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

  const groupByCategory = (expenses) => {
    return expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) acc[expense.category] = [];
      acc[expense.category].push(expense);
      return acc;
    }, {});
  };

  const exportCSV = () => {
    const groupedExpenses = groupByCategory(expenses);
    let csvData = [];

    Object.entries(groupedExpenses).forEach(([category, categoryExpenses]) => {
      csvData.push({ Category: category });
      categoryExpenses.forEach((expense) => {
        csvData.push({ Title: expense.title, Amount: expense.amount, Date: expense.date });
      });
      csvData.push({ Total: categoryExpenses.reduce((sum, e) => sum + e.amount, 0) });
      csvData.push({});
    });

    csvData.push({ Overall_Total: totalExpenses });
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "expenses.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense List", 14, 10);

    const groupedExpenses = groupByCategory(expenses);
    let yPos = 20;

    Object.entries(groupedExpenses).forEach(([category, categoryExpenses]) => {
      doc.text(category, 14, yPos);
      yPos += 6;
      autoTable(doc, {
        startY: yPos,
        head: [["Title", "Amount ($)", "Date"]],
        body: categoryExpenses.map(exp => [exp.title, exp.amount.toFixed(2), exp.date]),
      });
      yPos = doc.lastAutoTable.finalY + 10;
      doc.text(`Total: $${categoryExpenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}`, 14, yPos);
      yPos += 10;
    });

    doc.text(`Overall Total: $${totalExpenses.toFixed(2)}`, 14, yPos);
    doc.save("expenses.pdf");
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
    exportCSV,
    exportPDF,
  };
};

useBudgetHandler.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default useBudgetHandler;
