class Aircraft{
    constructor(data){
        Object.assign(this,data);
        this.marker = null;
        this.selected = false;
        this.history = [];
        this.polyLine = null;
    }

    update(data){
        Object.assign(this,data);

        if(this.selected == true){ // update info box and flight path line if currently inspected aircraft
            this.updateSideBar();
            this.history.push([this.lat, this.lon, this.altitude]); //add new position to history list
            this.setPolyLine();
            
        }
    }

    setPolyLine(){ // removes any existing lines, creates new line
        if (this.polyLine){
            this.polyLine.remove(livemap);
            this.polyLine = null;
        }
        this.polyLine = drawActiveLines(this);
    }
    
    setMarker(){ //updates an existing marker or creates a new one if no match was found
        if (this.marker){
            updateMarker(this);
            return;
        }
    this.marker = newMarker(this); 
    }

    removeMarker(){
        this.marker.remove(livemap);
        this.marker = null;
    }

    setHistory(data){ //populate list of aircraft positions to build line from history request
        for (var i = 0; i < data.lat.length; i++){
            var newPoint = [data.lat[i],data.lon[i],data.altitude[i]];
            this.history.push(newPoint);
            }
    }

    setInspected(data){
        document.getElementById('info-box').style.visibility = 'visible';
        this.selected = true;
        this.updateSideBar();
        this.setHistory(data);
        this.setPolyLine();
    }

    removeInspected(){
        document.getElementById('info-box').style.visibility = 'hidden';
        this.selected = false;
        this.history = [];
        if (this.polyLine){
            this.polyLine.remove(livemap);
        }
        this.polyLine = null;
    }

    updateSideBar(){
        if (this.callsign == null){
            this.callsign = 'N' + this.reg;
        }
        if (this.reg == null){
            this.callsign = this.hex_ident;
        }

        sideBar.updateDivs(this);
    }

}