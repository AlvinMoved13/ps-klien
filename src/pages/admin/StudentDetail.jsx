import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import studentsData from '../../data/students.json';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const foundStudent = studentsData.students.find(s => s.id === parseInt(id));
    setStudent(foundStudent);
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <Link 
          to="/admin/students" 
          className="text-blue-600 hover:underline"
        >
          ← Kembali ke Daftar Mahasiswa
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Detail Mahasiswa</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Nama:</h3>
            <p>{student.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Program Studi:</h3>
            <p>{student.class}</p>
          </div>
          <div>
            <h3 className="font-semibold">Semester:</h3>
            <p>{student.semester}</p>
          </div>
          <div>
            <h3 className="font-semibold">Telepon:</h3>
            <p>{student.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold">Email:</h3>
            <p>{student.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Alamat:</h3>
            <p>{student.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
