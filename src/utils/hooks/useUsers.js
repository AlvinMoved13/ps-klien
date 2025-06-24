import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import userData from '../../data/user.json';

const getUsers = () => {
  const stored = localStorage.getItem('users');
  if (!stored) {
    localStorage.setItem('users', JSON.stringify(userData.users));
    return userData.users;
  }
  return JSON.parse(stored);
};

const updateUserRole = async ({ userId, newRole }) => {
  const users = getUsers();
  const updatedUsers = users.map(user => 
    user.id === userId ? { ...user, role: newRole } : user
  );
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return updatedUsers;
};

const deleteUser = async (userId) => {
  const users = getUsers();
  const updatedUsers = users.filter(user => user.id !== userId);
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return updatedUsers;
};

export const useUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    initialData: userData.users
  });

  const updateRoleMutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('Role pengguna berhasil diperbarui');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('Pengguna berhasil dihapus');
    }
  });

  return {
    users,
    isLoading,
    updateUserRole: updateRoleMutation.mutate,
    deleteUser: deleteMutation.mutate
  };
};
