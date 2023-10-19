//console.log(aviation_accidents)
// Use this link to get the GeoJSON data.
//let link = "http://127.0.0.1:8000/allyear";
all_year_link = "http://127.0.0.1:8000/yearsearch?beg=1970&end=2030"
display_graph(all_year_link)

function display_graph(link)
{
  d3.json(link, function(data) {
  
    let myData = data
  
    
      let year = []
      let fatality_count = []
      for (let i = 0; i < myData.length; i++) {
          year.push(myData[i].year)
          fatality_count.push(myData[i].count)
      }
          
  
          let title = `Fatality Count Per Year`
          let trace1 = {
                x: year,
                y: fatality_count,
                type: 'bar'
          };
          
    
          let data1 = [trace1];
    
          let layout = {
              title: title
          };
    
      Plotly.newPlot("plot", data1, layout);
   
  

});
}


d3.selectAll("#selYear").on("change", getData);

function getData() {

  let dropdownMenu = d3.select("#selYear");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  
  if (dataset == '70s') {
    year_link = "http://127.0.0.1:8000/yearsearch?beg=1970&end=1980"
    display_graph(year_link)
  }

  else if (dataset == '80s') {
    year_link = "http://127.0.0.1:8000/yearsearch?beg=1980&end=1990"
    display_graph(year_link)
  }

  else if (dataset == '90s') {
    year_link = "http://127.0.0.1:8000/yearsearch?beg=1990&end=2000"
    display_graph(year_link)
  }

  else if (dataset == '2000') {
    year_link = "http://127.0.0.1:8000/yearsearch?beg=2000&end=2010"
    display_graph(year_link)
  }

  else if (dataset == '2010') {
    year_link = "http://127.0.0.1:8000/yearsearch?beg=2010&end=2020"
    display_graph(year_link)
  }

  else if (dataset == '2020')  {
    year_link = "http://127.0.0.1:8000/yearsearch?beg=2020&end=2030"
    display_graph(year_link)
  }

  else   {
    year_link = "http://127.0.0.1:8000/yearsearch?beg=1970&end=2030"
    display_graph(year_link)
  }

}