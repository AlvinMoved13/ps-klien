import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { lecturesData } from '../../Data/LecturesData';

// Simulate API calls
const getLectures = () => Promise.resolve(lecturesData);
const addLecture = (newLecture) => Promise.resolve({ ...newLecture, id: Date.now() });
const updateLecture = (lecture) => Promise.resolve(lecture);
const deleteLecture = (id) => Promise.resolve(id);

export const useLectures = () => {
  const queryClient = useQueryClient();

  const { data: lectures, isLoading, error } = useQuery({
    queryKey: ['lectures'],
    queryFn: getLectures
  });

  const addMutation = useMutation({
    mutationFn: addLecture,
    onSuccess: () => {
      queryClient.invalidateQueries(['lectures']);
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateLecture,
    onSuccess: () => {
      queryClient.invalidateQueries(['lectures']);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLecture,
    onSuccess: () => {
      queryClient.invalidateQueries(['lectures']);
    }
  });

  return {
    lectures,
    isLoading,
    error,
    addLecture: addMutation.mutate,
    updateLecture: updateMutation.mutate,
    deleteLecture: deleteMutation.mutate
  };
};
