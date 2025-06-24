import { useNavigate } from 'react-router-dom';
import { confirmLogout } from '../../helpers/swalHelper';
import { showSuccess } from '../../helpers/toastHelper';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

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
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Student Management</h1>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
