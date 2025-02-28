import PropTypes from "prop-types";
import { FaDollarSign } from "react-icons/fa";

const BudgetInput = ({ budget, setBudget, darkMode }) => {
  return (
    <div className={`mb-6 p-5 rounded-lg shadow-lg transition-all duration-300 border 
                    ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"}`}>
      <label className="block font-semibold text-lg flex items-center gap-2">
        <FaDollarSign className="text-green-500" /> Set Monthly Budget ($)
      </label>
      
      <input
        type="number"
        value={budget.toString().replace(/^0+/, "")}
        onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : 0)}
        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 text-lg mt-3 
                   transition-all duration-300 shadow-sm ${darkMode ? "bg-gray-700 border-gray-500 text-white focus:ring-green-400" : "border-gray-300 focus:ring-green-500"}`}
        placeholder="Enter your budget"
      />
    </div>
  );
};

BudgetInput.propTypes = {
  budget: PropTypes.number.isRequired,
  setBudget: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default BudgetInput;