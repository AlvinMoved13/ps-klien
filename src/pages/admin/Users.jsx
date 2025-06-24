import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useUsers } from '../../utils/hooks/useUsers';

export default function Users() {
  const { users, isLoading, updateUserRole, deleteUser } = useUsers();

  useEffect(() => {
    // Any necessary effect on mount
  }, []);

  const handleRoleChange = async (user) => {
    const { value: newRole } = await Swal.fire({
      title: 'Ubah Role Pengguna',
      input: 'select',
      inputOptions: {
        admin: 'Admin',
        manager: 'Manager',
        user: 'User'
      },
      inputValue: user.role,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return 'Role harus dipilih!';
      }
    });

    if (newRole) {
      updateUserRole({ userId: user.id, newRole });
      toast.success('Role berhasil diubah!');
    }
  };

  const handleDeleteUser = async (user) => {
    const result = await Swal.fire({
      title: 'Hapus Pengguna',
      text: `Apakah anda yakin ingin menghapus ${user.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      deleteUser(user.id);
      toast.success('Pengguna berhasil dihapus!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manajemen Pengguna</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Lengkap
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                      user.role === 'manager' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleRoleChange(user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Ubah Role
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
