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

});


