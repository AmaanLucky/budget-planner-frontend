import PropTypes from "prop-types";

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

        {/* ✅ Logout Button */}
        <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
          Logout
        </button>
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