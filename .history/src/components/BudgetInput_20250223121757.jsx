import PropTypes from "prop-types";

const BudgetInput = ({ budget, setBudget, darkMode }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Allows only numbers (no negative values)
      setBudget(value ? Number(value) : 0);
    }
  };

  return (
    <div className={`mb-6 p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"}`}>
      <label className="block font-semibold mb-2">Set Monthly Budget ($)</label>
      <input
        type="number"
        value={budget}
        onChange={handleChange}
        min="0"
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 
          ${darkMode ? "bg-gray-600 border-gray-500 text-white focus:ring-blue-300" : "border-gray-300 focus:ring-blue-400"}`}
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