import React, { Component } from 'react';
import './main.css';

import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

class Icon extends Component {
    render() {
        if(!this.props.target) return null;

        return(
            <div>
               <FontAwesomeIcon icon={{
                   'RED': faBan
               }[this.props.target]} /> 
            </div>
        );
    }
}

class Hero extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        }

        this.offInt = null;
    }

    componentDidUpdate({ error }) {
        if(
            (
                (!error && this.props.error) ||
                (this.props.error && !error)
            ) ||
            (
                error && this.props.error &&
                (
                    (error.text !== this.props.error.text) ||
                    (error.target !== this.props.error.target)
                )
            )
        ) { // New error
            clearTimeout(this.offInt);

            this.setState(() => ({
                error: this.props.error
            }));

            this.offInt = setTimeout(() => {
                this.setState(() => ({
                    error: null
                }), this.props.destroyError);
            }, 4e3);
        }
    }

    render() {
        return(
            <div className={ `gl-globalerror${ (!this.state.error) ? "" : " active" }` }>
                <Icon
                    target={ this.state.error && this.state.error.target }
                />
                <span>{ this.state.error && this.state.error.text }</span>
            </div>
        );
    }
}

const mapStateToProps = ({ globalError }) => ({
    error: globalError
});

const mapActionsToProps = {
    destroyError: () => ({ type: "CAST_ERROR", payload: null })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Hero);