import PropTypes from "prop-types";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi"; // ✅ New Icons

const Navbar = ({ darkMode, setDarkMode, onLogout, user }) => {
  console.log("🔹 Navbar User Data:", user); // Debugging

  return (
    <nav className={`sticky top-0 flex justify-between items-center p-4 transition-all duration-500 
                     shadow-md z-50 ${darkMode ? "bg-gray-900 text-white" : "bg-blue-600 text-white"}`}>
      {/* ✅ Display User Name with Fade-in Effect */}
      <h1 className="text-xl font-bold opacity-0 animate-fadeIn">
        Welcome, {user?.name ? user.name : "Guest"} 👋
      </h1>

      <div className="flex items-center gap-4">
        {/* ✅ Dark Mode Toggle with Rotate Effect */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-all duration-300 ease-in-out transform 
                      ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-yellow-400 hover:bg-yellow-300"} 
                      shadow-md hover:scale-110 hover:rotate-180`}
        >
          {darkMode ? <FiMoon className="text-white text-xl" /> : <FiSun className="text-yellow-800 text-xl" />}
        </button>

        {/* ✅ Logout Button with Bounce Effect */}
        <div className="relative group">
          <button
            onClick={onLogout}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-md 
                       hover:scale-110 active:scale-95"
          >
            <FiLogOut className="text-white text-xl" />
          </button>

          {/* 🔹 Tooltip with Softer Fade-in & Easing */}
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

// ✅ Fade-in Animation
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 1s ease-in-out forwards;
  }
`;

Navbar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object, // ✅ Accepts user data
};

// ✅ Corrected Export to Fix Fast Refresh Issue
const NavbarWithStyles = () => (
  <>
    <style>{styles}</style>
    <Navbar />
  </>
);

export default NavbarWithStyles;
