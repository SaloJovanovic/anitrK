

GetData();

async function GetData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(id);

    let kurs;
    let usernameInstruktoraPom;
    try {
        kurs = await axios.get(`/kurs/${id}`);
        console.log(kurs);
        usernameInstruktoraPom = await axios.get(`/api/profili/id/${kurs.data.kurs.id_instruktora}`)
        let usernameInstruktora = usernameInstruktoraPom.data.profil.user_name;
        RenderCards(kurs.data.kurs, usernameInstruktora);
    } catch (err) {
        console.log(err);
        //window.location.href = "index.html";
    }
    // const deleteBtn = document.querySelector(".delete-tim-button");
    // deleteBtn.addEventListener("click", () => DeleteData(id));
    // GetData2();
}

function RenderCards(kurs, usernameInstruktora) {
    const cardsDiv = document.querySelector(".forma-forma");
    let cards = "";
    cards += CreateCard(kurs, usernameInstruktora);

    console.log("ALO BRE");
    console.log(cards);
    console.log(kurs);
    cardsDiv.innerHTML = cards;
}

function CreateCard(kurs, usernameInstruktora) {
    const naziv = kurs.naziv;
    const opis = kurs.deskripcija;
    const ocena = kurs.ocena;
    const pretplaceni = kurs.broj_pretplacenih;
    const cena = kurs.cena;
    const procenat = kurs.procenat_human;
    const sakupljenNovac = kurs.skupljene_pare;
    const video = kurs.filePath;
    const ustanovaOsoba = kurs.ustanova_id;
    const idKursa = kurs._id;
    card = `<span class="login100-form-title">
    ${naziv}
</span>
<div class="wrap-input100">
    <video width="320" height="240" controls>
        <source src="uploads/${video}" type="video/mp4">
    </video>
</div>
<div class="wrap-input100">
    <h2>${opis}</h2>
</div>
<p>Ocena</p>
    <div class="rating">
        <span class="star star5"><input onclick="str5Clicked();" type="radio" name="rating" id="str5" class="str5 str" value="5"><label for="str5"></label></span>
        <span class="star star4"><input onclick="str4Clicked();" type="radio" name="rating" id="str4" class="str4 str" value="4"><label for="str4"></label></span>
        <span class="star star3"><input onclick="str3Clicked();" type="radio" name="rating" id="str3" class="str3 str" value="3"><label for="str3"></label></span>
        <span class="star star2"><input onclick="str2Clicked();" type="radio" name="rating" id="str2" class="str2 str" value="2"><label for="str2"></label></span>
        <span class="star star1"><input onclick="str1Clicked();" type="radio" name="rating" id="str1" class="str1 str" value="1"><label for="str1"></label></span>
    </div>
<div class="container-login100-form-btn">
    <a href="#" class="btn" onclick="oceniKurs();" class="btn">OCENI KURS</a>
</div>`
    
    return card;
}
var ocena = 0;

function str5Clicked() {
    ocena = 5;
    const stars = [...document.getElementsByClassName('star')];
    stars.forEach(element => {
        element.classList.remove('clicked');
    });
    stars.forEach(element => {
        element.classList.add('clicked');
    });
}

function str4Clicked() {
    ocena = 4;
    const stars = [...document.getElementsByClassName('star')];
    stars.forEach(element => {
        element.classList.remove('clicked');
    });
    stars.shift();
    stars.forEach(element => {
        element.classList.add('clicked');
    });
}

function str3Clicked() {
    ocena = 3;
    const stars = [...document.getElementsByClassName('star')];
    stars.forEach(element => {
        element.classList.remove('clicked');
    });
    stars.shift();
    stars.shift();
    stars.forEach(element => {
        element.classList.add('clicked');
    });
}

function str2Clicked() {
    ocena = 2;
    const stars = [...document.getElementsByClassName('star')];
    stars.forEach(element => {
        element.classList.remove('clicked');
    });
    stars.shift();
    stars.shift();
    stars.shift();
    stars.forEach(element => {
        element.classList.add('clicked');
    });
}

function str1Clicked() {
    ocena = 1;
    const stars = [...document.getElementsByClassName('star')];
    stars.forEach(element => {
        element.classList.remove('clicked');
    });
    stars.shift();
    stars.shift();
    stars.shift();
    stars.shift();
    stars.forEach(element => {
        element.classList.add('clicked');
    });
}

async function oceniKurs() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    let podaci = {
        ocena
    }
    const idCoveka = Cookies.get("log_id");
    await axios.post(`/kurs/ocena/${id}/${idCoveka}`, podaci);
    // /kurs/ocena/id_kursa/id_coveka
}