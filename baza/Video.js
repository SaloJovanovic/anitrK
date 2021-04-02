const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
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


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }