const express = require('express');
const fs = require('fs'); 
const app = express();
const port = 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// 1. Route Home
app.get('/', (req, res) => {
    res.send("<h1>Halaman Utama - Selamat Datang Raki</h1><a href='/baca-excel'>Lihat Data Excel</a>");
});

// 2. Route Baca Data (GET)
app.get('/baca-excel', (req, res) => {
    fs.readFile('data.csv', 'utf8', (err, data) => {
        if (err) return res.status(500).send("File data.csv tidak ditemukan");

        const cleanData = data.replace(/\r/g, "").trim();
        const baris = cleanData.split('\n');
        const header = baris[0].split(',').map(h => h.trim());

        const hasilJson = baris.slice(1).map(line => {
            const nilai = line.split(',').map(v => v.trim());
            let obj = {};
            header.forEach((key, index) => {
                obj[key] = nilai[index];
            });
            return obj;
        });  
     let htmlTable = '<table border="1" style="border-collapse: collapse; width: 60%; text-align: left;">';
        htmlTable += `<tr style="background-color: #eee;"><th>${header[0]}</th><th>${header[1]}</th><th>${header[2]}</th></tr>`;

        hasilJson.forEach((item, index) => { 
            htmlTable += `
                <tr>
                    <td>${item[header[0]]}</td>
                    <td>${item[header[1]]}</td>
                    <td>${item[header[2]]}</td>
                    <td>
                        <a href="/edit-data/${index}">Edit</a>
                        <a href="/hapus-data/${index}" style="color:red; font-weight:bold;">Hapus</a>
                    </td>
                </tr>`;
        });
        htmlTable += '</table>';

        res.send(`
            <h2>Input Karyawan Baru</h2>
            <form action="/simpan-ke-csv" method="POST" style="margin-bottom: 20px;">
                <input type="text" name="nama" placeholder="Nama" required>
                <input type="text" name="pekerjaan" placeholder="Pekerjaan" required>
                <input type="number" name="gaji" placeholder="Gaji" required>
                <button type="submit">Submit</button>
            </form>
            <hr>
            <h2>Data Karyawan Raki</h2>
            ${htmlTable}
        `);
    });
});
app.get('/hapus-data/:id', (req, res) => {
    // 1. Ambil ID (nomor baris) dari URL
    const idHapus = parseInt(req.params.id);

    // 2. Baca file CSV-nya
    fs.readFile('data.csv', 'utf8', (err, data) => {
        if (err) return res.status(500).send("Gagal baca file");

        // 3. Pecah teks jadi array baris
        const baris = data.replace(/\r/g, "").trim().split('\n');

        // 4. Logika Filter: Simpan semua KECUALI yang mau dihapus
        // Pakai index !== (idHapus + 1) karena baris ke-0 itu judul kolom
        const sisaBaris = baris.filter((_, index) => {
            return index !== (idHapus + 1);
        });

        // 5. Gabungkan lagi jadi teks CSV
        const dataBaru = sisaBaris.join('\n');

        // 6. Tulis balik ke file (Menimpa file lama)
        fs.writeFile('data.csv', dataBaru, (err) => {
            if (err) return res.status(500).send("Gagal hapus data");
            
            // 7. Balik lagi ke halaman tabel
            res.redirect('/baca-excel');
        });
    });
});
// 3. Route Simpan Data (POST) - HARUS DI LUAR BACA-EXCEL
app.post('/simpan-ke-csv', (req, res) => {
    const { nama, pekerjaan, gaji } = req.body;
    const dataBaru = `\n${nama},${pekerjaan},${gaji}`;

    fs.appendFile('data.csv', dataBaru, (err) => {
        if (err) return res.status(500).send("Gagal simpan data");
        
        res.send(`
            <script>
                alert('Data ${nama} Berhasil disimpan!');
                window.location.href = '/baca-excel';
            </script>
        `);
    });
});
app.post('/update-data/:id', (req, res) => {
    const idUpdate = parseInt(req.params.id);
    const { nama, pekerjaan, gaji } = req.body;

    fs.readFile('data.csv', 'utf8', (err, data) => {
        if (err) return res.status(500).send("Gagal baca file");

        let baris = data.replace(/\r/g, "").trim().split('\n');
        
        // Ganti baris lama dengan data baru dari form
        baris[idUpdate + 1] = `${nama},${pekerjaan},${gaji}`;

        const dataBaru = baris.join('\n');

        fs.writeFile('data.csv', dataBaru, (err) => {
            if (err) return res.status(500).send("Gagal update data");
            res.redirect('/baca-excel');
        });
    });
});
// 4. Halaman Edit
app.get('/edit-data/:id', (req, res) => {
    const idEdit = parseInt(req.params.id);

    fs.readFile('data.csv', 'utf8', (err, data) => {
        if (err) return res.status(500).send("Gagal Baca File");

        const baris = data.replace (/\r/g, "").trim().split('\n');
        // Ambil data spesifik berdasarkan index (+1 karena header)
        const dataTarget = baris[idEdit + 1].split(',');

        //Tampilin Form yang nilainya (value) adalah data lama
        res.send(`
            <h2>Edit Data Karyawan</h2>
            <form action="/update-data/${idEdit}" method="POST">
                <input type="text" name="nama" value="${dataTarget[0]}" required>
                <input type="text" name="pekerjaan" value="${dataTarget[1]}" required>
                <input type="number" name="gaji" value="${dataTarget[2]}" required>
                <button type="submit">Simpan Perubahan</button>
                <a href="/baca-excel">Batal</a>
            </form>
        `);
    });
});
// Jalur lainnya
app.get('/status', (req, res) => {
    res.json({ status: "Online", message: "Siap melayani request" });
});

app.listen(port, () => {
    console.log(`Server nyala di http://localhost:${port}`);
});