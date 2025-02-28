import PropTypes from "prop-types";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi"; // ✅ New Icons

const Navbar = ({ darkMode, setDarkMode, onLogout, user }) => {
  console.log("🔹 Navbar User Data:", user); // Debugging

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
      {/* ✅ Display User Name */}
      <h1 className="text-xl font-bold">
        Welcome, {user?.name ? user.name : "Guest"} 👋
      </h1>

      <div className="flex items-center gap-4">
        {/* ✅ Dark Mode Toggle with Smooth Effect */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-all duration-300 ease-in-out 
                      ${darkMode ? "bg-gray-900 hover:bg-gray-700" : "bg-yellow-400 hover:bg-yellow-300"} 
                      shadow-md hover:scale-110`}
        >
          {darkMode ? <FiMoon className="text-white text-xl" /> : <FiSun className="text-yellow-800 text-xl" />}
        </button>

        {/* ✅ Logout Button with Smooth Tooltip */}
        <div className="relative group">
          <button
            onClick={onLogout}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-md hover:scale-110"
          >
            <FiLogOut className="text-white text-xl" />
          </button>

          {/* 🔹 Smooth Tooltip with Soft Fade-In */}
          <span className="absolute top-12 left-1/2 transform -translate-x-1/2 
                     bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-lg 
                      shadow-lg opacity-0 translate-y-2 scale-95 
                      group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-50 
                      transition-all duration-300 ease-out">
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
