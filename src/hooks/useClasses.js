import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addStudentToClass, createClass, getClasses } from '../services/classService';

export const useClasses = () => {
  const queryClient = useQueryClient();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: getClasses
  });

  const createMutation = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries(['classes']);
      toast.success('Kelas berhasil dibuat');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const addStudentMutation = useMutation({
    mutationFn: addStudentToClass,
    onSuccess: () => {
      queryClient.invalidateQueries(['classes']);
      toast.success('Mahasiswa berhasil ditambahkan ke kelas');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return {
    classes,
    isLoading,
    createClass: createMutation.mutate,
    addStudentToClass: addStudentMutation.mutate,
    isCreating: createMutation.isLoading,
    isAddingStudent: addStudentMutation.isLoading
  };
};
