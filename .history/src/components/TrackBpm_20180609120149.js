import React, { Component } from 'react';
import './Track.css';
class TrackBpm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bpm: this.props.tackBpm,
            newBpm:-1
            // disabled: false
        }
        this._track = this.props._track
    }

    render() {
        return (
            <div className="detailsDiv_bpm">BPM:
                {this.state.newBpm === -1 ? this.state.bpm : "" + this.state.newBpm}
                {this.state.trackBpm === -1 ? "" : this.state.bpm}
            </div>

        );
    }
}


export default TrackBpm;
