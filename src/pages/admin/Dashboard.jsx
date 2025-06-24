import { useEffect, useState } from 'react';
import BarChartCard from '../../components/BarChartCard';
import LineChartCard from '../../components/LineChartCard';
import PieChartCard from '../../components/PieChartCard';
import { lecturesData } from '../../data/LecturesData';
import studentsData from '../../data/students.json';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [latestStudents, setLatestStudents] = useState([]);
  const [latestClasses, setLatestClasses] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    }

    // Ambil kelas dari localStorage
    const classes = JSON.parse(localStorage.getItem('classes') || '[]');

    // Tambahkan createdAt dummy untuk mahasiswa
    const studentsWithDate = studentsData.students.map((student, i) => ({
      ...student,
      createdAt: new Date(Date.now() - i * 86400000).toISOString(), // hari ke-i
    }));

    // Sort dan ambil 5 terbaru
    const sortedStudents = [...studentsWithDate].sort((a, b) =>
      new Date(b.createdAt || b.registeredAt || 0) - new Date(a.createdAt || a.registeredAt || 0)
    );

    const sortedClasses = [...classes].sort((a, b) =>
      new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );

    setLatestStudents(sortedStudents.slice(0, 5));
    setLatestClasses(sortedClasses.slice(0, 3));
  }, []);

  // Dummy Data
  const classChartData = [
    { name: "Informatika", students: 45 },
    { name: "Sistem Informasi", students: 30 },
    { name: "Teknik Elektro", students: 25 },
    { name: "Manajemen", students: 35 },
  ];

  const departmentChartData = [
    { name: "Teknik", lecturers: 12 },
    { name: "Ekonomi", lecturers: 8 },
    { name: "Ilmu Sosial", lecturers: 6 },
  ];

  // Calculate statistics
  const totalStudents = studentsData.students.length;
  const totalLecturers = lecturesData.length;
  const classes = JSON.parse(localStorage.getItem('classes') || '[]');
  const totalClasses = classes.length;
  const uniqueClasses = new Set(studentsData.students.map(student => student.class)).size;

  // Generate student growth data (simulated)
  const studentGrowthData = [
    { month: 'Jan', students: 123 },
    { month: 'May', students: 236 },
    { month: 'Sep', students: totalStudents }
  ];

  return (
    <div className="p-8">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Selamat Datang, {user?.fullName}!
        </h1>
        <p className="text-gray-600">Username: {user?.username}</p>
        <p className="text-gray-600">Role: {user?.role}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Mahasiswa</h3>
          <p className="text-3xl font-bold">{totalStudents}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Dosen</h3>
          <p className="text-3xl font-bold">{totalLecturers}</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Kelas</h3>
          <p className="text-3xl font-bold">{totalClasses}</p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Program Studi</h3>
          <p className="text-3xl font-bold">{uniqueClasses}</p>
        </div>
      </div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-min">
  
  <LineChartCard 
    data={studentGrowthData}
    title="Pertumbuhan Jumlah Mahasiswa"
    dataKey="students"
    color="#3B82F6"
  />


  <BarChartCard
    data={classChartData}
    title="Jumlah Mahasiswa per Program Studi"
    dataKey="students"
    color="#10B981"
  />


  <PieChartCard
    data={departmentChartData}
    title="Distribusi Dosen per Departemen"
    dataKey="lecturers"
    color="#F59E0B"
  />

 
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Perubahan Terakhir</h3>
    
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-gray-700">Mahasiswa Baru</h4>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {latestStudents.map((student, index) => (
            <li key={index}>
              {student.name} - {student.class}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium text-gray-700">Kelas Baru</h4>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {latestClasses.map((kelas, index) => (
            <li key={index}>
              {kelas.name} - {kelas.department || 'Tidak diketahui'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</div>


    </div>
  );
};

export default Dashboard;