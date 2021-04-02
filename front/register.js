async function log(id){
    Cookies.set("log", "true");
    Cookies.set("log_id", id);
}

async function registruj()
{
    const imeInp = document.querySelector("#ime-input");
    const prezimeInp = document.querySelector("#prezime-input");
    const emailInp = document.querySelector("#email-input");
    const usernameInp = document.querySelector("#username-input");
    const sifraInp = document.querySelector("#sifra-input");
    const mestoInp = document.querySelector("#mapid");
    const datum_rodjenjaInp = document.querySelector("#datum-input");

    let ime = imeInp.value.trim();
    let prezime = prezimeInp.value.trim();
    let email = emailInp.value.trim();
    let username = usernameInp.value.trim();
    let sifra = sifraInp.value.trim();
    let mesto = mestoInp.value.s;
    let datum_rodjenja = datum_rodjenjaInp.value;

    let moze = true;

    if(ime.length < 2){
        const errorIme = document.querySelector("#error-ime");
        errorIme.classList.add("visible");
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
			datum_rodjenja: datum_rodjenja,
        }
        try {
            await axios.post("/api/profili", sviPodaci);
            let nadjiProfil = await axios.get(`/api/profili/username/${username}`);
            log(nadjiProfil.data.profil._id);
            console.log("Uspesno prijavljivanje");
            window.location.href = 'index.html';
        } catch (err) {
            console.log(err);
        }
    }
}