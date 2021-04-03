const mongoose = require('mongoose');

const ustanova_sema = mongoose.Schema({

    LatLng: {
        type: String,
    },
    Ime_ustanove: {
        type: String,
    },

});

module.exports = mongoose.model('ustanova_sema', ustanova_sema);