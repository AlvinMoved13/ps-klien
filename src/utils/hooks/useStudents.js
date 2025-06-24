import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addStudent, deleteStudent, getStudents, updateStudent } from '../../services/studentService';

export const useStudents = () => {
  const queryClient = useQueryClient();

  const { data: students, isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents
  });

  const addMutation = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    }
  });

  return {
    students,
    isLoading,
    error,
    addStudent: addMutation.mutate,
    updateStudent: updateMutation.mutate,
    deleteStudent: deleteMutation.mutate,
    isAddingStudent: addMutation.isLoading,
    isUpdatingStudent: updateMutation.isLoading,
    isDeletingStudent: deleteMutation.isLoading
  };
};
