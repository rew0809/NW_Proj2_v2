// MAP MAP MAP//

var myMap = L.map("mapidchoro", {
    center: [39.8090883, -98.5642993],
    zoom: 5,
    // layers: [light, cityLayer]
});

//create array of 2019 top 10 hotel market data
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

//create an Array of top 2020 travel destinations
const top_2020 = [{
    location: [44.585403,-111.0745213],
    name: "Yellowstone National Park",
    pop_density: "",
    rank: 1
},
{
    location: [39.1985427,-106.871744],
    name: "Aspen, Co",
    pop_density: "",
    rank: 2
},
{
    location: [48.6596967,-114.4063062],
    name: "Glacier National Park",
    pop_density: "",
    rank: 3
},
{
    location: [45.679605,-111.1209420],
    name: "Bozeman, MT",
    pop_density: "",
    rank: 4
},
{
    location: [39.5013534,-106.1132516],
    name: "Breckenridge, C",
    pop_density: "",
    rank: 5
},
{
    location: [33.3904235,-105.7550302],
    name: "Ruidoso, NM",
    pop_density: "",
    rank: 6
},
{
    location: [35.7273147,-83.533036],
    name: "Gatlinburg, TN",
    pop_density: "",
    rank: 7
},
{
    location: [39.6061485,-106.3571604],
    name: "Vail, CO",
    pop_density: "",
    rank: 8
},
{
    location: [45.8515844,-84.6552296],
    name: "Mackinac, MI",
    pop_density: "",
    rank: 9
},
{
    location: [36.2088272,-81.6976386],
    name: "Boone, NC",
    pop_density: "",
    rank: 10
}];


var cityMarkers = [];

for (var i = 0; i < top_2019.length; i++) {
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    cityMarkers.push(
        L.marker(top_2019[i].location, {
            stroke: false,
            radius: (top_2019[i].total_rev * 2.5),
            color: "green",
            fillColor: "green",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }
        ).bindPopup("<h1> " + top_2019[i].name + "<hr> Rev Share "
            + top_2019[i].total_rev + "%</hr>" + "<hr> Rank # "
            + top_2019[i].rank + "</hr>",
            "</h1>")
    );

};

var covidMarkers = []

for (var i = 0; i < top_2020.length; i++) {
    // loop through the 2020 array, create a new marker, push it to the covidMarkers array
    covidMarkers.push(
        L.marker(top_2020[i].location
        ).bindPopup("<h1> " + top_2020[i].name + "<hr> Rank # "
            + top_2020[i].rank + "</hr>",
            "</h1>")
    );

};

var cityLayer = L.layerGroup(cityMarkers);
var covidLayer = L.layerGroup(covidMarkers);
// Create the tile layer that will be the background of our map 
var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
}).addTo(myMap);



//Geojson link
var link = "https://opendata.arcgis.com/datasets/21843f238cbb46b08615fc53e19e0daf_1.geojson";
//use geojson to buils a county level choropleth map
var geojson;
d3.json(link, function (data) {
    console.log(data);
    function getColor(pop_density) {
        switch (true) {
            case pop_density > 2000:
                return "#7f0000";
            case pop_density > 1000:
                return "#b30000";
            case pop_density > 500:
                return "#d7301f";
            case pop_density > 400:
                return "#ef6548";
            case pop_density > 250:
                return "#fc8d59";
            case pop_density > 200:
                return "#fdbb84";
            case pop_density > 150:
                return "#fdd49e";
            case pop_density > 100:
                return "#fee8c8";
            case pop_density > 50:
                return "#fff7ec";
            default:
                return "#bdbdbd";
        };
    }
    function styles(feature) {
        return {
            fillColor: getColor(feature.properties.B01001_calc_PopDensity),
            borderColor: "black",
            weight: 1,
            opacity: 1,
            color: '#fff',
            // dashArray: '',
            // stroke: 'black',
            fillOpacity: 0.9
        }
    };
    L.geoJson(data, { style: styles }).addTo(myMap);
});
function getColor(pop_density) {
    switch (true) {
        case pop_density > 2000:
            return "#7f0000";
        case pop_density > 1000:
            return "#b30000";
        case pop_density > 500:
            return "#d7301f";
        case pop_density > 400:
            return "#ef6548";
        case pop_density > 250:
            return "#fc8d59";
        case pop_density > 200:
            return "#fdbb84";
        case pop_density > 150:
            return "#fdd49e";
        case pop_density > 100:
            return "#fee8c8";
        case pop_density > 50:
            return "#fff7ec";
        default:
            return "#bdbdbd";
    };
};
//add population density legend
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (myMap) {
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 50, 100, 150, 200, 250, 400, 500, 1000, 2000],
        colors = ["#bdbdbd", "#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
        labels = [];
    

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
           '>'+ grades[i] + '<br>';
    }

    return div;
};

legend.addTo(myMap);

//build overlays
let overlayMaps = {
    2019: cityLayer,
    2020: covidLayer,
};

//build basemaps
var baseMaps = {
    "light": light,
    // "density": density
};
// var myMap = L.map("mapid", {
//     center: [36.1868683, -87.065443],
//     zoom: 4,
//     layers: [light, cityLayer]
// });


//add control  for layers
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);
