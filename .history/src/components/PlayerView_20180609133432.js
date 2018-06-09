import React, { Component } from 'react';
class PlayerView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bpm: this.props.bpm,
            newBpm: -1
            // disabled: false
        }
        this.trackDetails = this.props.trackDetails;
        this._track = this.props._track
    }

    handleOriginalBpmClicked = () => {
        // set track bpm to the original bpm
        this.setState({ newBpm: -1 })
    }
    render() {
        const originalBpm = <span onClick={this.handleOriginalBpmClicked}>
            ({this.state.bpm}  )
             </span>
        const trackDetails = this.trackDetails
        return (
            <div className="detailsDivWrap">
                <div className="detailsDiv">
                    <div className="detailsDiv_name">{trackDetails.owner}</div>
                    <div className="detailsDiv_artist">{trackDetails.songName}</div>
                    <div className="detailsDiv_bpm">BPM:
                {this.state.newBpm === -1 ? this.state.bpm : this.state.newBpm}
                        {this.state.newBpm === -1 ? "" : originalBpm}
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
                                value={this.state.trackVolume}
                            />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


export default PlayerView;
