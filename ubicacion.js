let map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 14.634915, lng: -90.506882 },
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, {
            enableHighAccuracy: true,
            timeout: 20000, // tiempo de espera aumentado para mayor precisión
            maximumAge: 0 // asegurando que no se use una ubicación en caché
        });
    } else {
        displayMessage("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    // Actualizar los campos de texto con las coordenadas
    document.getElementById('latitude').value = pos.lat;
    document.getElementById('longitude').value = pos.lng;

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
    map.setZoom(15);

    new google.maps.Marker({
        position: pos,
        map: map
    });
}

function showError(error) {
    let errorMessage = '';

    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out.';
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = 'An unknown error occurred.';
            break;
    }

    displayMessage(errorMessage);
}

function setLocation() {
    const lat = parseFloat(document.getElementById('latitude').value);
    const lng = parseFloat(document.getElementById('longitude').value);

    if (!isNaN(lat) && !isNaN(lng)) {
        const pos = { lat: lat, lng: lng };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location set manually.');
        infoWindow.open(map);
        map.setCenter(pos);
        map.setZoom(15);

        new google.maps.Marker({
            position: pos,
            map: map
        });
    } else {
        displayMessage("Please enter valid coordinates.");
    }
}

function displayMessage(message) {
    document.getElementById('message').innerText = message;
}
