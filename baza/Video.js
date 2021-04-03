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
    naslovnaFilePath : {
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
    broj_ocena: {
        type: Number,
        default: 0
    },
    korisnici_ocenjeni:{
        type: Array,
    },
    procenat_human:{
        type: Number,
    },
    skupljene_pare: {
        type: Number
    },
    slikaPath:{
        type: String,
    },
    ustanova_id: {
        type: String,
        require : false,
    }
});


module.exports = mongoose.model('kurs_sema', kurs_sema);
