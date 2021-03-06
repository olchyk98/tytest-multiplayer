import React, { Component, PureComponent } from 'react';
import './main.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';

import LoadBG from '../__forall__/loadingbg';
import FlipMove from 'react-flip-move';

class Player extends PureComponent {
    render() {
        return(
            <button className={ `definp rn-gameroom-players-mat-item${ (this.props.canBan) ? " banall" : "" }` } onClick={ this.props.onBan }>
                <span>{ this.props.nick }</span>
                <div className="definp">
                    <FontAwesomeIcon icon={ faBan } />
                </div>
            </button>
        );
    }
}

class Hero extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEntering: false
        }
    }

    startGame = () => {
        this.setState(() => ({
            isEntering: true
        }));
        this.props.socket.emit("START_GAME", {
            roomID: this.props.room.id
        });
    }

    render() {
        if(!this.props.room || !this.props.room.players) return <LoadBG />

        return(
            <>
                { (!this.props.socketError && !this.state.isEntering) ? null : <LoadBG /> }
                <div className="rn rn-gameroom">
                    <section className="rn-gameroom-jointit">
                        <span className="rn-gameroom-jointit-mat">Other players can join this room using PIN: <strong>{ this.props.room.pin }</strong></span>
                    </section>
                    <section className="rn-gameroom-players">
                        <section className="rn-gameroom-players-init">
                            <div className="rn-gameroom-players-init-num">
                                <span className="rn-gameroom-players-init-num-mat">{ this.props.room.players.length }</span>
                                <span className="rn-gameroom-players-init-num-tit">players</span>
                            </div>
                            {
                                (this.props.room.creator !== this.props.myID) ? null : (
                                    <button className="definp rn-gameroom-players-start" onClick={ this.startGame }>
                                        Start
                                    </button>
                                )
                            }
                        </section>
                        <FlipMove className="rn-gameroom-players-mat" enterAnimation="fade" leaveAnimation="fade">
                            {
                                this.props.room.players.map((session) => (
                                    <Player
                                        key={ session.id }
                                        nick={ session.nickname }
                                        canBan={
                                            this.props.room.creator === this.props.myID &&
                                            this.props.room.creator !== session.id
                                        }
                                        onBan={() => {
                                            this.props.socket.emit("ROOM_KICK_USER", {
                                                roomID: this.props.room.id,
                                                userID: session.id
                                            })    
                                        }}
                                    />
                                ))
                            }
                        </FlipMove>
                    </section>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ currentRoom, wsocketID, socketError, wsocket }) => ({
    room: currentRoom,
    myID: wsocketID,
    socketError,
    socket: wsocket
});

export default connect(
    mapStateToProps
)(Hero);