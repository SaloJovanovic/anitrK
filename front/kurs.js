var ime_ustanova;
async function Mappa(){
var mymap = L.map('mapid').setView([44.787197, 20.457273], 9);
var s;
const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(id);
const kursp = await axios.get(`/kurs/${id}`);
console.log(kursp);
const ustanova= await axios.get(`/kurss/ustanove/${kursp.data.kurs.ustanova_id}`);
ime_ustanova = ustanova.data.ustanove.Ime_ustanove;
        L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=QEkQHmpDImGWW1v52pUp', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYW5kcmVqYmFuZSIsImEiOiJja24wN21sOHAwNTZ5MnFsOHJ5aHRzbHZjIn0.bIDcgj1AN5UzSRoy5R-tJg'
        }).addTo(mymap);
        console.log(ustanova);
        var mesto = ustanova.data.ustanove.LatLng;
        console.log(mesto);
        var res2 = mesto.split(", ");
            res2[0] = res2[0].replace("(", "");
            res2[1] = res2[1].replace(")", "");
            var lat3 = parseFloat(res2[0])
            var lng3 = parseFloat(res2[1])
        var marker = L.marker([lng3, lat3]).addTo(mymap)
    }
    Mappa();
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
    const cardsDiv = document.querySelector(".kurs-content");
    let cards = "";
    cards += CreateCard(kurs, usernameInstruktora);
    
    console.log("ALO BRE");
    console.log(cards);
    console.log(kurs);
    cardsDiv.innerHTML = cards;
}

function CreateCard(kurs, usernameInstruktora, ustanova) {
    const naziv = kurs.naziv;
    const opis = kurs.deskripcija;
    const ocena = kurs.ocena;
    const pretplaceni = kurs.broj_pretplacenih;
    const cena = kurs.cena;
    const procenat = kurs.procenat_human;
    const sakupljenNovac = kurs.skupljene_pare;
    const ustanovaOsoba = kurs.ustanova_id;
    const idKursa = kurs._id;
    const 
    card = `
    <div class="kurs-container">
        <h1>${naziv}</h1>
    </div>
    <div class="kurs-container">
        <h2>Opis kursa</h2>
        <h3>${opis}</h3>
    </div>
    <div class="kurs-container">
        <h2>Ocena</h2>
        <div class="kurs-container-2x">
            <img src="images/star.png">
            <h3>${ocena}</h3>
        </div>
    </div>
    <div class="kurs-container">
        <h2>Instruktor</h2>
        <a>${usernameInstruktora}</a>
    </div>
    <div class="kurs-container">
        <h2>Trenutno pretplaćeni</h2>
        <h3>${pretplaceni} osobe</h3>
    </div>
    <div class="kurs-container">
        <h2>Cena kursa</h2>
        <h3>${cena} dinara</h3>
        <h3>${procenat}% ide u humanitarne svrhe</h3>
    </div>
    <div class="kurs-container">
        <h2>Sakupljen novac</h2>
        <h3>${sakupljenNovac} dinara</h3>
    </div>
    <div class="kurs-container">
        <a href="prijavljen.html?id=${idKursa}" onclick="odvedime();" class="btn">PRETPLATI SE</a>
    </div>`
    
    Mappa();
    return card;
}

async function odvedime() {
    window.open(
        "https://www.paypal.com/rs/signin", "_blank");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const idCoveka = Cookies.get('log_id');
    console.log(id + "\n" + idCoveka);
    await axios.post(`/kurs/pretplata/${id}/${idCoveka}`);

}

// async function Popunjen_i_prijavljen(){
//     console.log("tu sam");
//     const urlParams = new URLSearchParams(window.location.search);
//     const id = urlParams.get("id");
//     const id_kor = Cookies.get("log_id");
//     console.log(id_kor);
//     let button_lock = false;

//     const profil_prijavljen = Cookies.get("log");

//     if(typeof(profil_prijavljen) == "undefined" || profil_prijavljen){
//         const popunjenosti = await axios.get(`/api/provera_popunjenosti_solo/${id}`);
//         const prijavljeni = await axios.get(`/api/provera_solo_dogadjaja/ucestvuje/${id_kor}/${id}`);

//         if(popunjenosti.data.popunjenost || prijavljeni.data.prijavljen){
//             button_lock = true;
//         }
//     }
//     else {
//         button_lock = true;
//     }

//     if(button_lock){
//         document.querySelector("#error-dogadjaj").classList.add('visible');
//         //Dodaj mesto za error
//         // document.querySelector("#prijavi_se_solo").classList.add("ALOOOOMAK");
//         document.getElementById("prijavi_se_solo").onclick = "";
//         // document.getElementById("prijavi_se_solo").classList.add('ALO MOMAK');
//     }
// }

// function RenderInfo(solo_dogadjaj) {
//     const soloDogadjajInfoDiv = document.querySelector(".solo-dogadjaj");

//     console.log(solo_dogadjaj.naziv);

//     let soloDogadjajDiv = `
//     <div class="forma">
//         <div class="item">
//             <h2>Naziv</h2>
//             <h3>${solo_dogadjaj.naziv}</h3>
//         </div>
//         <div class="item">
//             <h2>Sport/Igrica</h2>
//             <h3>${solo_dogadjaj.sport_igrica}</h3>
//         </div>
//         <div class="item">
//             <h2>Mesto</h2>
//             <h3>${solo_dogadjaj.mesto}</h3>
//         </div>
//         <div class="item">
//             <h2>Datum održavanja</h2>
//             <h3>${solo_dogadjaj.datum_dogadjaja.toString().slice(0, 10)}</h3>
//         </div>
//         <div class="item">
//             <h2>Deskripcija</h2>
//             <h3>${solo_dogadjaj.deskripcija_dogadjaja}</h3>
//         </div>
//     </div>
//     <a href="#prijavi_se_solo" onclick="dobijIdDogadjaja();dodavanje_ucesnika();" id="prijavi_se_solo" class="btn">PRIJAVI SE</a>
//     <p class="error-dog" id="error-dogadjaj">Događaj je popunjen ili ste već prijavljenji za isti.<p>
//     <div class="ucesnici-container">
//         <h2>UČESNICI</h2>
//     </div>`
//     soloDogadjajInfoDiv.innerHTML = soloDogadjajDiv;
//     Popunjen_i_prijavljen();
// }

// async function dobijIdDogadjaja() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const id = urlParams.get("id");
//     Cookies.set("dog_id", id);
// }