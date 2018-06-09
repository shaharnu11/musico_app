import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTrashAlt, faVolumeUp } from '@fortawesome/fontawesome-free-solid/'
import ReactSimpleRange from 'react-simple-range';
class PlayerView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newBpm: -1
        }
        this.trackDetails = this.props.trackDetails;
        this.trackIndex = this.props.trackIndex;

        // reference to track
        this._track = this.props._track
    }

    handleOriginalBpmClicked = () => {
        // set track bpm to the original bpm
        this.setState({ newBpm: -1 })
    }
    handleVolumeChange = (newVolume) => {
        // update track volume
        this._track._sound.sound.setVolume(newVolume.value);
    }

    handleTrashButtonClicked = () => {
        // remove track from active sound list
        this._track._trackList.removeTrack(this.trackIndex);
    }

    createBpmView = () => {
        // create the bpm view (the view under the artist name)
        const bpmView = [];
        if (this.state.newBpm === -1) {
            bpmView.push(this.trackDetails.bpm)
        } else {
            bpmView.push(this.state.newBpm)
            bpmView.push(
                <span key={1} onClick={this.handleOriginalBpmClicked}>({this.trackDetails.bpm})</span>
            )
        }
        return bpmView;
    }

    calculateTotalNumberOfBits = () => {
        // track duritaion in second * track bps(bit per second)
        const trackDuriationInSec = this._track._sound.sound.duration / 1000
        const trackBitsPerSec = ((this.state.newBpm === -1 ? this.trackDetails.bpm : this.state.newBpm) / 60)
        return Math.ceil(trackDuriationInSec * trackBitsPerSec) + "b"

    }

    render() {
        const trackDetails = this.trackDetails
        const totalNumberOfBits = this.calculateTotalNumberOfBits();
        const bpmView = this.createBpmView();
        
        return (
            <div className="detailsDivWrap" >
                <div className="detailsDiv">
                    <div className="detailsDiv_name">{trackDetails.owner}</div>
                    <div className="detailsDiv_artist">{trackDetails.songName}</div>
                    <div className="detailsDiv_bpm">BPM:
                    {bpmView}
                    </div>
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
                                value={this._track.state.trackVolume}
                            />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


export default PlayerView;
