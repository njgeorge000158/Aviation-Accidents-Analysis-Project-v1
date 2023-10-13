//console.log(aviation_accidents)
// Use this link to get the GeoJSON data.
let link = "http://127.0.0.1:8000/allyear";


d3.json(link, function(data) {
  
  let myData = data
  //console.log(myData)
  // Create a map object.
 let year = []
 let accident_count = []
 for (let i = 0; i < myData.length; i++) {
   year.push(myData[i].year)
   accident_count.push(myData[i].count)
   let title = `Accident Count Chart by Year`
   let trace1 = {
    x: year,
    y: accident_count,
    type: 'bar'
  };
  
  let data = [trace1];
  
  let layout = {
    title: title
  };
  
  Plotly.newPlot("plot", data, layout);
 }
});




