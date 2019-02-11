const app = require('express')();
const socketIO = require('socket.io');

const server = app.listen(4000, () => console.log("Server is listening on port 4000!"));
const w_io = socketIO(server);

const sockets = {};
const rooms = [];

w_io.on('connection', socket => {
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

        const room = {
            id: socket.id,
            pin: generatePIN(),
            players: [{
                id: socket.id,
                nickname,
                symbolsTyped: 0
            }],
            creator: socket.id,
            inGame: false,
            initTime: 3e3,
            gameTime: 6e4, // 60k
        }
        socket.join(room.id);

        rooms.push(room);

        socket.emit("JOIN_ROOM_SUCCESS", {
            pin: room.pin,
            players: room.players,
            inGame: room.inGame,
            creator: room.creator,
            id: room.id,
            initTime: room.initTime,
            gameTime: room.gameTime
        });

        console.log(`Game ${ room.id } with PIN ${ room.pin } was successfully created!`);
    });

    socket.on("JOIN_ROOM", ({ nickname, pin }) => {
        // Check if the room exists
        let a = rooms.find(io => io.pin === pin);
        if(!a) {
            return socket.emit("ROOM_ERROR", { text: "Room with this PIN doesn't exist", target: 'RED' });
        }

        // Connect user
        socket.join(a.id);
        a.players.push({
            id: socket.id,
            nickname,
            symbolsTyped: 0
        });

        socket.emit("JOIN_ROOM_SUCCESS", {
            pin: a.pin,
            players: a.players,
            inGame: a.inGame,
            creator: a.creator,
            id: a.id,
            initTime: a.initTime,
            gameTime: a.gameTime
        });

        w_io.to(a.id).emit("ROOM_UPDATED", {
            players: a.players,
            inGame: a.inGame
        });
    });

    socket.on("START_GAME", ({ roomID }) => {
    let a = rooms.find(io => (
            roomID === io.id &&
            io.players.map(io => io.id).includes(socket.id) &&
            io.creator === socket.id
        ));

        if(!a) {
            return socket.emit("ROOM_ERROR", { text: "Sorry, we couldn't confirm your game session", target: 'RED' });
        }

        a.inGame = true;
        w_io.to(a.id).emit("START_GAME_RESOLVED", {
            inGame: a.inGame
        });

        // 1e3 - 1000

        let intE = a.initTime / 1e3;
        let int = setInterval(() => {
            // Change in-room timer
            a.initTime -= 1e3;

            // Alert players that timer was changed
            w_io.to(a.id).emit("ROOM_UPDATED", {
                initTime: a.initTime
            });

            // Check if timer needs for one more second
            if(--intE <= 0) {
                // Break timer
                clearInterval(int);

                // Launch game timer
                intE = a.gameTime / 1e3;
                int = setInterval(() => {
                    a.gameTime -= 1e3;

                    w_io.to(a.id).emit("ROOM_UPDATED", {
                        gameTime: a.gameTime
                    });

                    if(--intE <= 0) {
                        clearInterval(int);

                         w_io.to(a.id).emit("ROOM_UPDATED", {
                            inGame: false
                        });
                    }
                }, 1e3);
            }
        }, 1e3);

    });

    socket.on('disconnect', () => {
        // Quit all games
        rooms.forEach((io, ia, arr) => {
            let a = io.players.findIndex(io => io.id === socket.id);

            if(a !== -1) {
                arr[ia].players.splice(a, 1);

                w_io.to(io.id).emit("ROOM_UPDATED", {
                    players: arr[ia].players
                });
            }
        });

        // Remove from the sockets array
        delete sockets[socket.id];

        // ...
        console.log(`${ socket.id } disconnected from the game server!`);
    });
});