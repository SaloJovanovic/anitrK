async function log(id){
    Cookies.set("log", "true");
    Cookies.set("log_id", id);
}
var mymap = L.map('mapid').setView([44.787197, 20.457273], 9);
var s;

        L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=QEkQHmpDImGWW1v52pUp', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYW5kcmVqYmFuZSIsImEiOiJja24wN21sOHAwNTZ5MnFsOHJ5aHRzbHZjIn0.bIDcgj1AN5UzSRoy5R-tJg'
        }).addTo(mymap);


        function onMapClick(e) {
                s = e.latlng.toString();
                console.log(s);
        }
        mymap.on('click', onMapClick);

async function registruj()
{
    const imeInp = document.querySelector(".ime-input");
    const prezimeInp = document.querySelector(".prezime-input");
    const emailInp = document.querySelector(".mail-input");
    const usernameInp = document.querySelector(".username-input");
    const sifraInp = document.querySelector(".password-input");
    // const mestoInp = document.querySelector("#mapid");

    let ime = imeInp.value.trim();
    let prezime = prezimeInp.value.trim();
    let email = emailInp.value.trim();
    let username = usernameInp.value.trim();
    let sifra = sifraInp.value.trim();
    let mesto = s.split("LatLng")[1];
    console.log("Mesto je " + mesto);

    let moze = true;

    if(ime.length < 2){
        const errorIme = document.querySelector("#ime-error");
        errorIme.classList.add('visible')
        console.log("Ime error");
        moze = false;
    }

    if(prezime.length < 2){
        const errorPrezime = document.querySelector("#error-prezime");
        errorPrezime.classList.add("visible");
        console.log("Prezime error");
        moze = false;
    }

    let dobarMail = email.includes('@');

    if(!dobarMail){
        const errorEmail = document.querySelector("#error-email");
        errorEmail.classList.add("visible");
        console.log("Mail error");
        moze = false;
    }

    if(sifra.length < 5)
    {
        const errorSifra = document.querySelector("#error-sifra");
        errorSifra.classList.add("visible");
        console.log("Sifra error");
        moze = false;
    }

    if(username.length < 5)
    {
        const errorUsername = document.querySelector("#error-username");
        errorUsername.classList.add("visible");
        console.log("Username error");
        moze = false;
    }
    else
    {
        //Provera da li je user_name u upotrebi
        let nadjiProfil = await axios.get(`/api/profili/username/${username}`);
        if(nadjiProfil.data.profil != null)
        {
            const errorUsername = document.querySelector("#error-username");
            errorUsername.innerHTML = "Username je u upotrebi!";
            errorUsername.classList.add("visible");
            console.log("Username u upotrebi!");
            moze = false;
        }
    }

    if(mesto == null){
        const errorMesto = document.querySelector("#error-mesto");
        errorMesto.classList.add("visible");
        console.log("Mesto error");
        moze = false;
    }

    if(moze)
    {
        let sviPodaci = 
        {
            ime: ime,
			prezime: prezime,
			mail: email,
			sifra: sifra,
			user_name: username,
			mesto: mesto,
			profilna_slika: "default.png",
        }
        try {
            await axios.post("/api/profili/dodaj", sviPodaci);
            let nadjiProfil = await axios.get(`/api/profili/username/${username}`);
            log(nadjiProfil.data.profil._id);
            console.log("Uspesno prijavljivanje");
            window.location.href = 'index.html';
        } catch (err) {
            console.log(err);
        }
    }
}