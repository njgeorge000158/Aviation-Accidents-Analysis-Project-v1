console.log(aviation_accidents)
// Create a map object.
let myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Loop through the countries array, and create one marker for each country object.
for (let i = 0; i < aviation_accidents.length; i++) {

  // Conditionals for country gdp_pc
  let color = "";
  if (aviation_accidents[i].fat > 200) {
    color = "yellow";
  }
  else if (aviation_accidents[i].fat > 150) {
    color = "blue";
  }
  else if (aviation_accidents[i].fat > 120) {
    color = "green";
  }
  else {
    color = "violet";
  }

  // Add circles to the map.
  L.circle(([aviation_accidents[i].LAT,aviation_accidents[i].LNG]), {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust the radius.
    radius: Math.sqrt(aviation_accidents[i].fat) * 20000
  }).bindPopup(`<h1>${aviation_accidents[i].accident_date}</h1> <hr> <h3>Carrier Type: ${aviation_accidents[i].type}</h3><hr> <h3>Operator: ${aviation_accidents[i].operator}</h3>`).addTo(myMap);
}
