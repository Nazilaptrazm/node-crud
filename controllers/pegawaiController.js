const express = require('express');
const mongoose = require('mongoose');
const Pegawais = mongoose.model('Pegawais');

// membuat router
var router = express.Router();

router.get('/', (req, res) => {
    res.render('pegawai/tambahEdit', {
        viewTitle: 'Input Data Pegawai',
    });
});

router.post('/', (req, res) => {
    // console.log(req.body);  cek request
    // jika id = kososng maka jalankan fungsi edit
    if (req.body._id === '') {
        inputData(req, res);
    } else {
        edit(req, res);
    }
});

// tampil data
router.get('/data', async (req, res) => {
    try {
        const docs = await Pegawais.find().exec();
        res.render('pegawai/data', {
            list: docs,
            viewTitle: 'Data Pegawai',
        });
    } catch (err) {
        console.log(err);
    }
});

// router edit
router.get('/:id', (req, res) => {
    Pegawais.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('pegawai/tambahEdit', {
                viewTitle: 'Edit Data',
                newPegawai: doc,
            });
        }
    });
});

// route Delete
router.get('/delete/:id', (req, res) => {
    Pegawais.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/pegawai/data');
        } else {
            console.log('error:', err);
        }
    });
});

// fungsi tambah Data
function inputData(req, res) {
    var newPegawai = new Pegawais();
    newPegawai.id_pegawai = req.body.id_pegawai;
    newPegawai.nama = req.body.nama;
    newPegawai.agama = req.body.agama;
    newPegawai.jenis_kelamin = req.body.jenis_kelamin;
    newPegawai.status = req.body.status;
    newPegawai.pendidikan = req.body.pendidikan;
    newPegawai.jurusan = req.body.jurusan;
    newPegawai.save((err, doc) => {
        if (!err) {
            res.redirect('/pegawai/data');
        } else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render('pegawai/tambahEdit', {
                    viewTitle: 'Tambah Data',
                    newPegawai: req.body,
                });
            } else {
                console.log('gagal', err);
            }
        }
    });
}

// function edit
function edit(req, res) {
    Pegawais.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/pegawai/data');
        } else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render('pegawai/tambahEdit', {
                    viewTitle: 'Edit Pegawai',
                    newPegawai: req.body,
                });
            }
        }
    });
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'nama':
                body['errorNama'] = err.errors[field].message;
                break;
            case 'id_pegawai':
                body['errorId_pegawai'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;
