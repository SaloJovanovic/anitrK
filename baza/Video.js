const mongoose = require('mongoose');

const kurs_sema = mongoose.Schema({
    naziv :{
        type: String,
    },
    id_instruktora :{
        type: String,
    },
    deskripcija :{
        type: String,
    },
    filePath : {
        type: String,
    },
    cena :{
        type: Number,
    },
    broj_pretplacenih :{
        type: Number,
    },
    ocena : {
        type: Number,
        default: 0 
    },
});


module.exports = mongoose.model('kurs_sema', kurs_sema);
