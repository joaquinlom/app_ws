var app = require('express')();
var util = require("util");
var http = require('http').Server(app);
var io = require("socket.io");
var socket;
var player;
    Player = require("./Player").Player;

var setEventHandlers = function() {
    socket.sockets.on("connection", onSocketConnection);
};
function onSocketConnection(client) {
   util.log("New player has connected: "+client.id);
    socket.emit('Se conecto nueva persona');
    client.on("disconnect", onClientDisconnect);
    client.on("new player", onNewPlayer);
    client.on("move player", onMovePlayer);
};

function onClientDisconnect() {
    io.emit("Player has disconnected: "+this.id);
};

function onNewPlayer(data) {
  var newPlayer = new Player(data.x, data.y);
      newPlayer.id = this.id;
  this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});
  
    var i, existingPlayer;
    for (i = 0; i < players.length; i++) {
      existingPlayer = players[i];
      this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
    };
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
socket = io.listen(port);
/*
http.listen(port, function(){
  console.log('listening on *:3000');
});
*/
init();

/*
io.on('connection', function(socket){
  console.log('a user connected');
});
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
*/