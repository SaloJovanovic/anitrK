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
    id_casova:{
        type: Array,
        trim: true,
        required: false,
    },
  });
  
  module.exports = mongoose.model("Profil", ProfilSema);