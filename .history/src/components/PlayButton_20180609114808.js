import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/fontawesome-free-solid/'
import Sound from 'react-sound';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './PlayButton.css'
class PlayButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: this.props.playing,
            percentage: 0
        }
        this._track = this.props._track;
        this.playColor = this.props.playColor;
    }
    handlePlayButtonClicked = (type) => {
        if (!this._track._sound.sound.playState) {
            this._track._sound.sound.play();
        } else {
            if (this._track._sound.sound.paused) {
                this._track._sound.sound.resume();

            } else {
                this._track._sound.sound.pause();
            }
        }
        if (this._track.state.trackLoop != (type === "all"))
            this._track.saveState({
                trackLoop: type === "all"
            })
        this.setState({ playing: !this.state.playing })
    }
    render() {
        //console.error("play button " + this._track.trackIndex + " was renderd")
        return (
            <button className="playButton" onClick={this.handlePlayButtonClicked} >
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon
                        style={{ color: this.playColor }}
                        className='font-awesome playAwesome'
                        icon={this.state.playing ? faPause : faPlay}
                    />
                    <div style={{ position: '' }}>
                        <CircularProgressbar
                            textForPercentage={() => ''}
                            percentage={this.state.percentage}
                            initialAnimation={false}
                        />
                    </div>
                </div>
            </button>
        );
    }
}


export default PlayButton;
