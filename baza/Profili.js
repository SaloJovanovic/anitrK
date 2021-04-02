const mongoose = require("mongoose");

const ProfilSema = new mongoose.Schema({
    ime: {
        type: String,
        trim: true,
        required: true,
    },
    prezime: {
        type: String,
        trim: true,
        required: true,
    },
    mail: {
        type: String,
        trim: true,
        required: true,
    },
    sifra: {
        type: String,
        trim: true,
        required: true,
    },
    user_name: {
        type: String,
        trim: true,
        required: true,
    },
    pol: {
        type: String,
        trim: true,
        required: false,
    },
    mesto: {
        type: String,
        trim: true,
        required: true,
    },
    profilna_slika: {
        type: String,
        trim: true,
        required: true,
    },
    datum_rodjenja: {
        type: Date,
        trim: true,
        required: false,
    },
    id_casova:{
        type: String,
        trim: true,
        required: false,
    },
  });
  
  module.exports = mongoose.model("Profil", ProfilSema);