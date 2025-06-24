import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userData from '../../data/user.json';
import { showError, showSuccess } from '../../helpers/toastHelper';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = userData.users.find(
      u => u.username === formData.username && u.password === formData.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      showSuccess(`Selamat datang, ${user.fullName}!`);
      navigate('/admin');
    } else {
      showError('Username atau password tidak valid');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Login</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full mb-4 p-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/register" className="text-sm text-blue-600 hover:text-blue-500">
            Belum punya akun? Daftar disini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
