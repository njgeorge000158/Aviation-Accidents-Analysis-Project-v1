//console.log(aviation_accidents)
// Use this link to get the GeoJSON data.
let link = "http://127.0.0.1:8000/allyear";

d3.json(link, function(data) {
  
  let myData = data
  //console.log(myData)
  // Create a map object.
  function init()
 {
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
}
d3.selectAll("#selYear").on("change", getData);

function getData() {

  let dropdownMenu = d3.select("#selYear");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  let year = []
  let accident_count = []

  if (dataset == '70s') {
    for (let i = 0; i < myData.length; i++) {
      if (Number(myData[i].year) > 1970 && Number(myData[i].year) < 1980 )
      {
       year.push(myData[i].year)
       accident_count.push(myData[i].count)
      }
    }
    let title = `Accident Count Chart by Year`
      let trace1 = {
       x: year,
       y: accident_count,
       type: 'bar'
     };
     let data = [trace1]; 
     title = `Accident Count Chart by Year`
      let layout = {
    title: title
  };

  Plotly.newPlot("plot", data, layout);
  }

  else if (dataset == '80s') {
    for (let i = 0; i < myData.length; i++) {
      if (Number(myData[i].year) >= 1980 && Number(myData[i].year) < 1990 )
      {
       year.push(myData[i].year)
       accident_count.push(myData[i].count)
      }
    }
    let title = `Accident Count Chart by Year`
      let trace1 = {
       x: year,
       y: accident_count,
       type: 'bar'
     };
     let data = [trace1]; 
     title = `Accident Count Chart by Year`
      let layout = {
    title: title
  };

  Plotly.newPlot("plot", data, layout);
  }

  else if (dataset == '90s') {
    for (let i = 0; i < myData.length; i++) {
      if (Number(myData[i].year) >= 1990 && Number(myData[i].year) < 2000 )
      {
       year.push(myData[i].year)
       accident_count.push(myData[i].count)
      }
    }
    let title = `Accident Count Chart by Year`
      let trace1 = {
       x: year,
       y: accident_count,
       type: 'bar'
     };
     let data = [trace1]; 
     title = `Accident Count Chart by Year`
      let layout = {
    title: title
  };

  Plotly.newPlot("plot", data, layout);
  }

  else if (dataset == '2000') {
    for (let i = 0; i < myData.length; i++) {
      if (Number(myData[i].year) >= 2000 && Number(myData[i].year) < 2010 )
      {
       year.push(myData[i].year)
       accident_count.push(myData[i].count)
      }
    }
    let title = `Accident Count Chart by Year`
      let trace1 = {
       x: year,
       y: accident_count,
       type: 'bar'
     };
     let data = [trace1]; 
     title = `Accident Count Chart by Year`
      let layout = {
    title: title
  };

  Plotly.newPlot("plot", data, layout);
  }

  else if (dataset == '2010') {
    for (let i = 0; i < myData.length; i++) {
      if (Number(myData[i].year) >= 2010 && Number(myData[i].year )< 2020 )
      {
       year.push(myData[i].year)
       accident_count.push(myData[i].count)
      }
    }
    let title = `Accident Count Chart by Year`
      let trace1 = {
       x: year,
       y: accident_count,
       type: 'bar'
     };
     let data = [trace1]; 
     title = `Accident Count Chart by Year`
      let layout = {
    title: title
  };

  Plotly.newPlot("plot", data, layout);
  }

  else if (dataset == '2020')  {
    for (let i = 0; i < myData.length; i++) {
      if (Number(myData[i].year) >= 2020  )
      {
       year.push(myData[i].year)
       accident_count.push(myData[i].count)
      }
    }
    let title = `Accident Count Chart by Year`
      let trace1 = {
       x: year,
       y: accident_count,
       type: 'bar'
     };
     let data = [trace1]; 
     title = `Accident Count Chart by Year`
      let layout = {
    title: title
  };

  Plotly.newPlot("plot", data, layout);
  }

  else   {
    for (let i = 0; i < myData.length; i++) {
      if (Number(myData[i].year) >= 1950 && Number(myData[i].year) <= 2030  )
      {
       year.push(myData[i].year)
       accident_count.push(myData[i].count)
      }
    }
    let title = `Accident Count Chart by Year`
      let trace1 = {
       x: year,
       y: accident_count,
       type: 'bar'
     };
     let data = [trace1]; 
     title = `Accident Count Chart by Year`
      let layout = {
    title: title
  };

  Plotly.newPlot("plot", data, layout);
  }

// Call function to update the chart

//updatePlotly(data);

}

init();
});




