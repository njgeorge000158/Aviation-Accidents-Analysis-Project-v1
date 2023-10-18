//Updates using flask 
let link = "http://127.0.0.1:8000/all";
let myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

d3.json("http://127.0.0.1:8000/alluniquecountry" , function (data) {
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

initial_graph(link)

$(document).ready(function(){
  let newlink = ""
  // Get value on button click and show alert
  $("#YearBtn").click(function(){
      var str = $("#yearInput").val();
      //console.log("str" + len(str));
      if (str.length != 4) 
       {
        newlink = "http://127.0.0.1:8000/all" 
       }
      else
      {
        newlink = "http://127.0.0.1:8000/year?year=" + str;
      } 
      
      //console.log(newlink)
      display_graph(newlink)
      //alert(str);
  });
});

$(document).ready(function(){
  let newlink = ""
  // Get value on button click and show alert
  $("#operatorBtn").click(function(){
      var str = $("#operatorInput").val();
      //console.log("str" + len(str));
      if (str.length != 4) 
       {
        newlink = "http://127.0.0.1:8000/all" 
       }
      else
      {
        newlink = "http://127.0.0.1:8000/operatorsearch?operator=" + str;
      } 
      
      //console.log(newlink)
      display_graph(newlink)
      //alert(str);
  });
});

function countryChange (countryname)
{
  let countrylink = "http://127.0.0.1:8000/countrysearch?country=" + countryname ; 
  myMap.off();
  myMap.remove();  
  myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });

d3.json(countrylink).then(function(data) {
  
let myData = data

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
    .bindPopup(`<h1>${myData[i].accident_date}</h1> <hr> <h3>Carrier Type: ${myData[i].carrier_type}</h3><hr> <h3>Operator: ${myData[i].operator}</h3><h3>Number of Fatalities: ${myData[i].fat}</h3>`));
  }

}

// Add our marker cluster layer to the map.
myMap.addLayer(markers);}
);}
