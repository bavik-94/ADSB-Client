socket = new WebSocket ('ws://192.168.0.24:6789/'); //setup web socket
loaded = false
function createConnection(){
    socket.addEventListener('open',function(event){ //send connected message on connnect
    socket.onclose = function (event) {
        document.getElementById("connection-status").innerHTML = 'DISCONNECTED';
        document.getElementById("connection-status").classList = 'status-red';
    };
    document.getElementById("connection-status").innerHTML = 'CONNECTED';
    document.getElementById("connection-status").classList = 'status-green';
    });
    
    socket.addEventListener('message',function(event){ //message handling parse JSON and add to AC list
        var object = JSON.parse(event.data);
        switch (object[object.length-1].action) {
          case 'state':
              stateHandler(object);
              break;
          case 'history':
          inspectFlight(object[0])
              break;
          default:
              console.error(
                  "unsupported event", object);
          }
        });  
}

  
//   document.addEventListener("DOMContentLoaded", function(){ // map creation fails if map div is not loaded
//     createMap();
//     createConnection();
// });

window.addEventListener('load', (event) => {
    if (loaded == false){
        createMap();
        createConnection();
        loaded = true
    }
    
});
  


function requestHistory(e){ // get past positional data to draw lines for currently insepected flight
    socket.send(JSON.stringify({action: 'history', hex_ident: e.target.options.id}));
}

