import PropTypes from "prop-types";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-lg bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Budget Planner</h1>
      <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-800 rounded-full">
        {darkMode ? "🌙" : "☀️"}
      </button>
    </nav>
  );
};

// ✅ Add PropTypes validation
Navbar.propTypes = {
  darkMode: PropTypes.bool.isRequired,  // Must be a boolean
  setDarkMode: PropTypes.func.isRequired, // Must be a function
};

export default Navbar;