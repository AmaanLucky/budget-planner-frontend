import PropTypes from "prop-types";
import { FaMoneyBillWave } from "react-icons/fa";

const RemainingBudget = ({ remainingBudget, darkMode }) => {
  return (
    <div
      className={`mt-4 p-4 rounded-lg flex items-center gap-3 shadow-md transition-all duration-300
                  ${darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"}`}
    >
      <FaMoneyBillWave className="text-green-500 text-2xl" />
      <p className="text-lg font-bold">Remaining Budget: ${remainingBudget}</p>
    </div>
  );
};

// Prop Validation
RemainingBudget.propTypes = {
  remainingBudget: PropTypes.number.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default RemainingBudget;