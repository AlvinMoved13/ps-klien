import Swal from 'sweetalert2';

export const confirmLogout = () => {
  return Swal.fire({
    title: 'Logout',
    text: 'Apakah anda yakin ingin keluar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Keluar!',
    cancelButtonText: 'Batal'
  });
};

export const confirmDelete = () => {
  return Swal.fire({
    title: 'Hapus Data',
    text: 'Apakah anda yakin ingin menghapus data ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  });
};

export const confirmSave = () => {
  return Swal.fire({
    title: 'Simpan Data',
    text: 'Apakah anda yakin ingin menyimpan perubahan?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Simpan!',
    cancelButtonText: 'Batal'
  });
};
