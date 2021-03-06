import React, { Component } from 'react';
import { connect } from 'react-redux';

import socketIO from 'socket.io-client';

import Menu from './pages/menu';
import GameRoom from './pages/gameroom';
import Game from './pages/game';

import GlobalError from './pages/__forall__/global.error';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        if(!this.props.socket) {
            // Initialize socket.io connection
            this.startSocket();
        }
    }

    startSocket = () => {
        const a = socketIO("http://localhost:4000");

        // Connected to the game server
        a.on('connect', () => {
            this.props.castSocketError(false);
        });

        // Receive socket id and confirm that server works
        a.on("TELL_SOCKET", ({ id }) => {
            if(!this.props.socket) {
                this.props.setSocket(a);
                this.props.setSocketID(id);
            }
        });

        // Disconnected from the game server
        a.on('disconnect', () => {
            this.props.castSocketError(true);
            this.props.castError({ text: "Connection Lost", target: 'RED' });
            a.open();
        });

        // Successfully created a new game room
        a.on("JOIN_ROOM_SUCCESS", ({ pin, players, inGame, creator, id, initTime, gameTime }) => {
            this.props.setRoom({ pin, players, inGame, creator, id, initTime, gameTime });
            this.props.route("GAME_ROOM");
        });

        // Room data updated
        a.on("ROOM_UPDATED", data => {
            this.props.setRoom(data);
        });

        // Game started
        a.on("START_GAME_RESOLVED", ({ inGame }) => {
            if(!this.props.currentRoom || !this.props.currentRoom.players.map(io => io.id).includes(this.props.myID)) return;

            this.props.setRoom({ inGame });
            this.props.route("GAME_PROCESS");
        });

        // Room error
        a.on("ROOM_ERROR", ({ text, target }) => {
            this.props.castError({ text, target });
        });
    }

    render() {
        const Page = {
            "MENU": Menu,
            "GAME_ROOM": GameRoom,
            "GAME_PROCESS": Game
        }[this.props.page];

        return (
            <>
                <GlobalError />
                <Page />
            </>
        );
    }
}

const mapStateToProps = ({ wsocket, currentPage, currentRoom, wsocketID }) => ({
    socket: wsocket,
    page: currentPage,
    currentRoom,
    myID: wsocketID
});

const mapActionsToProps = {
    setSocket: socket => ({ type: "DECLARE_SOCKET", payload: socket }),
    setSocketID: id => ({ type: "DECLARE_SOCKRT_ID", payload: id }),
    setRoom: payload => ({ type: "SET_ROOM", payload }),
    castSocketError: payload => ({ type: "SET_SOCKET_ERROR", payload }),
    castError: payload => ({ type: "CAST_ERROR", payload }),
    route: payload => ({ type: "ROUTE_PAGE", payload })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(App);