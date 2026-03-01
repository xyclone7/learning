// 1. Variabel Tetap (Gunakan const untuk data yang tidak berubah)
const namaLengkap = "Fatur"; 

// 2. Variabel Dinamis (Gunakan let jika nilainya bisa berubah)
let statusBelajar = "Baru Mulai";
statusBelajar = "Sedang Fokus"; // Nilainya kita ubah di sini

// 3. Tipe Data Dasar
const tahunLahir = 2000;         // Number
const isBackendReady = true;      // Boolean (Benar/Salah)
const daftarSkill = ["Nodejs", "TS"]; // Array (Daftar)
const tahunSekarang = 2026;
const umur = tahunSekarang - tahunLahir;

// 4. Mencetak ke Terminal (Output) 
console.log('Halo, saya ${namaLengkap} saya lahir tahun ${tahunLahir} dan di tahun ${tahunSekarang} saya berumur ${umur} tahun');
