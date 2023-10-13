//Updates using localhost flask api example from rajib.
let link = "http://localhost:8000/all";

d3.json(link).then(function(data) {
  let myData = data

  let myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });

//Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// // Create a new marker cluster group.
let markers = L.markerClusterGroup();

// let aviation_accidents = response[0];

for (let i = 0; i < myData.length; i++) {

  let location = myData[i].location;

  if (location) {

    markers.addLayer(L.marker([myData[i].LAT,myData[i].LNG])
    .bindPopup(`<h1>${myData[i].accident_date}</h1> <hr> <h3>Carrier Type: ${myData[i].type}</h3><hr> <h3>Operator: ${myData[i].operator}</h3>`));
  }

}

// Add our marker cluster layer to the map.
myMap.addLayer(markers);}
,);