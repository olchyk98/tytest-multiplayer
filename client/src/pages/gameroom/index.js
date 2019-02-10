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
            <button className={ `definp rn-gameroom-players-mat-item${ (this.props.canBan) ? " banall" : "" }` }>
                <span>{ this.props.nick }</span>
                <div className="definp">
                    <FontAwesomeIcon icon={ faBan } />
                </div>
            </button>
        );
    }
}

class Hero extends Component {
    render() {
        if(!this.props.room || !this.props.room.players) return <LoadBG />

        return(
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
                        <button className="definp rn-gameroom-players-start">
                            Start
                        </button>
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
                                />
                            ))
                        }
                    </FlipMove>
                </section>
            </div>
        );
    }
}

const mapStateToProps = ({ currentRoom, wsocketID }) => ({
    room: currentRoom,
    myID: wsocketID
});

export default connect(
    mapStateToProps
)(Hero);