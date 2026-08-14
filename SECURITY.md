# Security Policy

## Supported Versions

Tabel berikut menampilkan versi proyek **DevClean** (`@exclnt/devclean`) yang saat ini didukung dengan pembaruan keamanan.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1.0 | :x:                |

---

## Reporting a Vulnerability

Kami sangat mengutamakan keamanan data dan integritas sistem berkas pengguna. Jika Anda menemukan celah keamanan (*security vulnerability*) pada proyek **DevClean**, mohon ikuti alur pelaporan berikut:

### 1. Cara Melaporkan
- **Jangan buat GitHub Issue publik** untuk masalah keamanan yang belum diperbaiki.
- Laporkan secara privat melalui **[GitHub Private Vulnerability Reporting](https://github.com/exclnt/DevClean/security/advisories/new)** atau hubungi pengembang utama via GitHub profil [@exclnt](https://github.com/exclnt).

### 2. Informasi yang Diperlukan dalam Laporan
Mohon sertakan rincian berikut untuk mempercepat proses penanganan:
- Jenis kerentanan (misal: *path traversal*, *unintended file deletion*, *command injection*).
- Langkah-langkah untuk mereproduksi masalah (*proof of concept*).
- Sistem operasi dan versi Node.js / DevClean yang digunakan.

### 3. Waktu Respon & Penanganan
- **Respon Awal**: Kami berusaha merespon laporan pertama dalam kurun waktu **24–48 jam**.
- **Evaluasi & Perbaikan**: Kerentanan terkonfirmasi akan segera diperbaiki dan dirilis sebagai patch versi baru (`0.1.x`) dalam kurun waktu **3–7 hari kerja**.
- **Kredit**: Nama Anda akan dicantumkan dalam rilis rincian keamanan (*Security Release Notes*) sebagai bentuk apresiasi (jika disetujui).

---

## Fitur & Prinsip Keamanan DevClean

DevClean dirancang dengan prinsip **Safety-First**:
- **Tidak Memusnahkan Berkas Tanpa Konfirmasi**: Setiap operasi pembersihan memerlukan konfirmasi interaktif di TUI atau flag `--yes` yang disengaja di CLI.
- **Validasi Path**: Menghindari penghapusan berkas sistem kritis dengan melakukan sanitasiasi direktori target.
- **Mode Simulasi (`--dry-run`)**: Memungkinkan pengguna melihat direktori apa saja yang akan dihapus sebelum eksekusi sebenarnya dilakukan.
