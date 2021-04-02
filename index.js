const { response, json } = require("express");
const express = require("express");
const app = express();
const konektujBazu = require("./baza/baza");
const kurs_sema = require("./baza/Video");
const profili_sema = require("./baza/Profili");

const PORT = process.env.PORT || 3000;
const hostname = '0.0.0.0';

app.listen(PORT, hostname, ()=>{
    console.log(`Server slusa na portu ${PORT}`);
});

//Rad sa JSON
app.use(express.json());

//Konektovanje sa bazom
konektujBazu();

//Povezivanje sa frontom
app.use(express.static("front"));


//PROFILI

//Nalazenje po username-u
app.get("/api/profili/username/:username", async (req, res) => {
    try {
        const ime = req.params.username;

        const profil = await profili_sema.findOne({user_name: ime});

        res.json({
            uspesno: true,
            profil: profil
        });
    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message
        });
    }
});

//Nalazenje profila po id-u
app.get("/api/profili/id/:id", async (req, res) => {
    try {
        const profilID = req.params.id;

        const profil = await profili_sema.findById(profilID);

        res.json({
            uspesno: true,
            profil: profil,
        })
    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message,
        });
    }
});

//Dodavanje profila
app.post("/api/profili/dodaj", async (req, res) => {
    try {
        
        const ime = req.body.ime;
        const prezime = req.body.prezime;
        const mail = req.body.mail;
        const sifra = req.body.sifra;
        const user_name = req.body.user_name;
        const pol = req.body.pol;
        const mesto = req.body.mesto;
        const profilna_slika = req.body.profilna_slika;
        const datum_rodjenja = req.body.datum_rodjenja;
        const id_casova = req.body.id_casova;
        
        const noviProfil = new profili_sema({
            ime: ime,
			prezime: prezime,
			mail: mail,
			sifra: sifra,
			user_name: user_name,
			pol: pol,
			mesto: mesto,
			profilna_slika: profilna_slika,
			datum_rodjenja: datum_rodjenja,
            id_casova: id_casova
        });

        const sacuvani_profili = await noviProfil.save();
        res.json({
            uspesno: true,
            profil: sacuvani_profili,
        });
    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message,
        });
    }
})

//KURS

//Dodavanje kursa
app.post("/api/kursevi/dodaj", async (req, res) => {
    try {
        const naziv = req.body.naziv;
        const id_instruktora = req.body.id_instruktora;
        const deskripcija = req.body.deskripcija;
        const filePath = req.body.filePath;
        const cena = req.body.cena;
        const broj_pretplacenih = req.body.broj_pretplacenih;
        const ocena = req.body.ocena;

        const NoviKurs = new kurs_sema({
            naziv: naziv,
            id_instruktora: id_instruktoram,
            deskripcija: deskripcija,
            filePath: filePath,
            cena: cena,
            broj_pretplacenih: broj_pretplacenih,
            ocena: ocena
        });

        const noviKursSacuvan = await NoviKurs.save();

        res.json({
            uspesno: true,
            kurs: noviKursSacuvan
        });

    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message,
        });
    }
});

//Ispis svih kruseva
app.get("/api/kursevi", async (req, res) => {
    try {
        const kursevi = await kurs_sema.find();

        res.json({
            uspesno: true,
            kursevi: kursevi
        });
    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message
        });
    }
});