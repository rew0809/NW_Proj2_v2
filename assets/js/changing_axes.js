var margin = {top: 20, right: 40, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y0 = d3.scaleLinear().range([height, 0]);
var y1 = d3.scaleLinear().range([height, 0]);

// define the 1st line
var valueline = d3.line()
    .x(function(d) { return x(data.date); })
    .y(function(d) { return y0(data.vix); });

// define the 2nd line
var valueline2 = d3.line()
    .x(function(d) { return x(data.date); })
    .y(function(d) { return y1(data.DailyCases); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.csv("assets/data/covidCasesAndSettles.csv").then(function(covidData) {
  // Print the tvData

  // Cast the hours value to a number for each piece of tvData
  covidData.forEach(function(data) {
    data.date = +data.Date;
    data.DailyCases = +data.DailyCases;
    data.vix = +data.vix;
    data.sp = +data.sp;
    data.xal = +data.xal;

    // console.log(data.DailyCases)
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y0.domain([0, d3.max(data, function(d) {return Math.max(d.vix);})]);
  y1.domain([0, d3.max(data, function(d) {return Math.max(d.DailyCases); })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "red")
      .attr("d", valueline2);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y0 Axis
  svg.append("g")
      .attr("class", "axisSteelBlue")
      .call(d3.axisLeft(y0));

  // Add the Y1 Axis
  svg.append("g")
      .attr("class", "axisRed")
      .attr("transform", "translate( " + width + ", 0 )")
      .call(d3.axisRight(y1));
});