const app = require('express')();
const socketIO = require('socket.io');

const server = app.listen(4000, () => console.log("Server is listening on port 4000!"));
const io = socketIO(server);

const sockets = {};
const rooms = [];

io.on('connection', socket => {
	console.log(`${ socket.id } was connected to the game server`);

    sockets[socket.id] = socket;
});