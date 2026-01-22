# rbac-project

# absensi_karyawan

cara copy semua file dengan cepat (sudah install git)
- bikin folder baru
- buka folder menggunakan vscode
- di terminal ketik:git clone https://github.com/Nabilahr01/rbac-project/
- kalau blm muncul, tutup vscode, buka folder tsb pakai vscode

cara menjalankan code
- buka cmd (command prompt), arahkan ke file rbac-project menggunakan cd
- jika sudah, ketik:npm.cmd install atau npm install
- jalankan laragon ("mulai semua")
- buka cmd (command prompt), ketik:npm.cmd start atau mpm start
- buka file login.html pakai vscode, setelah masuk, klik kanan pilih live server (kalau tdk ada, install extensionnya dulu di vscode)

cara menyambungkan 500.000 data ke laragon:
- buka file schema.sql (di folder database) di laragon, nama database schema_db (jika tidak muncul di list kiri, coding dari awal sesuai sql yg di folder database, terus di save as ke folder database)
- jalankan generateData.js (di backend/seed) di vscode (tombol segitiga di kanan atas)
- otomatis masuk ke laragon
