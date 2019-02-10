import React, { Component } from 'react';
import { connect } from 'react-redux';

import socketIO from 'socket.io-client';

import Menu from './pages/menu';
import GameRoom from './pages/gameroom';
import Game from './pages/game';

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
        a.on("TELL_SOCKET", id => {
            if(!this.props.socket) {
                this.props.setSocket(a);
                this.props.setSocketID(id);
            }
        });

        // Disconnected from the game server
        a.on('disconnect', () => {
            this.props.castSocketError(true);
            a.open();
        });

        // Successfully created a new game room
        a.on("CREATE_ROOM_DONE", data => {
            if(typeof data !== "object") {
                alert("DEV ERROR. CONTACT DEVELOPER");
                console.error("SOCKET EVENT CREATE_ROOM_DONE DID NOT RETURN OBJECT");
            }


            this.props.setRoom(data);
        });
    }

    render() {
        return ({
            "MENU": <Menu />,
            "GAME_ROOM": <GameRoom />,
            "GAME_PROCESS": <Game />
        })[this.props.page];
    }
}

const mapStateToProps = ({ wsocket, currentPage }) => ({
    socket: wsocket,
    page: currentPage
});

const mapActionsToProps = {
    setSocket: socket => ({ type: "DECLARE_SOCKET", payload: socket }),
    setSocketID: id => ({ type: "DECLARE_SOCKRT_ID", payload: id }),
    setRoom: payload => ({ type: "SET_ROOM", payload }),
    castSocketError: payload => ({ type: "SET_SOCKET_ERROR", payload })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(App);