const app = require('express')();
const socketIO = require('socket.io');

const server = app.listen(4000, () => console.log("Server is listening on port 4000!"));
const io = socketIO(server);

const sockets = {};
const rooms = [];

io.on('connection', socket => {
	console.log(`${ socket.id } was connected to the game server!`);
    sockets[socket.id] = socket; // Push socket

    socket.emit("TELL_SOCKET", {
        id: socket.id
    });

    socket.on("CREATE_ROOM", nickname => {
        // Create a room; adm socket id === room id

        function generatePIN() {
            // Create variable
            let a = "";

            // Generate PIN
            for(let ma = 0; ma < 9; ma++) { // *o9
                a += Math.floor(Math.random() * 9)
            }

            // Check if no room is using this PIN
            const b = rooms.findIndex(io => io.pin === a)
            if(b !== -1) { // room exists // regenerate
                return generatePIN();
            } else { // return generated pin
                return a;
            }
        }

        socket.join(socket.id);
        const room = {
            id: socket.id,
            pin: generatePIN(),
            players: [{
                id: socket.id,
                nickname
            }],
            creator: socket.id
        }

        rooms.push(room);

        socket.emit("CREATE_ROOM_DONE", {
            pin: room.pin,
            players: room.players
        });

        console.log(`Game ${ room.id } with PIN ${ room.pin } was successfully created!`);
    });
});