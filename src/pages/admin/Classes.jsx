import { useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import Pagination from '../../components/Pagination';
import { coursesData } from '../../Data/CoursesData';
import { lecturesData } from '../../Data/LecturesData';
import studentsData from '../../data/students.json';
import { useClasses } from '../../hooks/useClasses';
import { getLecturerTotalCredits, getStudentTotalCredits } from '../../services/classService';

const MAX_CREDITS = 24;

export default function Classes() {
  const [formData, setFormData] = useState({ courseId: '', lecturerId: '' });
  const { classes, isLoading, createClass, addStudentToClass } = useClasses();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedClasses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return classes.slice(startIndex, startIndex + itemsPerPage);
  }, [classes, currentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const course = coursesData.find(c => c.id === formData.courseId);
    
    if (classes.some(c => c.courseId === formData.courseId)) {
      toast.error('Mata kuliah ini sudah memiliki kelas!');
      return;
    }

    const lecturerCredits = getLecturerTotalCredits(formData.lecturerId);
    if (lecturerCredits + course.credits > MAX_CREDITS) {
      toast.error(`Dosen telah mencapai batas maksimal SKS (${MAX_CREDITS})`);
      return;
    }

    createClass({
      ...formData,
      credits: course.credits,
      name: course.name
    });
    setFormData({ courseId: '', lecturerId: '' });
  };

  const handleAddStudent = async (classId) => {
    const classItem = classes.find(c => c.id === classId);
    const { students: enrolledStudents } = studentsData;
    
    // Filter out students who are already enrolled
    const availableStudents = enrolledStudents.filter(student => {
      const studentCredits = getStudentTotalCredits(student.id);
      return studentCredits + classItem.credits <= MAX_CREDITS;
    });

    const { value: studentId } = await Swal.fire({
      title: 'Tambah Mahasiswa',
      input: 'select',
      inputOptions: Object.fromEntries(
        availableStudents.map(s => [
          s.id, 
          `${s.name} (${s.nim}) - SKS: ${getStudentTotalCredits(s.id)}/${MAX_CREDITS}`
        ])
      ),
      inputPlaceholder: 'Pilih Mahasiswa',
      showCancelButton: true,
    });

    if (studentId) {
      try {
        addStudentToClass(classId, parseInt(studentId));
        toast.success('Mahasiswa berhasil ditambahkan ke kelas!');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manajemen Kelas</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Tambah Kelas Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mata Kuliah</label>
            <select
              name="courseId"
              onChange={(e) => setFormData({...formData, courseId: e.target.value})}
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
              required
            >
              <option value="">Pilih Mata Kuliah</option>
              {coursesData.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name} ({course.credits} SKS)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dosen</label>
            <select
              name="lecturerId"
              onChange={(e) => setFormData({...formData, lecturerId: e.target.value})}
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
              required
            >
              <option value="">Pilih Dosen</option>
              {lecturesData.map(lecturer => (
                <option key={lecturer.id} value={lecturer.id}>
                  {lecturer.name} - {lecturer.expertise}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Buat Kelas
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mata Kuliah
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dosen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jumlah Mahasiswa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedClasses.map(classItem => (
              <tr key={classItem.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {classItem.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {classItem.credits}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {lecturesData.find(l => l.id === classItem.lecturerId)?.name}
                  <div className="text-xs text-gray-500">
                    SKS: {getLecturerTotalCredits(classItem.lecturerId)}/{MAX_CREDITS}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>{classItem.students.length} Mahasiswa</div>
                  <button
                    onClick={() => showStudentList(classItem)}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Lihat Detail
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleAddStudent(classItem.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Tambah Mahasiswa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(classes.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
