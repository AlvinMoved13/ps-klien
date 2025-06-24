import { NavLink, useNavigate } from 'react-router-dom';
import { confirmLogout } from '../helpers/swalHelper';
import { showSuccess } from '../helpers/toastHelper';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const activeClass = "bg-blue-600 text-white";
  const inactiveClass = "hover:bg-blue-100";
  
  const handleLogout = async () => {
    const result = await confirmLogout();
    if (result.isConfirmed) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      showSuccess('Logged out successfully');
      navigate('/login');
    }
  };

  return (
    <div className="w-64 min-h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-6">Panel Admin</h2>
      <nav className="space-y-2">
        <NavLink 
          to="/admin" 
          end
          className={({ isActive }) => 
            `block p-2 rounded ${isActive ? activeClass : inactiveClass}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/admin/students"
          className={({ isActive }) => 
            `block p-2 rounded ${isActive ? activeClass : inactiveClass}`
          }
        >
          Mahasiswa
        </NavLink>
        <NavLink 
          to="/admin/lectures"
          className={({ isActive }) => 
            `block p-2 rounded ${isActive ? activeClass : inactiveClass}`
          }
        >
          Dosen
        </NavLink>
        <NavLink 
          to="/admin/courses"
          className={({ isActive }) => 
            `block p-2 rounded ${isActive ? activeClass : inactiveClass}`
          }
        >
          Mata Kuliah
        </NavLink>
        <NavLink 
          to="/admin/users"
          className={({ isActive }) => 
            `block p-2 rounded ${isActive ? activeClass : inactiveClass}`
          }
        >
          Manajemen User
        </NavLink>
        <NavLink 
          to="/admin/classes"
          className={({ isActive }) => 
            `block p-2 rounded ${isActive ? activeClass : inactiveClass}`
          }
        >
          Kelas
        </NavLink>
        <button 
          onClick={handleLogout}
          className="w-full text-left p-2 rounded text-red-600 hover:bg-red-100 mt-8"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
