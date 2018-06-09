import React, { Component } from 'react';
class TrackBpm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bpm: this.props.bpm,
            newBpm:-1
            // disabled: false
        }
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

        return (
            <div className="detailsDiv_bpm">BPM:
                {this.state.newBpm === -1 ? this.state.bpm : this.state.newBpm}
                {this.state.newBpm === -1 ? "" : originalBpm}
            </div>

        );
    }
}


export default TrackBpm;
