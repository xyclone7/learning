const express = require('express');
const fs = require('fs'); //tambahkan ini di paling atas file
const app = express();
app.use(express.json()); //Middlewave untuk baca format Json
const port = 3000;

//ini disebut route atau jalur 
app.get('/baca-excel', (req, res) => {
    //membaca data.csv
    fs.readFile('data.csv', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "gagal baca file"});
        }

        //kirim isinya ke browser
        res.send(`<pre>${data}</pre>`);
    });
});

app.get('/', (req, res) => {
    res.send('Halo Raki! Server Backend Kamu sudah berjalan');
});
// jalur untuk cek status 
app.get('/status', (req, res) => {
    res.json({
        status: "Online",
        message: "Siap melayani request"
    });
});
app.get('/profile', (req, res) => {
    res.json ({
        Nama: "Raki",
        Goal: "Remote Job",
        Target: "3 Bulan"
    });
});
//Route Input Data (Cikal bakal sistem kamu)
app.post('/input-data', (req, res) => {
    //Kita ambil data namaBarang dan stok dari kiriman (body)
    const { namaBarang, stok } = req.body;

    console.log(`Log: Raki menginput ${namaBarang} sebanyak ${stok}`);

    res.json({
        message: `Halo Raki, kamu baru saja menginput barang ${namaBarang} dengan jumlah ${stok}`
    });
});


app.listen(port, () => {
    console.log(`Server nyala di http://localhost:${port}`);
    console.log(`Gunakan command Promt untuk ngetes POST ke /inputdata`);
});

