import PropTypes from "prop-types";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi"; // ✅ Import Icons
import { useState, useEffect } from "react";

const Navbar = ({ darkMode, setDarkMode, onLogout, user }) => {
  const [animateWelcome, setAnimateWelcome] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateWelcome(true), 300);
  }, []);

  return (
    <nav className={`sticky top-0 flex justify-between items-center p-4 shadow-md z-50 transition-all duration-500
                     ${darkMode ? "bg-gray-900 text-white" : "bg-blue-600 text-white"}`}>
      <h1 className={`text-xl font-bold transform transition-all duration-700 ease-in-out 
                     ${animateWelcome ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}`}>
        Welcome, <span className="font-extrabold text-yellow-300">{user?.name || "Guest"}</span> 👋
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className={`p-2 rounded-full transition-all duration-300 ease-in-out transform 
                      ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-yellow-400 hover:bg-yellow-300"} 
                      shadow-md hover:scale-110 hover:rotate-180`}
        >
          {darkMode ? <FiMoon className="text-white text-xl" /> : <FiSun className="text-yellow-800 text-xl" />}
        </button>

        <div className="relative group">
          <button
            onClick={onLogout}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-md 
                       hover:scale-110 active:scale-95"
          >
            <FiLogOut className="text-white text-xl" />
          </button>

          <span className="absolute top-12 left-1/2 transform -translate-x-1/2 
                     bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-lg 
                      shadow-lg opacity-0 translate-y-2 scale-95 
                      group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 
                      transition-all duration-300 ease-in-out">
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
  user: PropTypes.object, 
};

export default Navbar;
