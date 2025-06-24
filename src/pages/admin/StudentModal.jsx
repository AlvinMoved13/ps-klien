import React, { useEffect, useState } from 'react';
import { confirmSave } from '../../helpers/swalHelper';
import { showError } from '../../helpers/toastHelper';

const StudentModal = ({ isModalOpen, onClose, selectedMahasiswa, onSubmit }) => {
  const [form, setForm] = useState({
    nama: '',
    nim: '',
    jurusan: '',
    alamat: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedMahasiswa) {
      // Memetakan properti dari data JSON ke properti form
      setForm({
        nama: selectedMahasiswa.name || '',
        nim: selectedMahasiswa.nim || '',
        jurusan: selectedMahasiswa.class || '',
        alamat: selectedMahasiswa.address || ''
      });
    } else {
      setForm({
        nama: '',
        nim: '',
        jurusan: '',
        alamat: ''
      });
    }
    // Reset errors saat modal dibuka
    setErrors({});
  }, [selectedMahasiswa, isModalOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.nama) newErrors.nama = 'Nama wajib diisi';
    if (!form.nim) newErrors.nim = 'NIM wajib diisi';
    // Perbaikan validasi NIM - menggunakan length untuk mengecek panjang string
    else if (form.nim.length !== 8) newErrors.nim = 'NIM harus 8 digit';
    if (!form.jurusan) newErrors.jurusan = 'Jurusan wajib diisi';
    if (!form.alamat) newErrors.alamat = 'Alamat wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Hapus konfirmasi di sini, biarkan konfirmasi hanya di Students.jsx
      try {
        onSubmit(form);
      } catch (error) {
        showError('Gagal menyimpan data mahasiswa');
      }
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {selectedMahasiswa ? 'Edit' : 'Tambah'} Mahasiswa
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nama:</label>
            <input 
              type="text" 
              name="nama" 
              value={form.nama} 
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.nama && <span className="text-red-500 text-sm">{errors.nama}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">NIM:</label>
            <input 
              type="text" 
              name="nim" 
              value={form.nim} 
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.nim && <span className="text-red-500 text-sm">{errors.nim}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Jurusan:</label>
            <input 
              type="text" 
              name="jurusan" 
              value={form.jurusan} 
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.jurusan && <span className="text-red-500 text-sm">{errors.jurusan}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Alamat:</label>
            <textarea 
              name="alamat" 
              value={form.alamat} 
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.alamat && <span className="text-red-500 text-sm">{errors.alamat}</span>}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
