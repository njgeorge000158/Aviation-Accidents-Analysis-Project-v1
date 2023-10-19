//Updates using flask 
let link = "http://127.0.0.1:8000/countrysearch?country=";
let markers ; 
let myMap;

d3.json("http://127.0.0.1:8000/alluniquecountry").then(function(data) {
      console.log(data);
        // Create array to hold all names (all ID names)
        var countries = data.map(x=>x.country)
        // Append an option in the dropdown
        countries.forEach(function(country) {
            d3.select('#selCountry')
                .append('option')
                .text(country)
            });
          });     

d3.json("http://127.0.0.1:8000/all").then(function(data) {
  let myData = data

  myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });

//Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// // Create a new marker cluster group.
markers = L.markerClusterGroup();

// let aviation_accidents = response[0];

for (let i = 0; i < myData.length; i++) {

  //let location = myData[i].location;

  

    markers.addLayer(L.marker([myData[i].LAT,myData[i].LNG])
    .bindPopup(`<h1>${myData[i].accident_date}</h1> <hr> <h3>Carrier Type: ${myData[i].type}</h3><hr> <h3>Operator: ${myData[i].operator}</h3>`));


}

// Add our marker cluster layer to the map.
myMap.addLayer(markers);}
);



let countrylink = "http://127.0.0.1:8000/countrysearch?country=";

// Initialize function for dropdown menu
function init() {
    
  //let dropdownMenu = d3.select("#selDataset");
  
  // Retrieve JSON data 

     
};

function countryChanged(selectedCountry)
{
  countrylink = "http://127.0.0.1:8000/countrysearch?country=" + selectedCountry;

  d3.json(countrylink).then(function(data) {
  let myData = data

  myMap.off();
  myMap.remove();  

  myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });

//Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// // Create a new marker cluster group.
markers = L.markerClusterGroup();

// let aviation_accidents = response[0];

for (let i = 0; i < myData.length; i++) {

  //let location = myData[i].location;

  

    markers.addLayer(L.marker([myData[i].LAT,myData[i].LNG])
    .bindPopup(`<h1>${myData[i].accident_date}</h1> <hr> <h3>Carrier Type: ${myData[i].carrier_type}</h3><hr> <h3>Operator: ${myData[i].operator}</h3>`));


}

// Add our marker cluster layer to the map.
myMap.addLayer(markers);}
);
}

function optionChanged (selectedCountry) {
  countrylink = "http://127.0.0.1:8000/countrysearch?country=" + selectedCountry; 
  d3.json(countrylink).then(function(data) {
  let filterData = data
  filterData.forEach(item => {
     console.log(item.LAT)
  })
  markers.clearLayers();
  console.log(countrylink)  
  filterData.forEach(item => {
    markers.addLayer(
    L.Marker([item.LAT, item.LNG]).bindPopup(
      `<h1>${item.accident_date}</h1> <hr> <h3>Carrier Type: ${item.carrier_type}</h3><hr> <h3>Operator: ${item.operator}</h3>`
      )
      
      );
      console.log("This is end")
  });

  myMap.addLayer(markers);
  })

 }


init();
