const mongoose = require('mongoose')

var pegawaiSchema = new mongoose.Schema({
    id_pegawai: {
        type: String
    },
    nama: {
        type: String
    },
    agama: {
        type: String
    },
    jenis_kelamin: {
        type: String
    },
    status: {
        type: String
    },
    pendidikan: {
        type: String
    },
    jurusan: {
        type: String
    }
});
//membuat validasi

let Pegawais;
try {
    Pegawais = mongoose.model('Pegawais');
} catch (error) {
    Pegawais = mongoose.model('Pegawais', pegawaiSchema);
}

mongoose.set('bufferCommands', false);

