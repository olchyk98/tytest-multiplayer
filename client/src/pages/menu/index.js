import React, { Component } from 'react';
import './main.css';

import { connect } from 'react-redux';

import Loader from '../__forall__/load.icon';
import LoadBG from '../__forall__/loadingbg';

class Hero extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPINRoom: false,
            isGetName: false,
            task: "",
            nickname: "",
            PIN: "",
            isEntering: false
        }
    }

    createRoom = () => {
        this.props.socket.emit("CREATE_ROOM", this.state.nickname);
        this.setState(() => ({ isEntering: true }));
    }

    joinRoom = () => {
        this.props.socket.emit("JOIN_ROOM", { pin: this.state.PIN, nickname: this.state.nickname });
        this.setState(() => ({ isEntering: true }));
    }

	render() {
        return(
            <>
                {
                    (!this.state.isEntering) ? null : <LoadBG />
                }
                {
                    (!this.props.socket) ? (
                        <div className="rn rn-menu">
                            <div />
                            <Loader />
                            <div />
                        </div>
                    ) : (this.state.isGetName) ? (
                        <div className="rn rn-menu">
                            <div />
                            <div className="rn-menu-piroom">
                                <input
                                    className="definp rn-menu-piroom-pininput"
                                    placeholder="Your nickname"
                                    type="text"
                                    onChange={ ({ target: { value } }) => this.setState({ nickname: value }) }
                                />
                                <button className="definp rn-menu-fork-button" onClick={() => {
                                    if(!this.state.nickname.replace(/\s|\n/g, "").length) return;

                                    if(this.state.task === "NEW_ROOM") {
                                        this.createRoom();
                                    } else if(this.state.task === "JOIN_ROOM") {
                                        this.joinRoom();
                                    }
                                }}>Enter</button>
                            </div>
                            <div />
                        </div>
                    ) : (!this.state.isPINRoom) ? (
                        <div className="rn rn-menu">
                            <div />
                            <section className="rn-menu-fork">
                                <button className="definp rn-menu-fork-button" onClick={ () => this.setState({ isGetName: true, task: "NEW_ROOM" }) }>Create a room</button>
                                <button className="definp rn-menu-fork-button" onClick={ () => this.setState({ isPINRoom: true }) }>Join a room</button>
                            </section>
                            <section className="rn-menu-ps">
                                <span className="rn-menu-ps-creator">Game made by <a className="nolink" href="http://olchyk98.github.io">Oles Odynets</a></span>
                            </section>
                        </div>
                    ) : (
                        <div className="rn rn-menu">
                            <div />
                            <div className="rn-menu-piroom">
                                <button className="definp rn-menu-fork-button" onClick={ () => this.setState({ isPINRoom: false }) }>Back</button>
                                <input
                                    className="definp rn-menu-piroom-pininput"
                                    placeholder="Game PIN"
                                    type="number"
                                    onChange={ ({ target: { value: a } }) => this.setState({ PIN: a }) }
                                />
                                <button className="definp rn-menu-fork-button" onClick={ () => this.setState({ isGetName: true, task: "JOIN_ROOM" }) }>Enter</button>
                            </div>
                            <div />
                        </div>
                    )
                }
            </>
        );
	}
}

const mapStateToProps = ({ wsocket }) => ({
    socket: wsocket
});

const mapActionsToProps = {
    setSocket: socket => ({ type: "DECLARE_SOCKET", payload: socket })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Hero);
