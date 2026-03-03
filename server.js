const express = require('express');
const app = express();
const port = 3000;

//ini disebut route atau jalur 
app.get('/', (req, res) => {
    res.send('Halo Raki! Server Backend Kamu sudah berjalan');
});

app.get('/profile', (req, res) => {
    res.send('')
});

// jalur untuk cek status 
app.get ('/status', (req, res) => {
    req.json ({
        status: "Online",
        message: "Siap melayani request"
    });
app.get('/profilestatus', (req, res) => {
    req.json ({
        Nama: "Raki",
        Goal: "Remote Job",
        Target: "3 Bulan"
    });
})

});

app.listen(port, () => {
    console.log(`Server nyala di http://localhost:${port}`);
});

