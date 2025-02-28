import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BudgetInput from "./components/BudgetInput";
import ExpenseList from "./components/ExpenseList";
import BudgetProgress from "./components/BudgetProgress";
import Warning from "./components/Warning";
import BudgetForm from "./components/BudgetForm";
import RemainingBudget from "./components/RemainingBudget";
import { getExpenses, addExpense, deleteExpense, updateExpense } from "./api/expenseApi";

const App = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showExpenses, setShowExpenses] = useState(true);

  // ✅ Fetch Expenses from API on Load
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        if (data) setExpenses(data);
      } catch (error) {
        console.error("❌ Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  // ✅ Calculate Budget Details
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = Math.max(budget - totalExpenses, 0);
  const budgetUsed = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  // ✅ Add Expense
  const handleAddExpense = async (expense) => {
    console.log("➡️ Adding Expense:", expense);
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

  // ✅ Delete Expense
  const handleDeleteExpense = async (expenseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;
  
    const success = await deleteExpense(expenseId);
    if (success) {
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
    }
  };

  // ✅ Update Expense
  const handleUpdateExpense = async (expenseId, updatedExpense) => {
    try {
      const updatedData = await updateExpense(expenseId, updatedExpense);
      if (updatedData) {
        setExpenses(expenses.map((exp) => (exp._id === expenseId ? updatedData : exp)));
      }
    } catch (error) {
      console.error("❌ Error updating expense:", error);
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* ✅ Main Section */}
        <div className={`flex-1 p-6 shadow-lg rounded-lg border 
                        ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"}`}>
          <h2 className="text-3xl font-bold text-center mb-6">Personal Budget Planner</h2>
          <BudgetInput budget={budget} setBudget={setBudget} darkMode={darkMode} />
          <BudgetForm onAddExpense={handleAddExpense} darkMode={darkMode} budget={budget} remainingBudget={remainingBudget} />
          <BudgetProgress budgetUsed={budgetUsed} remainingBudget={remainingBudget} budget={budget} darkMode={darkMode} />
          <Warning remainingBudget={remainingBudget} budget={budget} darkMode={darkMode} />
        </div>

        {/* ✅ Sidebar Section */}
        <div className={`w-full lg:w-1/3 p-6 shadow-md border rounded-lg transition-all duration-300 
                        ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-gray-900 border-gray-300"}`}>
          {/* Toggle Button */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{showExpenses ? "Expense List" : "Remaining Budget"}</h3>
            <button 
              onClick={() => setShowExpenses(!showExpenses)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 
                          ${darkMode ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
              {showExpenses ? "Show Budget" : "Show Expenses"}
            </button>
          </div>

          {/* Show Expense List or Remaining Budget */}
          {showExpenses ? (
            <ExpenseList 
              expenses={expenses} 
              onDeleteExpense={handleDeleteExpense} 
              onUpdateExpense={handleUpdateExpense} 
              darkMode={darkMode} 
            />
          ) : (
            <RemainingBudget remainingBudget={remainingBudget} budget={budget} darkMode={darkMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;