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

export default Navbar;