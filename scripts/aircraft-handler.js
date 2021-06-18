let active = [];

function stateHandler(stateMessage){ //updates existing aircraft or creates a new one if a match is not found
    
    for (var i=0; i < stateMessage.length ; i ++){
        var aircraft = getAircraft(stateMessage[i].hex_ident);
        
        if (aircraft){ //existing
            aircraft.update(stateMessage[i]);
            aircraft.setMarker();
            
        }else{
            var newAircraft = new Aircraft(stateMessage[i]); // new
            newAircraft.setMarker();
            active.push(newAircraft);
        }    
    }
    cleanUpExpired();
}

function cleanUpExpired(){ // remove aircraft that haven't been updated in 60 seconds or longer
    var now = new Date();
    var epoch = Math.round(now.getTime() / 1000);
    for (var i = active.length - 1; i >= 0; i--){
        if (epoch - active[i].live >= 60){
            if (active[i].selected == true){
                active[i].removeInspected();
            }
            active[i].removeMarker();
            active.splice(i,1);
        }
    }
}

function getAircraft(hex_ident){
    for (var i = 0; i < active.length;i++){
        if (active[i].hex_ident == hex_ident){
            return active[i];
        }
    }
    return null;
}

function getSelectedAircraft(){
    for (var i = 0; i < active.length;i++){
        if (active[i].selected){
            return active[i];
        }
    }
    return null;
}