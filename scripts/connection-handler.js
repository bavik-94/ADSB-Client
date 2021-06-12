socket = new WebSocket ('ws://192.168.0.24:6789/'); //setup web socket
loaded = false;



function createConnection(){
    socket.addEventListener('open',function(event){ //send connected message on connnect
    
        socket.onclose = function (event) {
        document.getElementById("connection-status").innerHTML = 'DISCONNECTED';
        document.getElementById("connection-status").classList = 'status-red';
    };
    
    document.getElementById("connection-status").innerHTML = 'CONNECTED';
    document.getElementById("connection-status").classList = 'status-green';
    });
    
    socket.addEventListener('message',function(event){ //message handling parse JSON and forward to aircraft-handler
        var stateMessage = JSON.parse(event.data);
        switch (stateMessage.action) {
            case 'state':
                stateHandler(stateMessage.data);
                break;
            
            case 'history':
                inspectFlight(stateMessage.data);
                break;
            
            default:
                console.error("unsupported event", stateMessage);
          }
    });  
}

  

window.addEventListener('load', (event) => { //map div needs to load before map creation
    if (loaded == false){
        createMap();
        createConnection();
        loaded = true;
        sideBar = new SideBar();
    }
    
});
  


function requestHistory(e){ // get past lat,lon data to draw lines for currently insepected flight
    aircraft = getAircraft(e.target.options.id);
    if (aircraft && aircraft.selected){// do nothing if aircraft is already inspected
        return;
    }
    socket.send(JSON.stringify({action: 'history', hex_ident: e.target.options.id}));
}

