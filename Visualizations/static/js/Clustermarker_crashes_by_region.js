//Updates using flask 
let link = "http://127.0.0.1:8000/countrysearch?country=";

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
    .bindPopup(`<h1>${myData[i].accident_date}</h1> <hr> <h3>Carrier Type: ${myData[i].carrier_type}</h3><hr> <h3>Operator: ${myData[i].operator}</h3>`));
  }

}

// Add our marker cluster layer to the map.
myMap.addLayer(markers);}
);



let countrylink = "http://127.0.0.1:8000/countrysearch?country=";

// Initialize function for dropdown menu
function init() {
    
  let dropdownMenu = d3.select("#selDataset");
  
  // Retrieve JSON data 

  d3.json(countrylink).then((data) => {
  
      
  //Itterate through "country" in data
      let countries= data.country;
  
      countries.forEach((name) =>{

          console.log(name)
          
          // Add value of the dropdown meanu option to a variable 
          dropdownMenu.append("option").text(name).property("value", name);
      }); 

      let initialCountry = countries[0];

      console.log(initialCountry);
  });
};

function optionChanged (selectedCountry) {

  let filterData = data.filter(item => item.country ==selectedCountry);

  markers.clearLayers();

  filterData.forEach(item => {
    markers.addLayer(
    L.Marker([item.LAT, item.LNG]).bindPopup(
      `<h1>${item.accident_date}</h1> <hr> <h3>Carrier Type: ${item.type}</h3><hr> <h3>Operator: ${item.operator}</h3>`
      )
      );
  });

  myMap.addLayer(markers);}


init();
