import React from 'react';

const StudentTable = ({ mahasiswa = [], onDelete, openEditModal }) => {
  if (!mahasiswa || mahasiswa.length === 0) {
    return <p>Tidak ada data mahasiswa</p>;
  }

  const handleDelete = (nim) => {
    onDelete(nim);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 border-b">NIM</th>
            <th className="px-6 py-3 border-b">Nama</th>
            <th className="px-6 py-3 border-b">Kelas</th>
            <th className="px-6 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((student) => (
            <tr key={student.nim} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b">{student.nim}</td>
              <td className="px-6 py-4 border-b">{student.name}</td>
              <td className="px-6 py-4 border-b">{student.class}</td>
              <td className="px-6 py-4 border-b">
                <button
                  onClick={() => openEditModal(student.nim)}
                  className="text-blue-600 hover:text-blue-800 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.nim)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
