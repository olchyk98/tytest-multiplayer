import React, { Component } from 'react';
import './main.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

import FlipMove from 'react-flip-move';

class Player extends Component {
    render() {
        return(
            <button className="definp rn-gameroom-players-mat-item">
                <span>oles123</span>
                <div className="definp">
                    <FontAwesomeIcon icon={ faBan } />
                </div>
            </button>
        );
    }
}

class Hero extends Component {
    render() {
        return(
            <div className="rn rn-gameroom">
                <section className="rn-gameroom-jointit">
                    <span className="rn-gameroom-jointit-mat">Other players can join this room using PIN: <strong>1238742</strong></span>
                </section>
                <section className="rn-gameroom-players">
                    <section className="rn-gameroom-players-init">
                        <div className="rn-gameroom-players-init-num">
                            <span className="rn-gameroom-players-init-num-mat">4</span>
                            <span className="rn-gameroom-players-init-num-tit">players</span>
                        </div>
                        <button className="definp rn-gameroom-players-start">
                            Start
                        </button>
                    </section>
                    <FlipMove className="rn-gameroom-players-mat" enterAnimation="fade" leaveAnimation="fade">
                        <Player />
                    </FlipMove>
                </section>
            </div>
        );
    }
}

export default Hero;