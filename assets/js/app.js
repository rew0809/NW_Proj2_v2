d3.csv("assets/data/covidCasesAndSettles.csv", function(error, covidData) {
	if (error) throw error;
	// Print the tvData
  
	// Cast the hours value to a number for each piece of tvData
	covidData.forEach(function(data) {
	  data.DailyCases = +data.DailyCases;
	  data.vix = +data.vix;
	  data.sp = +data.sp;
	  data.xal = +data.xal;
  
	  // console.log(data.DailyCases)
	});

	let dates = covidData.map(d =>d.Date);
	let dailyCases = covidData.map(d =>d.DailyCases);
	let vix = covidData.map(d =>d.vix);
	let sp = covidData.map(d =>d.sp);
	let xal = covidData.map(d =>d.xal);
	
	//console.log(dates);
	var color = Chart.helpers.color;
	var lineChartData = {
		labels: dates,
		datasets: [{
			label: 'Daily COVID Cases',
			backgroundColor: color(window.chartColors.red).alpha(0.4).rgbString(),
			borderColor: window.chartColors.red,
			borderWidth: 2,
			fill: true,
			data: dailyCases,
			yAxisID: 'y-axis-1',
			pointRadius: 0,
			pointHoverRadius: 10
		}, {
			label: 'SP 500',
			borderColor: window.chartColors.blue,
			backgroundColor: window.chartColors.blue,
			fill: false,
			borderDash: [5, 5],
			data: sp,
			yAxisID: 'y-axis-2',
			pointRadius: 0,
			pointHoverRadius: 10
		}, {
			label: 'VIX (Fear Index)',
			borderColor: window.chartColors.purple,
			backgroundColor: window.chartColors.purple,
			fill: false,
			data: vix,
			yAxisID: 'y-axis-3',
			pointRadius: 3,
			pointHoverRadius: 10
		}, {
			label: 'XAL Airline Index',
			borderColor: window.chartColors.green,
			backgroundColor: window.chartColors.green,
			fill: false,
			data: xal,
			yAxisID: 'y-axis-4',
			pointRadius: 0,
			pointHoverRadius: 10
		}]
		
	};


	window.onload = function() {
		var ctx = document.getElementById('canvas').getContext('2d');
		window.myLine = Chart.Line(ctx, {
			data: lineChartData,
			options: {
				responsive: true,
				// hoverMode: 'index',
				// stacked: false,
				title: {
					display: true,
					text: 'Market Complacency During COVID',
					fontColor: "#ffffff",
					fontSize: 30, 
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						
						ticks: {
							callback: function(dataLabel, index) {
								// Hide the label of every 2nd dataset. return null to hide the grid line too
								return index % 2 === 0 ? dataLabel : '';
							},
							fontColor: "#ffffff"
						}
					}],
					yAxes: [{
						type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: true,
						position: 'left',
						id: 'y-axis-1',
						scaleLabel: {
							display: true,
							labelString: 'New Daily COVID Cases',
							fontColor: window.chartColors.red,
						},
						ticks: {
							fontColor: window.chartColors.red
						},
						gridLines: {
							drawOnChartArea: false, // only want the grid lines for one axis to show up
							color: window.chartColors.red
						},
					}, {
						type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: true,
						position: 'right',
						id: 'y-axis-2',
						scaleLabel: {
							display: true,
							labelString: 'S&P 500 Close',
							fontColor: window.chartColors.blue
						},
						ticks: {
							fontColor: window.chartColors.blue
						},
						gridLines: {
							drawOnChartArea: false, // only want the grid lines for one axis to show up
							color: window.chartColors.blue
						},
					}, {
						type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: true,
						position: 'right',
						id: 'y-axis-3',
						scaleLabel: {
							display: true,
							labelString: 'VIX Close',
							fontColor: window.chartColors.purple
						},
						ticks: {
							fontColor: window.chartColors.purple
						},
						gridLines: {
							drawOnChartArea: false, // only want the grid lines for one axis to show up
							color: window.chartColors.purple
						},
					}, {
						type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: true,
						position: 'right',
						id: 'y-axis-4',
						scaleLabel: {
							display: true,
							labelString: 'XAL CLose',
							fontColor: window.chartColors.green
						},
						ticks: {
							fontColor: window.chartColors.green
						},
						// grid line settings
						gridLines: {
							drawOnChartArea: false, // only want the grid lines for one axis to show up
							color: window.chartColors.green
						},
					}],
				}
			}
		});
	};

});

// Save data as variables
// Y1 axis
var tsa19 = ["null", "null", 2344518, 2337486, 2403202,2553997, 2564902, 2412129, 2217709, 2375796];
// Y2 axis
var tsa20 = ["null", "null", 1133532, 109567, 231156, 482727, 669057, 700260, 716275, 808139];
// Y3 axis
var hotel19 = [55, 62, 68, 68, 69, 74, 74, 71, "null", "null"];
// Y4 axis
var hotel20 = [55, 62, 39, 25, 33, 42, 47, 49, "null", "null"];
// X axis
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"];

// gets the canvas element by its class
var ctx = document.getElementById("tsaChange");

// creates the chart
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    //   labels takes an array and makes it the x-axis
    labels: month,
    //   datasets takes an object with two properties
    datasets: [
      {
        // string that is displayed at the top
        label: "TSA-2019",
        // array for the y-axis
        data: tsa19,
        backgroundColor: "rgba(158,202,225, 0.3)", // the fill color
        borderColor: "rgba(158,202,225, 1)", // color of the line
        borderWidth: 1,
        yAxisID: "tsa",
      },
      {
        label: "TSA-2020",
        data: tsa20,
        backgroundColor: "rgba(49,130,189, 0.4)",
        borderColor: "rgba(49,130,189, 1",
        borderWidth: 1,
        yAxisID: "tsa",
      },
      {
        label: "Hotels-2019",
        data: hotel19,
        backgroundColor: "rgba(252,146,114, 0.3)",
        borderColor: "rgba(252,146,114, 1",
        borderWidth: 1,
        yAxisID: "hotels",
      },
      {
        label: "Hotels-2020",
        data: hotel20,
        backgroundColor: "rgba(222,45,38, 0.4)",
        borderColor: "rgba(222,45,38, 1",
        borderWidth: 1,
        yAxisID: "hotels",
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          id: "tsa",
          ticks: {
            max: 3000000,
            min: 0,
            stepSize: 250000,
          },
          scaleLabel: {
            display: true,
            labelString: "TSA Average Number of Passengers",
            fontStyle: "bold",
          },
        },
        {
          id: "hotels",
          position: "right",
          ticks: {
            max: 80,
            min: 20,
            stepSize: 5,
          },
          scaleLabel: {
            display: true,
            labelString: "Hotel Occupancy Rate",
            fontStyle: "bold",
          },
        },
      ],
      xAxes: [
        {
          display: true,
          ticks: {
            callback: function (dataLabel, index) {
              return index % 2 === 0 ? dataLabel : "";
            },
          },
        },
      ],
    },
    title: {
      display: true,
      text: "Year Over Year Change (2019-2020)",
    },
  },
});
// MAP MAP MAP//
//create array of 2019 top 10 hotel market data
var myMap = L.map("mapid", {
    center: [36.1868683, -87.065443],
    zoom: 6,
    // layers: [light, cityLayer]
});

const top_2019 = [{
    location: [40.7128, -74.0059],
    name: "New York",
    pop_density: 27820,
    total_rev: 13.8,
    rank: 1
},
{
    location: [41.8781, -87.6298],
    name: "Chicago",
    pop_density: 2134,
    total_rev: 6.11,
    rank: 5
},
{
    location: [38.89378, -77.1546629],
    name: "D.C.",
    pop_density: 4322,
    total_rev: 6.5,
    rank: 3
},
{
    location: [34.0522, -118.2437],
    name: "Los Angeles",
    pop_density: 960,
    total_rev: 7.6,
    rank: 2
},
{
    location: [37.7578, -122.50764],
    name: "San Francisco",
    pop_density: 7168,
    total_rev: 5.5,
    rank: 6
},
{
    location: [28.4813989, -81.5089266],
    name: "Orlando",
    pop_density: 565,
    total_rev: 6.3,
    rank: 3
},
{
    location: [42.3145186, -71.1103703],
    name: "Boston",
    pop_density: 5248,
    total_rev: 4.4,
    rank: 7
},
{
    location: [25.7825453, -80.2994995],
    name: "Miami",
    pop_density: 552,
    total_rev: 4.3,
    rank: 8
},
{
    location: [32.8248175, -117.3891779],
    name: "San Diego",
    pop_density: 302,
    total_rev: 4.1,
    rank: 9
},
{
    location: [33.7679192, -84.5606915],
    name: "Atlanta",
    pop_density: 749,
    total_rev: 4,
    rank: 10
}
];
//create fucntion for custom population density shading/coloring for choropleth map
function getColor(pop_density) {
    switch (true) {
        case pop_density > 5000:
            return "#7f0000";
        case pop_density > 4000:
            return "#b30000";
        case pop_density > 3000:
            return "#d7301f";
        case pop_density > 2000:
            return "#ef6548";
        case pop_density > 1000:
            return "#fc8d59";
        case pop_density > 750:
            return "#fdbb84";
        case pop_density > 500:
            return "#fdd49e";
        case pop_density > 250:
            return "#fee8c8";
        case pop_density > 150:
            return "#fff7ec";
        default:
            return "#ffffcc";
    };
}
//create function for circle styles
function circleStyle(rev) {
    return {
        stroke: false,
        radius: (rev * 2.5),
        fillColor: "green",
        color: "green",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
    };
}
var cityMarkers = [];

for (var i = 0; i < top_2019.length; i++) {
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    cityMarkers.push(
        L.circleMarker(top_2019[i].location, {
            stroke: false,
            radius: (top_2019[i].total_rev * 2.5),
            color: "green",
            fillColor: "green",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }
        ).bindPopup("<h1> " + top_2019[i].name + "<hr> Rev Share "
            + top_2019[i].total_rev + "%</hr>",
            "</h1>")
    )

};

var covidMarker = L.marker([41.084541, -81.6530644]);

var cityLayer = L.layerGroup(cityMarkers).addTo(myMap);
var covidLayer = L.layerGroup(covidMarker);
// Create the tile layer that will be the background of our map 
var light =L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
}).addTo(myMap);



// var queryurl = "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/Average_Household_Size_and_Population_Density_WFL1/FeatureServer/1/query?where=1%3D1&outFields=*&outSR=4326&f=json";
var link = "https://opendata.arcgis.com/datasets/21843f238cbb46b08615fc53e19e0daf_1.geojson";
// var file = "Population_Density_County.csv";
var geojson
// var test = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/dark-v10",
//     accessToken: API_KEY
// });

// // var file = "Population_Density_County.csv";
// var density = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/light-v10",
//     accessToken: API_KEY},
// d3.json(link, function (data) {
//     console.log(data);
//     geojson = L.choropleth(data, {
//         // style: function(features) {
//         //     return {
//         //       color: "white",
//         //       // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
//         //       fillColor: getColor(features.B01001_calc_PopDensity),
//         //       fillOpacity: 0.5,
//         //       weight: 1.5
//         //     };
//         //   },

//         // Define what  property in the features to use
//         valueProperty: "B01001_calc_PopDensity",

//         // Set color scale
//         scale: ["#ffffb2", "#b10026"],

//         // Number of breaks in step range
//         steps: 10,

//         // q for quartile, e for equidistant, k for k-means
//         mode: "q",
//         style: {
//             // Border color
//             color: "#fff",
//             weight: 1,
//             fillOpacity: 0.8
//         }
//     }).addTo(myMap);


    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");
        var limits = geojson.options.limits;
        var colors = geojson.options.colors;
        var labels = [];

        // Add min & max
        var legendInfo = "<h1>County Pop Density</h1>"
        //  +
        // "<div class=\"labels\">" +
        // "<div class=\"min\">" + limits[0] + "</div>" +
        // "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        // "</div>";

        div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Adding legend to the map
    // legend.addTo(myMap);


// });

var overlayMaps = {
    Cities: cityLayer,
    Covid: covidLayer
};
var baseMaps = {
    "light": light,
    // "density": density
};
// var myMap = L.map("mapid", {
//     center: [36.1868683, -87.065443],
//     zoom: 4,
//     layers: [light, cityLayer, covidLayer]
// });

// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
// }).addTo(myMap);
