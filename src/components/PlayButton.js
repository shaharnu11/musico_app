import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/fontawesome-free-solid/'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './PlayButton.css'
//import styled from 'styled-components';
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
    handlePlayButtonClicked = () => {
        if (!this._track._sound.sound.playState) {
            this._track._sound.sound.play();
        } else {
            if (this._track._sound.sound.paused) {
                this._track._sound.sound.resume();

            } else {
                this._track._sound.sound.pause();
            }
        }
        
        // update track loop incase it was in loop due to playAll button 
        if (this._track.state.trackLoop)
            this._track.saveState({
                trackLoop: false
            })
        this.setState({ playing: !this.state.playing })
    }
    render() {
        return (
            <div className="playDiv">
                <button className="playButton" onClick={this.handlePlayButtonClicked} >
                    <div style={{ position: 'relative' }}>
                        <FontAwesomeIcon
                            style={{ color: this.playColor }}
                            className='font-awesome playAwesome'
                            icon={this.state.playing ? faPause : faPlay}
                        />
                        <div>
                            <CircularProgressbar
                                textForPercentage={() => ''}
                                percentage={this.state.percentage}
                                initialAnimation={false}
                                styles={{
                                    path: {fill:`${this.playColor}`,stroke:`${this.playColor}` },
                                  }}
                            />
                        </div>
                    </div>
                </button>
            </div>
        );
    }
}



export default PlayButton;
