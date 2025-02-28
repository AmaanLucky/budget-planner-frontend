const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-blue-700 text-white p-5 shadow-md">
      <ul className="space-y-4">
        <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Dashboard</li>
        <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Expenses</li>
        <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;