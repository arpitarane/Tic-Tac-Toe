

var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/html.html'))
});

io.on('connection', function(socket){
   var srvSockets = io.sockets.sockets;
    if (Object.keys(srvSockets).length === 1) {
        io.emit('waiting for user', 'Waiting for second player to join');
    } else if(Object.keys(srvSockets).length === 2){
        io.emit('user connected', 'Users connected!');
    }

	socket.on('disconnect', function(){
	    io.emit('user disconnected', 'User Disconnected')
	});

	socket.on('myClick', function () {
        socket.broadcast.emit('myClick');
    });

    socket.on('move', function(data){
    	socket.broadcast.emit('move', data);
    })

});

app.use(express.static(__dirname));

app.set('port', 3000);
http.listen(3000, function () {
    console.log('Express server listening on port %d in %s mode', 3000, app.get('env'));
})

