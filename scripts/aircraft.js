class Aircraft{
    constructor(data){
        Object.assign(this,data);
        this.marker = undefined
        this.selected = false
        this.history = []
    }

    update(data){
        Object.assign(this,data)

        if(this.selected == true){ //update flight info box as data updates
            this.updateInfoBox()
            this.history.push([this.lat, this.lon, this.altitude])
            drawActiveLines()
        }
    }

    setMarker(){ //updates an existing marker or creates a new one if no match was found
        
        if (this.marker != undefined){
            var iconClass = this.icon_type + (Math.round(this.track/15)) * 15; // set icon to sprite based on heading
            var nIcon = L.divIcon ({className: iconClass, iconSize : [39,39]});
            this.marker.setIcon(nIcon)
            this.marker.setLatLng([this.lat, this.lon]);
            return
        }
    this.marker = newMarker(this); 
    }

    removeMarker(){
        this.marker.remove(livemap)
        this.marker = undefined
    }

    setHistory(data){ //populate list of aircraft positions to build line
        for (i = 0; i < data.lat.length; i++){
            var newPoint = [data.lat[i],data.lon[i],data.altitude[i]]
            this.history.push(newPoint)
            }
    }

    updateInfoBox(){
        if (this.callsign == NaN){
            this.callsign = 'N' + this.reg
        }
        if (this.reg == NaN){
            this.callsign = this.hex_ident
        }

        document.getElementById('call-sign-title').innerHTML = this.callsign

        document.getElementById('aircraft-mfr').innerHTML = this.mfr
        document.getElementById('aircraft-model').innerHTML = this.model
        document.getElementById('aircraft-registration').innerHTML = 'N' + this.reg
        //document.getElementById('aircraft-callsign').innerHTML = this.callsign
        document.getElementById('aircraft-hex').innerHTML = this.hex_ident

        document.getElementById('aircraft-position').innerHTML = this.lat + ', ' + this.lon
        document.getElementById('aircraft-altitude').innerHTML = this.altitude
        document.getElementById('aircraft-ground-speed').innerHTML = this.ground_speed
        document.getElementById('aircraft-vertical-rate').innerHTML = this.vertical_rate
        document.getElementById('aircraft-heading').innerHTML = this.track
    }

}