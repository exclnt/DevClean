# Panduan Berkontribusi (*Contributing Guide*) — DevClean

Terima kasih atas minat Anda untuk berkontribusi pada **DevClean** (`@exclnt/devclean`)! Kontribusi dari komunitas sangat berharga untuk membuat alat manajemen penyimpanan pengembang ini menjadi lebih cepat, aman, dan bermanfaat bagi semua orang.

---

## 🛠️ Cara Memulai Development Lokal

### 1. Prasyarat
Pastikan Anda telah menginstal:
- **Node.js**: v18.0.0 atau yang lebih baru
- **npm** atau **bun** / **pnpm**
- **Git**

### 2. Clone Repositori & Install Dependensi
```bash
git clone https://github.com/exclnt/DevClean.git
cd DevClean
npm install
```

### 3. Perintah Utama Development
- **Mode Watch Development**: `npm run dev`
- **Menjalankan CLI Lokal**: `npm start -- scan`
- **Menjalankan Unit & Integration Test**: `npm run test`
- **Menjalankan Linter**: `npm run lint`
- **Build Proyek**: `npm run build`

---

## 📐 Standar Kode & Konvensi Commit

Kami menggunakan **[Conventional Commits](https://www.conventionalcommits.org/)** untuk menjaga kerapian riwayat commit dan publikasi changelog otomatis:

- `feat:` Fitur baru (misal: `feat: add Rust cargo target detector`).
- `fix:` Perbaikan bug (misal: `fix: handle permission error on windows`).
- `docs:` Perubahan dokumentasi (misal: `docs: update setup guide`).
- `test:` Penambahan atau perbaikan unit test.
- `chore:` Tugas pemeliharaan build/deps tanpa mengubah kode aplikasi.

---

## 🚀 Alur Pengajuan Pull Request (PR)

1. **Fork** repositori ini ke akun GitHub Anda.
2. Buat branch baru dari `main` dengan nama deskriptif:
   ```bash
   git checkout -b feat/nama-fitur-baru
   # atau
   git checkout -b fix/deskripsi-bug
   ```
3. Lakukan perubahan kode dan pastikan pengujian lulus:
   ```bash
   npm run lint
   npm run test
   ```
4. Commit perubahan Anda menggunakan format Conventional Commits.
5. Push branch ke fork Anda dan buat **Pull Request** ke branch `main`.
6. Isi template Pull Request dengan lengkap.

---

## 🐞 Melaporkan Bug & Mengusulkan Fitur

- **Bug Report**: Jika menemukan kesalahan fungsi atau crash, buat laporan melalui [Issue Bug Report](https://github.com/exclnt/DevClean/issues/new?template=bug_report.md).
- **Feature Request**: Punya ide fitur hebat? Usulkan melalui [Issue Feature Request](https://github.com/exclnt/DevClean/issues/new?template=feature_request.md).
- **Celah Keamanan**: Untuk laporan kerentanan keamanan, harap ikuti panduan di [SECURITY.md](file:///c:/Users/ekor4/Projek/react/test/SECURITY.md).
