# Sistem Manajemen Data KTP - Spring Boot & MySQL

Tugas CRUD KTP menggunakan Spring Boot sebagai backend dan HTML/CSS/JS (JQuery Ajax) sebagai frontend.

## Fitur Utama
- **CRUD Operasi**: Tambah, Lihat, Edit, dan Hapus data KTP tanpa refresh halaman (Ajax).
- **Validasi Data**: Validasi nomor KTP 16 digit dan field wajib lainnya.
- **Handling Error**: Penanganan error jika data tidak ditemukan atau NIK sudah terdaftar.
- **UI Premium**: Tampilan modern dengan Inter font, bayangan halus, dan animasi transisi.
- **Notifikasi**: Menggunakan SweetAlert2 untuk feedback aksi yang interaktif.

## Teknologi yang Digunakan
- **Backend**: Java 17, Spring Boot 3.2.3, Spring Data JPA, Hibernate.
- **Frontend**: HTML5, Vanilla CSS3, JavaScript (JQuery 3.7.1).
- **Database**: MySQL.
- **Library Tambahan**: Lombok, Spring Validation, Font Awesome, SweetAlert2.

## Dokumentasi API

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| **POST** | `/ktp` | Menambah data KTP baru |
| **GET** | `/ktp` | Mengambil seluruh daftar KTP |
| **GET** | `/ktp/{id}` | Mengambil detail KTP berdasarkan ID |
| **PUT** | `/ktp/{id}` | Mengubah data KTP yang sudah ada |
| **DELETE** | `/ktp/{id}` | Menghapus data KTP berdasarkan ID |

## Contoh Request JSON (POST/PUT)
```json
{
  "nomorKtp": "1234567890123456",
  "namaLengkap": "Budi Santoso",
  "alamat": "Jl. Mawar No. 12, Sleman",
  "tanggalLahir": "1990-05-20",
  "jenisKelamin": "Laki-laki"
}
```

## Cara Menjalankan
1. Pastikan MySQL berjalan (Port 3309 - disesuaikan di `application.properties`).
2. Buat database bernama `spring`.
3. Jalankan `KtpcrudApplication.java` dari IDE Anda.
4. Akses aplikasi di `http://localhost:8081`.

## Pengembang
- **Nama**: [Nama Anda]
- **NIM**: 20230140145
