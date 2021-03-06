import React, { Component } from 'react';
import './Track.css';
import Sound from 'react-sound';
import PlayButton from './PlayButton'
import ReactLoading from 'react-loading';

import PlayerView from './PlayerView'

class Track extends Component {

    constructor(props) {
        super(props);

        // temp var - make sure the component will rerender in case it needed
        this.state = {
            trackLoaded: false,
            trackStatus: Sound.status.STOPPED,
            trackLoop: false,
            trackVolume: 100,
            trackPosstion: 0,
            temp: -1
        }

        this.trackIndex = props.trackIndex;
        this.trackDetails = props.trackDetails;

        // reference to trackList
        this._trackList = props._trackList;
        this.playColor = props.playColor;
    }


    handleTrackLoaded = (track) => {
        // update when the track is loaded (prevent lags)

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
        // play the track only if it's not playing already and it has been loaded
        if (this.state.trackLoaded) {
            this.setState({
                trackStatus: Sound.status.PLAYING,
                trackPosstion: 0,
                trackVolume: this._sound.sound.volume,
                trackLoop: true,
                temp: this.state.temp * -1
            })
            this._playButton.setState({
                percentage: 0,
                playing: true
            })
        }
    }

    resumeTrack = () => {
        // play the track only if it's not playing already and it has been loaded
        if (this.state.trackLoaded) {
            if (!this._sound.sound.playState)
                this._sound.sound.play()
            else if (this._sound.sound.paused) {
                this._sound.sound.resume();
            }
        }
        this._playButton.setState({
            playing: true
        })
    }

    resetTrack = () => {
        // reset track in case stopAll button was pressed(set position:0 )
        if (this.state.trackLoaded) {
            this._sound.sound.pause();
            this.setState({
                trackStatus: Sound.status.PAUSED,
                trackPosstion: 0,
                trackVolume: this._sound.sound.volume,
                trackLoop: true,
                temp: this.state.temp * -1
            })
            this._playButton.setState({
                percentage: 0,
                playing: false
            })
        }
    }

    handleTrackFinishedPlaying = () => {
        // update play button icon (svg) to pause sign
        this._playButton.setState({ playing: false, percentage: 0 })
    }





    handleTrackPlaying = (track) => {
        // update play button progress circle
        if (this._sound && !this._sound.sound.paused) {
            this._playButton.setState({
                percentage: (track.position / track.duration) * 100
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        // update component (render it) only if state is chaneged
        if (nextState) {
            for (let key in nextState) {
                if (nextState[key] !== this.state[key]) {
                    return true;
                }
            }
        }
        return false;
    }

    render() {
        const trackDetails = this.trackDetails;

        // generate the track sound
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
            playbackRate={1}
        />

        // In case sound isn't loaded yet -> load "loading animation" while loading sound
        if (!this.state.trackLoaded) {
            return (
                <div className="divLoading">
                    <ReactLoading type={'bars'} color={'lightgray'} />
                    {sound}
                </div>
            )
        }
        else {
            // otherwise load the entire playView with the sound
            return (
                <div>
                    {sound}
                    <div className="songBox" >
                        <PlayButton
                            ref={_playButton => this._playButton = _playButton}
                            _track={this}
                            playing={this.trackStatus === Sound.status.PLAYING ? true : false}
                            playColor={this.playColor}
                        />
                        <PlayerView
                            ref={_playerView => this._playerView = _playerView}
                            trackDetails={trackDetails}
                            trackIndex={this.trackIndex}
                            _track={this} />

                    </div>
                    <hr className={"songHr"} />

                </div>

            );
        }
    }
}


export default Track;
