import React, { Component } from 'react';
import './Track.css';
import Sound from 'react-sound';
import PlayButton from './PlayButton'
import ReactLoading from 'react-loading';

import PlayerView from './PlayerView'

class Track extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trackLoaded: false,
            trackStatus: Sound.status.STOPPED,
            trackLoop: false,
            trackVolume: 100,
            trackPosstion: 0,
        }
        
        this.trackIndex = props.trackIndex;
        this.trackDetails = props.trackDetails;
        this._trackList = props._trackList;
        this.playColor = props.playColor;
    }


    handleTrackLoaded = () => {
        this.setState({ trackLoaded: true })
    }

    saveState = (json) => {
        // save sound state to the track component state (json: possible aditional state)
        if (this.state.trackLoaded) {
            let trackStatus;
            if (!this._sound.sound.playState)
                trackStatus = Sound.status.STOPPED;
            else {
                if (this._sound.sound.paused)
                    trackStatus = Sound.status.PAUSED;
                else
                    trackStatus = Sound.status.PLAYING

            }
            this.setState({
                trackPosstion: this._sound.sound.position,
                trackVolume: this._sound.sound.volume,
                trackStatus: trackStatus,
                ...json,
            })
        }
    }

    playTrack = () => {
        if (this.state.trackLoaded && !this._playButton.state.playing) {
            this._playButton.handlePlayButtonClicked("all");
        }
    }

    resetTrack = () => {
        if (this.state.trackLoaded) {
            this._sound.sound.pause();
            this.saveState({
                trackStatus: Sound.status.PAUSED,
                trackPosstion: 0,
            })
            this._playButton.setState({
                percentage: 0,
                playing: false
            })
        }
    }


    handleTrackFinishedPlaying = () => {
        // update play button icon (svg)
        this._playButton.setState({ playing: false })
    }

 



    handleTrackPlaying = (track) => {
        // update play button progress circle
        if (this._sound && !this._sound.sound.paused) {
            this._playButton.setState({
                percentage: (track.position / track.duration) * 100
            })
        }
    }

    handleOriginalBpmClicked = () => {
        // set track bpm to the original bpm
        this.saveState({ trackBpm: -1 })
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.error("should update? " + this.trackIndex)
        for (let key in nextState) {
            if (nextState[key] !== this.state[key]) {
                console.error("yes")
                console.error(key + "  " + nextState[key] + "  " + this.state[key])
                return true;
            }
        }
        return false;

    }
    render() {
        console.error(this.trackIndex + " was renderd")
        const trackDetails = this.trackDetails;
        const sound = <Sound
            ref={_sound => this._sound = _sound}
            url={trackDetails.url}
            playStatus={this.state.trackLoaded ? this.state.trackStatus : Sound.status.STOPPED}
            playFromPosition={this.state.trackPosstion}
            onLoad={this.handleTrackLoaded}
            onPlaying={this.handleTrackPlaying}
            autoLoad={true}
            position={this.state.trackPosstion}
            onFinishedPlaying={this.handleTrackFinishedPlaying}
            loop={this.state.trackLoop}
            volume={this.state.trackVolume}
        />
        // In case track isn't loaded yet -> load loading animation
        if (!this.state.trackLoaded) {
            return (
                <div className="divLoading">
                    <ReactLoading type={'bars'} color={'lightgray'} />
                    {sound}
                </div>
            )
        }
        else {

            return (
                <div>
                    {sound}
                    <div className="songBox" >
                        <div className="playDiv">
                            <PlayButton
                                ref={_playButton => this._playButton = _playButton}
                                _track={this}
                                playing={this.trackStatus === Sound.status.PLAYING ? true : false}
                                playColor={this.playColor}
                            />
                        </div>
                        <PlayerView
                            ref={_playerView => this._playerView = _playerView}
                            trackDetails={trackDetails}
                            _track={this} />

                    </div>
                    <hr className={"songHr"} />

                </div>

            );
        }
    }
}


export default Track;
