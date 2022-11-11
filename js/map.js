/*################################################################################################*/
/*####################################### GOOGLE MAP ###########################################*/
/*################################################################################################*/

let map =  new google.maps.Map(document.getElementById("map"), {
  zoom: 14,//17
  center: new google.maps.LatLng(0.3382783, -78.1267512),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
});
let infowindow = new google.maps.InfoWindow();

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

/*################################################################################################*/
/*####################################### FUNCION PARA DIBUJAR PUNTOS EN EL MAPA##################*/
/*################################################################################################*/

function addMarkers(locations) {
  for (i = 0; i < locations.length; i++) {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      label: {
        color: 'black',
        fontWeight: 'bold',
        text: locations[i][0],
      },
      title: locations[i][0],
    });
    markers.push(marker);
    marker.setMap(map);
  }
}
