const str = document.getElementsByClassName('str');

GetData();

async function GetData() {
    try {
        let kursevi = await axios.get("/api/kursevi/ocene");
        console.log(kursevi);
        RenderCards(kursevi.data.kursevi);
        //AddEventListeners();
    } catch (err) {
        console.log(err);
    }
}

function RenderCards(kursevi) {
    const cardsDiv = document.querySelector(".kursevi-content");
    let cards = "";
    kursevi.forEach((kurs) => {
        cards += CreateCard(kurs);
    });

    cardsDiv.innerHTML = cards;
}

function CreateCard(kurs) {
    const naziv = kurs.naziv;
    const ocena = kurs.ocena;
    const deskripcija = kurs.deskripcija;
    const korisnici_ocenjenji = kurs.korisnici_ocenjenji;
    const procenat_human = kurs.procenat_human;
    const slikaPath = kurs.slikaPath;
    const idKursa = kurs._id;
    console.log(slikaPath);
    console.log(`images/${slikaPath}`);
    let card = `<div class="article-container">
    <div class="imgBox">
        <img src="uploads/${slikaPath}">
    </div>
    <div class="naslov">
        <h3>${naziv}</h3>
    </div>
    <div class="opis">
        <p>${deskripcija}</p>
    </div>
    <a href="kurs.html?id=${idKursa}" class="btn">Saznaj Više</a>
    </div>`;
    
    return card;
}

// str.addEventListener('mousehover', function() {
//     if (!document.querySelector('#str5').classList.contains('checked')) {
//         // Check Radio-box
//         $(".rating input:radio").attr("checked", false);

//         $('.rating input').click(function () {
//             $(".rating span").removeClass('checked');
//             $(this).parent().addClass('checked');
//         });

//         $('input:radio').change(
//         function(){
//             var userRating = this.value;
//             alert(userRating);
//         });
//     }
// });

function str5Clicked() {
    const stars = [...document.getElementsByClassName('star')];
    stars.forEach(element => {
        element.classList.remove('clicked');
    });
    stars.forEach(element => {
        element.classList.add('clicked');
    });
}

function str4Clicked() {
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

const pretragaInp = document.querySelector('#pretraga-input');