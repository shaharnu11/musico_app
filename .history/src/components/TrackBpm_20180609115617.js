import React, { Component } from 'react';
class TrackBpm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bpm: this.props.tackBpm
            // disabled: false
        }
        this._track = this.props._track
    }

    render() {
        console.log(this.state.playing);
        return (
            <div className="detailsDiv_bpm">BPM:
                {this.state.trackBpm === -1 ? trackDetails.bpm : "" + this.state.trackBpm}
                {this.state.trackBpm === -1 ? "" : originalBpm}
            </div>

        );
    }
}


export default PlayButton;
