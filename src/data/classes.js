export const MAX_LECTURER_CREDITS = 24;
export const MAX_STUDENT_CREDITS = 24;

// Store classes in localStorage
const getStoredClasses = () => {
  const stored = localStorage.getItem('classes');
  return stored ? JSON.parse(stored) : [];
};

const updateStoredClasses = (classes) => {
  localStorage.setItem('classes', JSON.stringify(classes));
};

export const getClasses = () => {
  return getStoredClasses();
};

export const addClass = (classData) => {
  const classes = getStoredClasses();
  
  // Validate lecturer credits
  const lecturerClasses = classes.filter(c => c.lecturerId === classData.lecturerId);
  const lecturerTotalCredits = lecturerClasses.reduce((sum, c) => sum + c.credits, 0);
  
  if (lecturerTotalCredits + classData.credits > MAX_LECTURER_CREDITS) {
    throw new Error('Dosen telah mencapai batas maksimal SKS');
  }

  // Check if course already has a class
  const existingClass = classes.find(c => c.courseId === classData.courseId);
  if (existingClass) {
    throw new Error('Mata kuliah ini sudah memiliki kelas');
  }

  const newClass = {
    id: Date.now().toString(),
    ...classData,
    students: []
  };

  classes.push(newClass);
  updateStoredClasses(classes);
  return newClass;
};

export const addStudentToClass = (classId, studentId) => {
  const classes = getStoredClasses();
  const classItem = classes.find(c => c.id === classId);
  if (!classItem) throw new Error('Kelas tidak ditemukan');

  // Calculate student's total credits
  const studentClasses = classes.filter(c => c.students.includes(studentId));
  const studentTotalCredits = studentClasses.reduce((sum, c) => sum + c.credits, 0);

  if (studentTotalCredits + classItem.credits > MAX_STUDENT_CREDITS) {
    throw new Error('Mahasiswa telah mencapai batas maksimal SKS');
  }

  classItem.students.push(studentId);
  updateStoredClasses(classes);
  return classItem;
};

export const getLecturerCredits = (lecturerId) => {
  const classes = getStoredClasses();
  return classes
    .filter(c => c.lecturerId === lecturerId)
    .reduce((sum, c) => sum + c.credits, 0);
};

export const getStudentCredits = (studentId) => {
  const classes = getStoredClasses();
  return classes
    .filter(c => c.students.includes(studentId))
    .reduce((sum, c) => sum + c.credits, 0);
};
