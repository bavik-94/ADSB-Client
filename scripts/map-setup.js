var livemap;

function createMap(){
    var nMap = L.map('livemap').setView([40.71140939480379, -74.00763191455891], 9.5);
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=eaJurWlVvF3lFqfuN8BC',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        crossOrigin: true
      }).addTo(nMap);
      nMap.on('click', deselectFlight)
      livemap = nMap
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
    return nMarker
}