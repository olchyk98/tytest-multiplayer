import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import socketIO from 'socket.io-client';

import Menu from './pages/menu';
import GameRoom from './pages/gameroom';

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

        // All websocket listeners
        a.on('connect', () => {
            this.props.setSocket(a);
        });
    }

    render() {
        return ({
            "MENU": <Menu />,
            "GAME_ROOM": <GameRoom />
        })[this.props.page];
    }
}

const mapStateToProps = ({ wsocket, currentPage }) => ({
    socket: wsocket,
    page: currentPage
});

const mapActionsToProps = {
    setSocket: socket => ({ type: "DECLARE_SOCKET", payload: socket })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(App);