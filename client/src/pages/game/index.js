import React, { Component, PureComponent } from 'react';
import './main.css';

import { connect } from 'react-redux';

import LoadBG from '../__forall__/loadingbg';
import FlipMove from 'react-flip-move';

class Dock extends PureComponent {
    render() {
        return(
            <section className="rn-gameprocess-roomstats">
                <span className="rn-gameprocess-roomstats-pin">ROOM PIN: <strong>{ this.props.pin }</strong></span>
            </section>
        );
    }
}

class ScoreBoardPlayer extends PureComponent {
    render() {
        return(
            <article className="rn-gameprocess-scoreboard-player">
                <section
                    className="rn-gameprocess-scoreboard-player-color"
                    style={{
                        background: "red"
                    }}></section>
                <span className="rn-gameprocess-scoreboard-player-name">{ this.props.nick }</span>
                <span className="rn-gameprocess-scoreboard-player-score">{ this.props.symbols }</span>
            </article>    
        );
    }
}

class Scoreboard extends Component {
    render() {
        return(
            <FlipMove enterAnimation="fade" leaveAnimation="fade" className="rn-gameprocess-scoreboard">
                {
                    this.props.players
                    .sort(({ symbolsTyped: a }, { symbolsTyped: b }) => a > b).map(({ id, symbolsTyped, nickname }) => (
                        <ScoreBoardPlayer
                            key={ id }
                            symbols={ symbolsTyped }
                            nick={ nickname }
                        />
                    ))
                }
            </FlipMove>
        );
    }
}

class Input extends PureComponent { // WARNING: DO NOT USE STATELESS COMPONENT HERE.
    render() {
        return(
            <section
                className={ `rn-gameprocess-input${ (!this.props.inFocus) ? "" : " infocus" }` }
                tabIndex="-1"
                onFocus={ this.props._onFocus }
                onBlur={ this.props._onBlur }>
                <div className="rn-gameprocess-input-rails left">
                    {
                        this.props.symbolsPassed.map((session, index) => (
                            <span
                                key={ index }
                                className={ `rn-gameprocess-input-letter passed${ (session.symbol !== " ") ? "" : " space" }${ (!session.failed) ? "" : " failed" }` }>
                                { session.symbol }
                            </span>
                        ))  
                    }
                </div>
                <div className="rn-gameprocess-input-rails right">
                    {
                        this.props.symbols.map((session, index) => (
                            <span
                                key={ index }
                                className={ `rn-gameprocess-input-letter${ (session.symbol !== " ") ? "" : " space" }${ (!session.failed) ? "" : " failed" }` }>
                                { session.symbol }
                            </span>
                        ))  
                    }
                </div>
            </section>
        );
    }
}

class StatsBlock extends PureComponent {
    render() {
        return(
            <div className="rn-gameprocess-stats-block">
                <span className="rn-gameprocess-stats-block-number">{ this.props.number }</span>
                <span className="rn-gameprocess-stats-block-title">{ this.props.title }</span>
            </div>
        );
    }
}

class Stats extends Component {
    render() {
        return(
            <section className="rn-gameprocess-stats">
                <StatsBlock
                    number={ this.props.sleft }
                    title="seconds left"
                />
                <StatsBlock
                    number={ this.props.symbols }
                    title="symbols"
                />
                <StatsBlock
                    number={ this.props.mypos }
                    title="position"
                />
            </section>
        );
    }
}

class Hero extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: [],
            cursor: 0,
            inputInFocus: false
        }

        this.windowkd = null;
    }

    componentDidMount() {
        this.setState(() => ({
            text: `
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare vestibulum elit, cursus maximus arcu efficitur eu. Donec turpis leo, viverra sed orci ac, semper ullamcorper ligula. Nam a diam eget mi ultricies suscipit id a dolor. Aenean posuere hendrerit fringilla. Proin posuere lobortis mi id tincidunt. Nulla accumsan orci dui, sed placerat massa consequat non. Nam interdum eget dolor quis venenatis. Nulla tempor pellentesque mauris bibendum sollicitudin. In facilisis porttitor odio nec vestibulum. Donec sollicitudin vel massa ut rhoncus.
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare vestibulum elit, cursus maximus arcu efficitur eu. Donec turpis leo, viverra sed orci ac, semper ullamcorper ligula. Nam a diam eget mi ultricies suscipit id a dolor. Aenean posuere hendrerit fringilla. Proin posuere lobortis mi id tincidunt. Nulla accumsan orci dui, sed placerat massa consequat non. Nam interdum eget dolor quis venenatis. Nulla tempor pellentesque mauris bibendum sollicitudin. In facilisis porttitor odio nec vestibulum. Donec sollicitudin vel massa ut rhoncus.
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare vestibulum elit, cursus maximus arcu efficitur eu. Donec turpis leo, viverra sed orci ac, semper ullamcorper ligula. Nam a diam eget mi ultricies suscipit id a dolor. Aenean posuere hendrerit fringilla. Proin posuere lobortis mi id tincidunt. Nulla accumsan orci dui, sed placerat massa consequat non. Nam interdum eget dolor quis venenatis. Nulla tempor pellentesque mauris bibendum sollicitudin. In facilisis porttitor odio nec vestibulum. Donec sollicitudin vel massa ut rhoncus.
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare vestibulum elit, cursus maximus arcu efficitur eu. Donec turpis leo, viverra sed orci ac, semper ullamcorper ligula. Nam a diam eget mi ultricies suscipit id a dolor. Aenean posuere hendrerit fringilla. Proin posuere lobortis mi id tincidunt. Nulla accumsan orci dui, sed placerat massa consequat non. Nam interdum eget dolor quis venenatis. Nulla tempor pellentesque mauris bibendum sollicitudin. In facilisis porttitor odio nec vestibulum. Donec sollicitudin vel massa ut rhoncus.
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare vestibulum elit, cursus maximus arcu efficitur eu. Donec turpis leo, viverra sed orci ac, semper ullamcorper ligula. Nam a diam eget mi ultricies suscipit id a dolor. Aenean posuere hendrerit fringilla. Proin posuere lobortis mi id tincidunt. Nulla accumsan orci dui, sed placerat massa consequat non. Nam interdum eget dolor quis venenatis. Nulla tempor pellentesque mauris bibendum sollicitudin. In facilisis porttitor odio nec vestibulum. Donec sollicitudin vel massa ut rhoncus.
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare vestibulum elit, cursus maximus arcu efficitur eu. Donec turpis leo, viverra sed orci ac, semper ullamcorper ligula. Nam a diam eget mi ultricies suscipit id a dolor. Aenean posuere hendrerit fringilla. Proin posuere lobortis mi id tincidunt. Nulla accumsan orci dui, sed placerat massa consequat non. Nam interdum eget dolor quis venenatis. Nulla tempor pellentesque mauris bibendum sollicitudin. In facilisis porttitor odio nec vestibulum. Donec sollicitudin vel massa ut rhoncus.
            `.trim().split("").map(io => ({
                failed: false,
                passed: false,
                symbol: io
            }))
        }));
    }

    processTyping = ({ key }) => {
        if(!this.props.room.gameTime || this.props.room.initTime) return;

        if(key === "Backspace") {
            if(this.state.cursor <= 0) return;

            let a = Array.from(this.state.text),
                b = a[this.state.cursor - 1];

            if(!b) return;

            b.passed = false;

            this.setState(({ cursor, cursorX }) => ({
                cursor: cursor - 1,
                text: a
            }));
        }

        if(![...' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,.!?()-+#$'].includes(key))
            return;

        let a = Array.from(this.state.text);
        let b = a[this.state.cursor];

        if(!b) return; // end

        let submit = false;
        if(!b.passed) submit = true;

        b.passed = true;
        b.failed = b.symbol !== key;

        if(submit && b.failed) submit = false;

        this.setState(({ cursor, cursorX }) => ({
            cursor: cursor + 1,
            cursorX: cursorX + this.currSplit
        }));

        if(submit) {
            this.props.socket.emit("GAME_SYMBOL_SUBMIT", {
                roomID: this.props.room.id
            });
        }
    }

    focusInput = a => {
        if(a) {
            this.windowkd = this.processTyping;

            window.addEventListener('keydown', this.windowkd);
            this.setState(() => ({
                inputInFocus: true
            }));
        } else {
            window.removeEventListener('keydown', this.windowkd);
            this.windowkd = null;
            this.setState(() => ({
                inputInFocus: false
            }));
        }
    }

    render() {
        return(
            <>
                {
                    (!this.props.socketError) ? null : <LoadBG />
                }
                {
                    (!this.props.room.initTime) ? null : (
                        <div className="rn-gameprocess_out-init">
                            <span>{ this.props.room.initTime / 1000 }</span>
                        </div>    
                    )
                }
                <div className="rn rn-gameprocess">
                    {/* dock */}
                    <Dock
                        pin={ this.props.room.pin }
                    />
                    {/* scoreboard */}
                    <Scoreboard
                        players={ this.props.room.players }
                    />
                    {/* input */}
                    <Input
                        symbols={ this.state.text.filter(io => !io.passed).slice(0, this.state.cursor + window.innerWidth / 5) }
                        symbolsPassed={ this.state.text.filter(io => io.passed) }
                        cursor={ this.state.cursor }
                        _onFocus={ () => this.focusInput(true) }
                        _onBlur={ () => this.focusInput(false) }
                        inFocus={ this.state.inputInFocus }
                    />
                    {/* speed/time */}
                    <Stats
                        sleft={ this.props.room.gameTime / 1000 }
                        symbols={ this.props.room.players.find(io => io.id === this.props.myID).symbolsTyped }
                        mypos={ this.props.room.players.findIndex(io => io.id === this.props.myID) + 1 }
                    />
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ currentRoom, socketError, wsocketID, wsocket }) => ({
    room: currentRoom,
    socketError,
    myID: wsocketID,
    socket: wsocket
});

// const mapActionsToProps = {
// 
// }

export default connect(
    mapStateToProps
    // mapActionsToProps
)(Hero);