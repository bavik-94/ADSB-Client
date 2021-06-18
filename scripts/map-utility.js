var livemap;
var airportMarkers = [];
var airports = [ 
    {"icao":"KEWR","name":"Newark Liberty International Airport","loc":[40.69250813397838, -74.16905098234598]},{"icao":"KJFK","name":"John F Kennedy International Airport","loc":[40.641994926115906, -73.77582164714299]},{"icao":"KTEB","name":"Teterboro Airport","loc":[40.85810478491101, -74.0601559135903]},{"icao":"KMMU","name":"Morristown Airport","loc":[40.79886160341947, -74.41403825225137]},{"icao":"KCDW","name":"Caldwell Essex County Airport","loc":[40.87640064188698, -74.27725757126923]},{"icao":"KJRB","name":"New York Downtown Manhattan Heliport","loc":[40.70123618838586, -74.00827637665559]},{"icao":"KLGA","name":"LaGuardia Airport","loc":[40.77723363309782, -73.87371920726785]},{"icao":"KLDJ","name":"Linden Airport","loc":[40.616378687196075, -74.24370665999096]},{"icao":"KHPN","name":"White Plains Westchester County Airport","loc":[41.06871263096241, -73.70869627408926]}];

function createMap(){
    var nMap = L.map('livemap').setView([40.71140939480379, -74.00763191455891], 9.5);
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=eaJurWlVvF3lFqfuN8BC',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        crossOrigin: true
      }).addTo(nMap);
      nMap.on('click', deselectFlight);
      livemap = nMap;
}

function newMarker(aircraft){
    var iconClass = aircraft.icon_type + (Math.round(aircraft.track/15)) * 15; // set icon to sprite based on heading
    var nIcon = L.divIcon ({className: iconClass, iconSize : [39,39]});
    nMarker = new L.Marker ([aircraft.lat, aircraft.lon],{
        id : aircraft.hex_ident,
        click : requestHistory,
        title : aircraft.callsign,
        icon : nIcon,
        iconAnchor : [60, 60]}
        ).addTo(livemap).on('click', requestHistory);
    return nMarker;
}

function updateMarker(aircraft){
    var iconClass = aircraft.icon_type + (Math.round(aircraft.track/15)) * 15; // set icon to sprite based on heading
    var nIcon = L.divIcon ({className: iconClass, iconSize : [39,39]});
    aircraft.marker.setIcon(nIcon);
    aircraft.marker.setLatLng([aircraft.lat, aircraft.lon]);
    return;
}

function drawActiveLines(aircraft){ //remove current line if it exists, draw new line
    var newLine = new L.hotline(aircraft.history, {
            palette: {
              0.0:'#FFFF00',
              0.15:'#7FFF00',
              0.55:'#00FFFF',
              1.0:'#FF00FF'
            },
            weight: 5,
            opacity: 1,
            smoothFactor: 0,
            min: 0,
            max: 45000
            });
    newLine.addTo(livemap);
    return newLine;
    }

    function setAirportMarkers(){
        if (document.getElementById('option-airports').checked){
            for (var i = 0; i < airports.length; i++){
                nMarker = new L.Marker ([airports[i].loc[0], airports[i].loc[1]],{title : airports[i].icao,}).addTo(livemap);
                nMarker.setOpacity(0.9);
                nMarker.bindPopup(airports[i].name).openPopup();
                airportMarkers.push(nMarker);
            }
            return;
        }else{
            for (var j=0; j < airportMarkers.length; j++){
                airportMarkers[j].remove(livemap);
            }
            airportMarkers = [];
        }
    }