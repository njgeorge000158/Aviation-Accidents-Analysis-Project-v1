//console.log(aviation_accidents)
// Use this link to get the GeoJSON data.
let link = "http://127.0.0.1:8000/all";
let myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

initial_graph(link)

$(document).ready(function(){
  // Get value on button click and show alert
  $("#countryBtn").click(function(){
      var str = $("#countryInput").val();
      let newlink = "http://127.0.0.1:8000/countrysearch?country=" + str;
      console.log(newlink)
      display_graph(newlink)
      //alert(str);
  });
});


function display_graph(link)
{
  myMap.off();
  myMap.remove();  
  myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
// Getting our GeoJSON data
d3.json(link, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  let myData = data
  //console.log(myData)
  // Create a map object.
  
  //let myMap = L.map("map", {
  //center: [15.5994, -28.6731],
 // zoom: 3
//});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Loop through the countries array, and create one marker for each country object.
//for (let i = 0; i < aviation_accidents.length; i++) {
for (let i = 0; i < myData.length; i++) {
  // Conditionals for country gdp_pc
  let color = "";
  //if (aviation_accidents[i].fat > 200) {
  if (myData[i].fat > 200) {
    color = "yellow";
  }
  //else if (aviation_accidents[i].fat > 150) {
  else if (myData[i].fat > 150) {  
    color = "blue";
  }
  //else if (aviation_accidents[i].fat > 120) {
  else if (myData[i].fat > 120) {
    color = "green";
  }
  else {
    color = "violet";
  }

  // Add circles to the map.
  //L.circle(([aviation_accidents[i].LAT,aviation_accidents[i].LNG]), {
  L.circle(([myData[i].LAT,myData[i].LNG]), {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust the radius.
    //radius: Math.sqrt(aviation_accidents[i].fat) * 20000
    radius: Math.sqrt(myData[i].fat) * 20000
  //}).bindPopup(`<h1>${aviation_accidents[i].accident_date}</h1> <hr> <h3>Carrier Type: ${aviation_accidents[i].type}</h3><hr> <h3>Operator: ${aviation_accidents[i].operator}</h3>`).addTo(myMap);
  }).bindPopup(`<h1>${myData[i].accident_date}</h1> <hr> <h3>Carrier Type: ${myData[i].carrier_type}</h3><hr> <h3>Operator: ${myData[i].operator}</h3>`).addTo(myMap);
}
});

}

function initial_graph(link)
{
// Getting our GeoJSON data
d3.json(link, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  let myData = data
  //console.log(myData)
  // Create a map object.
  
  //let myMap = L.map("map", {
 // center: [15.5994, -28.6731],
 // zoom: 3
//});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Loop through the countries array, and create one marker for each country object.
//for (let i = 0; i < aviation_accidents.length; i++) {
for (let i = 0; i < myData.length; i++) {
  // Conditionals for country gdp_pc
  let color = "";
  //if (aviation_accidents[i].fat > 200) {
  if (myData[i].fat > 200) {
    color = "yellow";
  }
  //else if (aviation_accidents[i].fat > 150) {
  else if (myData[i].fat > 150) {  
    color = "blue";
  }
  //else if (aviation_accidents[i].fat > 120) {
  else if (myData[i].fat > 120) {
    color = "green";
  }
  else {
    color = "violet";
  }

  // Add circles to the map.
  //L.circle(([aviation_accidents[i].LAT,aviation_accidents[i].LNG]), {
  L.circle(([myData[i].LAT,myData[i].LNG]), {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust the radius.
    //radius: Math.sqrt(aviation_accidents[i].fat) * 20000
    radius: Math.sqrt(myData[i].fat) * 20000
  //}).bindPopup(`<h1>${aviation_accidents[i].accident_date}</h1> <hr> <h3>Carrier Type: ${aviation_accidents[i].type}</h3><hr> <h3>Operator: ${aviation_accidents[i].operator}</h3>`).addTo(myMap);
  }).bindPopup(`<h1>${myData[i].accident_date}</h1> <hr> <h3>Carrier Type: ${myData[i].type}</h3><hr> <h3>Operator: ${myData[i].operator}</h3>`).addTo(myMap);
}
});

}


