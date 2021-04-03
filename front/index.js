if (Cookies.get('log_id') != null) {
    document.querySelector('#register-btn').innerHTML = "IZLOGUJ SE";
    dobijIme();
}

async function dobijIme(){
    const idKorisnika = Cookies.get('log_id');

    const profil = await axios.get(`/api/profili/id/${idKorisnika}`);

    document.querySelector("#username-p").innerHTML = profil.data.profil.user_name;
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo-img');
    header.classList.toggle("sticky", window.scrollY > 0);
    if (header.classList.contains("sticky"))
        logo.src = 'images/logo-blank-gradient.png';
    else
        logo.src = 'images/logo-colorful.png';
});

function ulogujSe() {
    if (Cookies.get('log')) {
        Cookies.remove("log");
        Cookies.remove("log_id");
        window.location.href = 'index.html';
        document.querySelector("#username-p").innerHTML = "";
    }
    else {
        window.location = "login.html";
    }
}

function toggleNav() {
    const subNavContainer = document.querySelector(".sub-nav-container");
    const kursevi = document.querySelector("#kursevi");
    if (subNavContainer.classList.contains('visible')) {
        kursevi.innerHTML = "Kursevi ᐯ";
    }
    else {
        kursevi.innerHTML = "Kursevi ᐱ";
    }
    subNavContainer.classList.toggle('visible');
}