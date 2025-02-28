import PropTypes from "prop-types";
import { FiLogOut } from "react-icons/fi"; // ✅ Import Logout Icon

const Navbar = ({ darkMode, setDarkMode, onLogout, user }) => {
  console.log("🔹 Navbar User Data:", user); // Debugging

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
      {/* ✅ Display User Name */}
      <h1 className="text-xl font-bold">
        Welcome, {user?.name ? user.name : "Guest"} 👋
      </h1>

      <div className="flex items-center gap-4">
        {/* ✅ Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-800 rounded-full">
          {darkMode ? "🌙" : "☀️"}
        </button>

        {/* ✅ Logout Button (Icon + Tooltip) */}
        <div className="relative group">
          <button
            onClick={onLogout}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-all"
          >
            <FiLogOut className="text-white text-xl" />
          </button>
          {/* 🔹 Tooltip appears on hover */}
          <span className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Sign Out
          </span>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object, // ✅ Accepts user data
};

export default Navbar;
