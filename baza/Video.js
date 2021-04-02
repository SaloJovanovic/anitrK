const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    Id_instruktora :{
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
    catogory: String,
    views : {
        type: Number,
        default: 0 
    },
    duration :{
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true })


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }