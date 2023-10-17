//console.log(aviation_accidents)
// Use this link to get the GeoJSON data.
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

function countryChange (countryname)
{
  let countrylink = "http://127.0.0.1:8000/countrysearch?country=" + countryname ; 
  myMap.off();
  myMap.remove();  
  myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
// Getting our GeoJSON data
d3.json(countrylink, function(data) {
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
    color = "#c1f0f0";
  }
  //else if (aviation_accidents[i].fat > 150) {
  else if (myData[i].fat > 150) {  
    color = "#e67300";
  }
  //else if (aviation_accidents[i].fat > 120) {
  else if (myData[i].fat > 120) {
    color = "#ff4d4d";
  }
  else {
    color = "black";
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
    color = "#800000";
  }
  //else if (aviation_accidents[i].fat > 150) {
  else if (myData[i].fat > 150) {  
    color = "#e67300";
  }
  //else if (aviation_accidents[i].fat > 120) {
  else if (myData[i].fat > 120) {
    color = "#c1f0f0";
  }
  else {
    color = "black";
  }

  // Add circles to the map.
  //L.circle(([aviation_accidents[i].LAT,aviation_accidents[i].LNG]), {
  L.circle(([myData[i].LAT,myData[i].LNG]), {
    fillOpacity: 0.75,
    color: "#000066",
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
    color = "#800000";
  }
  //else if (aviation_accidents[i].fat > 150) {
  else if (myData[i].fat > 150) {  
    color = "#e67300";
  }
  //else if (aviation_accidents[i].fat > 120) {
  else if (myData[i].fat > 120) {
    color = "#c1f0f0";
  }
  else {
    color = "black";
  }

  // Add circles to the map.
  //L.circle(([aviation_accidents[i].LAT,aviation_accidents[i].LNG]), {
  L.circle(([myData[i].LAT,myData[i].LNG]), {
    fillOpacity: 0.75,
    color: "#000066",
    fillColor: color,
    // Adjust the radius.
    //radius: Math.sqrt(aviation_accidents[i].fat) * 20000
    radius: Math.sqrt(myData[i].fat) * 20000
  //}).bindPopup(`<h1>${aviation_accidents[i].accident_date}</h1> <hr> <h3>Carrier Type: ${aviation_accidents[i].type}</h3><hr> <h3>Operator: ${aviation_accidents[i].operator}</h3>`).addTo(myMap);
  }).bindPopup(`<h1>${myData[i].accident_date}</h1> <hr> <h3>Carrier Type: ${myData[i].type}</h3><hr> <h3>Operator: ${myData[i].operator}</h3>`).addTo(myMap);
}
});

}


