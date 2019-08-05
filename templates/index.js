var x = document.getElementById("demo");
var y = document.getElementById("list");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(GetAddress);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function GetAddress(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'latLng': latlng
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                var add = results[0].formatted_address;
                var value = add.split(",");

                count = value.length;
                country = value[count - 1];
                state = value[count - 2];
                city = value[count - 3];
                x.innerHTML = city;
            }
        }
    });

    var request = {
        location: latlng,
        radius: '2500',
        query: 'food'
    };


    service = new google.maps.places.PlacesService(document.getElementById("list"));

    service.textSearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            document.getElementById("listName").innerHTML = 'List of the restaurants near you';
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                var name = place.name + ";  Rating: " + place.rating;
                var par = document.createElement("p");
                var node = document.createTextNode(name);
                par.appendChild(node);

                var elem = document.getElementById("list");
                elem.appendChild(par);
            }

        }
    });
}