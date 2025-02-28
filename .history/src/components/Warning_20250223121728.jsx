import PropTypes from "prop-types";

const Warning = ({ remainingBudget, budget, darkMode }) => {
  if (!budget || remainingBudget / budget > 0.1) return null;

  return (
    <div className={`p-3 rounded-lg mt-5 text-center font-semibold shadow-sm 
      ${darkMode ? "bg-yellow-800 text-yellow-200" : "bg-yellow-100 text-yellow-800"}`}>
      ⚠️ Warning: You are very low on your budget!
    </div>
  );
};

Warning.propTypes = {
  remainingBudget: PropTypes.number.isRequired,
  budget: PropTypes.number.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default Warning;