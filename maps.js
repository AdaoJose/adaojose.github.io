a = "";
navigator.geolocation.getCurrentPosition((location) =>{
    a = location.coords.latitude
    b = location.coords.longitude
    // alert(a+" "+b)
    
    var map = L.map('map').setView([a,b], 20);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    var marker = L.marker([a,b]).addTo(map);
    
    var popup = L.popup()
    .setLatLng([a,b])
    .setContent("Aguarde seu mototista.")
    .openOn(map);

    map.on('click', e=>{ 
        // alert("You clicked the map at " + e.latlng) 
        console.log(e);
        var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    });
});


