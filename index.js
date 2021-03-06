const { response, json } = require("express");
const express = require("express");
const app = express();
const konektujBazu = require("./baza/baza");
const kurss = require("./baza/Video");
const profili_sema = require("./baza/Profili");
const multer = require("multer");
const ustanova_sema = require("./baza/ustanova");

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
app.get("/api/kursevi/ocene", async (req, res) => {
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

//Ispis svih kruseva (sortirano po broju pretplacenih)
app.get("/api/kursevi/pretplaceni", async (req, res) => {
    try {
        const kursevi = await kurss.find().sort({broj_pretplacenih: -1});

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
      cb(null, "front/uploads/")
    },
    filename: (req, file, cb) =>{
        if(file.fieldname === "file"){
            const ime_fajla = Date.now() + "-" + file.originalname;
            cb(null, ime_fajla)
            console.log(ime_fajla)
            req.body.ime_fajla = ime_fajla;
        }
        else{
            const ime_fajla = Date.now() + "-" + file.originalname;
            cb(null, ime_fajla)
            console.log(ime_fajla)
            req.body.ime_slike = ime_fajla;     
        }
    },
  })
  
  const uploadStorage = multer({ storage: storage })

  var cpUpload = uploadStorage.fields([{ name: 'file', maxCount: 1 }, { name: 'slika', maxCount: 1 }])

  app.post("/upload/kurs",cpUpload,   async (req, res) => {
    try {
        const naziv = req.body.naziv;
        const id_instruktora = req.body.id_instruktora;
        const deskripcija = req.body.deskripcija;
        const cena = req.body.cena;
        const broj_pretplacenih = 0;
        const ocena = 0;
        const broj_ocena = 0;
        const korisnici_ocenjeni = [];
        const filePath = req.body.ime_fajla;
        const skupljene_pare = 0;
        const procenat = req.body.procenat;
        const slikaPath = req.body.ime_slike;
        const ustanova_id = req.body.ustanova_id;
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
            skupljene_pare: skupljene_pare,
            slikaPath: slikaPath,
            ustanova_id: ustanova_id
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
        const kurs = await kurss.findById(id_kursa);
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
    app.post("/kurs/pretplata/:id_kursa/:id_coveka", async (req, res) => {
        try{
            const id_kurs = req.params.id_kursa;
            const id_cok = req.params.id_coveka;

            const kurs = await kurss.findById(id_kurs);

            kurs.broj_pretplacenih++;
            let cena = kurs.cena;
            let procenat = kurs.procenat_human;

            const josPara = kurs.skupljene_pare + (cena * (procenat / 100));
            kurs.skupljene_pare = josPara;

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
            const novaOcena = ((kurs.ocena * kurs.broj_ocena) + ocena) / (kurs.broj_ocena + 1);
            kurs.ocena = novaOcena;
            kurs.broj_ocena++;
            
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

    app.post("/kurss/ustanove/dodati", async (req, res) =>{
        console.log("wot");
        try{
            console.log("zasto");
            const latlng = req.body.latlng;
            const ime_ustanove= req.body.ime_ustanove;
            console.log(latlng);
            console.log(ime_ustanove);
            const usta = new ustanova_sema({
                LatLng: latlng,
                Ime_ustanove: ime_ustanove
            });
            const sacuvan_ustanova = await usta.save();
            res.json({
            uspesno:true,
            ustanove: sacuvan_ustanova
        });
        }
            catch(err){
            res.status(404).json({
                uspesno: false,
                poruka: err.message,
            });
        }

    });

    app.get("/kurss/ustanove", async (req, res) =>{
        try{
            const usta = await ustanova_sema.find();
        
            res.json({
            uspesno:true,
            ustanove: usta
        });
        }
            catch(err){
            res.status(404).json({
                uspesno: false,
                poruka: err.message,
            });
        }

    });

    app.get("/kurss/ustanove/:id", async (req, res) =>{
        try{
            const id = req.params.id;
            const usta = await ustanova_sema.findById(id);
        
            res.json({
            uspesno:true,
            ustanove: usta
        });
        }
            catch(err){
            res.status(404).json({
                uspesno: false,
                poruka: err.message,
            });
        }

    });

    //trazernje preko latlng-a
    app.get("/kurss/ustanove/trazenje/latlng", async (req, res) =>{
        try{
            const latlng = req.body.latlng;
            const usta = await ustanova_sema.find();
            var ustanovaa = 5;
            for (let i = 0; i < usta.length; i++) {
                if (usta[i].LatLng == latlng) {
                    ustanovaa = usta[i]._id;
                    break;
                }
            }
        
            res.json({
            uspesno:true,
            ustanove: ustanovaa
        });
        }
            catch(err){
            res.status(404).json({
                uspesno: false,
                poruka: err.message,
            });
        }

    });
