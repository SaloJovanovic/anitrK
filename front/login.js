async function log(id){
    Cookies.set("log", "true");
    Cookies.set("log_id", id);
}

async function uloguj()
{
    document.getElementById('error-mail').classList.remove('visible');
    document.getElementById('error-password').classList.remove('visible');
    const usernameInp = document.querySelector(".mail-input");
    const sifraInp = document.querySelector(".password-input");

    let username = usernameInp.value.trim();
    let sifra = sifraInp.value.trim();

    let moze = true;

    if(username.length == 0)
    {
        const usernameError = document.getElementById('error-mail');
        usernameError.innerHTML = "Niste uneli mail/korisnicko ime!";
        usernameError.classList.add('visible');
        console.log("Neispravno ime!");
        moze = false;
    }

    if(sifra.length == 0){
        const sifraError = document.getElementById('error-password');
        sifraError.innerHTML = "Niste uneli šifru!";
        sifraError.classList.add('visible');
        console.log("Sifra nije uneta!");
        moze = false;
    }

    if(moze)
    {
        let nadjiProfil = await axios.get(`/api/profili/username/${username}`);

        if(nadjiProfil.data.profil != null)
        {
            //Profil je pronadjen
            if(sifra == nadjiProfil.data.profil.sifra)
            {
                //Ispravna sifra
                //SPECIJALNO MESTO ZA TRIPKOVICA [REZERVISANO]
                //Ovde treba da ga zapravo "ulogujemo"
                let id_loggovanja = nadjiProfil.data.profil._id;
                log(id_loggovanja);
                console.log("Podaci ispravni, bicete ulogovani");
                window.location.href = 'index.html';
            }
            else
            {
                //Neispravna sifra
                const sifraError = document.getElementById('error-password');
                sifraError.innerHTML = "Uneli ste pogrešnu šifru!";
                sifraError.classList.add('visible');
                console.log("Uneli ste pogresnu sifru!");
            }
        }
        else
        {
            //Profil nije pronadjen
            const usernameError = document.getElementById('error-mail');
            usernameError.innerHTML = "Profil nije pronađen!";
            usernameError.classList.add('visible');
            console.log("Unet neispravan username!");
        }
    }
}