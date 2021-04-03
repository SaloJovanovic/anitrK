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