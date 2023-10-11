let myMap = L.map("map", {
  center: [39.95226, -75.1652],
  zoom: 11
});

//Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = "https://raw.githubusercontent.com/njgeorge000158/Aviation-Crash-Visualization-Project/main/Resources/Aviation_Accident.json";


// d3.json(url).then(function(response) {

//     console.log(response);
//     features = response.features;

//   }).addTo(myMap);

// ;