var mymap = L.map('mapid').setView([0, 0], 1);

        L.tileLayer('https://api.maptiler.com/maps/streets/%7Bz%7D/%7Bx%7D/%7By%7D.png?key=QEkQHmpDImGWW1v52pUp', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/%22%3EMapbox</a>',
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
        }
        mymap.on('click', onMapClick);