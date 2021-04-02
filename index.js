const { response, json } = require("express");
const express = require("express");
const app = express();
const konektujBazu = require("./baza/baza");
const kurss = require("./baza/Video");
const profili_sema = require("./baza/Profili");
const multer = require("multer");

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

//Ispis svih kruseva (sortirano po oceni)
app.get("/api/kursevi", async (req, res) => {
    try {
        const kursevi = await kurss.find().sort({ocena: -1});

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

//Pravljenje kursa

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/")
    },
    filename: (req, file, cb) =>{
        const ime_fajla = Date.now() + "-" + file.originalname;
        req.body.ime_fajla = ime_fajla;
        cb(null, ime_fajla)
            
    },
  })
  
  const uploadStorage = multer({ storage: storage })
  
  app.post("/upload/kurs", uploadStorage.single("file"), async (req, res) => {
    try {
        const naziv = req.body.naziv;
        const id_instruktora = req.body.id_instruktora;
        const deskripcija = req.body.deskripcija;
        const filePath = req.body.ime_fajla;
        const cena = req.body.cena;
        const broj_pretplacenih = 0;
        const ocena = 0;
        const broj_ocena = 0;
        const korisnici_ocenjeni = req.body.korisnici_ocenjeni;
        const skupljene_pare = 0;
        const procenat = req.body.procenat;
        const NoviKurs = new kurss({
            naziv: naziv,
            id_instruktora: id_instruktora,
            deskripcija: deskripcija,
            filePath: filePath,
            cena: cena,
            broj_pretplacenih: broj_pretplacenih,
            ocena: ocena,
            broj_ocena: broj_ocena,
            korisnici_ocenjeni: korisnici_ocenjeni,
            procenat_human: procenat,
            skupljene_pare: skupljene_pare
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
  })
//Pronalazenje kursa po idu
  app.get("/kurs/:id", async (req, res) => {
    try{    
        const id_kursa =  req.params.id;
        const kurs = kurss.findById(id_kursa);
        res.json({
            uspesno:true,
            kurs: kurs
        });
    }
    catch(err){
        res.status(404).json({
            uspesno: false,
            poruka: err.message,
        });
    }
});
    //Pretplata kursa
    app.post("/kurs/:id_kursa/:id_coveka", async (req, res) => {
        try{
            const id_kurs = req.params.id_kursa;
            const id_cok = req.params.id_coveka;

            const kurs = await kurss.findById(id_kurs);

            kurs.broj_pretplacenih++;
            kurs.skupljene_pare=kurs.skupljene_pare + (kurs.cena * kurs.procenat /100);

            const profili = await profili_sema.findById(id_cok);

            profili.id_casova.push(id_kurs);

            await kurs.save();

            await profili.save();

            res.json({
                uspesno:true,
                kurs: kurs,
                profili: profili
            });
        }
        catch(err){
            res.status(404).json({
                uspesno: false,
                poruka: err.message,
            });
        }

    });
    //Kurs ocenjivanje
    app.post("/kurs/ocena/:id_kursa/:id_coveka", async (req, res) => {
        try{
            const id_kurs = req.params.id_kursa;
            const id_cok = req.params.id_coveka;

            const kurs = await kurss.findById(id_kurs);

            let ocena = req.body.ocena;

            kurs.data.ocena = (kurs.data.ocena * kurs.data.broj_pretplacenih + ocena) / (kurs.data.broj_pretplacenih+1);
            
            kurs.korisnici_ocenjeni.push(id_cok);

            await kurs.save();

            res.json({
                uspesno:true,
                kurs: kurs
            });
        }
        catch(err){
            res.status(404).json({
                uspesno: false,
                poruka: err.message,
            });
        }

    });
    //kurs provera da li je ocenio
    app.get("/kurs/ocena_bool/:id_kursa/:id_coveka", async (req, res) =>{
       try{
        const id_kurs = req.params.id_kursa;
        const id_cok = req.params.id_coveka;

        const kurs = await kurss.findById(id_kurs);

        const profili = await profili_sema.findById(id_cok);

        var ocenio = false;

        for(let i=0;i<kurs.korisnici_ocenjeni.length;i++){
            if(profili._id == kurs.korisnici_ocenjeni[i]){
                ocenio = true;
            }
        }
        res.json({
            uspesno:true,
            ocenio: ocenio
        });
        }
        catch(err){
            res.status(404).json({
                uspesno: false,
                poruka: err.message,
            });
        }

    });
    //Kursevi u kojima je korisnik
    app.get("/kurs/prisutan/:id_coveka", async (req, res) =>{
        try{
        const id_cok = req.params.id_coveka;

        const profili = await profili_sema.findById(id_cok);

        let kurs = [];
        for(let i=0;i<profili.id_casova.length;i++){
            kurs.push(await kurss.findById(profili.id_casova[i]));
        }
        kurs = kurs.sort({ocena: -1});
        res.json({
            uspesno:true,
            kursevi: kurs
        });
        }
        catch(err){
            res.status(404).json({
                uspesno: false,
                poruka: err.message,
            });
        }
    });