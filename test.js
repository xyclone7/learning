const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Cek 123'));
app.listen(3001, () => console.log('Test jalan!'));