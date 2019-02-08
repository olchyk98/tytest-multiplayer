import React, { Component } from 'react';

import socketIO from 'socket.io-client';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {}

        this.socket = null;
    }

    componentDidMount() {
        // Initialize socket.io connection
        this.startSocket();
    }

    startSocket = () => {
        const a = socketIO("http://localhost:4000");

        // All websocket listeners
        a.on('connect', () => {
            this.socket = a;
            this.forceUpdate(); // DEBUG
        })
    }

    render() {
        return(
            <h1>{(this.socket) ? "Socket successfully loaded!" : "Still waiting for the websocket connection..."}</h1>
        );
    }
}

export default App;