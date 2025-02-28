const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <ul>
        <li className="py-2 hover:bg-gray-700 cursor-pointer">Dashboard</li>
        <li className="py-2 hover:bg-gray-700 cursor-pointer">Expenses</li>
        <li className="py-2 hover:bg-gray-700 cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;