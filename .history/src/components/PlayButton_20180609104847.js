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
        let trackStatus;
        if (!this._track._sound.sound.playState) {
            this._track._sound.sound.play();
             trackStatus = Sound.status.PLAYING;
            // this._track.saveState({
            //     trackStatus: Sound.status.PLAYING,
            //     trackLoop: (type === "all" ? true : false)
            // })
            // this._track.setState({
            //     trackStatus: Sound.status.PLAYING,
            //     trackLoop: (type === "all" ? true : false)
            // })
        } else {
            if (this._track._sound.sound.paused) {
                // if (type === "all" && !this._track.state.trackLoop) {
                //     this._track.setState({
                //         trackPosstion: this._track._sound.sound.position,
                //         trackVolume: this._track._sound.sound.volume,
                //         trackStatus: Sound.status.PLAYING,
                //         trackLoop: true
                //     })
                // } else if (type !== "all" && this._track.state.trackLoop) {
                //     this._track.setState({
                //         trackPosstion: this._track._sound.sound.position,
                //         trackVolume: this._track._sound.sound.volume,
                //         trackStatus: Sound.status.PLAYING,
                //         trackLoop: false
                //     })
                 trackStatus = Sound.status.PLAYING;
                // this._track.saveState({
                //     trackStatus: Sound.status.PLAYING,
                //     trackLoop: (type === "all" ? true : false)
                // })
                 this._track._sound.sound.resume();

            } else {
                 trackStatus = Sound.status.PAUSED;
                // this._track.saveState({
                //     trackStatus: Sound.status.paused,
                //     trackLoop: (type === "all" ? true : false)
                // })
                this._track._sound.sound.paused();
            }
        }
        this._track.saveState({
            trackStatus: trackStatus,
            trackLoop: (type === "all" ? true : false)
        })
        this.setState({ playing: !this.state.playing })
    }
    render() {
        console.error("play button " + this._track.trackIndex + " was renderd")
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
