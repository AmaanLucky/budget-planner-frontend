import PropTypes from "prop-types";
import "../styles/navbar.css"; // ✅ Import external CSS

const Navbar = ({ darkMode, setDarkMode, onLogout }) => {
  return (
    <nav className={`navbar ${darkMode ? "navbar-dark" : "navbar-light"}`}>
      <h1 className="navbar-title">Budget Planner</h1>
      <div className="navbar-actions">
        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
          {darkMode ? "🌙" : "☀️"}
        </button>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;