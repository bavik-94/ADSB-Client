let active = []

function stateHandler(object){ //updates existing aircraft or creates a new one if a match is not found
    let match = false
    for (i=0; i < object.length - 1; i ++){
        for (j=0; j < active.length; j++){
            if (active[j].hex_ident == object[i].hex_ident){ 
                active[j].update(object[i])
                active[j].setMarker();
                match = true
                break;
            }
        }
    
    if (match == false){
        let newAircraft = new Aircraft(object[i])
        newAircraft.setMarker();
        active.push(newAircraft)
    }
    }
cleanUpExpired()
logStuff()
}

function cleanUpExpired(){ // remove aircraft that are expired
    var now = new Date() 
    var epoch = Math.round(now.getTime() / 1000)
    for (var i = active.length - 1; i >= 0; i--){
        if (epoch - active[i].live >= 60){
            aircraft = getSelectedAircraft
            if (aircraft == active[i]){
                hideInfoBox()
                deselectFlight()
            }
            active[i].removeMarker()
            active.splice(i,1)
        }
    }
}

function getAircraft(hex_ident){
    for (i = 0; i < active.length;i++){
        if (active[i].hex_ident == hex_ident){
            return active[i]
        }
    }
return null
}

function getSelectedAircraft(){
    for (i = 0; i < active.length;i++){
        if (active[i].selected == true){
            return active[i]
        }
    }
return null
}

function logStuff(){
    aSel = []
    for (i = 0; i < active.length; i++){
        if (active[i].history.length > 0){
            aSel.push(active[i].hex_ident + " : " + active[i].history.length + ' : ' + active[i].selected)
        }
    }
    console.log('------------------')
    console.log(aSel)
}