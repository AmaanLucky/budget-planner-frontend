import PropTypes from "prop-types";
import { FaExclamationTriangle } from "react-icons/fa";

const Warning = ({ remainingBudget, budget, darkMode }) => {
  if (remainingBudget / budget > 0.1 || budget === 0) return null;

  return (
    <div className={`p-4 rounded-lg mt-5 text-center font-semibold shadow-md flex items-center justify-center gap-3 
                    transition-all duration-300 ${darkMode ? "bg-yellow-800 text-yellow-200" : "bg-yellow-100 text-yellow-800"}`}>
      <FaExclamationTriangle className="text-yellow-500 text-2xl" />
      <span>⚠️ Warning: You are very low on your budget!</span>
    </div>
  );
};

Warning.propTypes = {
  remainingBudget: PropTypes.number.isRequired,
  budget: PropTypes.number.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default Warning;