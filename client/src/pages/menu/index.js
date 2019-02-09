import React, { Component, Fragment } from 'react';
import './main.css';

import { connect } from 'react-redux';

import Loader from '../__forall__/load.icon'; 

class Hero extends Component {
    constructor(props) {
        super(props);

        this.state = {

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
        }

		return(
			<div className="rn rn-menu">
                <div />
                <section className="rn-menu-fork">
                    <button className="definp rn-menu-fork-button" onClick={ () => this.props.route("GAME_ROOM") }>Create a room</button>
                    <button className="definp rn-menu-fork-button">Join a room</button>
                </section>
                <section className="rn-menu-ps">
                    <span className="rn-menu-ps-creator">Game made by <a className="nolink" href="http://olchyk98.github.io">Oles Odynets</a></span>
                </section>
			</div>
		);
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
