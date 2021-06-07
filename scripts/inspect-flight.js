var activeLine

function inspectFlight(data){ //deselect any currently selected aircraft, select requested aircraft
    if (data.hex_ident == NaN){
        return
    }
    
    deselectFlight()
    let aircraft = getAircraft(data.hex_ident)
    if (aircraft != null){
        aircraft.selected = true
        aircraft.updateInfoBox()
        document.getElementById('info-box').style.visibility = 'visible'
        aircraft.setHistory(data)
    }
    
    drawActiveLines();

}

function deselectFlight(){ //empty active points array, remove line on the map, remove active flights, hide info box
    let aircraft = getSelectedAircraft()
    if (activeLine != undefined){
        activeLine.remove(livemap)
        activeLine = undefined
    }
    if (aircraft != null){
        aircraft.history = []
        aircraft.selected = false
    }
    hideInfoBox()

}

  
function hideInfoBox(){
    document.getElementById('info-box').style.visibility = 'hidden'
}


function drawActiveLines(){ //remove current line if it exists, draw new line
    if (activeLine != undefined){
        activeLine.remove(livemap)
    }
    
    let aircraft = getSelectedAircraft()
    if (aircraft != null){
        activeLine = new L.hotline(aircraft.history, {
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
    activeLine.addTo(livemap)
    }


    
}

