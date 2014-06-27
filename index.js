var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players;
    Player = require("./Player").Player;

var setEventHandlers = function() {
    io.on('connection', function(socket){
           
            socket.on("disconnect", onClientDisconnect);
            socket.on("new player", onNewPlayer);
            socket.on("move player", onMovePlayer);
            socket.on("chat message",onChatMessage);
            socket.on('stop player',onStopPlayer);
        });
};
function onStopPlayer(date){
   var obj = PlayerbyId(data.id);
    obj.setState(data.move);
  
    io.emit('stop player',{id: data.id, move: data.move});
}
function onClientDisconnect() {
    this.broadcast.emit("Player has disconnected: "+this.id);
};

function onChatMessage(msg){
  io.emit('chat message', msg);
};
function onNewPlayer(data) {
  io.emit('chat message',"Se creo nuevo jugador");
  var newPlayer = new Player(data.x, data.y);
      newPlayer.id = this.id;
      io.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});
     
  
    var i, existingPlayer;
    for (i = 0; i < players.length; i++) {
      existingPlayer = players[i];
      this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
    };
    players.push(newPlayer);
  
};

function playerById(id) {
    var i;
    for (i = 0; i < players.length; i++) {
        if (players[i].id == id)
            return players[i];
    };

    return false;
};

function onMovePlayer(data) {
  var obj = playerById(data.id);
    obj.setState(data.move);
  
    io.emit('move player',{id: data.id, move: data.move});
};


function init() {
    players = [];
    setEventHandlers();
};

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var port = Number(process.env.PORT || 3000);
http.listen(port, function(){
  console.log('listening on *:3000');
});

init();





