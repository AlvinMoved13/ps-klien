import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { coursesData } from '../../data/CoursesData';

// Initialize localStorage with default data if empty
const initializeData = () => {
  const stored = localStorage.getItem('courses');
  if (!stored) {
    localStorage.setItem('courses', JSON.stringify(coursesData));
  }
  return JSON.parse(localStorage.getItem('courses'));
};

const getCourses = () => {
  return Promise.resolve(initializeData());
};

const addCourse = (newCourse) => {
  const courses = JSON.parse(localStorage.getItem('courses') || '[]');
  const courseToAdd = { ...newCourse, id: `CRS${Date.now()}` };
  courses.push(courseToAdd);
  localStorage.setItem('courses', JSON.stringify(courses));
  return Promise.resolve(courseToAdd);
};

const updateCourse = (course) => {
  const courses = JSON.parse(localStorage.getItem('courses') || '[]');
  const index = courses.findIndex(c => c.id === course.id);
  if (index > -1) {
    courses[index] = course;
    localStorage.setItem('courses', JSON.stringify(courses));
  }
  return Promise.resolve(course);
};

const deleteCourse = (id) => {
  const courses = JSON.parse(localStorage.getItem('courses') || '[]');
  const filtered = courses.filter(c => c.id !== id);
  localStorage.setItem('courses', JSON.stringify(filtered));
  return Promise.resolve(id);
};

export const useCourses = () => {
  const queryClient = useQueryClient();

  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
    initialData: coursesData
  });

  const addMutation = useMutation({
    mutationFn: addCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      toast.success('Mata kuliah berhasil ditambahkan');
    },
    onError: (error) => {
      toast.error('Gagal menambahkan mata kuliah');
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      toast.success('Mata kuliah berhasil diupdate');
    },
    onError: (error) => {
      toast.error('Gagal mengupdate mata kuliah');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      toast.success('Mata kuliah berhasil dihapus');
    },
    onError: (error) => {
      toast.error('Gagal menghapus mata kuliah');
    }
  });

  return {
    courses,
    isLoading,
    error,
    addCourse: addMutation.mutate,
    updateCourse: updateMutation.mutate,
    deleteCourse: deleteMutation.mutate,
    isAdding: addMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading
  };
};
