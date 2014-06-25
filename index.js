var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players;
    Player = require("./Player").Player;

var setEventHandlers = function() {
    io.on('connection', function(socket){
            io.emit('a user connected'+socket.id);
            socket.on("disconnect", onClientDisconnect);
            socket.on("new player", onNewPlayer);
            socket.on("move player", onMovePlayer);
            socket.on("chat message",onChatMessage);
        });
};

function onClientDisconnect() {
    this.broadcast.emit("Player has disconnected: "+this.id);
};

function onChatMessage(msg){
  io.emit('chat message', msg);
};
function onNewPlayer(data) {
  console.log("Se creo nuevo jugador");
  var newPlayer = new Player(data.x, data.y);
      newPlayer.id = this.id;
      io.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});
      onChatMessage(data);
  /*
    var i, existingPlayer;
    for (i = 0; i < players.length; i++) {
      existingPlayer = players[i];
      socket.broadcast.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
    };*/
    players.push(newPlayer);
};

function onMovePlayer(data) {

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





