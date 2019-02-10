import React, { Component } from 'react';
import './main.css';

import { connect } from 'react-redux';

import Loader from '../__forall__/load.icon'; 

class Hero extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPINRoom: false
        }
    }

	render() {
        if(!this.props.socket) {
            return (
                <div className="rn rn-menu">
                    <div />
                    <Loader />
                    <div />
                </div>
            )
        } else if(!this.state.isPINRoom) {
            return(
                <div className="rn rn-menu">
                    <div />
                    <section className="rn-menu-fork">
                        <button className="definp rn-menu-fork-button" onClick={ () => this.props.route("GAME_ROOM") }>Create a room</button>
                        <button className="definp rn-menu-fork-button" onClick={ () => this.setState({ isPINRoom: true }) }>Join a room</button>
                    </section>
                    <section className="rn-menu-ps">
                        <span className="rn-menu-ps-creator">Game made by <a className="nolink" href="http://olchyk98.github.io">Oles Odynets</a></span>
                    </section>
                </div>
            );
        } else { // ROOM BY PIN
            return(
                <div className="rn rn-menu">
                    <div />
                    <div className="rn-menu-piroom">
                        <button className="definp rn-menu-fork-button" onClick={ () => this.setState({ isPINRoom: false }) }>Back</button>
                        <input className="definp rn-menu-piroom-pininput" placeholder="Game PIN" type="number" />
                        <button className="definp rn-menu-fork-button" onClick={ () => this.props.route("GAME_ROOM") }>Enter</button>
                    </div>
                    <div />
                </div>
            );
        }
	}
}

const mapStateToProps = ({ wsocket }) => ({
    socket: wsocket
});

const mapActionsToProps = {
    setSocket: socket => ({ type: "DECLARE_SOCKET", payload: socket }),
    route: payload => ({ type: "ROUTE_PAGE", payload })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Hero);
