class SideBar{
    constructor(){
        var divs = ['hex_ident','reg','mfr','model','callsign','position','altitude',
        'ground_speed','vertical_rate','track'];
        var values = {};
        
        for (var i = 0; i < divs.length; i++){
            var element = document.getElementById('aircraft-' + divs[i]);
            values[divs[i]] = element;
        }
        
        Object.assign(this,values);
    
    }

    updateDivs(aircraft){
        var propList = Object.getOwnPropertyNames(this);
        var aircraftProps = Object.getOwnPropertyNames(aircraft);

        this.position.innerHTML = aircraft.lat + ', ' + aircraft.lon;

        for (var i = 0; i < propList.length; i++){
            for (var j = 0; j < aircraftProps.length; j++){
                if (propList[i] == aircraftProps[j]){
                    this[propList[i]].innerHTML = aircraft[aircraftProps[j]];
                }
            }
        }
    }
}

