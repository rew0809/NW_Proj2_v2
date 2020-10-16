// var url="/";
// d3.json(url, function(error, covidData) {
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
              fontStyle: "bold",
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
              fontColor: window.chartColors.blue,
              fontStyle: "bold",
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
              fontColor: window.chartColors.purple,
              fontStyle: "bold",
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
              fontColor: window.chartColors.green,
              fontStyle: "bold",
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
var ctx2 = document.getElementById("tsaChange");

// creates the chart
var myChart = new Chart(ctx2, {
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
        borderColor: "rgba(49,130,189, 1)",
        borderWidth: 1,
        yAxisID: "tsa",
      },
      {
        label: "Hotels-2019",
        data: hotel19,
        backgroundColor: "rgba(252,146,114, 0.3)",
        borderColor: "rgba(252,146,114, 1)",
        borderWidth: 1,
        yAxisID: "hotels",
      },
      {
        label: "Hotels-2020",
        data: hotel20,
        backgroundColor: "rgba(222,45,38, 0.4)",
        borderColor: "rgba(222,45,38, 1)",
        borderWidth: 1,
        yAxisID: "hotels",
      },
    ],
  },
  options: {
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      yAxes: [
        {
          id: "tsa",
          ticks: {
            max: 3000000,
            min: 0,
            stepSize: 250000,
            fontColor: "rgba(158,202,225, 1)"
          },
          scaleLabel: {
            display: true,
            labelString: "TSA Average Number of Passengers",
            fontStyle: "bold",
            fontColor: "rgba(158,202,225, 1)",

          },
        },
        {
          id: "hotels",
          position: "right",
          ticks: {
            max: 80,
            min: 20,
            stepSize: 5,
            fontColor: "rgba(252,146,114, 1)"
          },
          scaleLabel: {
            display: true,
            labelString: "Hotel Occupancy Rate",
            fontStyle: "bold",
            fontColor: "rgba(252,146,114, 1)"
          },
        },
      ],
      xAxes: [
        {
          display: true,
          fontColor: "#ffffff",
          ticks: {
            callback: function (dataLabel, index) {
              return index % 2 === 0 ? dataLabel : "";
            },
            fontColor: "#ffffff",
          },
        },
      ],
    },
    title: {
      display: true,
      text: "Travel and Hotel Occupancy YoY Change (2019-2020)",
      fontColor: "#ffffff",
      fontSize: 30, 
    },
  },
});
