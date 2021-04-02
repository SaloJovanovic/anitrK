const { response, json } = require("express");
const express = require("express");
const app = express();
const konektujBazu = require("./baza/baza");
const Cas_Schema = require("./baza/Video");

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

app.post("api/video/upload", (req,res) =>{
    try{
        const cas = new Cas_Schema(req.body);
        cas.Save();
    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message,
        });
    }
});