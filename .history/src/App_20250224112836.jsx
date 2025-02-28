import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BudgetInput from "./components/BudgetInput";
import ExpenseList from "./components/ExpenseList";
import BudgetProgress from "./components/BudgetProgress";
import Warning from "./components/Warning";
import BudgetForm from "./components/BudgetForm";
import RemainingBudget from "./components/RemainingBudget";
import LoginForm from "./components/LoginForm";  // ✅ Import Login
import SignupForm from "./components/SignupForm"; // ✅ Import Signup
import { getExpenses, addExpense, deleteExpense } from "./api/expenseApi";

const App = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showExpenses, setShowExpenses] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // ✅ Track Auth State
  const [showSignup, setShowSignup] = useState(false); // ✅ Toggle between Login & Signup

  // ✅ Fetch Expenses from API if authenticated
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

  // ✅ Handle Login & Signup Success
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {showSignup ? (
          <SignupForm onAuthSuccess={handleAuthSuccess} />
        ) : (
          <LoginForm onAuthSuccess={handleAuthSuccess} />
        )}
        <button
          onClick={() => setShowSignup(!showSignup)}
          className="mt-4 text-blue-600 hover:underline"
        >
          {showSignup ? "Already have an account? Login" : "New user? Sign up"}
        </button>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout} /> {/* ✅ Pass Logout Function */}

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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{showExpenses ? "Expense List" : "Remaining Budget"}</h3>
            <button 
              onClick={() => setShowExpenses(!showExpenses)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 
                          ${darkMode ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
              {showExpenses ? "Show Budget" : "Show Expenses"}
            </button>
          </div>

          {showExpenses ? (
            <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} darkMode={darkMode} />
          ) : (
            <RemainingBudget remainingBudget={remainingBudget} budget={budget} darkMode={darkMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;