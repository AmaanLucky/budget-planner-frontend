const BudgetInput = ({ budget, setBudget, darkMode }) => {
    return (
      <div className={`mb-6 p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"}`}>
        <label className="block font-semibold mb-2">Set Monthly Budget ($)</label>
        <input
          type="number"
          value={budget.toString().replace(/^0+/, "")}
          onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : 0)}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? "bg-gray-600 border-gray-500 text-white focus:ring-blue-300" : "border-gray-300 focus:ring-blue-400"}`}
          placeholder="Enter your budget"
        />
      </div>
    );
  };
  
  export default BudgetInput;