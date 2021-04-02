var mymap = L.map('mapid').setView([51.5, -0.09], 13);
var s;

        L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=QEkQHmpDImGWW1v52pUp', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYW5kcmVqYmFuZSIsImEiOiJja24wN21sOHAwNTZ5MnFsOHJ5aHRzbHZjIn0.bIDcgj1AN5UzSRoy5R-tJg'
        }).addTo(mymap);

        var marker = L.marker([51.5, -0.09]).addTo(mymap);

        var popup = L.popup();

        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(mymap);
                console.log(e.latlng.toString());
                s = e.latlng;
        }
        mymap.on('click', onMapClick);