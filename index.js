const express = require('express');
const port = 8080;

const app = express();

app.use(express.static('public/'));

const server = app.listen(port, function () {
    console.log("Running on Among us live on port " + port);
});

const socket = require('socket.io');
const io = socket(server);

var clients = {};
var clientsType = {};
io.sockets.on('connection', function (socket) {
    clients[socket.id] = socket;

    socket.on('type', (type) => {
        clientsType[socket.id] = type;
        showClients("CONNECT");
    });
    socket.on('disconnect', () => {
        delete clients[socket.id];
        delete clientsType[socket.id];
        showClients("DISCONNECT");
    });

});

function showClients(startStr) {
    console.log(`${startStr} - ${JSON.stringify(Object.values(clientsType))}`);
}