import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import BudgetInput from "./components/BudgetInput";
import ExpenseList from "./components/ExpenseList";
import BudgetProgress from "./components/BudgetProgress";
import Warning from "./components/Warning";
import BudgetForm from "./components/BudgetForm";
import RemainingBudget from "./components/RemainingBudget";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import useAuthHandler from "./hooks/useAuthHandler";
import useBudgetHandler from "./hooks/useBudgetHandler";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Authentication Logic
  const { isAuthenticated, user, handleLogout, handleAuthSuccess, showSignup, setShowSignup, loading } = useAuthHandler();

  // ✅ Budget & Expense Logic
  const {
    budget,
    setBudget,
    expenses,
    showExpenses,
    setShowExpenses,
    remainingBudget,
    budgetUsed,
    handleAddExpense,
    handleDeleteExpense,
  } = useBudgetHandler(isAuthenticated);

  // ✅ Show a loading screen while verifying authentication
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">🔄 Loading...</div>;
  }

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}> 
      {isAuthenticated ? (
        <>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout} user={user} />
          <div className="flex flex-col lg:flex-row gap-6 p-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex-1 p-6 shadow-lg rounded-lg border 
                ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"}`}
            >
              <h2 className="text-3xl font-bold text-center mb-6">Personal Budget Planner</h2>
              <BudgetInput budget={budget} setBudget={setBudget} darkMode={darkMode} />
              <BudgetForm onAddExpense={handleAddExpense} darkMode={darkMode} budget={budget} remainingBudget={remainingBudget} />
              <BudgetProgress budgetUsed={budgetUsed} darkMode={darkMode} />
              <Warning remainingBudget={remainingBudget} budget={budget} darkMode={darkMode} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`w-full lg:w-1/3 p-6 shadow-md border rounded-lg transition-all duration-300 
                ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-gray-900 border-gray-300"}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{showExpenses ? "Expense List" : "Remaining Budget"}</h3>
                <button 
                  onClick={() => setShowExpenses(!showExpenses)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 
                    ${darkMode ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                  {showExpenses ? "Show Budget" : "Show Expenses"}
                </button>
              </div>
              {showExpenses ? (
                <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} darkMode={darkMode} />
              ) : (
                <RemainingBudget remainingBudget={remainingBudget} budget={budget} darkMode={darkMode} />
              )}
            </motion.div>
          </div>
        </>
      ) : (
        <AnimatePresence>
          <motion.div 
            key={showSignup ? "signup" : "login"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col justify-center items-center min-h-screen bg-gray-100"
          >
            {showSignup ? (
              <SignupForm onAuthSuccess={handleAuthSuccess} onToggle={() => setShowSignup(false)} />
            ) : (
              <LoginForm onAuthSuccess={handleAuthSuccess} onToggle={() => setShowSignup(true)} />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default App;
