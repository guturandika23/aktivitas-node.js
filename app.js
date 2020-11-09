const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();
const port = 3600;

//setting engine view hbs
app.set('view engine', 'hbs');

//setting parser data dari mysql ke appjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'guntur',
    password: '0000',
    database: 'db_jnttracking'
});

koneksi.connect((err) => {
    if(err) throw err;
        console.log("Koneksi Database Berhasil Disambung");
});

app.get('/', (req, res) => {
    koneksi.query('SELECT*FROM pengiriman', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs', {
            judulHalaman: 'Tracking J&T',
            data: hasil
        });
    });
});

app.post('/tambahbarang', (req, res) => {
    var namabarang = req.body.inputbarang;
    var alamatasal = req.body.inputalamatasal;
    var alamattujuan = req.body.inputalamattujuan;
    var noresi = req.body.inputnoresi;
    koneksi.query('INSERT INTO pengiriman(nama_barang, alamat_asal, alamat_tujuan, no_resi) VALUES(?,?,?,?)',
    [namabarang, alamatasal, alamattujuan, noresi],
    (err,hasil) => {
        if(err) throw err;
        res.redirect('/');
    } 
    )
});

app.listen(port, () => {
    console.log(`App berjalan pada port ${port}`);
});