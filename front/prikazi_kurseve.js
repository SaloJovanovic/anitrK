GetData();

async function GetData() {
    // const urlParams = new URLSearchParams(window.location.search);
    // const id = urlParams.get("id");
    // console.log(id);

    let kursevi;
    try {
        kursevi = await axios.get(`/api/kursevi/`);
        console.log(kursevi);
        RenderCards(kursevi.data.kursevi);
    } catch (err) {
        console.log(err);
        //window.location.href = "index.html";
    }
}

function RenderCards(kursevi){
    const CardDiv = document.querySelector(".article-container");
    let cards = "";
    kursevi.forEach(kurs => {
        cards += CreateCard(kurs);
    });
    CardDiv.innerHTML = cards;
}

function CreateCard(kurs){

    const naslov = kurs.naziv;
    const opis = kurs.deskripcija;
    

    let card = `<div class="article-container">
    <div class="imgBox">
        <img src="images/slika1.png">
    </div>
    <div class="naslov">
        <h3>${naslov}</h3>
    </div>
    <div class="opis">
        <p>${opis}</p>
    </div>
    <a href="#" class="btn">Saznaj Više</a>
    </div>`;

    return card;
}