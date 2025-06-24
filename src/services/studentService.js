import axios from 'axios';

// Ganti dengan URL API Anda jika sudah ada
const API_URL = '/api/students';

// Jika belum ada API, gunakan simulasi dengan localStorage
const saveToLocalStorage = (students) => {
  localStorage.setItem('students', JSON.stringify(students));
};

const getFromLocalStorage = () => {
  const data = localStorage.getItem('students');
  return data ? JSON.parse(data) : null;
};

export const getStudents = async () => {
  try {
    // Coba gunakan API jika tersedia
    // const response = await axios.get(API_URL);
    // return response.data;
    
    // Simulasi dengan localStorage atau data statis
    const localData = getFromLocalStorage();
    if (localData) return localData;
    
    // Jika tidak ada di localStorage, gunakan data dari file JSON
    const response = await import('../data/students.json');
    saveToLocalStorage(response.students);
    return response.students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const addStudent = async (student) => {
  try {
    // Dengan API
    // const response = await axios.post(API_URL, student);
    // return response.data;
    
    // Simulasi dengan localStorage
    const students = await getStudents();
    const newStudent = {
      ...student,
      id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1
    };
    const updatedStudents = [...students, newStudent];
    saveToLocalStorage(updatedStudents);
    return newStudent;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

export const updateStudent = async (student) => {
  try {
    // Dengan API
    // const response = await axios.put(`${API_URL}/${student.id}`, student);
    // return response.data;
    
    // Simulasi dengan localStorage
    const students = await getStudents();
    const updatedStudents = students.map(s => 
      s.id === student.id ? student : s
    );
    saveToLocalStorage(updatedStudents);
    return student;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    // Dengan API
    // await axios.delete(`${API_URL}/${id}`);
    // return id;
    
    // Simulasi dengan localStorage
    const students = await getStudents();
    const updatedStudents = students.filter(s => s.id !== id);
    saveToLocalStorage(updatedStudents);
    return id;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};