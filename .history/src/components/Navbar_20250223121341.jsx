const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className={`p-4 shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Budget Planner</h1>
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="bg-gray-500 px-4 py-2 rounded-md"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;