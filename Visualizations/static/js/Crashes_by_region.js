

let myMap = L.map("map", {
  center: [39.95226, -75.1652],
  zoom: 11
});

//Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = "https://raw.githubusercontent.com/njgeorge000158/Aviation-Crash-Visualization-Project/main/Visualizations/static/data/data1.js"

// Get the data with d3.
d3.json(url).then(function(response) {

  // Create a new marker cluster group.
  let markers = L.markerClusterGroup();

  let aviation_accidents = response[0];

  for (let i = 0; i < aviation_accidents.length; i++) {

    let location = aviation_accidents[i].location;

    if (location) {

      let lat = aviation_accidents[i].LAT;
      let lng = aviation_accidents[i].LNG;
      let marker = L.marker([lat, lng]);
      
      markers.bindPopup(aviation_accidents[i].descriptor);

      markers.addLayer(marker);
    }
  }

  myMap.addLayer(markers);

});