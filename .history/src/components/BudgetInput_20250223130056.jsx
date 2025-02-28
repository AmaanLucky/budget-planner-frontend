import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";

const BudgetInput = ({ budget, setBudget, darkMode }) => {
  return (
    <div className={`mb-6 p-4 rounded-lg shadow-md flex flex-col gap-3
                    ${darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"}`}>
      <label className="block font-semibold">Set Monthly Budget ($)</label>
      
      <div className="flex gap-2">
        <input
          type="number"
          value={budget.toString().replace(/^0+/, "")}
          onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : 0)}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 
                      ${darkMode ? "bg-gray-600 border-gray-500 text-white focus:ring-blue-300" : "border-gray-300 focus:ring-blue-400"}`}
          placeholder="Enter your budget"
        />
        
        {/* Increment Button */}
        <button 
          onClick={() => setBudget((prev) => prev + 5)}
          className={`px-4 py-2 rounded-md flex items-center gap-1 text-sm font-semibold transition-all
                      ${darkMode ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
          <FaPlus /> +5
        </button>
      </div>
    </div>
  );
};

BudgetInput.propTypes = {
  budget: PropTypes.number.isRequired,
  setBudget: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default BudgetInput;