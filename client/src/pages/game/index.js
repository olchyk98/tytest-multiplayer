import React, { Component, PureComponent } from 'react';
import './main.css';

class Dock extends Component {
    render() {
        return(
            <section className="rn-gameprocess-roomstats">
                <span className="rn-gameprocess-roomstats-pin">ROOM PIN: <strong>329784901</strong></span>
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
                <span className="rn-gameprocess-scoreboard-player-name">oles123</span>
                <span className="rn-gameprocess-scoreboard-player-score">31</span>
            </article>    
        );
    }
}

class Scoreboard extends Component {
    render() {
        return(
            <section className="rn-gameprocess-scoreboard">
                <ScoreBoardPlayer />
                <ScoreBoardPlayer />
                <ScoreBoardPlayer />
                <ScoreBoardPlayer />
                <ScoreBoardPlayer />
                <ScoreBoardPlayer />
                <ScoreBoardPlayer />
                <ScoreBoardPlayer />
                <ScoreBoardPlayer />
                <ScoreBoardPlayer />
                <ScoreBoardPlayer />
            </section>
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
                <div className="rn-gameprocess-input-rails" style={{
                    "transform": `translate(-${ this.props.cursorX }px, -50%)`
                }}>
                    {
                        this.props.text.map((session, index) => (
                            <div
                                key={ index }
                                ref={(ref) => {
                                    if(!ref) return;

                                    if(index === this.props.cursor) this.props.onReceiveCSplit(
                                        ref.getBoundingClientRect().width
                                    );
                                    else if(index === this.props.cursor - 1) this.props.onReceivePSplit(
                                        ref.getBoundingClientRect().width
                                    );
                                }}>
                                <span
                                    className={ `rn-gameprocess-input-letter${ (!session.passed) ? "" : " passed" }${ (!session.failed) ? "" : " failed" }` }>
                                    { session.symbol }
                                </span>
                            </div>
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
                    number="15"
                    title="seconds left"
                />
                <StatsBlock
                    number="15"
                    title="symbols"
                />
                <StatsBlock
                    number="4"
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
            cursorX: 0,
            inputInFocus: false
        }

        this.windowkd = null;
        this.currSplit = this.prevSplit = 0; // Next / Prev spacing
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

    focusInput = a => {
        if(a) {
            this.windowkd = ({ key }) => {
                if(key === "Backspace") {
                    if(this.state.cursor <= 0) return;

                    this.setState(({ cursor, cursorX }) => ({
                        cursor: cursor -1,
                        cursorX: cursorX - this.prevSplit
                    }));
                }

                if(![...' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,.!?()-+#$'].includes(key))
                    return;

                let a = Array.from(this.state.text);
                let b = a[this.state.cursor];

                if(!b) return; // end

                b.passed = true;
                b.failed = b.symbol !== key;

                this.setState(({ cursor, cursorX }) => ({
                    cursor: cursor + 1,
                    cursorX: cursorX + this.currSplit
                }));
            }

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
            <div className="rn rn-gameprocess">
                {/* dock */}
                <Dock />
                {/* scoreboard */}
                <Scoreboard />
                {/* input */}
                <Input
                    text={
                        this.state.text.filter((io, ia) => {
                            if(ia < window.innerWidth / 5 + this.state.cursor) {
                                return io;
                            }
                        })
                    }
                    cursor={ this.state.cursor }
                    cursorX={ this.state.cursorX }
                    onReceiveCSplit={ a => this.currSplit = a }
                    onReceivePSplit={ a => this.prevSplit = a }
                    _onFocus={ () => this.focusInput(true) }
                    _onBlur={ () => this.focusInput(false) }
                    inFocus={ this.state.inputInFocus }
                />
                {/* speed/time */}
                <Stats />
            </div>
        );
    }
}

export default Hero;