import React, { Component } from 'react';
import './Track.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTrashAlt, faVolumeUp } from '@fortawesome/fontawesome-free-solid/'
import ReactSimpleRange from 'react-simple-range';
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

    handleVolumeChange = (newVolume) => {
        // update sound volume
        this._sound.sound.setVolume(newVolume.value);
    }

    handleTrashButtonClicked = () => {
        this._trackList.removeTrack(this.trackIndex);
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
        console.error("should update? " + this.state.trackIndex)
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
            const originalBpm = <span onClick={this.handleOriginalBpmClicked}>
                ({trackDetails.bpm}  )
             </span>

            // Calculate total number of bits 
            const trackBpm = <DeatailsDiv ref={_trackBpm => this._trackBpm = _trackBpm} bpm={trackDetails.bpm} />
            const trackDuriationInSec = this._sound.sound.duration / 1000
            const trackBitsPerSec = ((!this._trackBpm || this._trackBpm.state.newBpm === -1 ? trackDetails.bpm : this._trackBpm.state.newBpm) / 60)
            const totalNumberOfBits = Math.ceil(trackDuriationInSec * trackBitsPerSec) + "b"
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
                        <div className="detailsDivWrap">
                            <div className="detailsDiv">
                                <div className="detailsDiv_name">{trackDetails.owner}</div>
                                <div className="detailsDiv_artist">{trackDetails.songName}</div>
                                {trackBpm}
                                {/* <div className="detailsDiv_bpm">BPM:
                                {this.state.trackBpm === -1 ? trackDetails.bpm : "" + this.state.trackBpm}
                                {this.state.trackBpm === -1 ? "" : originalBpm}
                            </div> */}
                            </div>

                            <div className="volumeDiv">
                                <span className={"detailsDiv_bars"} >{totalNumberOfBits}</span>
                                <button className="trashButton" onClick={this.handleTrashButtonClicked}>
                                    <FontAwesomeIcon className='font-awesome' icon={faTrashAlt} size="sm" />
                                </button>

                                <div className="volumeDiv_allBar">
                                    <FontAwesomeIcon
                                        className='font-awesome'
                                        icon={faVolumeUp}
                                    />
                                    <div className="volumeDiv_bar">
                                        <ReactSimpleRange
                                            sliderSize={3}
                                            thumbSize={8}
                                            trackColor={"black"}
                                            sliderColor={"lightGray"}
                                            thumbColor={"black"}
                                            onChange={this.handleVolumeChange}
                                            value={this.state.trackVolume}
                                        />
                                    </div>

                                </div>
                            </div>


                        </div>

                    </div>
                    <hr className={"songHr"} />

                </div>

            );
        }
    }
}


export default Track;
