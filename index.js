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
var playerColors = require('./players.json');
var totalPlayers = Object.keys(playerColors).length;
var points = 0;
io.sockets.on('connection', function (socket) {
    clients[socket.id] = socket;

    socket.on('type', (type) => {
        clientsType[socket.id] = type;
        updateTaskCount();
        showClients("CONNECT");
    });
    socket.on('disconnect', () => {
        delete clients[socket.id];
        delete clientsType[socket.id];
        updateTaskCount();
        showClients("DISCONNECT");
    });
    socket.on('resetPoints', () => {
        if (clientsType[socket.id] == "host") {
            points = 0;
            console.log('resetPoints');
        }
    });
    socket.on('doneTask', () => {
        points += 1;
        console.log(`Done Task - ${points} points`);
        if (getKeyByValue(clientsType, 'host') != undefined) {
            clients[getKeyByValue(clientsType, 'host')].emit('updatePoints', points);
        }
    });
});

function updateTaskCount() {
    if (getKeyByValue(clientsType, 'host') != undefined) {
        clients[getKeyByValue(clientsType, 'host')].emit('updateNumDevices', Object.values(clientsType).filter(type => type != 'host').length);
    }
}

function showClients(startStr) {
    console.log(`${startStr} - ${JSON.stringify(Object.values(clientsType))}`);
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}