import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addClass, addStudentToClass, getClasses } from '../../data/classes';

export const useClasses = () => {
  const queryClient = useQueryClient();

  const { data: classes, isLoading, error } = useQuery({
    queryKey: ['classes'],
    queryFn: getClasses
  });

  const addMutation = useMutation({
    mutationFn: addClass,
    onSuccess: () => {
      queryClient.invalidateQueries(['classes']);
    }
  });

  const addStudentMutation = useMutation({
    mutationFn: addStudentToClass,
    onSuccess: () => {
      queryClient.invalidateQueries(['classes']);
    }
  });

  return {
    classes,
    isLoading,
    error,
    addClass: addMutation.mutate,
    addStudentToClass: addStudentMutation.mutate,
    isAddingClass: addMutation.isLoading,
    isAddingStudent: addStudentMutation.isLoading
  };
};
