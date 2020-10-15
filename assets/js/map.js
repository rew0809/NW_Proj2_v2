// MAP MAP MAP//
//create array of 2019 top 10 hotel market data
var myMap = L.map("mapidchoro", {
    center: [39.8090883,-98.5642993],
    zoom: 4,
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
// function getColor(pop_density) {
//     switch (true) {
//         case pop_density > 5000:
//             return "#7f0000";
//         case pop_density > 4000:
//             return "#b30000";
//         case pop_density > 3000:
//             return "#d7301f";
//         case pop_density > 2000:
//             return "#ef6548";
//         case pop_density > 1000:
//             return "#fc8d59";
//         case pop_density > 750:
//             return "#fdbb84";
//         case pop_density > 500:
//             return "#fdd49e";
//         case pop_density > 250:
//             return "#fee8c8";
//         case pop_density > 150:
//             return "#fff7ec";
//         default:
//             return "#ffffcc";
//     };
// }
// function style(feature) {
//     return {
//         fillColor: getColor(featureCollection.features.properties.B01001_calc_PopDensity),
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
// }

//create function for circle styles
// function circleStyle(rev) {
//     return {
//         stroke: false,
//         radius: (rev * 2.5),
//         fillColor: "green",
//         color: "green",
//         weight: 1,
//         opacity: 1,
//         fillOpacity: 0.8,
//     };
// }
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
            + top_2019[i].total_rev + "%</hr>" +  "<hr> Rank # "
            + top_2019[i].rank + "</hr>",
            "</h1>").addTo(myMap)
    );

};

var covidMarker = L.marker([41.084541, -81.6530644]);

var cityLayer = L.layerGroup(cityMarkers);
var covidLayer = L.layerGroup(covidMarker);
// Create the tile layer that will be the background of our map 
var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
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
    L.geoJson(data, {style: styles}).addTo(myMap);
});
// = L.choropleth(data, {

// L.geoJson(link).addTo(myMap);
//     // Define what  property in the features to use
//     valueProperty: "B01001_calc_PopDensity",

//     // Set color scale
//     scale: ["#ffffb2", "#b10026"],

//     // Number of breaks in step range
//     steps: 10,

//     // q for quartile, e for equidistant, k for k-means
//     mode: "q",
//     style: style
//     // {
//     //     // Border color
//     //     color: "#fff",
//     //     weight: 1,
//     //     fillOpacity: 0.8
//     // }



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

    legend.addTo(myMap);
};

// Adding legend to the map
// legend.addTo(myMap);




var overlayMaps = {
    Cities: cityLayer,
    // Covid: covidLayer
};
var baseMaps = {
    "light": light,
    // "density": density
};
// var myMap = L.map("mapid", {
//     center: [36.1868683, -87.065443],
//     zoom: 4,
//     layers: [light, cityLayer]
// });

// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
// }).addTo(myMap);
