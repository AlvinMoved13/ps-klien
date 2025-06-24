const Sidebar = () => (
    <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0 border-r border-gray-200">
      <h3 className="p-6 text-lg font-semibold text-gray-800 border-b border-gray-200">
        Admin Sidebar
      </h3>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/mahasiswa" className="flex items-center text-gray-600 hover:text-gray-900">
              Mahasiswa
            </a>
          </li>
        </ul>
      </nav>
    </div>
);

export default Sidebar;
