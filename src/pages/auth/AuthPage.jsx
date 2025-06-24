import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmLogout } from '../../helpers/swalHelper';
import { showError, showSuccess } from '../../helpers/toastHelper';
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Form from "../components/molecules/Form";

const AuthPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Logika login Anda di sini
      showSuccess('Login berhasil!');
      navigate('/admin');
    } catch (error) {
      showError('Login gagal. Silakan periksa kredensial Anda.');
    }
  };

  const handleLogout = async () => {
    const result = await confirmLogout();
    if (result.isConfirmed) {
      // Logika logout Anda di sini
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      showSuccess('Berhasil logout');
      navigate('/login');
    }
  };

  return (
    <div className="auth-page">
      <Form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
        <Input 
          label="Username" 
          name="username" 
          placeholder="Enter username"
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        <Input 
          label="Password" 
          type="password" 
          name="password" 
          placeholder="Enter password"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default AuthPage;
