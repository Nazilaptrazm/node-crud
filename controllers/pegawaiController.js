const express = require('express');
const mongoose = require('mongoose');
const Pegawais = mongoose.model('Pegawais');
// membuat router
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pegawai/tambahEdit', {
        viewTitle: 'Input Data Pegawai',
    });
});

router.post('/', async (req, res) => {
    // console.log(req.body);  cek request
    // jika id = kososng maka jalankan fungsi edit
    if (req.body._id === '') {
        await inputData(req, res);
    } else {
        await edit(req, res);
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
        console.error(err);
    }
});

// router edit
router.get('/:id', async (req, res) => {
    try {
        const doc = await Pegawais.findById(req.params.id).exec();
        res.render('pegawai/tambahEdit', {
            viewTitle: 'Edit Data',
            newPegawai: doc,
        });
    } catch (err) {
        console.error(err);
    }
});

// route Delete
router.get('/delete/:id', async (req, res) => {
    try {
        await Pegawais.findByIdAndRemove(req.params.id).exec();
        res.redirect('/pegawai/data');
    } catch (err) {
        console.log('error:', err);
    }
});

// fungsi tambah Data
async function inputData(req, res) {
    const newPegawai = new Pegawais(req.body);
    try {
        await newPegawai.save();
        res.redirect('/pegawai/data');
    } catch (err) {
        if (err.name === 'ValidationError') {
            handleValidationError(err, req.body);
            res.render('pegawai/tambahEdit', {
                viewTitle: 'Tambah Data',
                newPegawai: req.body,
            });
        } else {
            console.error('gagal', err);
        }
    }
}

// function edit
async function edit(req, res) {
    try {
        const updatedDoc = await Pegawais.findByIdAndUpdate(req.body._id, req.body, { new: true }).exec();
        res.redirect('/pegawai/data');
    } catch (err) {
        if (err.name === 'ValidationError') {
            handleValidationError(err, req.body);
            res.render('pegawai/tambahEdit', {
                viewTitle: 'Edit Pegawai',
                newPegawai: req.body,
            });
        } else {
            console.error(err);
        }
    }
}

function handleValidationError(err, body) {
    for (const field in err.errors) {
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
