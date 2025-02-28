import PropTypes from "prop-types";
import { FaMoneyBillWave } from "react-icons/fa";

const RemainingBudget = ({ remainingBudget, budget, darkMode }) => {
  return (
    <div className={`p-5 rounded-lg shadow-md flex items-center gap-3 transition-all duration-300 
                    ${darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"}`}>
      <FaMoneyBillWave className="text-green-500 text-2xl" />
      <p className="text-lg font-bold">
        Remaining Budget: ${remainingBudget} / ${budget}
      </p>
    </div>
  );
};

RemainingBudget.propTypes = {
  remainingBudget: PropTypes.number.isRequired,
  budget: PropTypes.number.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default RemainingBudget;