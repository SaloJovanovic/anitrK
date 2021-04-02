const mongoose = require("mongoose");

async function konektujBazu() {
    try {
        // string za konekciju
        const link = "mongodb+srv://anitrk:timanitrk123@hakaton-anitrk-cluster.lwhen.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

        // konektuj se

        const connection = await mongoose.connect(link, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        console.log("Baza je konektovana");
    } catch (err) {
        console.log(`Greska: ${err.message}`);
    }
}

module.exports = konektujBazu;