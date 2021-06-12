let activeLine;

function inspectFlight(data){ //deselect any currently selected aircraft, select requested aircraft
    if (data.hex_ident == null){
        return;
    }
    
    deselectFlight();
    var aircraft = getAircraft(data.hex_ident);
    if (aircraft){
        aircraft.setInspected(data);
    }

}

function deselectFlight(){ //empty active points array, remove line on the map, remove active flights, hide info box
    var aircraft = getSelectedAircraft();
    if (aircraft){
        aircraft.removeInspected();
    }
}
