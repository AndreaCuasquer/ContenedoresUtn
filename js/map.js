let map = new google.maps.Map(document.getElementById("map"), {
  zoom: 17,
  center: new google.maps.LatLng(0.3382783, -78.1267512),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
});

let markers = [];

function draw(locations) {
  removeMarkers();
  addMarkers(locations);
}

function removeMarkers() {
  for (i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function addMarkers(locations) {
  for (i = 0; i < locations.length; i++) {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      title: "marker" + i,
    });
    markers.push(marker);
    marker.setMap(map);
  }
}
