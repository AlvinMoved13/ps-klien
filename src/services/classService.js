const STORAGE_KEY = 'classes';
const MAX_CREDITS = 24;

export const getClasses = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const createClass = (classData) => {
  const classes = getClasses();
  const newClass = {
    id: `CLS${Date.now()}`,
    ...classData,
    students: []
  };
  classes.push(newClass);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
  return newClass;
};

export const addStudentToClass = (classId, studentId) => {
  const classes = getClasses();
  const classIndex = classes.findIndex(c => c.id === classId);
  
  if (classIndex === -1) throw new Error('Kelas tidak ditemukan');
  
  const studentCredits = getStudentTotalCredits(studentId);
  const classCredits = classes[classIndex].credits;
  
  if (studentCredits + classCredits > MAX_CREDITS) {
    throw new Error('Mahasiswa telah mencapai batas maksimal SKS');
  }
  
  classes[classIndex].students.push(studentId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
  return classes[classIndex];
};

export const getStudentTotalCredits = (studentId) => {
  const classes = getClasses();
  return classes
    .filter(c => c.students.includes(studentId))
    .reduce((sum, c) => sum + c.credits, 0);
};

export const getLecturerTotalCredits = (lecturerId) => {
  const classes = getClasses();
  return classes
    .filter(c => c.lecturerId === lecturerId)
    .reduce((sum, c) => sum + c.credits, 0);
};
