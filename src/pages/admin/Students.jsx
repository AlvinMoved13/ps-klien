import { useMemo, useState } from 'react';
import Pagination from '../../components/Pagination';
import { confirmDelete, confirmSave } from '../../helpers/swalHelper';
import { showError, showSuccess } from '../../helpers/toastHelper';
import { useStudents } from '../../utils/hooks/useStudents';
import MahasiswaModal from './StudentModal';
import MahasiswaTable from './StudentTable';

const Students = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const { 
    students, 
    isLoading, 
    error, 
    addStudent, 
    updateStudent, 
    deleteStudent 
  } = useStudents();

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return students.slice(startIndex, startIndex + itemsPerPage);
  }, [students, currentPage]);

  const openAddModal = () => {
    setModalOpen(true);
    setSelectedMahasiswa(null);
  };

  const openEditModal = (nim) => {
    const mhs = students.find(m => m.nim === nim);
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    const result = await confirmSave();
    if (result.isConfirmed) {
      try {
        if (selectedMahasiswa) {
          const dataToSave = {
            ...selectedMahasiswa,
            nim: formData.nim,
            name: formData.nama,
            class: formData.jurusan,
            address: formData.alamat
          };
          
          updateStudent(dataToSave);
          showSuccess('Data mahasiswa berhasil diupdate');
        } else {
          const newData = {
            nim: formData.nim,
            name: formData.nama,
            class: formData.jurusan,
            address: formData.alamat,
            semester: 1,
            phone: '',
            email: ''
          };
          addStudent(newData);
          showSuccess('Data mahasiswa berhasil ditambahkan');
        }
        setModalOpen(false);
      } catch (error) {
        showError('Gagal menyimpan data mahasiswa');
      }
    }
  };

  const handleDelete = async (nim) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      try {
        const mhs = students.find(m => m.nim === nim);
        if (mhs) {
          await deleteStudent(mhs.id);
          showSuccess('Data mahasiswa berhasil dihapus');
        } else {
          throw new Error('Mahasiswa tidak ditemukan');
        }
      } catch (error) {
        showError('Gagal menghapus data mahasiswa');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Daftar Mahasiswaz</h1>
        <button
          onClick={openAddModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Tambah Mahasiswa
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
        <>
          <MahasiswaTable 
            mahasiswa={paginatedStudents}
            openEditModal={openEditModal}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(students.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </div>
  );
};

export default Students;
