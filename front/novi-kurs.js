var mymap = L.map('mapid').setView([44.787197, 20.457273], 9);
var s;
let mesto;
let coordinates;

        L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=QEkQHmpDImGWW1v52pUp', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYW5kcmVqYmFuZSIsImEiOiJja24wN21sOHAwNTZ5MnFsOHJ5aHRzbHZjIn0.bIDcgj1AN5UzSRoy5R-tJg'
        }).addTo(mymap);

        var marker = L.marker([44.787197, 20.457273]).addTo(mymap).on('click', onClick);;
        var marker = L.marker([43.787197, 21.457273]).addTo(mymap).on('click', onClick);;
        var marker = L.marker([39.787197, 24.457273]).addTo(mymap).on('click', onClick);;

        var popup = L.popup();


function onClick(e) {
    console.log("Kliknuo si");
    coordinates = e.latlng.toString();
    console.log(coordinates);
    let mesto = coordinates.split("LatLng")[1];
    console.log(mesto);
}


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value + "%";

slider.oninput = function() {
    if (this.value < 30) {
        this.value = 30;
    }
  output.innerHTML = this.value + "%";
}

function uploadFile() {
    console.log("da")
    document.querySelector('#file').click();
}

function uploadFileImage() {
    document.querySelector('#fileImg').click();
}

async function napraviKurs(event) {
    let ustanova = {
        LatLng: mesto,
        Ime_ustanove: "Srpska Ustanova"
    }
    console.log("Ustanova je " + ustanova);
    await axios.post("/kurss/ustanove/dodati", ustanova);
    let ustanova_id = await axios.get(`/kurss/ustanove`, mesto);
    // console.log(ustanova_id);
    document.querySelector("#naziv-error").classList.remove('visible');
    document.querySelector("#opis-error").classList.remove('visible');
    document.querySelector("#cena-error").classList.remove('visible');
    event.preventDefault();
    const naziv = document.querySelector("[name=naziv]").value;
    const deskripcija = document.querySelector("[name=deskripcija]").value;
    const cena = document.querySelector("[name=cena]").value;
    const procenat = document.querySelector("[name=procenat]").value;
    const file = document.querySelector("#file").files[0];
    const fileSlika = document.querySelector("#fileImg").files[0];
    const id_instruktora = Cookies.get("log_id");

    let moze = true;

    if (naziv.length < 2) {
        document.querySelector("#naziv-error").classList.add('visible');
        moze = false;
    }

    if (deskripcija.length < 2) {
        document.querySelector("#opis-error").classList.add('visible');
        moze = false;
    }

    console.log(cena);
    if (parseInt(cena) <= 100) {
        document.querySelector("#cena-error").innerHTML = "Cena mora biti veća od 100 dinara!";
        document.querySelector("#cena-error").classList.add('visible');
        moze = false;
    }

    console.log(cena);
    if (cena == "") {
        document.querySelector("#cena-error").innerHTML = "Cena mora biti uneta!";
        document.querySelector("#cena-error").classList.add('visible');
        moze = false;
    }
    
    let formData = new FormData();
    formData.append("file", file);
    formData.append("slika", fileSlika);
    formData.append("naziv", naziv);
    formData.append("deskripcija", deskripcija);
    formData.append("cena", cena);
    formData.append("id_instruktora", id_instruktora);
    formData.append("procenat", procenat);
    formData.append("ustanova_id", ustanova_id._id);

    if (moze) {
        let sviPodaci = 
        {
            naziv,
            id_instruktora,
            deskripcija,
            cena,
            procenat: procenat
        }
        console.log(sviPodaci);
        try {
            await axios.post("/upload/kurs", formData, {Headers:{"Content-Type":"multipart/form-data"}});
            console.log("Uspesno prijavljivanje");
            // window.location.href = 'index.html';
        } catch (err) {
            console.log(err);
        }
    }
}

//post(upload/kurs)