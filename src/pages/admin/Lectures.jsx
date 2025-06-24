import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import LectureModal from '../../components/LectureModal';
import { lecturesData } from '../../Data/LecturesData';

export default function Lectures() {
  const [lectures, setLectures] = useState(lecturesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);

  const handleAdd = () => {
    setSelectedLecture(null);
    setIsModalOpen(true);
  };

  const handleEdit = (lecture) => {
    setSelectedLecture(lecture);
    setIsModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (selectedLecture) {
      // Edit existing lecture
      setLectures(lectures.map(lec => 
        lec.id === selectedLecture.id ? { ...formData, id: lec.id } : lec
      ));
      toast.success('Data dosen berhasil diperbarui');
    } else {
      // Add new lecture
      const newLecture = {
        ...formData,
        id: `DSN${Date.now()}`
      };
      setLectures([...lectures, newLecture]);
      toast.success('Dosen baru berhasil ditambahkan');
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (lecture) => {
    const result = await Swal.fire({
      title: 'Hapus Dosen',
      text: `Apakah anda yakin ingin menghapus ${lecture.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      setLectures(lectures.filter(lec => lec.id !== lecture.id));
      toast.success('Dosen berhasil dihapus');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Daftar Dosen</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tambah Dosen
        </button>
      </div>

      {/* Table Component */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">NIP</th>
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Keahlian</th>
              <th className="px-6 py-3 text-left">Telepon</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lectures.map(lecture => (
              <tr key={lecture.id}>
                <td className="px-6 py-4">{lecture.nip}</td>
                <td className="px-6 py-4">{lecture.name}</td>
                <td className="px-6 py-4">{lecture.email}</td>
                <td className="px-6 py-4">{lecture.expertise}</td>
                <td className="px-6 py-4">{lecture.phone}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(lecture)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(lecture)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LectureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedLecture}
      />
    </div>
  );
}
