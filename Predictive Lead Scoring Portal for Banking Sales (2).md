Predictive Lead Scoring Portal for Banking Sales

Project Overview:

Tujuan project ini adalah mengembangkan sebuah portal website interaktif untuk tim sales dapat melihat nasabah prioritas berdasarkan “skor” atau probabilitas tertinggi dalam urutan yang terdapat pada dataset ini [https://archive.ics.uci.edu/dataset/222/bank+marketing](https://archive.ics.uci.edu/dataset/222/bank+marketing) dan informasi kunci nasabah (misalnya usia, pekerjaan, status pinjaman, dll) untuk membantu sales dalam percakapan.

Fitur Yang Dibutuhkan:

- Autentikasi dan manjemen role seperti sales, sales manager, dan admin  
- Dashboard utama yang menampilkan urutan nasabah dengan nama dan skor probabilitasnya dan alasan sederhana kenapa berada di urutan tersebut serta terdapat tombol lihat detail nasabah di paling kanan  
- Halaman detail nasabah (customer 360 view) menampilkan informasi kontak seperti nomor telepon, email jika ada, riwayat interaksi, dll yang relevan   
- Fitur pencarian dan filter berdasarkan kriteria seperti skor, demografi, usia, dll  
- Sistem pencatatan panggilan yaitu sebuah input sederhana di halaman detail nasabah terdapat input status panggilan tersambung, tidak diangkat. Input hasil berupa dropdown (Tidak Tertarik, Tertarik, Minta Dihubungi Lagi, Berhasil Ditawarkan/Closing). **Catatan (Notes):** Wajib diisi untuk konteks (Contoh: "Nasabah tertarik tapi minta dihubungi minggu depan setelah gajian").  
- Sistem Penjadwalan Tugas & Pengingat (Task Scheduling)  
- Panduan Percakapan Dinamis, Sebuah boks di halaman detail nasabah yang menampilkan poin-poin percakapan berdasarkan data nasabah. *Contoh:* "Anda lihat \[Nama Nasabah\] memiliki saldo tabungan Rp 150jt. Tawarkan Deposito Berjangka 6 bulan dengan bunga spesial."  
- Dashboard Kinerja Sederhana (Performance Dashboard) **Untuk Sales:** Jumlah panggilan hari ini, jumlah *closing*, tingkat konversi (%). **Untuk Manajer:** *Leaderboard* tim, total penjualan dari portal, tingkat kontak sukses per sales.

Tech Stack yang Digunakan

Bahasa pemrograman : javascript  
Frontend : 

- [React.js](http://React.js)  
- Next.js  
- Shadcn


Backend: 

- [Express.js](http://Express.js)  
- ORM: Prisma

Database : PostgreSQL  
Autentikasi: JWT, bcrypt  
Container: Docker  
Deployment: AWS

**User Personas & Use Cases**

- Sales Officer: melihat daftar lead, menelpon, dan mencatat hasil.  
- Sales Manager: melihat kinerja tim, memantau leaderboard.  
- Admin: mengunggah data baru, menambahkan user sales dan sales manager.

# **Functional Requirements Detail**

| No | Fitur / Modul | Deskripsi Fungsional | Input | Proses / Logika Utama | Output / Hasil |
| ----- | ----- | ----- | ----- | ----- | ----- |
| 1 | **User Authentication & Role Management** | Sistem harus menyediakan login, logout, dan manajemen peran (Admin, Sales, Sales Manager). | Email, Password | Validasi user via database; hashing password dengan bcrypt; generate token JWT; atur hak akses berdasarkan role. | Token JWT, redirect ke dashboard sesuai role. |
| 2 | **User Registration (Admin Only)** | Admin dapat menambahkan akun Sales atau Manager baru. | Nama, Email, Password, Role | Validasi input; simpan ke DB; kirim email aktivasi opsional. | Data user baru tersimpan; notifikasi sukses. |
| 3 | **Dashboard Utama (Lead Scoring View)** | Menampilkan daftar nasabah dengan skor probabilitas konversi dan alasan ringkas. | Query param: filter (skor, usia, pekerjaan, dll) | Query database; sorting berdasarkan skor tertinggi; tampilkan 10–20 teratas; sertakan alasan. | Tabel daftar nasabah, kolom skor, tombol detail. |
| 4 | **Lead Search & Filtering** | Pengguna dapat mencari dan memfilter nasabah berdasarkan kriteria tertentu. | Keyword pencarian, filter skor / usia / pekerjaan / daerah | Query DB berdasarkan filter dan keyword; tampilkan hasil sesuai role. | Daftar nasabah sesuai filter. |
| 5 | **Customer Detail (360 View)** | Halaman detail nasabah menampilkan informasi lengkap: identitas, kontak, histori interaksi, status pinjaman, dsb. | ID nasabah | Query DB berdasarkan ID; gabungkan data lead, riwayat interaksi, dan skor. | Tampilan profil nasabah lengkap. |
| 6 | **Call Logging System** | Sales dapat mencatat hasil panggilan dengan status dan catatan wajib. | Status panggilan (Connected, Not Answered), Hasil dropdown (Not Interested, Interested, Callback, Closed), Notes (teks wajib) | Validasi input; simpan ke DB dengan timestamp dan ID sales; update status lead. | Catatan panggilan tersimpan; update tabel riwayat interaksi. |
| 7 | **Task Scheduling & Reminder** | Sales dapat menjadwalkan tindak lanjut terhadap lead (callback, meeting). | Lead ID, tanggal & waktu reminder, deskripsi | Simpan jadwal ke tabel tugas; sistem memicu notifikasi sesuai waktu (email/alert internal). | Reminder aktif di dashboard Sales; notifikasi saat waktunya tiba. |
| 8 | **Dynamic Conversation Guide (AI Hints)** | Sistem menampilkan rekomendasi percakapan berdasarkan profil dan data nasabah. | Lead ID | Mengambil data dari field penting (saldo, jenis produk, status pinjaman); generate rekomendasi teks. | Box teks berisi saran percakapan (“Tawarkan produk deposito berjangka…”). |
| 9 | **Performance Dashboard (Sales)** | Menampilkan statistik harian sales seperti jumlah panggilan, closing, dan conversion rate. | ID sales | Ambil data log panggilan dan hasil closing; hitung agregat. | Grafik ringkas: total panggilan, closing, conversion %. |
| 10 | **Performance Dashboard (Manager)** | Menampilkan leaderboard tim dan total hasil penjualan. | ID manager | Query data seluruh sales di bawahnya; hitung agregat per sales. | Tabel leaderboard dan grafik perbandingan performa. |
| 11 | **Lead Scoring Engine Integration** | Sistem terhubung dengan model ML (API eksternal) untuk memberi skor probabilitas konversi. | Data nasabah (usia, pekerjaan, marital, dsb.) | Kirim request ke endpoint model; terima skor (0–1 atau 0–100%); simpan di DB. | Kolom skor terisi di tabel lead. |
| 12 | **Lead Export (CSV)** | User (Manager/Admin) dapat mengunduh data hasil scoring. | Filter atau seluruh data | Query data; format jadi CSV; kirim ke browser untuk download. | File CSV dengan kolom nama, skor, hasil kontak, dll. |
| 13 | **Error Handling & Notifications** | Sistem menampilkan pesan kesalahan yang jelas dan mencatat error ke log server. | Error object | Tangkap error global; tampilkan pesan user-friendly; log ke file/DB. | Pesan “Data gagal diupload” / “Token expired” dll.  |

**Component Breakdown**

| Komponen | Teknologi | Fungsi Utama |
| ----- | ----- | ----- |
| **Frontend** | Next.js (Javascript), Tailwind CSS, Shadcn/UI | Menyediakan antarmuka web interaktif untuk user (Sales, Manager, Admin). Mengatur routing, dashboard, tabel lead, dan komunikasi ke API backend. |
| **Backend API** | Express.js (Javascript), Prisma ORM | Menangani autentikasi, manajemen user, query data, dan integrasi ke ML Scoring API. Menyediakan endpoint REST berbasis JWT dan RBAC. |
| **Database** | PostgreSQL | Menyimpan data lead, user, call logs, hasil scoring, jadwal tugas. |
| **Containerization** | Docker, Docker Compose | Menyediakan environment yang konsisten untuk deployment dan CI/CD. |
| **Hosting / Deployment** | AWS  | Menjalankan container untuk frontend, backend, dan ML API secara terpisah dengan koneksi aman HTTPS.  |

**Non-Functional Requirements**

## **Security (Keamanan Data & Akses)**

| Kebutuhan | Deskripsi | Implementasi |
| ----- | ----- | ----- |
| Autentikasi | Semua endpoint API hanya dapat diakses user dengan token valid. | JWT \+ refresh token |
| Otorisasi | Pembatasan akses berbasis peran (Admin, Sales Manager, Sales). | Role-based Access Control (RBAC) |
| Enkripsi Data | Data sensitif seperti password dan token disimpan aman. | bcrypt untuk password, HTTPS/TLS untuk komunikasi |
| Input Validation | Semua input difilter dari karakter berbahaya (SQLi, XSS). | Library validator \+ middleware |
| Session Expiry | Token JWT memiliki masa berlaku terbatas. | Default 1 jam, refresh otomatis |

## **Scalability (Skalabilitas)**

| Aspek | Deskripsi | Pendekatan |
| ----- | ----- | ----- |
| Horizontal Scaling | Server backend dapat ditambah untuk menangani traffic tinggi. | Gunakan Docker container \+ load balancer |
| Database Scaling | DB dapat ditingkatkan kapasitasnya tanpa downtime. | PostgreSQL \+ connection pooling |
| Microservice Integration | Model ML dan backend dipisah agar mudah dikembangkan. | REST API terpisah untuk scoring service |

## **Compatibility & Accessibility**

| Aspek | Deskripsi |  |
| ----- | ----- | ----- |
| Browser Compatibility | Web kompatibel di browser modern. |  |
| Responsive Design | Tampilan menyesuaikan desktop, tablet, mobile. |  |
| Accessibility (A11Y) | UI memperhatikan kontras warna dan keyboard navigation. |  |

**Deployment & Environment**

| Aspek | Deskripsi | Implementasi |
| ----- | ----- | ----- |
| Environment Separation | Pisahkan environment dev, staging, production. | `.env` dan config folder |
| Containerization | Sistem dapat dijalankan via Docker Compose. | Dockerfile \+ docker-compose.yml |
| CI/CD Pipeline | Build dan deploy otomatis setelah commit ke branch main. | GitHub Actions / GitLab CI |
| Hosting | Layanan cloud yang mendukung PostgreSQL & Node.js. | AWS ECS |

## **Data Management**

| Aspek | Deskripsi | Standar |
| ----- | ----- | ----- |
| **Data Validation** | Setiap data baru diverifikasi format & integritasnya. | Zod / Joi schema validation |

**Alur Sistem (Hybrid Data Flow)**  
                    ┌─────────────────────────────────────┐  
                    │ Trained ML Model (Offline Training) │  
                    │ → menghasilkan CSV skor (batch)     │  
                    └────────────────┬────────────────────┘  
                                     │  
                            Batch Import (Admin)  
                                     │  
                                     ▼  
                        ┌────────────────────────┐  
                        │ Backend (Express \+ TS) │  
                        │ \- CRUD & Auth          │  
                        │ \- Scoring API call     │  
                        └────────┬───────────────┘  
                                 │  
                   ┌─────────────┴───────────────┐  
                   │                             │  
        Batch Upload (hasil training)     Realtime Scoring (lead baru)  
                   │                             │  
                   ▼                             ▼  
           \[PostgreSQL Database\]  ◄──────────────┘  
                   │  
                   ▼  
           \[Frontend Web (Next.js)\]  
                   │  
                   ▼  
     Dashboard → Detail Lead → Call Log → Performance Stats

Form untuk memasukkan data calon nasabah baru dan menghasilkan skor :   
Age, job, marital, education, housing, loan, contact, campaign,